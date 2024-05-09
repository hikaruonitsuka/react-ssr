import fs from 'node:fs/promises';
import express from 'express';
import { Transform } from 'node:stream';

// 環境変数
const isProduction = process.env.NODE_ENV === 'production';
const port = 3000;
const base = isProduction ? '/react-ssr/' : '/';
const ABORT_DELAY = 10000; // タイムアウトまでの時間

// 本番環境の場合は、キャッシュ用のテンプレートHTMLとSSRマニフェストを読み込む
const templateHtml = isProduction ? await fs.readFile('./dist/client/index.html', 'utf-8') : '';
const ssrManifest = isProduction ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8') : undefined;

// HTTPサーバーを作成
const app = express();

// 開発環境の場合はViteのcreateServerを使ってミドルウェアとしてサーバーを起動
// 本番環境の場合は、圧縮ミドルウェアとSirvを使ってサーバーを起動
// sirvは静的ファイルを提供するためのミドルウェア（この場合CSSファイルや画像ファイル）
let vite;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(base, sirv('./dist/client', { extensions: [] }));
}

// 全てのリクエストに対してHTMLを返却
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '');

    // 開発時はViteのSSRを使ってHTMLを生成
    // 本番環境の場合は、SSRのバンドルを読み込んでHTMLを生成
    let template;
    let render;
    if (!isProduction) {
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template); // テンプレートをViteのプラグインで変換
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render; // 設定されたエントリーポイントのモジュールをリアルタイム読み込みコンパイルする
    } else {
      template = templateHtml;
      render = (await import('./dist/server/entry-server.js')).render; // 本番環境の場合は、SSRのバンドルファイルを読み込む
    }

    let didError = false; // エラーが発生したかどうか

    // 指定されたURLに対してSSRを実行
    const { pipe, abort } = render(url, ssrManifest, {
      // エラーが発生した場合の処理
      onShellError() {
        res.status(500);
        res.set({ 'Content-Type': 'text/html' });
        res.send('<h1>サーバーエラー</h1>');
      },
      // レンダリングの準備ができた場合の処理
      onShellReady() {
        res.status(didError ? 500 : 200);
        res.set({ 'Content-Type': 'text/html' });

        const transformStream = new Transform({
          transform(chunk, encoding, callback) {
            res.write(chunk, encoding);
            callback();
          },
        });

				// テンプレートを分割して、SSRで生成されたHTMLを挿入できるようにする
        const [htmlStart, htmlEnd] = template.split(`<!--app-html-->`);

				// 分割した初期部分のHTMLをレスポンスで返す
        res.write(htmlStart);

				// 全てのデータを受け取ったらfinishイベントを発火してレスポンスを閉じる
        transformStream.on('finish', () => {
          res.end(htmlEnd);
        });

        pipe(transformStream); // SSRで生成されたHTMLを挿入してレスポンスを返す
      },
      onError(error) {
        didError = true;
        console.error(error);
      },
    });

		// タイムアウト処理（SSRが指定時間内に完了しない場合に中止させるため）
    setTimeout(() => {
      abort();
    }, ABORT_DELAY);
  } catch (e) {
		// SSR処理中に発生したエラーをキャッチしてログに出力
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// サーバーのセットアップ
app.listen(port, () => {
  const fullUrl = isProduction ? `http://localhost:${port}${base}` : `http://localhost:${port}`;
  console.log(`Server started at ${fullUrl}`);
});

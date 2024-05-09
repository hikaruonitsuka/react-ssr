import React from 'react';
import { type RenderToPipeableStreamOptions, renderToPipeableStream } from 'react-dom/server';
import App from '@/App';

// 指定されたURLとSSRマニフェストを使用して、アプリケーションをレンダリング
export function render(_url: string, _ssrManifest?: string, options?: RenderToPipeableStreamOptions) {
  return renderToPipeableStream(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    options,
  );
}

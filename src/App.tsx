import { SiGithub } from '@icons-pack/react-simple-icons';
import profilePic from './assets/profile.webp';

function App() {
  return (
    <div className="grid min-h-screen grid-cols-[100%] grid-rows-[1fr,auto]">
      <div className="grid place-items-center">
        <div className="flex flex-col items-center gap-y-8">
          <div className="flex flex-col items-center gap-y-2">
            <div className="size-24 overflow-hidden rounded-full border-2 border-gray-200">
              <img className="size-full object-cover" src={profilePic} alt="プロフィールアイコン" />
            </div>
            <p className="text-2xl font-bold ">Hikaru Onitsuka</p>
            <div>
              <a href="https://github.com/hikaruonitsuka" target="_blank" rel="noopener noreferrer">
                <SiGithub color="default" />
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-y-4 text-center">
            <p>
              現職コーダー。Webサイトのコーディングや一部ディレクション・デザイン制作を担当しています。
              <br />
              フロントエンドの技術に興味があり、現在転職を視野に入れつつReact,TypeScript,Next.jsを学習中。
            </p>
          </div>
        </div>
      </div>
      <footer className="py-2 text-center text-xs font-bold">® Hikaru Onitsuka</footer>
    </div>
  );
}

export default App;

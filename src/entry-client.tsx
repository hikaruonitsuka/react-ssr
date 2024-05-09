import '@/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';

// サーバーで生成されたHTMLをもとにReactアプリケーションを再構築
ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

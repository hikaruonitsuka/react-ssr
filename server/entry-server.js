import { jsxs, jsx } from "react/jsx-runtime";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { SiGithub } from "@icons-pack/react-simple-icons";
const profilePic = "/react-ssr/assets/profile-Bq8lAdNM.webp";
function App() {
  return /* @__PURE__ */ jsxs("div", { className: "grid min-h-screen grid-cols-[100%] grid-rows-[1fr,auto]", children: [
    /* @__PURE__ */ jsx("div", { className: "grid place-items-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-y-2", children: [
        /* @__PURE__ */ jsx("div", { className: "size-24 overflow-hidden rounded-full border-2 border-gray-200", children: /* @__PURE__ */ jsx("img", { className: "size-full object-cover", src: profilePic, alt: "プロフィールアイコン" }) }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold ", children: "Hikaru Onitsuka" }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("a", { href: "https://github.com/hikaruonitsuka", target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsx(SiGithub, { color: "default" }) }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-y-4 text-center", children: /* @__PURE__ */ jsxs("p", { children: [
        "現職コーダー。Webサイトのコーディングや一部ディレクション・デザイン制作を担当しています。",
        /* @__PURE__ */ jsx("br", {}),
        "フロントエンドの技術に興味があり、現在転職を視野に入れつつReact,TypeScript,Next.jsを学習中。"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { className: "py-2 text-center text-xs font-bold", children: "® Hikaru Onitsuka" })
  ] });
}
function render(_url, _ssrManifest, options) {
  return renderToPipeableStream(
    /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(App, {}) }),
    options
  );
}
export {
  render
};

import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import remarkAlert from "remark-github-blockquote-alert";
import { unified } from "@astrojs/markdown-remark";

import sitemap from "@astrojs/sitemap";

const el = (tagName, properties = {}, children = []) => ({
  type: "element",
  tagName,
  properties,
  children,
});
const text = (value) => ({ type: "text", value });

export default defineConfig({
  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Lora",
      cssVariable: "--font-lora",
    },
    {
      provider: fontProviders.fontsource(),
      name: "Space Grotesk",
      cssVariable: "--font-spacegrotesk",
    },
    {
      provider: fontProviders.fontsource(),
      name: "Space Mono",
      cssVariable: "--font-spacemono",
    },
  ],

  markdown: {
    processor: unified({
      remarkPlugins: [remarkAlert],
    }),
    shikiConfig: {
      theme: "github-dark",
      transformers: [
        {
          name: "code-block-chrome",
          root(root) {
            const lang = this.options.lang || "text";
            root.children = [
              el("div", { class: "code-block" }, [
                el("div", { class: "code-block__tabs" }, [
                  el("span", { class: "code-block__tab" }, [text(lang)]),
                  el(
                    "button",
                    {
                      class: "code-block__tab code-block__copy",
                      type: "button",
                    },
                    [text("Copy")],
                  ),
                ]),
                ...root.children,
              ]),
            ];
          },
        },
      ],
    },
  },
});

// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://whidbeyislanddj.com",
  output: "static",
  adapter: vercel(),
  integrations: [react(), keystatic(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});

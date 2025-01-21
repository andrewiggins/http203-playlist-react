import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const p = (...args) => path.join(__dirname, ...args);

// https://vitejs.dev/config/
export default defineConfig({
	base: "/http203-playlist-react/",
	plugins: [react()],
	build: {
		modulePreload: {
			polyfill: false,
		},
	},
	server: {
		hmr: false,
	},
	css: {
		modules: {
			localsConvention: "camelCase",
		},
	},
	resolve: {
		alias: [
			{
				find: "video-data",
				replacement: p("./src/data.json"),
			},
			{
				find: /^shared\//,
				replacement: p("./src/shared/"),
			},
		],
	},
});

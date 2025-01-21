import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
});

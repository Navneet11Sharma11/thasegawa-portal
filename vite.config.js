import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
export default defineConfig({
    server: {
        host: true,
        port: 3000,
    },
    preview: {
        host: true,
        port: 3000,
    },
    plugins: [
        react(),
        tsconfigPaths(),
    ],
    resolve: {
        alias: {
            "@": "/src",
            "@assets": "/src/assets", // added alias for assets
        },
    },
    build: {
        assetsDir: "public",
        rollupOptions: {
            output: {
                manualChunks: {
                    antd: ["antd"],
                },
            },
        },
    },
});

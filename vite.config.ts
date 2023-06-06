/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        compression({
            ext: '.gz', // compressed file ext
            deleteOriginFile: false, // delete original files
            algorithm: 'gzip', // compression type, default is 'gzip'
            threshold: 10240, // only compress files bigger than this size (in bytes)
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
            '@modules': fileURLToPath(
                new URL('./src/modules', import.meta.url)
            ),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    survey: ['survey-knockout-ui'],
                },
            },
        },
    },
});

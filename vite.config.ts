/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),

            '@mobile': fileURLToPath(new URL('./src/mobile', import.meta.url)),
            '@mobileModules': fileURLToPath(
                new URL('./src/mobile/modules', import.meta.url)
            ),

            '@desktop': fileURLToPath(
                new URL('./src/desktop', import.meta.url)
            ),
            '@desktopModules': fileURLToPath(
                new URL('./src/desktop/modules', import.meta.url)
            ),
        },
    },
});

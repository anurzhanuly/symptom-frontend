/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@mobile': fileURLToPath(new URL('./src/mobile', import.meta.url)),
            '@mobileShared': fileURLToPath(
                new URL('./src/mobile/shared', import.meta.url)
            ),
            '@mobileAssets': fileURLToPath(
                new URL('./src/mobile/assets', import.meta.url)
            ),
            '@mobileModules': fileURLToPath(
                new URL('./src/mobile/modules', import.meta.url)
            ),

            '@desktop': fileURLToPath(
                new URL('./src/desktop', import.meta.url)
            ),
            '@desktopShared': fileURLToPath(
                new URL('./src/desktop/shared', import.meta.url)
            ),
            '@desktopAssets': fileURLToPath(
                new URL('./src/desktop/assets', import.meta.url)
            ),
            '@desktopModules': fileURLToPath(
                new URL('./src/desktop/modules', import.meta.url)
            ),
        },
    },
});

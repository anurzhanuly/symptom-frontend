import type { App } from 'vue';

let app: App | null = null;

export function setAppInstance(instance: App) {
    app = instance;
}

export function getAppInstance(): App {
    if (!app) {
        throw new Error('App instance is not set.');
    }
    return app;
}

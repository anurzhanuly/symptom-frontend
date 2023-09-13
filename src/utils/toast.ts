import { ToastSeverity } from 'primevue/api';
import { getAppInstance } from '@/utils/appInstance';

export function info(summary: string, detail: string, life = 2000): void {
    const app = getAppInstance();
    app.config.globalProperties.$toast.add({
        severity: ToastSeverity.INFO as 'info',
        summary,
        detail,
        life,
    });
}

export function warn(summary: string, detail: string, life = 2000): void {
    const app = getAppInstance();
    app.config.globalProperties.$toast.add({
        severity: ToastSeverity.WARN as 'warn',
        summary,
        detail,
        life,
    });
}

export function success(summary: string, detail: string, life = 2000): void {
    const app = getAppInstance();
    app.config.globalProperties.$toast.add({
        severity: ToastSeverity.SUCCESS as 'success',
        summary,
        detail,
        life,
    });
}

export function error(summary: string, detail: string, life = 2000): void {
    const app = getAppInstance();
    app.config.globalProperties.$toast.add({
        severity: ToastSeverity.ERROR as 'error',
        summary,
        detail,
        life,
    });
}

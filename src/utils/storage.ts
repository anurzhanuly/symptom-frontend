import { CLIENT_TOKEN, DATE_OF_TOKEN, PATIENT_ID } from './localStorageKeys';

export function checkClientToken() {
    const token = localStorage.getItem(CLIENT_TOKEN);
    const tokenDate = Number(localStorage.getItem(DATE_OF_TOKEN)) || 0;
    const prepareDate = 8 * 60 * 60 * 1000;
    const currentDate = Date.now();
    const timeDiff = currentDate - tokenDate;

    if (token && tokenDate) {
        if (timeDiff > prepareDate) {
            localStorage.removeItem(CLIENT_TOKEN);
            localStorage.removeItem(DATE_OF_TOKEN);
            localStorage.removeItem(PATIENT_ID);
        }
    }
}

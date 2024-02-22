export function checkToken() {
    const token = localStorage.getItem('clientToken');
    const tokenDate = Number(localStorage.getItem('tokenDate')) || 0;
    const prepareDate = 8 * 60 * 60 * 1000;
    const currentDate = Date.now();
    const timeDiff = currentDate - tokenDate;

    if (token && tokenDate) {
        if (timeDiff > prepareDate) {
            localStorage.removeItem('clientToken');
            localStorage.removeItem('tokenDate');
        }
    }
}

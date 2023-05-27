 /**
 * Подскрол к элементу
 */
export function scrollToElement(selector: string) {
    const el = document.querySelector(selector);

    if (el) {
        if (typeof el.scrollIntoView === 'function') {
            el.scrollIntoView({
                behavior: 'smooth',
            });

            return;
        }
    }

    window.scroll({
        top:      0,
        behavior: 'smooth',
    });
}

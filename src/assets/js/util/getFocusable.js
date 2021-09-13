// https://gomakethings.com/how-to-get-the-first-and-last-focusable-elements-in-the-dom/
export const getFocusable = (_element = document) => _element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
export const focusFirstIn = (_element = document) => {
    const focusables = getFocusable(_element);
    focusables[0].focus();
}
export const copyToClipboard = (_config) => {
    const {copyFrom, button, successCb, errorCb} = _config;
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(copyFrom);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
        document.execCommand('copy');

        const original = button.textContent;
        button.textContent = 'copied!';

        if (successCb) { successCb() };
        
        setTimeout( () => {
            button.textContent = original;
        }, 1200);
    } catch(error) {
        console.error(error);
        if (errorCb) { errorCb() };
    }
}
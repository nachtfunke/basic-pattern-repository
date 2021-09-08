import { recalculatePatternDimensions } from './util/recalculatePatternDimensions.js';
import { copyToClipboard } from './util/copyToClipboard.js';

const patternEntries = document.querySelectorAll('[data-pattern-item]');
const resizePatterns = () => patternEntries.forEach( entry => (entry.offsetParent === null) ? null:recalculatePatternDimensions(entry) );

// initial resizing.
document.addEventListener('DOMContentLoaded', () => resizePatterns());

// resize when the window resizes too.
window.addEventListener('resize', resizePatterns);

const copyCodeButton = document.querySelector('[data-copy-pattern-code]');
const code = document.querySelector('[data-pattern-code]');
const browseButton = document.querySelector('[data-close-pattern-details]');
const siteContent = document.querySelector('[data-site-content]');
const sitePatterns = document.querySelector('[data-site-patterns]');

copyCodeButton.addEventListener('click', () => copyToClipboard({button: copyCodeButton, copyFrom: code}));

browseButton.addEventListener('click', () => {
    if ( document.body.classList.contains('is--showing-pattern-details') ) {
        document.body.classList.remove('is--showing-pattern-details');
        document.body.classList.add('is--showing-patterns-navigation');

        document.body.addEventListener('transitionend', function hideDetails(e) {
            e.stopPropagation();
            siteContent.classList.add('sr-only');
            siteContent.setAttribute('style', 'padding: 0; flex-basis: 0');
            siteContent.setAttribute('aria-hidden', true);
            sitePatterns.setAttribute('style', 'display: block');
            sitePatterns.querySelector('a:first-of-type').focus();
            document.body.removeEventListener('transitionend', hideDetails);
        });
    }
});
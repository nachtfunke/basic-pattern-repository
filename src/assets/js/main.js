import { recalculatePatternDimensions } from './util/recalculatePatternDimensions.js';
import { copyToClipboard } from './util/copyToClipboard.js';
import { focusFirstIn } from './util/getFocusable.js';

// Pattern Resizing
const patternEntries = document.querySelectorAll('[data-pattern-item]');
const resizePatterns = () => patternEntries.forEach( entry => (entry.offsetParent === null) ? null:recalculatePatternDimensions(entry) );

// Copy Code to Clipboard
const copyCodeButton = document.querySelector('[data-copy-pattern-code]');
const code = document.querySelector('[data-pattern-code]');

// Closing of a single-view pattern to browse other patterns
const browseButton = document.querySelector('[data-close-pattern-details]');
const siteContent = document.querySelector('[data-site-content]');
const sitePatterns = document.querySelector('[data-site-patterns]');

// Mobile Navigation
const openMobileNav = document.querySelector('[data-open-mobile-nav]');
const closeMobileNav = document.querySelector('[data-close-mobile-nav]');
const mobileNav = document.querySelector('[data-mobile-nav]');

if (patternEntries) {
    // initial resizing.
    document.addEventListener('DOMContentLoaded', resizePatterns());

    // resize when the window resizes too.
    window.addEventListener('resize', resizePatterns);
}

if (copyCodeButton) {
    copyCodeButton.addEventListener('click', () => copyToClipboard({button: copyCodeButton, copyFrom: code}));
}

if (openMobileNav) {
    openMobileNav.addEventListener('click', e => {
        e.stopPropagation();
        if ( mobileNav.hidden ) {
            mobileNav.hidden = false;
            openMobileNav.setAttribute('aria-expanded', true);
            focusFirstIn(mobileNav);
        }
    });

    closeMobileNav.addEventListener('click', e => {
        e.stopPropagation();
        if ( mobileNav.hidden == false ) {
            mobileNav.hidden = true;
            openMobileNav.setAttribute('aria-expanded', false);
            openMobileNav.focus();
        }
    });
}

if (browseButton) {
    browseButton.addEventListener('click', () => {
        if ( document.body.classList.contains('is--showing-pattern-details') ) {
            document.body.classList.remove('is--showing-pattern-details');
            document.body.classList.add('is--showing-patterns-navigation');

            document.body.addEventListener('transitionend', function hideDetails(e) {
                e.stopPropagation();
                siteContent.hidden = true;
                siteContent.setAttribute('aria-hidden', true);
                sitePatterns.setAttribute('style', 'display: block');
                sitePatterns.querySelector('a:first-of-type').focus();
                resizePatterns();
                document.body.removeEventListener('transitionend', hideDetails);
            });
        }
    });
}
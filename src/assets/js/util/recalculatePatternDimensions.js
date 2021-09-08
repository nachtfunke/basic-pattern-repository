/*
    This function is used to resize the svg and its shape to its parent-element's size.

    Without this, the pattern would scale with the shape it was applied to proportionally. But I wanted it to behave like a tiled, repeating background,.
    I thought that this would be solvable with SVG alone, but either my knowledge is not well enough about this, or there really just isn't a way.

    I posted about this issue on stackoverflow too, with no success. If you know of a way that doesn't require JS, please let me know!
    https://stackoverflow.com/questions/68965998/prevent-scaling-of-pattern-in-svg/68972326
*/
export const recalculatePatternDimensions = _entry => {
    const svg = _entry.querySelector('[data-pattern-svg]');
    const shape = svg.querySelector('[data-pattern-shape]');
    const width = _entry.offsetWidth;
    const height = _entry.offsetHeight;
    const padding = parseInt(window.getComputedStyle(_entry, null).getPropertyValue('padding'));
    const border = parseInt(window.getComputedStyle(_entry, null).getPropertyValue('border'));
    const newWidth = width - (border * 2) - (padding * 2);
    const newHeight = height - (border * 2) - (padding * 2);
    
    svg.setAttribute('viewBox', `0 0 ${newWidth} ${newHeight}`);
    svg.setAttribute('width', newWidth);
    svg.setAttribute('height', newHeight);
    shape.setAttribute('width', newWidth);
    shape.setAttribute('height', newHeight);
};
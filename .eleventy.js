const svgContents = require('eleventy-plugin-svg-contents');
const syntaxHighlighting = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function(eleventyConfig) {
    const markdownIt = require('markdown-it');
    const markdownConfigured = markdownIt({ html: true }).disable('code');

    eleventyConfig.setLibrary('md', markdownConfigured);

    eleventyConfig.setTemplateFormats('md,njk');

    eleventyConfig.setBrowserSyncConfig({
        files: './dist/css/**/*.css',
        browser: 'polypane'
    });

    eleventyConfig.addPlugin(svgContents);
    eleventyConfig.addPlugin(syntaxHighlighting);
    
    eleventyConfig.addFilter('dateReadable', date => date.toLocaleDateString('de-de'));

    // order the patterns by id
    eleventyConfig.addCollection('orderedPatterns', collection => {
        return collection.getFilteredByTag('pattern').sort( (a,b) => a.data.id - b.data.id );
    });
    
    eleventyConfig.addPassthroughCopy('src/assets/fonts/*-subset.*');

    return {
        dir: {
            input: './src',
            output: './dist',
            layouts: '_layouts'
        }
    }
}
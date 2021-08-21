const svgContents = require('eleventy-plugin-svg-contents');
const syntaxHighlighting = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function(eleventyConfig) {

    eleventyConfig.addPlugin(svgContents);
    eleventyConfig.addPlugin(syntaxHighlighting);

    eleventyConfig.setBrowserSyncConfig({
        files: './dist/css/**/*.css'
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
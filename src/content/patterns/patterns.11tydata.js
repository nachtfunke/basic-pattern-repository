module.exports = () => {
    return {
        layout: 'pattern',
        tags: ['pattern'],
        permalink: 'pattern/{{ id }}/index.html',
        eleventyComputed: {
            title: 'Pattern #{{ id }}'
        }
    }
}
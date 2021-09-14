const package = require('../../package.json');

module.exports = {
    "site": {
        "title": "Basic Pattern Repository",
        "copyright": "2021 Thomas Michael Semmler",
        "domain": process.env.URL || "http://localhost:8080",
    },
    "repository": {
        "version": package.version
    }
}
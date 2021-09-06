const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const webpackConfig = {
    plugins: [
        new CaseSensitivePathsPlugin({ debug: true })
    ]
}

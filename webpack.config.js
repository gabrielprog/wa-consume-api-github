const {resolve} = require('path');

module.exports = {
    entry: ['babel-polyfill', resolve(__dirname, 'src', 'index.js')],
    output: {
        path: resolve(__dirname, 'src', 'public'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: resolve(__dirname, 'src', 'public')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_module/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            }
        ]
    }
}
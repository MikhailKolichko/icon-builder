import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import path from "node:path";
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


console.log(path.join(__dirname, 'build/src/index.ts'));

module.exports = {
    entry: {
        icons: path.join(__dirname, 'build/src/index.ts'),
        'icons.min': path.join(__dirname, 'build/src/index.ts'),
    },
    output: {
        path: path.join(__dirname, 'package-build'),
        library: 'icons',
        libraryTarget: 'umd',
        filename: '[name].js',
        umdNamedDefine: true,
        globalObject: 'typeof self !== "undefined" ? self : this',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                include: /\.min\.js$/,
                parallel: true,
                sourceMap: true
            })
        ]
    },
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules|bower_components)/,
                use: 'ts-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    "isomorphic-style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    }
};

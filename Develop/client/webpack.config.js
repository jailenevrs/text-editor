const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const WorkboxPlugin = require ('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer:{
      hot: "only"
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin'
      }),
      new MiniCssExtractPlugin(),
      new InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'service-worker.js',
      }),
      new WorkboxPlugin.GenerateSW(),
      new WebpackPwaManifest({
        name: 'jate',
        short_name: 'jate',
        description:'text editor',
        start_url: '/',
        publicPath: '/',
        icons: [{
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets','icons')

      }]
    })
      
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
          
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
        }
      }
      ]
    },
  };
};

const HTMLWebpackPlugin = require('html-webpack-plugin');
const _ = require('lodash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const env = require('../config/env');

const getPackageJson = require('./getPackageJson');
const baseConfig = require('./webpack.config');

const { version, name, license } = getPackageJson('version', 'name', 'license');

const banner = `
    Name: [name]
    Generated on: ${Date.now()}
    Package: ${name}
    Version: v${version}
    License: ${license}
    `;

const prodConf = {
  mode: 'production',

  entry: {
    main: ['@babel/polyfill', 'whatwg-fetch', `${env.SRC_ROOT}/index.tsx`],
  },

  module: {
    rules: [],
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEBUG__: false,
      'process.env.NODE_ENV': '"production"',
      __APP_VERSION__: `"${version}"`,
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new HTMLWebpackPlugin({
      title: 'ToReplaceByTitle',
      basePath: 'ToReplaceByVerdaccio',
      faviIcoPath: `ToReplaceByVerdaccioFavico`,
      __UI_OPTIONS: 'ToReplaceByVerdaccioUI',
      filename: 'index.html',
      template: `${env.SRC_ROOT}/template/index.html`,
      debug: false,
      inject: true,
    }),
    new webpack.BannerPlugin(banner),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

prodConf.module.rules = baseConfig.module.rules
  .filter(loader => Array.isArray(loader.use) && loader.use.find(v => /css/.test(v.loader.split('-')[0])))
  .forEach(loader => {
    loader.use = [MiniCssExtractPlugin.loader].concat(_.tail(loader.use));
  });

module.exports = merge(baseConfig, prodConf);

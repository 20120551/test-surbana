require('dotenv').config();

const { env } = require('process');
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const lazyImports = [
  '@nestjs/microservices',
  '@nestjs/microservices/microservices-module',
  '@nestjs/websockets',
  '@nestjs/websockets/socket-module',
  'class-transformer/storage',
];

module.exports = () => ({
  entry: './src/main.ts',
  target: 'node',
  mode: env.NODE_ENV === 'prod' ? 'production' : 'development',
  devtool: env.NODE_ENV === 'prod' ? 'nosources-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        loader: 'ts-loader',
        exclude: [[/node_modules/]],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'dist/bundles'),
    filename: '[name].js',
    sourceMapFilename: '[file].map',
  },
  resolve: {
    extensions: ['.mjs', '.json', '.ts', '.js'],
    alias: {
      api: path.resolve(__dirname, 'src/api'),
      shared: path.resolve(__dirname, 'src/shared'),
      domain: path.resolve(__dirname, 'src/domain'),
      applications: path.resolve(__dirname, 'src/applications'),
      infrastructures: path.resolve(__dirname, 'src/infrastructures'),
      shared: path.resolve(__dirname, 'src/shared'),
    },
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new webpack.IgnorePlugin({
      checkResource(resource) {
        if (lazyImports.includes(resource)) {
          try {
            require.resolve(resource);
          } catch (err) {
            return true;
          }
        }
        return false;
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: '*.node',
          context: 'node_modules/.prisma/client/',
          to: '../node',
        },
        {
          from: 'node_modules/swagger-ui-dist/swagger-ui.css',
          to: '.',
        },
        {
          from: 'node_modules/swagger-ui-dist/swagger-ui-bundle.js',
          to: '.',
        },
        {
          from: 'node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js',
          to: '.',
        },
        {
          from: 'node_modules/swagger-ui-dist/favicon-16x16.png',
          to: '.',
        },
        {
          from: 'node_modules/swagger-ui-dist/favicon-32x32.png',
          to: '.',
        },
      ],
    }),
  ],
});

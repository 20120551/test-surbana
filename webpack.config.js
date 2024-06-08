const path = require('path');
const slsw = require('serverless-webpack');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const lazyImports = [
  '@nestjs/microservices',
  '@nestjs/microservices/microservices-module',
  '@nestjs/websockets',
  '@nestjs/websockets/socket-module',
  'class-transformer/storage',
  'hbs',
];

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: 'development',
  devtool: slsw.lib.webpack.isLocal ? 'source-map' : 'nosources-source-map',
  externals: [
    // nodeExternals({
    //   allowlist: ['webpack/hot/poll?100'],
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        loader: 'ts-loader',
        exclude: [[/node_modules/, /.serverless/, /.webpack/]],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
    sourceMapFilename: '[file].map',
  },
  resolve: {
    extensions: ['.mjs', '.json', '.ts', '.js'],
    alias: {
      configurations: path.resolve(__dirname, 'src/configurations'),
      functions: path.resolve(__dirname, 'src/functions'),
      guards: path.resolve(__dirname, 'src/guards'),
      middleware: path.resolve(__dirname, 'src/middleware'),
      modules: path.resolve(__dirname, 'src/modules'),
      utils: path.resolve(__dirname, 'src/utils'),
      types: path.resolve(__dirname, 'src/types'),
      interceptors: path.resolve(__dirname, 'src/interceptors'),
      templates: path.resolve(__dirname, 'src/templates'),
    },
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
          to: 'src/functions',
        },
      ],
    }),
  ],
};

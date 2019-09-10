const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: [path.resolve(__dirname, 'ts/app.ts')],
  },
  output: {
    path: path.resolve(__dirname, '../src/assets/js'),
    filename: '[name].bundle.js',
  },
  optimization: {
    // 共通モジュールのバンドル
    // splitChunks: {
    //   name: 'vendor',
    //   chunks: 'initial',
    // },
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: false,
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      ie: 11,
                      android: 4
                    },
                    useBuiltIns: 'usage',
                    corejs: {
                      version: 3,
                      proposals: true
                    },
                    debug: true
                  }
                ],
                '@babel/preset-typescript'
              ]
            }
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ['*', '.ts', '.js', '.vue', '.json'],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    // new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new webpack.ProvidePlugin({
      velocity: 'velocity-animate'
    })
  ],
};

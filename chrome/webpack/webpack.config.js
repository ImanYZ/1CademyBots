const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const DotenvWebpackPlugin = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    background: path.resolve(__dirname, '..', 'src', 'background.ts'),
    'paste-detector': path.resolve(
      __dirname,
      '..',
      'src',
      'utils',
      'paste-detector.ts'
    ),
    app: path.resolve(__dirname, '..', 'src', 'app.tsx'),
  },
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    client: {
      overlay: {
        warnings: false,
      },
    },
  },
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'source-map',
  plugins: [
    new DotenvWebpackPlugin({
      path: './.env',
      safe: true,
    }),
    // new HardSourceWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: '.',
          to: '.',
          context: 'public',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'public', 'app.html'),
    }),
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
          output: {
            ascii_only: true,
          },
        },
      }),
    ],
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
    cacheDirectory: path.resolve(__dirname, '.webpack_cache'),
  },
}

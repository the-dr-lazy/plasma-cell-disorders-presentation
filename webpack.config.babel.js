import path from 'path'
import sass from 'sass'
import HtmlPlugin from 'html-webpack-plugin'
import MiniCSSExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'

function root(...args) {
  return path.resolve(__dirname, ...args)
}

const paths = {
  srcDirectory: root('src'),
  publicDirectory: root('public'),
  distDirectory: root('dist'),
}

const __DEV__ = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export default {
  entry: path.join(paths.srcDirectory, 'index.js'),

  output: {
    path: paths.distDirectory,
    filename: 'assets/js/main.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.scss$/,
        use: [
          { loader: __DEV__ ? 'style-loader' : MiniCSSExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'sass-loader', options: { implementation: sass } },
        ],
      },
      {
        test: /\.html$/,
        use: { loader: 'html-loader' },
      },
    ],
  },

  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'assets/css/[name].css',
      hmr: __DEV__,
      reloadAll: true,
    }),
    new HtmlPlugin({
      template: path.join(paths.publicDirectory, 'index.html'),
      filename: 'index.html',
    }),
  ],

  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
  },

  devServer: {
    host: '0.0.0.0',
    port: 8080,
    inline: true,
  },
}

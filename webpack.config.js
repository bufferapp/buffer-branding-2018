const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CompilerPlugin = require('compiler-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const path = require('path')
const fs = require('fs')
const child_process = require('child_process')
const config = require('./config')
const vendor = require('./js/vendor')

module.exports = {
  entry: {
    bundle: './js/app.js',
    style: './css/app.css',
    svgxuse: './node_modules/svgxuse/svgxuse.js',
    vendor: vendor
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, config.paths.dist),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader']
        })
      },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      }
    ]
  },
  plugins: [
    ...hbsPageGenerator(),
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        proxy: process.env.SITE || 'http://0.0.0.0:8080',
        port: 3000,
        files: ['public_html/dist/*.css']
      },
      {
        reload: false
      }
    ),
    new CleanWebpackPlugin([path.join(__dirname, config.paths.dist)], {
      root: process.cwd()
    }),
    new WebpackNotifierPlugin({
      title: 'Webpack',
      contentImage: path.join(
        __dirname,
        `${config.paths.publicPath}img/ds-logo.jpg`
      )
    }),
    new CompilerPlugin('done', generateSprite)
  ]
}

// Create the svgsprite by passing the `icons` direction to the sprite generator
function generateSprite() {
  child_process.exec(
    `onchange '${
      config.paths.publicPath
    }icons' -i -- ./node_modules/.bin/svg-sprite-generate -d ${
      config.paths.publicPath
    }icons -o ${config.paths.dist}symbol-defs.svg`
  )
}

// Loop through each handlebars page file and pass into HtmlWebpackPlugin to
// create a separate compiled file for each
function hbsPageGenerator() {
  let page
  let filename
  let pages = []
  fs.readdirSync('pages').forEach(file => {
    filename = path.basename(file, '.hbs')
    page = new HtmlWebpackPlugin({
      filename: path.resolve(
        __dirname,
        config.paths.publicPath + filename + '.html'
      ),
      template: `pages/${filename}.hbs`,
      inject: false
    })
    pages.push(page)
  })
  return pages
}

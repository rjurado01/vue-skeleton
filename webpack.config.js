const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPLugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Entorno Base
config = {
  entry: './src/js/main.js',
  output: {
    filename: 'application.js',
    sourceMapFilename: 'application.map'
  },
  module: {
    rules: [
      {
        test: /\.js$/, // compile javascript files
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'dist'),
          path.resolve(__dirname, 'dev'),
          path.resolve(__dirname, 'test')
        ],
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i, // compile scss files
        include: [
          path.resolve(__dirname, 'src/assets')
        ],
        loader: 'file-loader?name=assets/[hash].[ext]'
      },
      {
        test: /\.pug$/, // compile .pug templates
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'dist'),
          path.resolve(__dirname, 'dev'),
          path.resolve(__dirname, 'test')
        ],
        loader: 'pug-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules'
    ],
    alias: { // make vue global accesible
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      API_HOST: JSON.stringify(process.env.API_HOST) || "'http://localhost:3000'",
    }),
    new HtmlWebpackPLugin({ // compile index.ejs and inject js
      template: 'src/index.ejs'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Vue: 'vue'
    })
  ],
  devtool: 'source-map'

};

// Entorno de Desarrollo
if (process.env.ENV === 'development') {
  config.output.path = path.resolve(__dirname, 'dev');

  config.module.rules.push({
    test: /\.scss$/, // compile scss files
    exclude: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'dist'),
      path.resolve(__dirname, 'dev'),
      path.resolve(__dirname, 'test')
    ],
    loaders: ['style-loader', 'css-loader', 'sass-loader']
  });

  config.devServer = {
    contentBase: path.join(__dirname, 'dev'),
    port: 8000
  };

  config.plugins.push(new CleanWebpackPlugin(['dev']));
}
// Entorno de Producción
else {
  config.output.path = path.resolve(__dirname, 'dist');

  config.module.rules.push({
    test: /\.scss$/, // compile scss files
    exclude: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'dist'),
      path.resolve(__dirname, 'dev'),
      path.resolve(__dirname, 'test')
    ],
    use: ExtractTextPlugin.extract({
      use: ['css-loader', 'sass-loader']
    })
  });

  config.plugins.push(new CleanWebpackPlugin(['dist']));
  config.plugins.push(new ExtractTextPlugin('application.[contentHash].css'));
}

module.exports = config;

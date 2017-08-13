const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['webpack-hot-middleware/client', './client/src/index.js'],
  output: {
    path: path.resolve(__dirname, 'client/public'),
    filename: 'bundle.min.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, 
        loader: 'babel-loader', 
        exclude: /node_modules\//,
      query: {
        presets: ['react', 'es2015'],
        plugins: [
          'react-html-attrs', 
          'transform-decorators-legacy',
          'transform-class-properties'],
      } },
      { test: /\.css$/, loader: [
        'style-loader',
        'css-loader?importLoaders=1',
        'font-loader?format[]=truetype&format[]=woff&format[]=embedded-opentype'
      ] },
      { test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      { test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery',
    })
  ]
};

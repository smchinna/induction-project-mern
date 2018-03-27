var path=require('path');

var config = {
    entry: './src/main.js',
    output: {
  path: path.resolve(__dirname),
  filename: "bundle.js"
},
devServer: {
  historyApiFallback:true,
  inline: true,
  port: 8080
},
    module: {
       loaders: [
          {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
             query: {
                presets: ['es2016', 'react', 'stage-2']
             }
          }
       ]
    }
 }
 module.exports = config;

const path = require('path');

module.exports = {
  entry:path.join(__dirname,'./src/index.js'),
  output:{
    path:path.join(__dirname,'./dist'),
    filename: "bundle.js"
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:['babel-loader'],
        include:/src/,
        exclude:/node_modules/
      },
      {
        test:/\.css$/,
        use:['css-loader','style-loader']
      },
      {
        test:/\.(jpg|jpe?j|png|gif)$/,
        use: [
          {
            loader:'url-loader',
            options: {
              limit: 8192,
              outputPath:'images/',
              name:'[name].[hash:4].[text]'
            }
          }
        ]
      },
      {
        test:/\.(ttf|eot|woff|svg)$/,
        use: [
          {
            loader:'file-loader',
            options:{
              outions:{
                outputPath:'font',
                name:'[name].[hash:4].[ext]'
              }
            }
          }
        ]
      },
      {
        test:/\.(htm|html)$/,
        use:'html-withimg-loader'
      }
    ]
  },
  devServer:{
    contentBase:path.join(__dirname, './dist'),
    hot:true,
    port:3000
  }

}
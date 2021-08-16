const path = require('path')

const typescriptRules = {
  test: /\.ts$/,
  use: 'ts-loader',
  exclude: /node_modules/,
}

module.exports = {
  entry: './src/app.ts',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js',
  },
  module: { rules: [typescriptRules] },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 8080,
  },
}

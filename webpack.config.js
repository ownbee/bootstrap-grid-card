const path = require('path');

module.exports = {
  entry: './src/main.ts',
  mode: 'production',
  output: {
    filename: 'dist/bootstrap-grid-card.js',
    path: path.resolve(__dirname)
  },
  module: {
    rules: [
      {
        test: /\.css|\.s(c|a)ss$/,
        use: [{
          loader: 'lit-scss-loader',
          options: {
            minify: true, // defaults to false
          },
        }, 'extract-loader', 'css-loader'],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
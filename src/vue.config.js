module.exports = {
  configureWebpack: {
    plugins: [
    ],
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  }
}
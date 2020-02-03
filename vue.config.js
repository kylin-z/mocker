module.exports = {
  configureWebpack: {
    target: 'electron-renderer',
  },
  publicPath: './',
  devServer: {
    port: 8686
  }
}
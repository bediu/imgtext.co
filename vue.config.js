module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  },

  pages: {
    app: {
      entry: 'src/main.js',
      template: 'public/app.html',
      filename: 'app.html',
      chunks: ['chunk-vendors', 'chunk-common', 'app'],
      pwa: {
        name: 'imgtext',
        appleMobileWebAppStatusBarStyle: 'default'
      },
    }
  }
}
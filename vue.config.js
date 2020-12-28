/*=========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


module.exports = {
  publicPath: '/',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  pluginOptions: {
    i18n: {
      locale: "ar",
      fallbackLocale: "ar",
      localeDir: "locales",
      enableInSFC: false
    }
  },
  // devServer: {
  //   overlay: {
  //     warnings: true,
  //     errors: true
  //   }
  // }
}

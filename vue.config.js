module.exports = {
  pluginOptions: {
    quasar: {
      treeShake: true,
    }
  },

  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar[\\\/]/,
  ],


  publicPath: process.env.NODE_ENV === 'production' ? '/templates/promocodes/' : '/',

  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  css: undefined
}

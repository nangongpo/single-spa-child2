const packageJSON = require('./package.json')
const StatsPlugin = require('stats-webpack-plugin')
const SelectorNamespace = require('postcss-selector-namespace')
const getExternals = require('./externals')

const isProd = process.env.NODE_ENV === 'production'
const isMicro = process.env.VUE_APP_SINGLERUN === 'true'

module.exports = {
  publicPath: isMicro ? `/${packageJSON.name}` : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  transpileDependencies: [],
  productionSourceMap: false,
  devServer: {
    port: '30001'
  },
  configureWebpack: () => {
    const newConfig = {
      output: {
        library: packageJSON.name,
        libraryTarget: 'window'
      },
      plugins: [
        new StatsPlugin('manifest.json', {
          chunkModules: false,
          entrypoints: true,
          source: false,
          chunks: false,
          modules: false,
          assets: false,
          children: false,
          exclude: [/node_modules/]
        })
      ]
    }
    if (isProd) {
      // newConfig.externals = getExternals()
    }
    return newConfig
  },
  chainWebpack: config => {
    // HtmlWebpackPlugin插件
    config
      .plugin('html')
      .tap(args => {
        args[0].env = process.env.NODE_ENV
        args[0].externals = getExternals(true)
        return args
      })
  },
  css: {
    extract: false,
    loaderOptions: {
      postcss: {
        plugins: [
          SelectorNamespace({
            namespace() {
              /* 无需添加的样式 */
              // if (css.includes("element-variables.scss")) return "";
              return '#microApp'
            }
          })
        ]
      }
    }
  }
}

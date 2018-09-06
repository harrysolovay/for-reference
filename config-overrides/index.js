const {
  getBabelLoader,
} = require('react-app-rewired')

const {
  createLoaderMatcher,
  findRule,
  addBeforeRule,
  addAfterRule,
  rootPath
} = require('./utilities')

const rewireWhiteList = require('./whitelist')
const InlineSourcePlugin = require('html-webpack-inline-source-plugin')
const FaviconsPlugin = require('favicons-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const WebpackPWAManifestPlugin = require('webpack-pwa-manifest')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const OfflinePlugin = require('offline-plugin')

module.exports = {

  webpack: (config, env) => {

    

    // use .babelrc

    const babelLoader = getBabelLoader(config.module.rules)

    if(!babelLoader) throw new Error('Babel config bug')

    babelLoader.options.babelrc = true



    // create loaderMatcher for ESLint

    const eSLintLoaderMatcher = createLoaderMatcher('eslint-loader')
    


    // use .eslintrc

    const rule = findRule(
      config.module.rules,
      eSLintLoaderMatcher
    )

    if(!rule) {
      throw new Error('ESLint config bug')
    }

    delete rule.options.baseConfig
    rule.options.useEslintrc = true



    // use styled-components compatible .stylerc 

    const styleLintRules = {
      loader: 'stylelint-custom-processor-loader',
      options: {
        configPath: null,
        emitWarning: true,
      },
    }

    addBeforeRule(
      config.module.rules,
      eSLintLoaderMatcher,
      styleLintRules
    )



    if(env === 'production') {


      config.plugins.forEach((plugin, index) => {
        if(plugin.options && plugin.options.dontCacheBustUrlsMatching) {
          config.plugins.splice(index, 1)
        }
        if(plugin.options && plugin.options.template) {
          plugin.options.inlineSource = 'main.*.js'
        }
      })



      config.plugins = (config.plugins || []).concat([
        new InlineSourcePlugin(),
        new WebpackPWAManifestPlugin({
          filename: 'manifest.json',
          start_url: '.',
          name: 'Blockstack EvangeLIST',
          short_name: 'EvangeLIST',
          description: 'A place for members of the Blockstack community to connect and find collaborators',
          background_color: '#fff',
          theme_color: '#fff',
          crossorigin: 'anonymous',
          includeDirectory: true,
          icons: [{
            src: `${ rootPath }/src/assets/images/icon.png`,
            sizes: [ 72, 96, 128, 144, 192, 256, 384, 512 ],
          },],
          ios: true,
          inject: true,
        }),
        new ImageminPlugin({
          test: /\.(jpe?g|png|gif|svg)$/i,
        }),
        new OfflinePlugin({
          caches: 'all',
          responseStrategy: 'network-first',
          autoUpdate: true,
        }),
        new CompressionPlugin({
          exclude: /\.map$/
        }),
      ])



      config = rewireWhiteList(config, [
        'bitcoinjs-lib',
        'tiny-secp256k1/ecurve',
        'base64url/dist/base64url',
        'base64url/dist/pad-string',
        'bip32',
      ].map(module => `node_modules/${module}`))



    }

    return config

  },

  devServer: (configFunction) => {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost)
      config.headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization'
      }
      return config
    }
  },

}
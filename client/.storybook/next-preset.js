const path = require('path')

module.exports = {
  webpackFinal: async (baseConfig, options) => {
    
    const { module = {} } = baseConfig

    const newConfig = {
      ...baseConfig,
      module: {
        ...module,
        rules: [...(module.rules || [])]
      }
    }

    
    newConfig.module.rules.find(
      (rule) => rule.test.toString() === '/\\.css$/'
    ).exclude = /\.module\.css$/

    // Then we tell webpack what to do with CSS modules
    newConfig.module.rules.push({
      test: /\.module\.css$/,
      include: path.resolve(__dirname, '../components'),
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: './.storybook/'
            }
          }
        }
      ]
    })

    return newConfig
  }
}

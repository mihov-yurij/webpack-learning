const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const EslintWebpackPlugin = require('eslint-webpack-plugin')

const IS_DEV = process.env.NODE_ENV === 'development'

const getFileName = (extension) => (IS_DEV ? `[name].${extension}` : `[name].[contenthash].${extension}`)

const getJsLoaders = (extraPreset) => {
  const loader = {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }

  return extraPreset
    ? { ...loader, options: { ...loader.options, presets: [...loader.options.presets, extraPreset] } }
    : loader
}

const getCssLoaders = (extraLoader) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: ''
      }
    },
    'css-loader'
  ]

  return extraLoader ? [...loaders, extraLoader] : loaders
}

const getPlugins = () => [
  new HTMLWebpackPlugin({ template: './src/index.html' }),
  new CleanWebpackPlugin(),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, 'src/favicon.png'),
        to: path.resolve(__dirname, 'dist')
      }
    ]
  }),
  new MiniCssExtractPlugin({
    filename: getFileName('css')
  }),
  new EslintWebpackPlugin({
    extensions: ['js'],
    configType: 'eslintrc',
    fix: true
  })
]

const optimization = () => ({
  splitChunks: {
    chunks: 'all'
  },
  minimizer: [new CssMinimizerWebpackPlugin(), new TerserPlugin()]
})

module.exports = {
  entry: {
    main: './src/index.jsx',
    stat: './src/statistics.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: getFileName('js')
  },
  optimization: optimization(),
  target: 'web',
  devServer: {
    port: 4200,
    hot: false
  },
  devtool: IS_DEV ? 'source-map' : false,
  plugins: getPlugins(),
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: getCssLoaders()
      },
      {
        test: /\.less$/i,
        use: getCssLoaders('less-loader')
      },
      {
        test: /\.s[ac]ss$/i,
        use: getCssLoaders('sass-loader')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '/assets/[name].[ext]'
        }
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: getJsLoaders()
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: getJsLoaders('@babel/preset-typescript')
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: getJsLoaders('@babel/preset-react')
      }
    ]
  }
}

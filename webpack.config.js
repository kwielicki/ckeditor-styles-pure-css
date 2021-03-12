const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  mode: 'production',
  entry: {
    "styles": './src/styles/styles.scss',
  },
  output: {
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.css', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // Extract and save the final CSS.
          MiniCssExtractPlugin.loader,
          // Load the CSS, set url = false to prevent following urls to fonts and images.
          { loader: "css-loader", options: { url: false, importLoaders: 1 } },
          // Add browser prefixes and minify CSS.
          { loader: 'postcss-loader', options: { 
            postcssOptions: {
                plugins: [autoprefixer(), cssnano()]
              }
           }},
          // Load the SCSS/SASS
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    })
  ],
};

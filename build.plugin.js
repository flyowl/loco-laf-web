const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    config.resolve.plugin('tsconfigpaths').use(TsconfigPathsPlugin, [
      {
        configFile: './tsconfig.json',
      },
    ]);

    config.merge({
      node: {
        fs: 'empty',
      },
    });

    config.merge({
      entry: {
        index: require.resolve(`./src/index.tsx`)
      },
    });
    config
      .plugin('index')
      .use(HtmlWebpackPlugin, [
        {
          inject: false,
          minify: false,
          template: require.resolve('./public/index.ejs'),
          filename: `editor.html`,
        },
      ]);

    config
      .plugin('preview')
      .use(HtmlWebpackPlugin, [
        {
          inject: false,
          minify: false,
          // templateParameters: {
          // },
          template: require.resolve('./public/preview.html'),
          filename: 'index.html',
        },
      ]);



    config.module // fixes https://github.com/graphql/graphql-js/issues/1272
      .rule('mjs$')
      .test(/\.mjs$/)
      .include
        .add(/node_modules/)
        .end()
      .type('javascript/auto');
  });
};

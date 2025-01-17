const webpack = require('webpack');
const path = require('path');

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    '@storybook/addon-webpack5-compiler-babel'
  ],
  framework: {
    name: '@storybook/html-webpack5',
    options: {},
  },
  staticDirs: ['./public'],
  webpackFinal: async (config) => {
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['react'] = path.resolve('./node_modules/react');
    config.resolve.alias['react-dom'] = path.resolve('./node_modules/react-dom');
    config.resolve.fallback = config.resolve.fallback || {};
    config.resolve.fallback['react/jsx-dev-runtime'] = path.resolve('./.storybook/react-jsx-dev-runtime.development.js');
    config.resolve.fallback['react/jsx-runtime'] = path.resolve('./.storybook/react-jsx-runtime.production.min.js');

    config.plugins.push(
      new webpack.SourceMapDevToolPlugin({
        append: '\n//# sourceMappingURL=[url]',
        fileContext: './',
        filename: '[file].map',
      }),
    );


    return config;
  },
}
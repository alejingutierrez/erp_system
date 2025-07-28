/** @type { import('@storybook/react-vite').StorybookConfig } */
const { mergeConfig } = require('vite');
const path = require('path');

module.exports = {
  framework: '@storybook/react-vite',
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../src/**/*.docs.mdx',
  ],
  addons: ['@storybook/addon-essentials'],
  core: { disableTelemetry: true },
  async viteFinal(config) {
    return mergeConfig(config, {
      root: path.resolve(__dirname, '..'),
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
        },
      },
    });
  },
};

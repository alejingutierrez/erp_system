/** @type { import('@storybook/react-vite').StorybookConfig } */
const { mergeConfig } = require('vite');
const path = require('path');

module.exports = {
  framework: '@storybook/react-vite',
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    // Temporarily excluding .docs.mdx files due to missing CSF references
    // '../src/**/*.docs.mdx',
  ],
  addons: ['@storybook/addon-essentials'],
  core: { disableTelemetry: true },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      root: path.resolve(__dirname, '..'),
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          '@/atoms': path.resolve(__dirname, '../src/atoms'),
          '@/molecules': path.resolve(__dirname, '../src/molecules'),
          '@/organisms': path.resolve(__dirname, '../src/organisms'),
          '@/lib': path.resolve(__dirname, '../src/lib'),
        },
      },
      optimizeDeps: {
        include: ['react', 'react-dom'],
      },
      esbuild: {
        jsx: 'automatic',
        jsxImportSource: 'react',
      },
      define: {
        'process.env': {},
      },
    });
  },
};

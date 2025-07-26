/** @type { import('@storybook/react-vite').StorybookConfig } */
import { mergeConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  framework: "@storybook/react-vite",
  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../src/**/*.docs.mdx",
  ],
  addons: ["@storybook/addon-essentials"],
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

export default config;

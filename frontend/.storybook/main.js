/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  framework: "@storybook/react-vite",
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: ["@storybook/addon-essentials"],
  core: { disableTelemetry: true },
};

export default config;

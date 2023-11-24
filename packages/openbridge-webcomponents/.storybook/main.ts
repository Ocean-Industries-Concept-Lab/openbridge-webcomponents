import { dirname, join } from "path";
import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [getAbsolutePath("@storybook/addon-links"), getAbsolutePath("@storybook/addon-essentials"), getAbsolutePath("@storybook/addon-themes")],
  framework: {
    name: getAbsolutePath("@storybook/web-components-vite"),
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: [{ from: '../public', to: '/assets' }],
  previewHead: (head, options) => `
    <dialog> ${options.configType}</dialog>
    ${head}
    <style>
    @font-face {
    font-family: Noto Sans;
    src: url(${options.configType === 'DEVELOPMENT' ? '' : '/openbridge-webcomponents/storybook'}/assets/NotoSans.ttf);
    }
</style>
  `,
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}

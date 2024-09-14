import type { StorybookConfig } from '@storybook/react-vite';
import { withoutVitePlugins } from '@storybook/builder-vite';

const config: StorybookConfig = {
    stories: ['../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-actions',
        'storybook-css-modules',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    viteFinal: async (config) => ({
        ...config,
        plugins: await withoutVitePlugins(config.plugins, ['vite:dts']), // skip dts plugin
    }),
};
export default config;
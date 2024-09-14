/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import { join, extname, relative, resolve } from 'path'
import { fileURLToPath } from 'node:url'
import { peerDependencies } from './package.json';
import { glob } from 'glob';

export default defineConfig({
    plugins: [
        react(),
        libInjectCss(),
        dts({ rollupTypes: true }), // Output .d.ts files
    ],
    build: {
        target: 'esnext',
        minify: false,
        lib: {
            entry: resolve(__dirname, join('src', 'lib', 'index.ts')),
            fileName: 'index',
            formats: ['es'],
        },
        rollupOptions: {
            // Exclude peer dependencies from the bundle to reduce bundle size
            external: ['react', 'react/jsx-runtime', ...Object.keys(peerDependencies)],
            input: Object.fromEntries(
                glob.sync('src/lib/**/*.{ts,tsx}', {
                    ignore: ["src/lib/**/*.d.ts"],
                }).map(file => [
                    // The name of the entry point
                    // lib/nested/foo.ts becomes nested/foo
                    relative(
                        'src/lib',
                        file.slice(0, file.length - extname(file).length)
                    ),
                    // The absolute path to the entry file
                    // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
                    fileURLToPath(new URL(file, import.meta.url))
                ])
            ),
            output: {
                assetFileNames: 'assets/[name][extname]',
                entryFileNames: '[name].js',
            }
        },
    },
    test: {
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
    },
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dns from 'dns';
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
import commonjs from 'vite-plugin-commonjs';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  plugins: [
    react(),
    commonjs({
      filter(id) {
        if (['ckEditor5/build/ckeditor.js'].includes(id)) {
          return true;
        }
      },
    }),
  ],
  optimizeDeps: {
    include: ['ckeditor5-custom-build'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  build: {
    manifest: true,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
    minify: false,
    watch: {},
    outDir: '../web',
    commonjsOptions: { exclude: ['ckeditor5-custom-build'] },
    // emptyOutDir: true,
  },
});

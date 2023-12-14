// vite.config.ts
import { defineConfig } from "file:///C:/OpenServer/domains/kaizen-mini/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/OpenServer/domains/kaizen-mini/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import dns from "dns";
import { createRequire } from "node:module";
import commonjs from "file:///C:/OpenServer/domains/kaizen-mini/frontend/node_modules/vite-plugin-commonjs/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\OpenServer\\domains\\kaizen-mini\\frontend";
var __vite_injected_original_import_meta_url = "file:///C:/OpenServer/domains/kaizen-mini/frontend/vite.config.ts";
var require2 = createRequire(__vite_injected_original_import_meta_url);
dns.setDefaultResultOrder("verbatim");
var vite_config_default = defineConfig({
  plugins: [
    react(),
    commonjs({
      filter(id) {
        if (["ckEditor5/build/ckeditor.js"].includes(id)) {
          return true;
        }
      }
    })
  ],
  optimizeDeps: {
    include: ["ckeditor5-custom-build"]
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "@assets": path.resolve(__vite_injected_original_dirname, "./src/assets"),
      "@styles": path.resolve(__vite_injected_original_dirname, "./src/shared/ui/assets/styles")
    }
  },
  //чтобы заработало надо в etc/hosts добавить 127.0.0.1 kaizen-vite.borboza.com
  server: {
    host: "kaizen-vite.borboza.com",
    port: 80
  },
  build: {
    manifest: true,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    },
    minify: false,
    watch: {},
    outDir: "../web",
    commonjsOptions: { exclude: ["ckeditor5-custom-build"] }
    // emptyOutDir: true,
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxPcGVuU2VydmVyXFxcXGRvbWFpbnNcXFxca2FpemVuLW1pbmlcXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXE9wZW5TZXJ2ZXJcXFxcZG9tYWluc1xcXFxrYWl6ZW4tbWluaVxcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovT3BlblNlcnZlci9kb21haW5zL2thaXplbi1taW5pL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgZG5zIGZyb20gJ2Rucyc7XHJcbmltcG9ydCBja2VkaXRvcjUgZnJvbSAnQGNrZWRpdG9yL3ZpdGUtcGx1Z2luLWNrZWRpdG9yNSc7XHJcbmltcG9ydCB7IGNyZWF0ZVJlcXVpcmUgfSBmcm9tICdub2RlOm1vZHVsZSc7XHJcbmNvbnN0IHJlcXVpcmUgPSBjcmVhdGVSZXF1aXJlKGltcG9ydC5tZXRhLnVybCk7XHJcbmltcG9ydCBjb21tb25qcyBmcm9tICd2aXRlLXBsdWdpbi1jb21tb25qcyc7XHJcblxyXG5kbnMuc2V0RGVmYXVsdFJlc3VsdE9yZGVyKCd2ZXJiYXRpbScpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgY29tbW9uanMoe1xyXG4gICAgICBmaWx0ZXIoaWQpIHtcclxuICAgICAgICBpZiAoWydja0VkaXRvcjUvYnVpbGQvY2tlZGl0b3IuanMnXS5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBpbmNsdWRlOiBbJ2NrZWRpdG9yNS1jdXN0b20tYnVpbGQnXSxcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXHJcbiAgICAgICdAYXNzZXRzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2Fzc2V0cycpLFxyXG4gICAgICAnQHN0eWxlcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9zaGFyZWQvdWkvYXNzZXRzL3N0eWxlcycpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIC8vXHUwNDQ3XHUwNDQyXHUwNDNFXHUwNDMxXHUwNDRCIFx1MDQzN1x1MDQzMFx1MDQ0MFx1MDQzMFx1MDQzMVx1MDQzRVx1MDQ0Mlx1MDQzMFx1MDQzQlx1MDQzRSBcdTA0M0RcdTA0MzBcdTA0MzRcdTA0M0UgXHUwNDMyIGV0Yy9ob3N0cyBcdTA0MzRcdTA0M0VcdTA0MzFcdTA0MzBcdTA0MzJcdTA0MzhcdTA0NDJcdTA0NEMgMTI3LjAuMC4xIGthaXplbi12aXRlLmJvcmJvemEuY29tXHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiAna2FpemVuLXZpdGUuYm9yYm96YS5jb20nLFxyXG4gICAgcG9ydDogODAsXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgbWFuaWZlc3Q6IHRydWUsXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBgYXNzZXRzL1tuYW1lXS5qc2AsXHJcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6IGBhc3NldHMvW25hbWVdLmpzYCxcclxuICAgICAgICBhc3NldEZpbGVOYW1lczogYGFzc2V0cy9bbmFtZV0uW2V4dF1gLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIG1pbmlmeTogZmFsc2UsXHJcbiAgICB3YXRjaDoge30sXHJcbiAgICBvdXREaXI6ICcuLi93ZWInLFxyXG4gICAgY29tbW9uanNPcHRpb25zOiB7IGV4Y2x1ZGU6IFsnY2tlZGl0b3I1LWN1c3RvbS1idWlsZCddIH0sXHJcbiAgICAvLyBlbXB0eU91dERpcjogdHJ1ZSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwVCxTQUFTLG9CQUFvQjtBQUN2VixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sU0FBUztBQUVoQixTQUFTLHFCQUFxQjtBQUU5QixPQUFPLGNBQWM7QUFQckIsSUFBTSxtQ0FBbUM7QUFBNEosSUFBTSwyQ0FBMkM7QUFNdFAsSUFBTUEsV0FBVSxjQUFjLHdDQUFlO0FBRzdDLElBQUksc0JBQXNCLFVBQVU7QUFFcEMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsT0FBTyxJQUFJO0FBQ1QsWUFBSSxDQUFDLDZCQUE2QixFQUFFLFNBQVMsRUFBRSxHQUFHO0FBQ2hELGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsd0JBQXdCO0FBQUEsRUFDcEM7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUNwQyxXQUFXLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDakQsV0FBVyxLQUFLLFFBQVEsa0NBQVcsK0JBQStCO0FBQUEsSUFDcEU7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUVBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxVQUFVO0FBQUEsSUFDVixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxJQUNSLE9BQU8sQ0FBQztBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsaUJBQWlCLEVBQUUsU0FBUyxDQUFDLHdCQUF3QixFQUFFO0FBQUE7QUFBQSxFQUV6RDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInJlcXVpcmUiXQp9Cg==

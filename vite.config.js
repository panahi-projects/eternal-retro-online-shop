import { resolve, join } from "path";
import { defineConfig } from "vite";
import { readdirSync, statSync } from 'fs';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        ...getEntryPoints(__dirname, 'pages')
      },
    },
  },
});

function getEntryPoints(basePath, relativePath = '') {
    const entries = {};
    const files = readdirSync(join(basePath, relativePath));
  
    files.forEach((file) => {
      const fullPath = join(basePath, relativePath, file);
      const relativeFilePath = join(relativePath, file);
  
      if (statSync(fullPath).isDirectory()) {
        Object.assign(entries, getEntryPoints(basePath, relativeFilePath));
      } else if (file.endsWith('.html')) {
        entries[relativeFilePath.replace(/\.html$/, '')] = fullPath;
      }
    });
  
    return entries;
  }
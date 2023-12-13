import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { logDebug } from './src/utils/logDebug';


// https://vitejs.dev/config/
// const env = loadEnv(mode, process.cwd());
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());
  // logDebug("DIST ",env.VITE_DIST)
  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        output:{
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[0].toString();
                }
            }
        }
      },
      chunkSizeWarningLimit: 1600,
      outDir:env.VITE_DIST|| "dist",

      // outDir:"dist2",
      sourcemap: true,
    },
    server: {
      port: Number(env.VITE_SERVER_PORT) || 6002
    },
    preview: {
      port: Number(env.VITE_PREVIEW_PORT) || 6100
    },
    resolve: {
      alias: {
        // Add this line to resolve .html files
        './index.html': './index.js'
      }
    }
  };
});

// export default defineConfig({
  
//   server: {
//     port: Number(env.VITE_SERVER_PORT) || 6002
//   },
//   preview: {
//     port: Number(env.VITE_PREVIEW_PORT) || 6100
//   },
//   plugins: [react()],
// })

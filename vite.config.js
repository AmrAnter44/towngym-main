import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: {
        quality: 80,
      },
      png: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
    }),
  ],

  build: {
    // Target modern browsers for smaller bundles
    target: 'es2015',

    // Optimize CSS
    cssCodeSplit: true,

    // Source maps for production debugging (disabled for smaller builds)
    sourcemap: false,

    // Manual chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // React core libraries
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],

          // Animation library
          'vendor-animation': ['framer-motion'],

          // UI libraries
          'vendor-ui': ['react-slick', 'slick-carousel'],

          // Supabase backend
          'supabase': ['@supabase/supabase-js'],

          // FontAwesome
          'fontawesome': [
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/free-solid-svg-icons',
            '@fortawesome/react-fontawesome',
          ],

          // Map route components (group together)
          'map-routes': [
            './src/comp/Map/Men.jsx',
            './src/comp/Map/Ladies.jsx',
            './src/comp/Map/Cardio.jsx',
            './src/comp/Map/Weight.jsx',
            './src/comp/Map/Leg.jsx',
            './src/comp/Map/Fitness.jsx',
            './src/comp/Map/Spa.jsx',
            './src/comp/Map/Cables.jsx',
            './src/comp/Map/Machines.jsx',
            './src/comp/Map/Bar.jsx',
          ],
        },

        // Better file naming for caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },

    // Chunk size warning
    chunkSizeWarningLimit: 600,

    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
  },

  // Optimize deps
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      '@supabase/supabase-js',
    ],
  },

  // Server config for development
  server: {
    port: 5173,
    open: false,
  },
})

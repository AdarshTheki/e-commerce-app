import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/url1': 'https://full-stack-ecommerce-app-sq9o.onrender.com',
            '/url2': 'https://full-stack-ecommerce-api-pi.vercel.app',
        },
    },
    plugins: [react()],
});

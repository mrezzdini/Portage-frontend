import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';

export default ({ mode }) => {
    return defineConfig({
        plugins: [react(), Inspect()],
        define: {
            'process.env.NODE_ENV': `"${mode}"`,
        },
    });
};

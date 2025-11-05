import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; //调用vite提供的react插件

export default defineConfig({
  plugins: [react()],
});

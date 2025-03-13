import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    svgr()
  ],
  build: {

   /** If you set esmExternals to true, this plugins assumes that 
     all external dependencies are ES modules */

   commonjsOptions: {
      esmExternals: true 
   },
}
})


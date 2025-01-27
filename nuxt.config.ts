// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt'
  ],
  vite: {
    plugins:[
        tailwindcss(),
    ]
  },
  typescript: {
    typeCheck: true
  },
  css: [
    '@/assets/css/main.css'
  ],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})

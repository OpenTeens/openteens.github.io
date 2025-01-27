// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt'
  ],
  typescript: {
    strict: true,
    typeCheck: true
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})

import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    ['@nuxt/ui', {
      global: true
    }],
    '@nuxt/image',
    '@vueuse/nuxt',
    '@pinia/nuxt'
  ],
  colorMode: {
    preference: 'light'
  },
  ui: {
    icons: ['heroicons', 'simple-icons']
  },
  runtimeConfig: {
    github: {
      clientId: '',
      clientSecret: ''
    },
    session: {
      name: 'nuxt-session',
      password: ''
    }
  },
  experimental: { 
    appManifest: false 
  }
})

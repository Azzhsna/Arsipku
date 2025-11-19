// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],

  css: ['~/assets/css/main.css'],

  ui: {
    fonts: true,
    colorMode: false,
    theme: {
      colors: [
        'primary',
        'secondary',
        'warning',
        'error',
        'success',
        'neutral'
      ],
      transitions: false,
      defaultVariants: {
        color: 'neutral',
        size: 'sm'
      },
    },
    experimental: {
      componentDetection: ['Modal', 'Dropdown', 'Popover']
    }
  }
})
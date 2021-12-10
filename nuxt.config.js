export default {    

  target: 'static',
  
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Casa Pignataro | Panel de administración',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { property:"og:title", name:'twitter:title', content:"Casa Pignataro | Panel de administración" },
      { property:"og:image", name:'twitter:image', content:"https://casapignataro.com/logo.png" },
      { property:"og:type", content:"website" },
      { property:"og:url", content:"https://casapignataro.com" },
      { name:"twitter:card", content:"summary_large_image" },
      { property:"og:site_name", content:"Casa Pignataro" },
      { name:"twitter:image:alt", content:"El logo de casa pignataro. El texto \"Casa Pignataro\" en azul con borde blanco y \"electrodomesticos\" con letra mas chica y solo en blanco. Todo sobre un fondo rojo" },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;700&family=Tajawal:wght@400;700&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons&display=swap' },
    ]
  },

  server: {
    port: 3030,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/index.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://composition-api.nuxtjs.org/,
    '@nuxtjs/composition-api/module',
    // https://github.com/Developmint/nuxt-purgecss
    'nuxt-purgecss',
  ],
  
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://axios.nuxtjs.org/
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: process.env.BACKEND_URL,
  },

  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}

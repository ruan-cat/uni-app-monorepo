import process from 'node:process'
import { appDescription } from './app/constants/index'
import preload from './app/utils/preload'
import { currentLocales } from './i18n/i18n'

export default defineNuxtConfig({
  modules: [
    '@vant/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  css: [
    './app/styles/vars.css',
    './app/styles/global.css',
    './app/styles/default-theme.css',
  ],

  postcss: {
    plugins: {
      'autoprefixer': {},

      // https://github.com/wswmsword/postcss-mobile-forever
      'postcss-mobile-forever': {
        appSelector: '#__nuxt',
        viewportWidth: 375,
        maxDisplayWidth: 600,
        // devtools excluded
        exclude: /@nuxt/,
        border: true,
        // Need to convert fixed selector list
        rootContainingBlockSelectorList: [
          '.van-tabbar',
          '.van-popup',
          '.van-popup--bottom',
          '.van-popup--top',
          '.van-popup--left',
          '.van-popup--right',
        ],
      },
    },
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'nuxt-color-mode',
  },

  i18n: {
    locales: currentLocales,
    lazy: true,
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
    },
    langDir: 'locales',
    defaultLocale: 'zh-CN',
    // Reletive to the i18n directory
    vueI18n: './i18n.config.ts',

    bundle: {
      // https://github.com/nuxt-modules/i18n/issues/3238#issuecomment-2672492536
      optimizeTranslationDirective: false,
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#ffffff' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
      script: [
        { innerHTML: preload(), type: 'text/javascript', tagPosition: 'head' },
      ],
    },
  },

  vite: {
    build: {
      target: 'esnext',
    },
    optimizeDeps: {
      include: [
        '@intlify/core-base',
        '@intlify/shared',
      ],
    },
  },

  experimental: {
    typedPages: true,
  },

  devtools: {
    enabled: true,
  },

  typescript: {
    shim: false,
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-09-24',
})

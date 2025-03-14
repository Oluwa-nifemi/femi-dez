import {apiEndpoint, repositoryName} from "./slicemachine.config.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {enabled: true},
  modules: ["@nuxtjs/prismic", "@nuxtjs/tailwindcss", '@nuxtjs/color-mode', 'nuxt-svgo'],

  prismic: {
    endpoint: apiEndpoint || repositoryName
  },
  routeRules: {
    '/': {prerender: true},
    '/about': {prerender: true},
    '/colophon': {prerender: true},
    '/visuals': {prerender: true},
    '/work': {prerender: true},
    '/work/**': {prerender: true},
    '/catalogue': {prerender: true},
    '/catalogue/**': {prerender: true},
  }
})
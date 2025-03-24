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
    '/about': { isr: 300 }, // refresh data every 5 minutes
    '/colophon': {prerender: true},
    '/visuals': {prerender: true},
    '/work': {prerender: true},
    '/work/**': {prerender: true},
    '/catalogue': {prerender: true},
    '/catalogue/**': {prerender: true},
  },
  runtimeConfig: {
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    spotifyRefreshToken: process.env.SPOTIFY_REFRESH_TOKEN
  }
})
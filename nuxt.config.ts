import {apiEndpoint, repositoryName} from "./slicemachine.config.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {enabled: true},
  modules: ["@nuxtjs/prismic", "@nuxtjs/tailwindcss", '@nuxtjs/color-mode', 'nuxt-svgo'],
  experimental: {
    viewTransition: true
  },
  prismic: {
    endpoint: apiEndpoint || repositoryName
  },
  routeRules: {
    '/': {prerender: true},
    '/about': { isr: 180 }, // refresh data every 3 minutes
    '/colophon': {prerender: true},
    '/visuals': {prerender: true},
    '/work': {prerender: true},
    '/catalogue': {prerender: true},
  },
  hooks: {
    async "prerender:routes"(ctx) {
      const { createClient } = await import('@prismicio/client')
      const sm = await import('./slicemachine.config.json')
      const client = createClient(sm.apiEndpoint || sm.repositoryName)

      const workDocs = await client.getAllByType('work')
      const catalogueDocs = await client.getAllByType('catalog')

      for (const doc of workDocs) {
        ctx.routes.add(`/work/${doc.uid}`)
      }

      for (const doc of catalogueDocs) {
        ctx.routes.add(`/catalogue/${doc.uid}`)
      }
    }
  },
  runtimeConfig: {
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    spotifyRefreshToken: process.env.SPOTIFY_REFRESH_TOKEN
  }
})
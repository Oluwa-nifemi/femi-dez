export default {
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        gray: 'var(--gray)',
        background: 'var(--background)',
        red: 'var(--red)',
      }
    }
  },
  "content": {
    "files": [
      "components/**/*.{vue,js,jsx,mjs,ts,tsx}",
      "layouts/**/*.{vue,js,jsx,mjs,ts,tsx}",
      "pages/**/*.{vue,js,jsx,mjs,ts,tsx}",
      "plugins/**/*.{js,ts,mjs}",
      "composables/**/*.{js,ts,mjs}",
      "utils/**/*.{js,ts,mjs}",
      "{A,a}pp.{vue,js,jsx,mjs,ts,tsx}",
      "{E,e}rror.{vue,js,jsx,mjs,ts,tsx}",
      "app.config.{js,ts,mjs}",
      "app/spa-loading-template.html",
      "slices/**/*.{vue,js,jsx,mjs,ts,tsx}",
    ]
  },
}
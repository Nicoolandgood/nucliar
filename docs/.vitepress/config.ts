import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Nucliar",
  description: "Command-line tool to generate React components.",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Guide', link: '/guide' },
          { text: 'Commands', link: '/commands' },
          { text: 'API', link: '/api' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Nicoolandgood/nucliar' }
    ],

  }
})

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL || 'https://ikejay-code.github.io',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  devToolbar: { enabled: false },
  markdown: { shikiConfig: { theme: 'github-dark', wrap: true } },
});

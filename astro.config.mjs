import { defineConfig } from 'astro/config';
import { existsSync } from 'node:fs';

if (existsSync('.env')) process.loadEnvFile('.env');
if (process.env.SITE_PRODUCTION === 'true' && !process.env.SITE_URL) {
  throw new Error('SITE_URL must be confirmed and set for a production build');
}
const site = new URL(process.env.SITE_URL || 'https://www.nakaatsu.com');
if (
  site.protocol !== 'https:' ||
  site.username ||
  site.password ||
  site.pathname !== '/' ||
  site.search ||
  site.hash
) {
  throw new Error(
    'SITE_URL must be an HTTPS origin without credentials, path, query or fragment',
  );
}

// 本番ホストはDNS・リダイレクト確認後にSITE_URLで指定する。
export default defineConfig({
  outDir: process.env.SITE_TEST_FIXTURES === '1' ? './dist-test' : './dist',
  site: site.href,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
});

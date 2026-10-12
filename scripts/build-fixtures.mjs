import { spawnSync } from 'node:child_process';
const result = spawnSync(
  process.execPath,
  ['node_modules/astro/bin/astro.mjs', 'build'],
  {
    stdio: 'inherit',
    env: { ...process.env, SITE_TEST_FIXTURES: '1', SITE_PRODUCTION: 'false' },
  },
);
if (result.status !== 0) process.exit(result.status ?? 1);
const verification = spawnSync(process.execPath, ['scripts/verify-build.mjs'], {
  stdio: 'inherit',
  env: { ...process.env, SITE_TEST_FIXTURES: '1', SITE_PRODUCTION: 'false' },
});
process.exit(verification.status ?? 1);

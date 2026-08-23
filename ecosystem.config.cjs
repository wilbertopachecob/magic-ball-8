/**
 * PM2 process file for production (`serve dist`).
 * Run `npm run build` once before `pm2 start ecosystem.config.cjs`.
 * Default `PORT` is 3008 so it can run beside other sites on the same host.
 */
module.exports = {
  apps: [
    {
      name: 'magic-ball-8',
      script: 'npx',
      args: 'serve -s dist -l 3008',
      cwd: process.cwd(),
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3008,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3008,
      },
    },
  ],
};

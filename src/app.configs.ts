export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT || '3000', 10),
  },

  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },
});

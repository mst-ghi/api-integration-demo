export default () => ({
  // Apps configuration
  app: {
    port: parseInt(process.env.APP_PORT || '3000', 10),
  },
});

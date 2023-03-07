const configuration = () => ({
  mongodb: {
    uri: process.env.MONGO_URL,
    projection: { __v: 0 },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: 6379,
    ttl: 30,
  },
});

export type EnvironmentVariables = ReturnType<typeof configuration>;

export default configuration;

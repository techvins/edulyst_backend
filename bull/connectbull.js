import Bull from 'bull';

// Redis configuration for Bull, using environment variables
export const createQueue = (name) => {
  return new Bull(name, {
    redis: {
      host: process.env.REDIS_HOST || 'redis',
      port: process.env.REDIS_PORT || 6379,
      db: process.env.REDIS_DB || 6,  // Use Redis DB 0 by default, or specify in .env
    },
  });
};


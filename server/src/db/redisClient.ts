// redisClient.ts (TypeScript)
import { createClient } from 'redis';

const redisClient = createClient({
  socket: {
    host: '',  // e.g., redis-12345.c99.us-east-1-2.ec2.cloud.redislabs.com
    port: 
  },
  password: ''
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  await redisClient.connect();
  console.log('Connected to Redis Cloud!');
})();

export default redisClient;


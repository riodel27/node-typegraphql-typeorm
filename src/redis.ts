import Redis from "ioredis";

/**redis client */
/**possible to connect to another redis in which other server it is running */
export const redis = new Redis();
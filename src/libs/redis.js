import redis from 'redis'
import redisDelWild from 'redis-delete-wildcard'

redisDelWild(redis)

let redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
})

export default redisClient

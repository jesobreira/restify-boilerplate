import redisLock from 'redis-lock'
import { promisify } from 'util'
import client from '@lib/redis'

const LOCK_TIMEOUT = 15000
const LOCK_RETRY = 10

const setLock = promisify(redisLock(client, LOCK_RETRY))

function lock(lockname) {
  if (Array.isArray(lockname))
    lockname = lockname.join(":")

  return setLock('biz:' + lockname, LOCK_TIMEOUT)
}


export default lock

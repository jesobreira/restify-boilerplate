import CachemanRedis from 'cacheman-redis'
import client from '@lib/redis'

let cacheman = new CachemanRedis(client)

let cache = {
  /**
   * Set an entry.
   *
   * @param {String} key
   * @param {Mixed} val
   * @param {Number} ttl
   */
  "set": function() {
    let args = arguments
    if (typeof args[0] === 'object')
        args[0] = args[0].join(":").replace(/(\:?)$/, '')

    args[0] = 'biz:' + args[0]

    return new Promise((resolve, reject) => {
      cacheman.set.apply(cacheman, [...args, (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      }])
    })
  },

  /**
   * Delete an entry (wildcards supported).
   *
   * @param {String} key
   * @api public
   */
  "get": function() {
    let args = arguments
    if (typeof args[0] === 'object')
        args[0] = args[0].join(":").replace(/(\:?)$/, '')

    args[0] = 'biz:' + args[0]

    return new Promise((resolve, reject) => {
      cacheman.get.apply(cacheman, [...args, (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      }])
    })
  },

  /**
   * Delete an entry (wildcards NOT supported).
   *
   * @param {String} key
   * @api public
   */
  "del": function() {
    let args = arguments
    if (typeof args[0] === 'object')
        args[0] = args[0].join(":").replace(/(\:?)$/, '')

    args[0] = 'biz:' + args[0]

    return new Promise((resolve, reject) => {
      cacheman.del.apply(cacheman, [...args, (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      }])
    })
  },

  /**
   * Delete an entry (wildcards supported).
   *
   * @param {String} key
   * @api public
   */
  "delWild": function() {
    let args = arguments
    if (typeof args[0] === 'object')
        args[0] = args[0].join(":").replace(/(\:?)$/, '')

    args[0] = 'biz:' + args[0]

    return new Promise((resolve, reject) => {
      client.delwild.apply(client, [...args, (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      }])
    })
  },

  /**
   * Clear all entries in cache.
   *
   * @api public
   */
  "clear": function() {
    let args = arguments
    return new Promise((resolve, reject) => {
      cacheman.clear.apply(cacheman, [...args, (err, res) => {
        if (err)
          reject(err)
        else
          resolve(res)
      }])
    })
  }
}

export default cache

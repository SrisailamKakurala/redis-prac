const { Redis } = require('ioredis');

const redis = new Redis() // hits port 6379 by default

module.exports = redis;
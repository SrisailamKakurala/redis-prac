const { Redis } = require('ioredis');

const client = new Redis() // hits port 6379 by default

module.exports = client;
const mongoose = require("mongoose");
const Redis = require("ioredis");
const client = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSW,
  username: process.env.REDIS_USERNAME
});

module.exports = {
  clearKey(hashKey) {
    client.del(hashKey);
  },
  async get(hashKey, key) {
    const cacheValue = await client.get(hashKey);
    
    if (cacheValue) {
      const doc = JSON.parse(cacheValue);

      return doc;
    }

    return undefined;
  },
  applyCache() {
    const exec = mongoose.Query.prototype.exec;

    mongoose.Query.prototype.cache = function (options = { time: 60 }) {
      this.useCache = true;
      this.time = options.time;
      this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name);

      return this;
    };
    Array.prototype.cache = function ({ key, time = 60, expire = true }) {
      client.set(key, JSON.stringify(this));

      if (expire)
        client.expire(key, time);

      return this;
    }
    mongoose.Query.prototype.exec = async function () {
      if (!this.useCache) {
        return await exec.apply(this, arguments);
      }

      const key = JSON.stringify({
        ...this.getQuery()
      });

      const cacheValue = await client.hGet(this.hashKey, key);

      if (cacheValue) {
        const doc = JSON.parse(cacheValue);

        console.log("Response from Redis");
        return Array.isArray(doc)
          ? doc.map(d => new this.model(d))
          : new this.model(doc);
      }

      const result = await exec.apply(this, arguments);
      console.log(this.time);
      await client.hSet(this.hashKey, key, JSON.stringify(result));
      client.expire(this.hashKey, this.time);

      console.log("Response from MongoDB");

      return result;
    };
  }
};
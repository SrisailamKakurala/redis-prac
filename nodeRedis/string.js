const express = require('express');
const Redis = require('ioredis'); // Redis library
const app = express();

// Initialize Redis client
const redis = new Redis(); // Defaults to localhost:6379

// Middleware for caching
const cacheMiddleware = async (req, res, next) => {
  const key = req.originalUrl; // Use the request URL as the cache key
  const cachedData = await redis.get(key); // Check if data is in cache

  if (cachedData) {
    console.log('Cache hit'); // Debug message
    return res.status(200).send(JSON.parse(cachedData)); // Serve cached data
  }

  console.log('Cache miss'); // Debug message
  // Save the original send method
  res.sendResponse = res.send;
  res.send = async (body) => {
    await redis.set(key, JSON.stringify(body), 'EX', 3600); // Cache data for 1 hour
    res.sendResponse(body); // Send the original response
  };
  next();
};

// Simulate fetching data from a database
const fetchFromDatabase = async () => {
  return { message: 'Hello, this data is from the database!' };
};

// Route with caching
app.get('/api/data', cacheMiddleware, async (req, res) => {
  const data = await fetchFromDatabase(); // Fetch data
  res.send(data); // Send data to the client
});

// Start the Express server
const PORT = 3000; // Define the port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

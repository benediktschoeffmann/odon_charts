import rateLimiter from 'express-rate-limit';

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  statusCode: 429,
  max: 100,
  message: 'Too many requests, please try again later.'
});

export default limiter
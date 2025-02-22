const promClient = require('prom-client');
const requestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});
const latencyHistogram = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Latency of HTTP requests in seconds',
  labelNames: ['method', 'route'],
});

module.exports = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    requestCounter.inc({ method: req.method, route: req.path, status: res.statusCode });
    latencyHistogram.observe({ method: req.method, route: req.path }, duration);
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}s`);
  });
  next();
};
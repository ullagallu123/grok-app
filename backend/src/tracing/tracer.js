const { initTracer } = require('jaeger-client');
const config = {
  serviceName: 'nodejs-backend',
  sampler: { type: 'const', param: 1 },
  reporter: { collectorEndpoint: 'http://localhost:14268/api/traces' },
};
const tracer = initTracer(config);
module.exports = tracer;
const promClient = require('prom-client');
const express = require('express');
const router = express.Router();

router.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

module.exports = router;
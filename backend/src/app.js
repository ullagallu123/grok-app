const express = require('express');
const logger = require('./middleware/logger');
const taskRoutes = require('./routes/taskRoutes');
const prometheusRouter = require('../prometheus');

const app = express();
app.use(express.json());
app.use(logger);
app.use('/api', taskRoutes);
app.use(prometheusRouter);

module.exports = app;
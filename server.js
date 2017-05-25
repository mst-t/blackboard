// Get dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Connect to MongoDB
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/blackboard');

// Get our API routes
const appRoutes = require('./routes/app');
const apiRoutes = require('./routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static('./dist'));

// Set our api routes
app.use('/api.messages', apiRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    return res.sendFile('./dist/index.html');
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port, () => console.log(`API running on localhost:${port}`));

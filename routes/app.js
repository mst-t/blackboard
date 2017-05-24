const express = require('express');
const router = express.Router();

const path = require('path');

router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

module.exports = router;

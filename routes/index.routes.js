const express = require('express');
const router = express.Router();

// Attach the routers for their respective paths
router.use('/api/v1/posts', require('./post.routes.js'));

module.exports = router;

const router = require('express').Router();
const forumRoutes = require('./forum-routes');

router.use('/fourms', forumRoutes);

module.exports = router;
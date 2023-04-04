const router = require('express').Router();
const forumRoutes = require('./forum-routes');
const commentRoutes = require('./comment-routes');

router.use('/fourms', forumRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
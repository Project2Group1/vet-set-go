const router = require('express').Router();

const forumRoutes = require('./forum-routes');
const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes');

router.use('/forums', forumRoutes);
router.use('/comments', commentRoutes);
router.use('/users', userRoutes);

module.exports = router;
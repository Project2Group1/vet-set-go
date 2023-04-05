const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utis/auth');

// route to get all comments
router.get('/', async (req, res) => {
	try {
		const commentData = await Comments.findAll({
			include: [{ model: Users, attributes: ['firstName', 'lastName']}],
		});
		res.status(200).json(commentData)
	} catch (err) {
		res.status(500).json(err);
	}
});

// post route to create new comments
router.post('/', async (req, res) => {
  try {
    const newComment = await Comments.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
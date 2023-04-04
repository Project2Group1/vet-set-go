const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// route to get all comments
router.get('/:id', withAuth, async (req, res) => {
	try {
		const commentData = await Comments.findByPk(req.params.id, {
			include: [{ model: Users, attributes: ['firstName', 'lastName']}],
		});
		if (!commentData) {
			res.status(404).json({ message: 'Sorry, that comment is not available.' });
			return;
		}
		res.status(200).json(commentData)
	} catch (err) {
		res.status(500).json(err);
	}
});


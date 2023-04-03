const router = require('express').Router();
const { Topics } = require('../../models');
const withAuth = require('../../utis/auth');

router.get('/', withAuth, async (req, res) => {
	try {
		const topicsData = await Topics.findAll({
			include: [{ model: Users, attributes: ['firstName', 'lastName']}],
		});
		
		const topics = topicsData.map((post) => post.get({
			plain: true
		}));

		res.render('forum', {
			topics,
			logged_in: req.session.logged_in
		});

	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', withAuth, async (req, res) => {
	try {
		const topicData = await Topics.findByPk(req.params.id, {
			include: [
				{ model: Users, 
					attributes: ['firstName', 'lastName']
				},
				{
					model: Comments,
					include: [User]
				}
			],
		});

		if (!topicData) {
			res.status(404).json({ message: 'Sorry, that post is not available.'});
			return;
		}

		const topic = topicData.get({
			plain: true
		});

		res.render('post', {
			...post,
			logged_in: req.session.logged_in,
		});

	} catch (err) {
		res.status(500).json(err);
	}
});


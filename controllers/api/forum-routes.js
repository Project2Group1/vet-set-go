const router = require('express').Router();
const { Topics, Users } = require('../../models');
const withAuth = require('../../utis/auth');

// get route to find all posts created
router.get('/', async (req, res) => {
	try {
		const topicsData = await Topics.findAll({
			include: [{ model: Users, attributes: ['firstName', 'lastName']}],
		});
	

		const topics = topicsData.map((post) => post.get({
			plain: true
		}));

		res.render('forums', {
			topics,
		});

	} catch (err) {
		res.status(500).json(err);
	}
});

// get route to find a post with a specific ID
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

		res.render('topic', {
			...topic,
			loggedIn: req.session.loggedIn,
		});

	} catch (err) {
		res.status(500).json(err);
	}
});

// post route to create a new topic
router.post('/', withAuth, async (req, res) => {
	try {
		const newTopic = await Topics.create({
			...req.body,
			user_id: req.session.user_id,
		});
		res.status(200).json(newTopic)
	} catch (err) {
		res.status(500).json(err);
	}
});

// delete route for deleting topics
router.delete('/:id', withAuth, async (req, res) => {
	try {
    const topicData = await Topics.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!topicData) {
        res.status(404).json({ message: "Sorry, that post is not available." });
    }
    res.status(200).json(topicData);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
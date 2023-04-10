const router = require('express').Router();
const session = require('express-session');
const withAuth = require('../../utils/auth');
const { Users, Pets, Records } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await Users.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id;
      res.status(200).json(dbUserData);
    });

    console.log(req.session)

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET the user's profile
router.get('/profile', withAuth, async (req, res) => {
  try {
    const profileData = await Users.findByPk(req.session.user_id, {
      include: [{ model: Pets }],
    });

    const petData = await Pets.findAll({
      where: {
        owner_id: req.session.user_id,
      }
    });

    const profile = profileData.get({ plain: true });
    const pets = petData.map((pet) =>
      pet.get({ plain: true })
    );

    res.render('profile', {
      profile,
      pets,
      loggedIn: req.session.loggedIn,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// GET pet's records
router.get('/profile/pets/:id', withAuth, async (req, res) => {
  try {
    const recordsData = await Records.findAll({
      where: {
        pet_id: req.params.id,
      }
    });

    const petsData = await Pets.findAll({
      where: {
        id: req.params.id,
      }
    })

    res.status(200).json({
      records: recordsData[0],
      petDetails: petsData[0] 
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
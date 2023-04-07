const router = require('express').Router();
const { Pets } = require('../../models');

// CREATE new pet profile
router.post('/', async (req, res) => {
    try {
        const petData = await Pets.create({
            owner_id: req.session.user_id,
            name: req.body.name,
            birthday: req.body.birthday,
            petType: req.body.petType,
            breed: req.body.breed,
            sex: req.body.sex,
            vaccinated: req.body.vaccinated,
            isNeuteredOrSpayed: req.body.isNeuteredOrSpayed,
            allergies: req.body.allergies,
        });

        res.status(200).json(petData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
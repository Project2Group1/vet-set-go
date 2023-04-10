const router = require('express').Router();
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const { Pets } = require('../../models');
const path = require('path')

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

// UPLOAD a new pet photo
router.put('/photo', async (req, res) => {
    try {
        let fileExtension = path.extname(req.files.file.name)
        let fileUUID = uuidv4() + fileExtension
        let uploadPath = __dirname + '/../../public/images/uploads/' + fileUUID;

        req.files.file.mv(uploadPath, async function (err) {
            if (err)
                return res.status(500).send(err);
            await Pets.update(
                {
                    photoURL: fileUUID,
                },
                {
                    where: {
                        id: req.body.petId,
                    }
                }
            )
            const updatedPet = await Pets.findByPk(req.body.petId)

            res.status(200).json(updatedPet);
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;
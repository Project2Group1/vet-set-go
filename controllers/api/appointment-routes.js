const router = require("express").Router();
const { Appointments } = require("../../models");

// CREATE new appointment
router.post("/", (req, res) => {
  try {
    Appointments.create({
      user_id: req.body.user_id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      pet_name: req.body.pet_name,
      petType: req.body.species,
      breed: req.body.breed,
      allergies: req.body.allergies,
      vaccinated: req.body.vaccinated,
      birthday: req.body.birthday,
      isNeuteredOrSpayed: req.body.spayNeutered,
      sex: req.body.sex,
      concern: req.body.concern,
    });

    // Appointment can be sent to client administratives
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require("express").Router();
const { Appointments, Users, Pets } = require("../../models");

// CREATE new appointment
router.post("/", async (req, res) => {
  // If the appointment is for an existing user
  if (req.body.isUser) {
    const userData = await Users.findByPk(req.session.user_id);
    const petData = await Pets.findOne({
      where: {
        owner_id: userData.id,
        name: req.body.pet_name,
      },
    });

    try {
      const newAppointment = await Appointments.create({
        user_id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        pet_name: petData.name,
        petType: petData.petType,
        breed: petData.breed,
        allergies: petData.allergies,
        vaccinated: petData.vaccinated,
        birthday: petData.birthday,
        isNeuteredOrSpayed: petData.isNeuteredOrSpayed,
        sex: petData.sex,
        concern: req.body.concern,
      });

      res.status(200).json(newAppointment);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    // If the appointment is for a guest
    try {
      const newAppointment = await Appointments.create({
        user_id: null,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        pet_name: req.body.pet_name,
        petType: req.body.petType,
        breed: req.body.breed,
        allergies: req.body.allergies,
        vaccinated: req.body.vaccinated,
        birthday: req.body.birthday,
        isNeuteredOrSpayed: req.body.isNeuteredOrSpayed,
        sex: req.body.sex,
        concern: req.body.concern,
      });

      res.status(200).json(newAppointment);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

module.exports = router;

const router = require("express").Router();
const { Appointments } = require("../../models");

// GET guest appointment page
router.get("/guest-appointment", async (req, res) => {
  try {
    res.render("guest-appointment");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET client appointment page
router.get("/client-appointment", async (req, res) => {
  try {
    res.render("client-appointment");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET Login route
router.get("/login", (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

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

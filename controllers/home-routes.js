const router = require("express").Router();
const { Users, Pets } = require("../models");

// GET the homepage
router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET the new user form after signing up
router.get("/new-pet-form", async (req, res) => {
  try {
    res.render("new-pet-form", {
      loggedIn: req.session.loggedIn,
    });
  } catch {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// GET the contact page
router.get("/contact", async (req, res) => {
  try {
    res.render("contact", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET the client appointments page with current user
router.get("/client-appointment", async (req, res) => {
  try {
    const userData = await Users.findByPk(req.session.user_id, {
      include: [{ model: Pets }],
    });
    const currentUser = userData.get({ plain: true });
    // Send over the current user to appointments page
    res.render("client-appointment", {
      currentUser,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET guest appointment page
router.get("/guest-appointment", async (req, res) => {
  try {
    res.render("guest-appointment", { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET the appointment page
router.get("/appointment", async (req, res) => {
  try {
    res.render("appointment-gate", { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get booked page after completing appointment form
router.get("/booked", async (req, res) => {
  try {
    res.render("booked", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

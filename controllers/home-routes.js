const router = require("express").Router();

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

// Logout route
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// GET the contact page
router.get("/contact", async (req, res) => {
  try {
    res.render("contact");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET the client appointments page
router.get("/client-appointment", async (req, res) => {
  try {
    res.render("client-appointment", {
      user_id: req.session.user_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET guest appointment page
router.get("/guest-appointment", async (req, res) => {
  try {
    res.render("guest-appointment");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET the appointment page
router.get("/appointment", async (req, res) => {
  try {
    res.render("appointment-gate", {
      user_id: req.session.user_id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require("express").Router();

const forumRoutes = require("./forum-routes");
const commentRoutes = require("./comment-routes");
const userRoutes = require("./user-routes");
const appointmentRoutes = require("./appointment-routes");
const petsRoutes = require("./pets-routes");

router.use("/forums", forumRoutes);
router.use("/comments", commentRoutes);
router.use("/appointment", appointmentRoutes);
router.use("/users", userRoutes);
router.use("/pets", petsRoutes);

module.exports = router;

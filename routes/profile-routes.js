const router = require("express").Router();

// if not authenticated, redirect to another page
const authCheck = (req, res, next) => {
  if (!req.user) {
    // if user is not logged in
    res.redirect("/auth/login");
  } else {
    // if logged in
    next();
  }
};

router.get("/", authCheck, (req, res) => {
  res.render("profile", {user: req.user});
});

module.exports = router;

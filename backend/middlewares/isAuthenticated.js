const passport = require("passport");

const isAuthenticated = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    if (error || !user) {
      return res.status(401).json({
        message: info ? info.message : "Login required, no token found",
        error: error ? error.message : undefined,
      });
    }

    req.user = user._id;
    req.user.role = user.role

    return next();
  })(req, res, next);
};

module.exports = isAuthenticated;

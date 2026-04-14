const User = require("../models/userSchema");

exports.isAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("User is authenticated");
    return next();
  } else {
    console.log("User is not authenticated");
    return res.status(401).json({ message: "User is not authenticated" });
  }
};
// Update your isAdmin middleware to check if the user is an admin
exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && (req.user.role === 'admin' || req.user.role === 'sub-admin' || req.user.role === 'instructor')) {
    return next();
  } else {
    res.status(403).json({ message: 'Permission denied' });
  }
};


exports.authUser = function (req, res) {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    // User is authenticated
    res.status(200).json({ authenticated: true, user:req.user });
  } else {
    // User is not authenticated
    res.status(401).json({ authenticated: false });
  }
};

exports.isInstructor = (req, res, next) => {
  if (req.isAuthenticated() && (req.user.role === 'admin' || req.user.role === 'instructor' || req.user.role === 'sub-admin')) {
    return next();
  } else {
    res.status(403).json({ message: 'Permission denied' });
  }
};

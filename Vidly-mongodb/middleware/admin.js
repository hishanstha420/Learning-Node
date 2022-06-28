module.exports = function (req, res, next) {
  //401 UnAuthorized
  //forbidden
  if (!req.user.isAdmin)
    return res.status(401).send("Access denied. Admin privileges required.");

  next();
};

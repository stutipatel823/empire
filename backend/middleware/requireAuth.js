const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const requireAuth = async (req, res, next) => {
  // Verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // Get token from authorization
  const token = authorization.split(" ")[1]; // 'Bearer <token>'
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    const user = await UserModel.findOne({ _id }).select('_id');

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user; // Assign the user to the request object
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;


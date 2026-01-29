const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    // 1. Token ko verify aur decode karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2. Database se user dhoondo (ID decoded token se milegi)
    // .select("-password") taake security bani rahe
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) return res.status(404).json({ message: "User not found" });

    next(); // Agle step (Controller) par jao
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = protect
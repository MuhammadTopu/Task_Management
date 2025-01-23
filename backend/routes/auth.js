const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Get the token from the Authorization header

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, "ttooppuu"); // Verify the token using your secret key
        req.user = verified; // Attach user info to the request object
        next(); // Proceed to the next middleware or route
    } catch (error) {
        res.status(403).json({ message: "Invalid token." });
    }
};

module.exports = verifyToken;

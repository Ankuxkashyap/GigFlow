import jwt from "jsonwebtoken";
import User from "../model/User.model.js";

 const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

const isClient = (req, res, next) => {
    if (req.user.role === "client") {
        next();
    } else {
        return res.status(403).json({ message: "Forbidden" });
    }
};

const isFreelancer = (req, res, next) => {
    if (req.user.role === "freelancer") {
        next();
    } else {
        return res.status(403).json({ message: "Forbidden" });
    }
};

export  { isClient, isFreelancer, authMiddleware};
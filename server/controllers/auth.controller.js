import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../../config/config.js";
import bcrypt from "bcrypt";

const signin = async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {    
            return res.status(401).json({
                error: "User not found",
            });
        }

        if (!(await bcrypt.compare(req.body.password, user.hashed_password))) {
            return res.status(401).json({
                error: "Email and password do not match",
            });
        }

        const token = jwt.sign(
            { _id: user._id },
            config.jwtSecret
        );

        res.cookie("t", token, {
            expire: new Date() + 9999,
        });

        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (err) {

        return res.status(401).json({
            error: "Could not sign in",
        });

    }

};

const signout = (req, res) => {

    res.clearCookie("t");
    return res.status(200).json({
        message: "Signed out successfully",
    });

};

const requireSignin = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Authorization required",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.auth = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            error: "Invalid or expired token",
        });
    }

};

const requireAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.auth._id);

        if (!user || user.role !== "admin") {
            return res.status(403).json({
                error: "Administrator access required"
            });
        }

        next();
    }   catch (err) {
        return res.status(403).json({
            error: "Administrator access required"
        });
    }
};

export default {
    signin,
    signout,
    requireSignin,
    requireAdmin,
};

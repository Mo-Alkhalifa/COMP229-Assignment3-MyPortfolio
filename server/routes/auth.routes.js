import express from "express";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/auth/signin")
    .post(authCtrl.signin);

router.route("/auth/signout")
    .get(authCtrl.signout);

router.route("/api/protected")
    .get(authCtrl.requireSignin, (req, res) => {
        res.json({
            message: "Protected route accessed successfully!",
            auth: req.auth
        });
    });

export default router;





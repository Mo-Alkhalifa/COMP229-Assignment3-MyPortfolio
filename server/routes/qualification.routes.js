import express from "express";
import qualificationCtrl from "../controllers/qualification.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/api/qualifications")
  .post(authCtrl.requireSignin, authCtrl.requireAdmin, qualificationCtrl.create)
  .get(qualificationCtrl.list)
  .delete(authCtrl.requireSignin, authCtrl.requireAdmin, qualificationCtrl.removeAll);

router.param("qualificationId", qualificationCtrl.qualificationByID);

router.route("/api/qualifications/:qualificationId")
  .get(qualificationCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.requireAdmin, qualificationCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.requireAdmin, qualificationCtrl.remove);

export default router;


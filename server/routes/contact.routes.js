import express from "express";
import contactCtrl from "../controllers/contact.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/api/contacts")
  .post(contactCtrl.create)
  .get(authCtrl.requireSignin, authCtrl.requireAdmin, contactCtrl.list)
  .delete(authCtrl.requireSignin, authCtrl.requireAdmin, contactCtrl.removeAll);

router.param("contactId", contactCtrl.contactByID);

router.route("/api/contacts/:contactId")
  .get(authCtrl.requireSignin, authCtrl.requireAdmin, contactCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.requireAdmin, contactCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.requireAdmin, contactCtrl.remove);

export default router;


import express from "express" ;
import { applyscholarship,getAppliedscholarships,getApplicants } from "../controllers/application.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
const router =express.Router();
 
router.route("/apply/:id").get(isAuthenticated,applyscholarship);
router.route("/get").get(isAuthenticated,getAppliedscholarships);
router.route("/:id/applicants").get(isAuthenticated,getApplicants);

export default router;
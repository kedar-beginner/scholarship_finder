import express from "express"
import {postscholarship,getAllscholarships,getscholarshipById,getAdminscholarships} from "../controllers/scholarship.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { get } from "mongoose";
const router =express.Router();

router.route("/post").post(isAuthenticated,postscholarship);
router.route("/get").get(isAuthenticated,getAllscholarships);
router.route("/getadminscholarships").get(isAuthenticated,getAdminscholarships);
router.route("/get/:id").get(isAuthenticated,getscholarshipById);

export default router;
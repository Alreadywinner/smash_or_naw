import express from "express";
import {
  authUser,
  fetchAllAds,
  fetchAllPosts,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/posts").get(protect, fetchAllPosts);
router.route("/ads").get(protect, fetchAllAds);

export default router;

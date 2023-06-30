import express from "express";
import {
  authUser,
  fetchAllAds,
  fetchAllPosts,
  logoutUser,
  registerUser,
  fetchAllComments,
  addNewComment,
  deleteComment,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/posts").get(protect, fetchAllPosts);
router.route("/ads").get(protect, fetchAllAds);
router.route("/comments").get(protect, fetchAllComments);
router.route("/comments").post(protect, addNewComment);
router.route("/comments").delete(protect, deleteComment);

export default router;

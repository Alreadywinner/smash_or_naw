import express from "express";
import {
  addAds,
  addPost,
  adminLogin,
  adminLogout,
  deletePost,
  editPost,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout", adminLogout);
router.route("/post").post(protect, addPost);
router.route("/post").patch(protect, editPost);
router.route("/post").delete(protect, deletePost);
router.route("/ad").post(protect, addAds);

export default router;

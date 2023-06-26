import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";
import Post from "../model/postModel.js";
import Ad from "../model/adModel.js";

// @desc    Login admin user
// @route   POST /api/admin/login
// @access  Public
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, user_type: "admin" });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      user_type: user.user_type,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    logout user
// @route   POST /api/admin/logout
// @access  Public
const adminLogout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(200).json({ message: "Admin Logged Out" });
});

// @desc    Add posts
// @route   POST /api/admin/post
// @access  Private
const addPost = asyncHandler(async (req, res) => {
  const { post_name, posts_data, post_rating } = req.body;
  const postExist = await Post.findOne({ post_name });
  if (postExist) {
    res.status(400);
    throw new Error("post already exist");
  }
  if (
    post_name === "" ||
    (posts_data && posts_data.length === 0) ||
    post_rating === ""
  ) {
    res.status(400);
    throw new Error("All required fields must be provided");
  }
  const post = await Post.create({
    post_name,
    posts_data,
    post_rating,
  });
  if (post) {
    res.status(201).json({
      msg: "Post added successfully",
    });
  } else {
    res.status(400);
    throw new Error("Invalid post data");
  }
});

// @desc   Delete posts
// @route  DELETE /api/admin/post
// @access Private

const deletePost = asyncHandler(async (req, res) => {
  const { post } = req.body;
  try {
    const deletedPost = await Post.deleteOne({ _id: post._id });

    if (deletedPost.deletedCount === 0) {
      // If the document is not found, handle accordingly
      res.status(404);
      throw new Error("Post not found");
    }
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500);
    throw new Error("Post cannot be deleted");
  }
});

// @desc   Edit posts
// @route  PATCH /api/admin/post
// @access Private

const editPost = asyncHandler(async (req, res) => {
  const { post } = req.body;
  try {
    const updatedPost = await Post.updateOne({ _id: post._id }, post);

    if (updatedPost.nModified === 0) {
      // No document matched the provided ID
      res.status(404);
      throw new Error("Post not found");
    }

    return res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500);
    throw new Error("Post cannot be deleted");
  }
});

// @desc    Add Ads
// @route   POST /api/admin/ad
// @access  Private
const addAds = asyncHandler(async (req, res) => {
  const { ad_link, ad_image } = req.body;
  const adExist = await Ad.findOne({ ad_image });
  if (adExist) {
    res.status(400);
    throw new Error("Ad already exist");
  }
  const ad = await Ad.create({
    ad_link,
    ad_image,
  });
  if (ad) {
    res.status(201).json({
      msg: "Ad added successfully",
    });
  } else {
    res.status(400);
    throw new Error("Invalid Ad data");
  }
});

export { adminLogin, adminLogout, addAds, addPost, deletePost, editPost };

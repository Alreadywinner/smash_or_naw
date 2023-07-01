import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import Posts from "../model/postModel.js";
import Ads from "../model/adModel.js";
import Comments from "../model/commentModel.js";
import generateToken from "../utils/generateToken.js";
// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, user_type: { $ne: "admin" } });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("user already exist");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    logout user
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(200).json({ message: "User Logged Out" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  return res.status(200).json({ user });
});

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// @desc    fetch all Posts
// @route   GET /api/users/posts
// @access  Private
const fetchAllPosts = asyncHandler(async (req, res) => {
  const allPosts = await Posts.find({});
  if (allPosts && allPosts.length > 0) {
    return res.status(200).json({ allPosts });
  } else {
    res.status(400);
    throw new Error("No Posts to Fetch");
  }
});

// @desc    fetch all Posts
// @route   GET /api/users/ads
// @access  Private
const fetchAllAds = asyncHandler(async (req, res) => {
  const allAds = await Ads.find({});
  if (allAds && allAds.length > 0) {
    return res.status(200).json({ allAds });
  } else {
    res.status(400);
    throw new Error("No Ads to Fetch");
  }
});

// @desc    fetch all Comments
// @route   GET /api/users/comments
// @access  Private
const fetchAllComments = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const allComments = await Comments.find({ post_id: id })
    .populate("author", "name email")
    .select("comment createdAt author _id name email");
  if (allComments && allComments.length > 0) {
    return res.status(200).json({ allComments });
  } else {
    res.status(400);
    throw new Error("No Comments to Fetch");
  }
});

// @desc    add new Comment
// @route   POST /api/users/comments
// @access  Private
const addNewComment = asyncHandler(async (req, res) => {
  const { author, post_id, comment } = req.body;
  const savedComment = await Comments.create({
    author: author, // Assign the user ID of the author
    comment: comment,
    post_id: post_id,
  });

  if (savedComment) {
    res.status(201).json({
      msg: "Comment added successfully",
      comment: savedComment,
    });
  } else {
    res.status(400);
    throw new Error("Invalid comment data");
  }
});

// @desc    delete comment
// @route   DELETE /api/users/comments
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const commentId = req.body.commentId; // Assuming the comment ID is passed in the request body

  const deletedComment = await Comments.deleteOne({ _id: commentId });

  if (deletedComment.deletedCount > 0) {
    // Comment successfully deleted
    return res.status(200).json({ message: "Comment deleted successfully" });
  } else {
    // No comment found with the provided ID
    res.status(400);
    throw new Error("No comment found to delete");
  }
});

export {
  // auth Users
  authUser,
  registerUser,
  logoutUser,
  //User Profile
  getUserProfile,
  updateUserProfile,
  //Posts
  fetchAllPosts,
  //Ads
  fetchAllAds,
  //Comments
  fetchAllComments,
  addNewComment,
  deleteComment,
};

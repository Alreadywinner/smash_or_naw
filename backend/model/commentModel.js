import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference the 'User' model
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comments = mongoose.model("comments", commentSchema);

export default Comments;

import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
  {
    post_name: {
      type: String,
      required: true,
    },
    posts_data: {
      type: [String],
      required: true,
      validate: {
        validator: function (array) {
          return array !== undefined && array.length > 0;
        },
      },
    },
    post_rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("posts", adminSchema);

export default Post;

import mongoose from "mongoose";

const adSchema = mongoose.Schema(
  {
    ad_link: {
      type: String,
      required: true,
    },
    ad_image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ad = mongoose.model("Ads", adSchema);

export default Ad;

const mongoose = require("mongoose");

/* ================= COMMENT SCHEMA ================= */
const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String, // username
      required: true,
    },
  },
  { timestamps: true }
);

/* ================= NEWS SCHEMA ================= */
const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    images: [
      {
        type: String, // Cloudinary URLs
      },
    ],

    /* ================= LIKE / DISLIKE SYSTEM ================= */

    likes: {
      type: Number,
      default: 0,
    },

    likedBy: [
      {
        type: String, // userId OR email
      },
    ],

    dislikes: {
      type: Number,
      default: 0,
    },

    dislikedBy: [
      {
        type: String, // userId OR email
      },
    ],

    /* ================= COMMENTS ================= */
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);

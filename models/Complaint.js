const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // ✅ Address / Landmark of the issue
    address: {
      type: String,
      required: true,
      trim: true,
    },

    // ✅ Image URLs (Cloudinary / local)
    images: [
      {
        type: String,
      },
    ],

    // ✅ Complaint Status
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },

    // ✅ COMPATIBLE FIX
    // Supports EMAIL (current) and ObjectId (future)
    createdBy: {
      type: String, // 🔥 IMPORTANT FIX
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Complaint", complaintSchema);

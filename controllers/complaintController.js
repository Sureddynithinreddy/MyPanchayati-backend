const Complaint = require("../models/Complaint");

/* ================= CREATE COMPLAINT (CITIZEN) ================= */
exports.createComplaint = async (req, res) => {
  try {
    const { title, category, description, address, createdBy } = req.body;

    // ✅ Strong validation (prevents 500)
    if (!title || !category || !description || !address || !createdBy) {
      return res.status(400).json({
        message: "All fields including address and user are required",
      });
    }

    // ✅ Images (Cloudinary / local)
    const imageUrls = Array.isArray(req.files)
      ? req.files.map((file) => file.path)
      : [];

    const complaint = await Complaint.create({
      title,
      category,
      description,
      address,
      images: imageUrls,
      createdBy: String(createdBy), // ✅ FORCE STRING (email-safe)
    });

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    console.error("Create Complaint Error:", error);
    res.status(500).json({
      message: "Failed to create complaint",
    });
  }
};

/* ================= GET ALL COMPLAINTS (PANCHAYAT / ADMIN) ================= */
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    console.error("Get All Complaints Error:", error);
    res.status(500).json({
      message: "Failed to fetch complaints",
    });
  }
};

/* ================= GET COMPLAINTS BY USER (CITIZEN) ================= */
exports.getComplaintsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // ✅ Prevent /undefined crash
    if (!userId || userId === "undefined") {
      return res.status(400).json({
        message: "Valid user identifier is required",
      });
    }

    const complaints = await Complaint.find({
      createdBy: String(userId), // ✅ email-safe match
    }).sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    console.error("Get User Complaints Error:", error);
    res.status(500).json({
      message: "Failed to fetch user complaints",
    });
  }
};

/* ================= UPDATE COMPLAINT STATUS (PANCHAYAT) ================= */
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // ✅ Validate status
    if (!["Pending", "In Progress", "Resolved"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.json({
      message: "Complaint status updated",
      complaint,
    });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({
      message: "Failed to update complaint status",
    });
  }
};

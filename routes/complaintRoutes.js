const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const {
  createComplaint,
  getAllComplaints,
  getComplaintsByUser,
  updateComplaintStatus,
} = require("../controllers/complaintController");

/* ================= CREATE COMPLAINT (CITIZEN) ================= */
// POST complaint with images
router.post("/", upload.array("images", 3), createComplaint);

/* ================= GET COMPLAINTS (CITIZEN) ================= */
// ✅ MUST come before "/"
// ✅ supports email or id safely
router.get("/user/:userId", (req, res, next) => {
  if (!req.params.userId || req.params.userId === "undefined") {
    return res.status(200).json([]); // 👈 prevent 500
  }
  next();
}, getComplaintsByUser);

/* ================= GET COMPLAINTS (PANCHAYAT / ADMIN) ================= */
router.get("/", getAllComplaints);

/* ================= UPDATE STATUS (PANCHAYAT) ================= */
router.patch("/:id/status", updateComplaintStatus);

module.exports = router;

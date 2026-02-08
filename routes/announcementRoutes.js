const express = require("express");
const router = express.Router();

const {
  createAnnouncement,
  getAnnouncements,
} = require("../controllers/announcementController");

// Panchayat posts announcement
router.post("/", createAnnouncement);

// Citizens view announcements
router.get("/", getAnnouncements);

module.exports = router;

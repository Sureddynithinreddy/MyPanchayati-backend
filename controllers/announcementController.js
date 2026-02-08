const Announcement = require("../models/Announcement");

// POST announcement (Panchayat)
exports.createAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.create(req.body);
    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all announcements (Citizens)
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({
      createdAt: -1,
    });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

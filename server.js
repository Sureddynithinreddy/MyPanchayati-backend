const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// Routes
const complaintRoutes = require("./routes/complaintRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const newsRoutes = require("./routes/newsRoutes");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

/* ================= ROUTES ================= */
app.use("/api/complaints", complaintRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/news", newsRoutes);

/* ================= DB ================= */
connectDB();

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("MyPanchayat Backend is running 🚀");
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

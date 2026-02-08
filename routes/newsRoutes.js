const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createNews,
  getAllNews,
  likeNews,
  dislikeNews,
  addComment,
  deleteNews,
} = require("../controllers/newsController");

/* ================= NEWS ================= */
router.get("/", getAllNews);
router.post("/", upload.array("images", 5), createNews);

/* ================= LIKE / DISLIKE ================= */
router.post("/:id/like", likeNews);
router.post("/:id/dislike", dislikeNews);

/* ================= COMMENT ================= */
router.post("/:id/comment", addComment);

/* ================= DELETE ================= */
router.delete("/:id", deleteNews);

module.exports = router;

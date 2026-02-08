const News = require("../models/News");

/* ================= CREATE NEWS ================= */
exports.createNews = async (req, res) => {
  try {
    const imageUrls = req.files
      ? req.files.map(
          (file) =>
            `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
        )
      : [];

    const news = await News.create({
      title: req.body.title,
      description: req.body.description,
      images: imageUrls,
    });

    res.status(201).json(news);
  } catch (error) {
    console.error("Create News Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET ALL NEWS ================= */
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= LIKE NEWS ================= */
exports.likeNews = async (req, res) => {
  try {
    const { userId } = req.body; // 👈 from frontend
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    // ❌ already liked
    if (news.likedBy.includes(userId)) {
      return res.status(400).json({ message: "Already liked" });
    }

    // 🔁 remove dislike if exists
    if (news.dislikedBy.includes(userId)) {
      news.dislikedBy = news.dislikedBy.filter(
        (id) => id !== userId
      );
      news.dislikes -= 1;
    }

    // ✅ add like
    news.likedBy.push(userId);
    news.likes += 1;

    await news.save();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DISLIKE NEWS ================= */
exports.dislikeNews = async (req, res) => {
  try {
    const { userId } = req.body;
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    // ❌ already disliked
    if (news.dislikedBy.includes(userId)) {
      return res.status(400).json({ message: "Already disliked" });
    }

    // 🔁 remove like if exists
    if (news.likedBy.includes(userId)) {
      news.likedBy = news.likedBy.filter(
        (id) => id !== userId
      );
      news.likes -= 1;
    }

    // ✅ add dislike
    news.dislikedBy.push(userId);
    news.dislikes += 1;

    await news.save();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= ADD COMMENT ================= */
exports.addComment = async (req, res) => {
  try {
    const { text, author } = req.body;
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    news.comments.push({
      text,
      author, // 👈 username visible
    });

    await news.save();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE NEWS ================= */
exports.deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { analyzeFile } = require("./ai-processor");

const app = express();
const PORT = process.env.PORT || 5000;

// Simple in-memory store for reports (can replace with DB later)
let reports = [];

// Multer storage setup (stores files in /uploads)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// File upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  console.log(
    `Received file: ${file.originalname}, type: ${file.mimetype}, size: ${file.size}`
  );

  try {
    const analysis = analyzeFile(file.path);

    const report = {
      id: reports.length + 1,
      filename: file.originalname,
      storedName: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      analysis,
      uploadedAt: new Date().toISOString(),
    };

    reports.push(report);

    res.json({ message: "File uploaded successfully", analysis });
  } catch (err) {
    console.error("Error analyzing file:", err);
    res.status(500).send("Error processing file");
  }
});

// Reports endpoint
app.get("/reports", (req, res) => {
  res.json(reports);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

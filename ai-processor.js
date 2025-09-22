const fs = require("fs");
const path = require("path");

function analyzeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if ([".txt", ".csv", ".json", ".md"].includes(ext)) {
    return fs.readFileSync(filePath, "utf8");
  }

  if (ext === ".pdf") {
    return "PDF detected - add PDF parsing logic here.";
  }

  if (ext === ".docx") {
    return "DOCX detected - add DOCX parsing logic here.";
  }

  if ([".jpg", ".jpeg", ".png"].includes(ext)) {
    return "Image detected - run OCR if needed.";
  }

  // fallback for unknown types
  return `Unsupported file type (${ext}) - storing metadata only.`;
}

module.exports = { analyzeFile };

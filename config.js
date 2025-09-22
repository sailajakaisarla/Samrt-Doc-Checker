require('dotenv').config();
const path = require('path');
module.exports = {
  port: process.env.PORT || 4000,
  uploadDir: process.env.UPLOAD_DIR || path.join(__dirname, 'data', 'uploads'),
  dbFile: process.env.DB_FILE || path.join(__dirname, 'db.json'),
  openaiKey: process.env.OPENAI_API_KEY || '',
  pricePerDoc: parseFloat(process.env.PRICE_PER_DOC || '0.1'),
  pricePerReport: parseFloat(process.env.PRICE_PER_REPORT || '0.25'),
  pathwayIntervalSec: parseInt(process.env.PATHWAY_POLL_INTERVAL || '15', 10)
};

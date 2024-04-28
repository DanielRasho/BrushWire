const fs = require("fs");
const path = require("path");
require("dotenv").config();

class FileManager {
  constructor(baseDir) {
    this.baseDir = baseDir; // Base directory to store files
  }

  saveDocument(owner, id, content) {
    const ownerDir = path.join(this.baseDir, owner);
    const docDir = path.join(ownerDir, "documents");
    if (!fs.existsSync(docDir)) {
      fs.mkdirSync(docDir, { recursive: true });
    }
    const filePath = path.join(docDir, `${id}.txt`);
    fs.writeFileSync(filePath, content);
    return filePath;
  }

  saveImage(owner, id, image) {
    const ownerDir = path.join(this.baseDir, owner);
    const imgDir = path.join(ownerDir, "images");
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true });
    }
    const filePath = path.join(imgDir, `${id}.jpg`); // Assuming image format is jpg
    fs.writeFileSync(filePath, image);
    return filePath;
  }

  searchDocument(owner, id) {
    const filePath = path.join(this.baseDir, owner, "documents", `${id}.txt`);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf8");
    }
    return null;
  }

  searchDocument(filePath) {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf8");
    }
    return null;
  }

  searchImage(owner, id) {
    const filePath = path.join(this.baseDir, owner, "images", `${id}.jpg`); // Assuming image format is jpg
    if (fs.existsSync(filePath)) {
      const image = fs.readFileSync(filePath);
      return image;
    }
    return null;
  }

  searchImage(filePath) {
    if (fs.existsSync(filePath)) {
      const image = fs.readFileSync(filePath, "utf-8");
      return image;
    }
    return null;
  }
}

const fileManager = new FileManager(process.env.STORE_DIR);

module.exports = fileManager;

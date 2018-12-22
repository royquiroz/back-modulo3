const multer = require("multer");
const cloudinary = require("cloudinary");
const multerCloudinary = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = multerCloudinary({
  cloudinary,
  folder: "spacio",
  allowedFormats: ["jpg", "png", "jpeg"]
});

module.exports = multer({ storage });

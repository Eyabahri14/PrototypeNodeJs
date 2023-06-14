const multer = require("multer");

// Configuration de Multer pour l'upload d'image
const storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.originalname.split(".").pop());
  }
});

const upload = multer({ storage });

module.exports = upload;

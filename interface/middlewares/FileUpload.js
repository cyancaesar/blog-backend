module.exports = () => {
    const path = require("path");
    const multer = require("multer");
    const storage = multer.diskStorage({
        destination: path.join(__dirname, "./../../public/uploads/avatars"),
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    });
    const upload = multer({ storage });

    return upload;
};
const multer = require('multer');

//IMAGE UPLOAD
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});

exports.uploadAvatar = multer({
    storage: Storage,
});

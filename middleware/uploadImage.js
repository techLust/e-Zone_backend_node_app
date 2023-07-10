const multer = require('multer');

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {cb(null, './uploads')},
    filename: (req, file, cb) => {
        let filename = (Math.random() + 1).toString(36).substring(7);
        cb(null, filename + "-" + Date.now() + '.' + file.mimetype.split('/')[1]);
    },
});

exports.uploadImage = multer({ storage: Storage }).single('productImage');

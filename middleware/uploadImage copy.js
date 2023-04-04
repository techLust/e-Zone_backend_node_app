const multer = require('multer');

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        let filename = (Math.random() + 1).toString(36).substring(7);
        cb(null, filename + "-" + Date.now() +'.' + file.mimetype.split('/')[1])
    },
});

const maxSize = 1 * 1000 * 1000;

exports.uploadImage = multer({
    storage: Storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetypes = filetypes.test(file.mimetype);
        const extName = filetypes.test(file.originalname.toLowerCase());
        if (mimetypes && extName) return cb(null, true)
        cb("Error: File upload only supports the following file types" + "- " + filetypes)
    }
}).single('upload');

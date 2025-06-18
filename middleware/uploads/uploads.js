const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Create a clean filename with timestamp prefix
        const uniqueSuffix = Date.now();
        const cleanFileName = path.basename(file.originalname).replace(/^uploads[\/\\]+/, '');
        cb(null, `${uniqueSuffix}-${cleanFileName}`);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;

/* eslint-disable no-console */
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const path = require('path');

const configFile = {
    image: {
        folder: 'image',
        size: 1 // 1 MB
    },
    compressPdf: {
        folder: 'compress-pdf',
        size: 10 // 10 MB
    }
};

const validateImageUpload = (size = 1, subpath) => multer({ // default 1 MB
    limits: {
        fileSize: size * 1024 * 1024,
        files: 1
    },
    fileFilter: (req, file, cb) => {
        if (['png', 'jpg', 'jpeg'].some(ext => file.originalname.endsWith("." + ext))) {
            return cb(null, true);
        }
        req.error = 'Only ' + ['png', 'jpg', 'jpeg'].join(", ") + ' files are allowed!';
        return cb(null, false);
    },
    // save to local storage
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const folder = subpath ? `${subpath}/` : '';
            if (!fs.existsSync(`public/media/${subpath}`)) {
                fs.mkdirSync(`public/media/${subpath}`, {recursive: true}); // create folder if not exists
            }
            
            cb(null, path.join(__dirname + './../public/media/' + folder));
        },
        filename: function (req, file, cb) {
            const ext = file.originalname.split(".").pop();
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

            const fileName = `${date}-${uuidv4()}.${ext}`;
            cb(null, fileName);
        }
    })
}).single('profile');

const validatePdfUpload = (size = 1, subpath) => multer({ // default 1 MB
    limits: {
        fileSize: size * 1024 * 1024,
        files: 1
    },
    fileFilter: (req, file, cb) => {
        if (['pdf'].some(ext => file.originalname.endsWith("." + ext))) {
            return cb(null, true);
        }
        req.error = 'Only ' + ['pdf'].join(", ") + ' files are allowed!';
        return cb(null, false);
    },
    // save to local storage
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const folder = subpath ? `${subpath}/` : '';
            if (!fs.existsSync(`public/media/${subpath}`)) {
                fs.mkdirSync(`public/media/${subpath}`, {recursive: true}); // create folder if not exists
            }
            
            cb(null, path.join(__dirname + './../public/media/' + folder));
        },
        filename: function (req, file, cb) {
            const ext = file.originalname.split(".").pop();
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

            const fileName = `${date}-${uuidv4()}.${ext}`;
            cb(null, fileName);
        }
    })
}).single('file');

const getFile = (path) => {
    const endpoint = process.env.IMAGE_PATH;

    if (path) {
        return {
            file_url: `${endpoint}/${path}`,
            file_path: path
        };
    } else {
        return null;
    }
};

const deleteFile = async (filePath) => {
    const path = `public/media/${filePath}`;
    await fs.unlink(path, function (err) {
        if (err) {
            console.log('ERROR: ' + err);
            return false;
        } else {
            return true;
        }
    });
};

module.exports = {
    validateImageUpload,
    validatePdfUpload,
    getFile,
    deleteFile,
    configFile
};

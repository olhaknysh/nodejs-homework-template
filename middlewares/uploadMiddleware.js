const multer = require('multer');
const path = require('path');
const { wrongAvatarExtension } = require('../helpers/errors')

const UPLOAD_DIR = path.resolve('./tmp')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR)
    },
    filename: (req, file, cb) => {
        const [, extension] = file.originalname.split('.')
        if (!extension.match(/(jpg|jpeg|png|gif)$/i)) {
            next(new wrongAvatarExtension(`File with extension ${extension} cannot be uploaded`))
        }
        cb(null, file.originalname);
    }
})

const uploadMiddleware = multer({ storage })

module.exports = {
    uploadMiddleware
}
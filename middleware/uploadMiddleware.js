const multer = require('multer')
const path = require('path')

const tempDir = path.join(__dirname, '../temp')

const upload = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 2048,
  },
})

const uploadMiddleware = multer({
  storage: upload,
})

module.exports = uploadMiddleware

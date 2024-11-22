import multer from "multer";

const docConfig = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, `document-${Date.now()}.${file.originalname.split('.').pop()}`);
    }
});

// Keep the multer setup without a file filter
const uploadFile = multer({
    storage: docConfig,
});

export default uploadFile;

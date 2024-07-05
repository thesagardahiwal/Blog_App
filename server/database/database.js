const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
dotenv.config();


const connectMongoDB = () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => console.log("MongoDB connected"))
        .catch((e) => console.log("MongoDB connection error:", e));
}

cloudinary.config({ 
    cloud_name: process.env.CLAUINARY_CLAUD_NAME, 
    api_key: process.env.CLAUDINARY_API_KEY, 
    api_secret: process.env.CLAUDINARY_SECRET_KEY
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'some-folder-name',
      allow_formats: ["jpg", "png", "jpeg"],
      public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    },
  });

const parser = multer({ storage: storage });




module.exports = {
    connectMongoDB,
    parser
}
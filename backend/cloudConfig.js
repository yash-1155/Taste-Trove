/* eslint-disable no-undef */
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// here we defined storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Taste_Trove',//folder name at cloud
        allowerdFormats: ["png", "jpg", "jpeg"]//allowed formate of file
    },
});


module.exports = {
    cloudinary,
    storage,
}

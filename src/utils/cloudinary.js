import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from "dotenv";

dotenv.config()

// configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log("Cloudinary Config:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    if(!localFilePath) return null
    const response = await cloudinary.uploader
    .upload(
      localFilePath, {
        resource_type: "auto"
      }
    )
    console.log("File uploaded on cloudinary. File src: "  + response.url);
    // Assim que o arquivo for subido, gostariamos de deletar do servidor
    fs.unlinkSync(localFilePath)
    return response
  } catch (error) {
    console.log("Error on Cloudinary ", error);

    fs.unlinkSync(localFilePath)
    return null
  }
}

export {uploadOnCloudinary}
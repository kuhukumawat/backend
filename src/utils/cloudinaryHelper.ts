import fs from "fs";
import ApiError from "./apiError";
import cloudinaryConfig from "../config/upload";

export const uploadToCloudinary = async (filePath: string, folder: string) => {
  try {
    const result = await cloudinaryConfig.uploader.upload(filePath, {
      folder,
    });
    // Remove local file after successful upload
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return result.secure_url;
  } catch (error) {
    // Remove local file even if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw new ApiError(500, "Image upload failed");
  }
};

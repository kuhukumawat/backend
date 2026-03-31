import fs from "fs";
import ApiError from "./apiError";
import cloudinaryConfig from "../config/upload";
import { AppLogger } from "./AppLogger";

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

// Define an asynchronous function that takes an imageUrl string as a parameter
export const deleteFromCloudinary = async (imageUrl: string) => {
  try {
    // If no imageUrl was provided (e.g., the user had no profile image), exit the function early doing nothing
    if (!imageUrl) return;

    // -----------------------------------------------------------------------
    // The goal of the next section is to extract the "public_id" of the image.
    // Cloudinary needs this public_id (not the full URL) to delete the file.
    // -----------------------------------------------------------------------
    
    // Example Cloudinary URL: 
    // https://res.cloudinary.com/cloud_name/image/upload/v1234567/users/my_picture.jpg
    
    // Split the URL string into an array of strings at every forward slash ("/")
    // urlParts becomes: ["https:", "", "res.cloudinary.com", ..., "users", "my_picture.jpg"]
    const urlParts = imageUrl.split("/");
    
    // Log the array of URL parts for debugging purposes
    AppLogger.info(urlParts);
    
    // Get the very last item in the array, which will be the filename with its extension (e.g., "my_picture.jpg")
    const lastPart = urlParts[urlParts.length - 1];
    
    // Log the extracted filename for debugging
    AppLogger.info(lastPart);
    
    // If for some reason we couldn't get the last part (e.g., malformed URL), exit early to prevent errors
    if (!lastPart) return;

    // Split the filename ("my_picture.jpg") into an array at the period (".")
    // filenameParts becomes: ["my_picture", "jpg"]
    const filenameParts = lastPart.split(".");
    
    // Remove the last item from the array (which is the extension "jpg")
    // filenameParts becomes: ["my_picture"]
    filenameParts.pop(); 
    
    // Join the remaining parts back together with a period (in case the filename originally had multiple periods)
    // filename becomes: "my_picture"
    const filename = filenameParts.join(".");
    
    // Get the second-to-last item from the original urlParts array. 
    // This represents the folder name where the image is stored in Cloudinary (e.g., "users")
    const folder = urlParts[urlParts.length - 2];

    // Construct the actual Cloudinary public_id. 
    // If a folder exists, combine them like "users/my_picture". If not, just use "my_picture".
    const publicId = folder ? `${folder}/${filename}` : filename;

    // Call Cloudinary's API to permanently destroy the image matching this public_id.
    // We use optional chaining (?.) just in case the Cloudinary config isn't fully loaded.
    const result = await cloudinaryConfig?.uploader?.destroy(publicId);
    AppLogger.info(`Cloudinary destroy publicId: ${publicId}, result: ${JSON.stringify(result)}`);
  } catch (error) {
    // If anything goes wrong during the process, log the error so the server doesn't crash silently
    console.error("Cloudinary deletion failed:", error);
  }
};

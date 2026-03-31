import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/upload";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    // @ts-expect-error - 'folder' not defined in multer-storage-cloudinary types
    folder: "users",
    allowedFormats: [
      "jpg",
      "png",
      "jpeg",
      "pdf",
      "webp",
      "mp4",
      "mov",
      "avi",
      "svg",
    ],
  },
});

export const uploadCloud = multer({ storage });

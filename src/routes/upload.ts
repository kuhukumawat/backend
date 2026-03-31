import express from "express";
import { upload } from "../utils/uploads";
import { uploadFile, uploadMultiple } from "../controllers/uploadFile";
import { uploadCloud } from "../middleware/uploadMedia";
const router = express.Router();

router.post("/", upload.single("file"), uploadFile);
router.post("/multiple", upload.array("files"), uploadMultiple);
router.post("/cloud", uploadCloud.single("file"), uploadFile);
export default router;

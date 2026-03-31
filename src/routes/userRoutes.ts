import express from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import authMiddleware, { authorize } from "../middleware/auth";
import { validate } from "../middleware/validator";
import { upload } from "../utils/uploads";
import userSchema, { deleteUserSchema } from "../validators/userValidator";
import { asyncHandler } from "../middleware/asyncHandler";

const router = express.Router();

router.post(
  "/search",
  authMiddleware,
  authorize(["admin"]),
  asyncHandler(getAllUsers),
);

router.post(
  "/create-user",
  authMiddleware,
  authorize(["admin"]),
  upload.single("profileImage"),
  validate(userSchema),
  asyncHandler(createUser),
);

router.post(
  "/update-user",
  authMiddleware,
  authorize(["admin"]),
  upload.single("profileImage"),
  validate(userSchema),
  asyncHandler(updateUser),
);

router.delete(
  "/delete-user",
  authMiddleware,
  authorize(["admin"]),
  validate(deleteUserSchema),
  asyncHandler(deleteUser),
);

export default router;

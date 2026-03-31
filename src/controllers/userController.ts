import { NextFunction, Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getUsersService,
  updateUserService,
} from "../services/userService";
import ApiError from "../utils/apiError";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinaryHelper";
// exports.getAllUsers = (req, res) => {
//      const users = [
//     { id: 1, name: "Komal" },
//     { id: 2, name: "Mansi" }
//   ];

//    res.json({
//     message:"users fetched successfully",
//     users});
// };

// exports.createUser = (req, res) => {
//   const user = req.body;
//   console.log(user);
//   res.json({
//     message: "User created successfully",
//     data:user
//   });
// };
export const getAllUsers = async (req: Request, res: Response) => {
  const { users, total, page, limit } = await getUsersService(req.body);

  res.json({
    success: true,
    data: {
      users: users,
      pagination: {
        page: page,
        limit: limit,
        total: total,
      },
    },
  });
};

export const createUser = async (req: Request, res: Response) => {
  const userData = { ...req.body };
  if (req.file) {
    console.time("Cloudinary Upload");
    userData.profileImage = await uploadToCloudinary(req.file.path, "users");
    console.timeEnd("Cloudinary Upload");
  }
  console.time("DB Create");
  const user = await createUserService(userData);
  console.timeEnd("DB Create");
  res.send({ success: true, message: "User saved", data: user });
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.body.id as string;

  if (!id) {
    return next(new ApiError(400, "User ID is required"));
  }

  const userData = { ...req.body };
  if (req.file) {
    console.time("Cloudinary Update Upload");
    userData.profileImage = await uploadToCloudinary(req.file.path, "users");
    console.timeEnd("Cloudinary Update Upload");
  }

  console.time("DB Update");
  const user = await updateUserService(id, userData);
  console.timeEnd("DB Update");
  res.send({ success: true, message: "User updated", data: user });
};
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.body.id as string;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

  const userToDelete = await deleteUserService(userId);

  if (userToDelete && userToDelete.profileImage) {
    await deleteFromCloudinary(userToDelete.profileImage);
  }

  res.send({ success: true, message: "User deleted", data: userToDelete });
};

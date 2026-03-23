import User from "../models/User";
import { Request, Response } from "express";
import { createUserService, getUsersService } from "../services/userService";
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
  const users = await getUsersService();
  res.json({ success: true, data: { users: users } });
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res
      .status(400)
      .send({ success: false, message: "Name and email are required" });
  }

  try {
    const user = await createUserService(req.body);
    res.send({ success: true, message: "User saved", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error saving user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const updateUser = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });
  res.send(updateUser);
};
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const userToDelete = await User.findByIdAndDelete(userId);
  res.send({ message: "User deleted", userToDelete });
};

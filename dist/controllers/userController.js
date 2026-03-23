"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const userService_1 = require("../services/userService");
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
const getAllUsers = async (req, res) => {
    const users = await (0, userService_1.getUsersService)();
    res.json({ success: true, data: { users: users } });
};
exports.getAllUsers = getAllUsers;
const createUser = async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res
            .status(400)
            .send({ success: false, message: "Name and email are required" });
    }
    try {
        const user = await (0, userService_1.createUserService)(req.body);
        res.send({ success: true, message: "User saved", data: user });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error saving user" });
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updateUser = await User_1.default.findByIdAndUpdate(userId, req.body, {
        new: true,
    });
    res.send(updateUser);
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    const userToDelete = await User_1.default.findByIdAndDelete(userId);
    res.send({ message: "User deleted", userToDelete });
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map
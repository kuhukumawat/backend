"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getAllUsers = void 0;
const userService_1 = require("../services/userService");
const apiError_1 = __importDefault(require("../utils/apiError"));
const cloudinaryHelper_1 = require("../utils/cloudinaryHelper");
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
    const { users, total, page, limit } = await (0, userService_1.getUsersService)(req.body);
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
exports.getAllUsers = getAllUsers;
const createUser = async (req, res) => {
    const userData = { ...req.body };
    if (req.file) {
        console.time("Cloudinary Upload");
        userData.profileImage = await (0, cloudinaryHelper_1.uploadToCloudinary)(req.file.path, "users");
        console.timeEnd("Cloudinary Upload");
    }
    console.time("DB Create");
    const user = await (0, userService_1.createUserService)(userData);
    console.timeEnd("DB Create");
    res.send({ success: true, message: "User saved", data: user });
};
exports.createUser = createUser;
const updateUser = async (req, res, next) => {
    const id = req.body.id;
    if (!id) {
        return next(new apiError_1.default(400, "User ID is required"));
    }
    const userData = { ...req.body };
    if (req.file) {
        console.time("Cloudinary Update Upload");
        userData.profileImage = await (0, cloudinaryHelper_1.uploadToCloudinary)(req.file.path, "users");
        console.timeEnd("Cloudinary Update Upload");
    }
    console.time("DB Update");
    const user = await (0, userService_1.updateUserService)(id, userData);
    console.timeEnd("DB Update");
    res.send({ success: true, message: "User updated", data: user });
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const userId = req.body.id;
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required",
        });
    }
    const userToDelete = await (0, userService_1.deleteUserService)(userId);
    if (userToDelete && userToDelete.profileImage) {
        await (0, cloudinaryHelper_1.deleteFromCloudinary)(userToDelete.profileImage);
    }
    res.send({ success: true, message: "User deleted", data: userToDelete });
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map
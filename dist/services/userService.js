"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = exports.updateUserService = exports.createUserService = exports.getUsersService = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUsersService = async (query) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = {};
    if (query.role) {
        filter.role = query.role;
    }
    const searchTerm = query.search || query.name;
    if (searchTerm) {
        const searchRegex = new RegExp(searchTerm, "i");
        filter.$or = [{ name: searchRegex }, { email: searchRegex }];
    }
    const [users, total] = await Promise.all([
        User_1.default.find(filter).skip(skip).limit(limit),
        User_1.default.countDocuments(filter),
    ]);
    return { users, total, page, limit };
};
exports.getUsersService = getUsersService;
const createUserService = async (data) => {
    return await User_1.default.create(data);
};
exports.createUserService = createUserService;
const updateUserService = async (id, data) => {
    return await User_1.default.findByIdAndUpdate(id, data, { returnDocument: "after" });
};
exports.updateUserService = updateUserService;
const deleteUserService = async (id) => {
    return await User_1.default.findByIdAndDelete(id);
};
exports.deleteUserService = deleteUserService;
//# sourceMappingURL=userService.js.map
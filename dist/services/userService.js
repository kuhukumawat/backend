"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserService = exports.getUsersService = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUsersService = async () => {
    return await User_1.default.find();
};
exports.getUsersService = getUsersService;
const createUserService = async (data) => {
    return await User_1.default.create(data);
};
exports.createUserService = createUserService;
//# sourceMappingURL=userService.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect("mongodb+srv://komal:Komal%40123@datainputs.3tere3h.mongodb.net/backendDB");
        console.log("Database connected");
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map
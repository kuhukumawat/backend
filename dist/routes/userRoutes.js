"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// GET /users
// router.get("/", (req, res) => {
//   res.send("All users");
// });
// // POST /users
// router.post("/", (req, res) => {
//   res.send("User created");
// });
router.get("/", auth_1.default, userController_1.getAllUsers);
router.post("/", userController_1.createUser);
router.put("/:id", auth_1.default, userController_1.updateUser);
router.delete("/:id", auth_1.default, userController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map
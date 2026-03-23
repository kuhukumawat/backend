import express from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import authMiddleware from "../middleware/auth";
const router = express.Router();

// GET /users
// router.get("/", (req, res) => {
//   res.send("All users");
// });

// // POST /users
// router.post("/", (req, res) => {
//   res.send("User created");
// });

router.get("/", authMiddleware, getAllUsers);
router.post("/", createUser);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;

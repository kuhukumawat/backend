import { z } from "zod";

const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 3 characters long"),
  age: z.coerce.number().optional(),
  gender: z.string().optional(),
  role: z.enum(["admin", "user"]).optional(),
  profileImage: z.string().optional(),
});

export const deleteUserSchema = z.object({
  id: z.string().min(1, "ID is required"),
});

export default userSchema;

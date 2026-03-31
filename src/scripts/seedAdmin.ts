import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User";
import connectDB from "../config/db";

const seedAdmin = async () => {
  await connectDB();
  
  const email = "admin@example.com";
  const existingAdmin = await User.findOne({ email });
  
  if (existingAdmin) {
    console.log("Admin user already exists");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  const adminUser = new User({
    name: "Super Admin",
    email: email,
    password: hashedPassword,
    role: "admin"
  });

  await adminUser.save();
  console.log("Admin user created successfully!");
  console.log("Email: admin@example.com");
  console.log("Password: admin123");
  
  process.exit(0);
};

seedAdmin().catch(err => {
  console.error(err);
  process.exit(1);
});

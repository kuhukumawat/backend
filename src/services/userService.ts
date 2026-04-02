import User from "../models/User";

export interface UserData {
  name: string;
  email: string;
  password: string;
  age?: number;
  gender?: string;
  profileImage?: string;
  otp: string;
  otpExpiry: Date;
  isVerified: boolean;
  verificationToken?: string;
}
export const getUsersService = async (query: {
  page?: string;
  limit?: string;
  search?: string;
  name?: string;
  role?: string;
}) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter: { role?: string; $or?: { name?: RegExp; email?: RegExp }[] } =
    {};

  if (query.role) {
    filter.role = query.role;
  }

  const searchTerm = query.search || query.name;
  if (searchTerm) {
    const searchRegex = new RegExp(searchTerm, "i");
    filter.$or = [{ name: searchRegex }, { email: searchRegex }];
  }

  const [users, total] = await Promise.all([
    User.find(filter).skip(skip).limit(limit),
    User.countDocuments(filter),
  ]);

  return { users, total, page, limit };
};

export const createUserService = async (data: UserData) => {
  return await User.create(data);
};
export const updateUserService = async (id: string, data: UserData) => {
  return await User.findByIdAndUpdate(id, data, { returnDocument: "after" });
};
export const deleteUserService = async (id: string) => {
  return await User.findByIdAndDelete(id);
};

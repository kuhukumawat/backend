import User from "../models/User";

export interface UserData {
  name: string;
  email: string;
  password: string;
  age?: number;
  gender?: string;
}
export const getUsersService = async () => {
  return await User.find();
};

export const createUserService = async (data: UserData) => {
  return await User.create(data);
};

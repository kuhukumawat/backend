// types/user.types.ts

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  age?: number;
  gender?: string;
  role: "user" | "admin";
  profileImage?: string;
  otp: String;
  otpExpiry: Date;
  isVerified: {
    type: Boolean;
    default: false;
  };
  verificationToken?: string;
}

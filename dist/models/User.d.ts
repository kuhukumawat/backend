import mongoose from "mongoose";
declare const User: mongoose.Model<{
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    profileImage: string;
    isVerified: boolean;
    age?: number | null;
    gender?: string | null;
    verificationToken?: string | null;
    otp?: string | null;
    otpExpiry?: NativeDate | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    profileImage: string;
    isVerified: boolean;
    age?: number | null;
    gender?: string | null;
    verificationToken?: string | null;
    otp?: string | null;
    otpExpiry?: NativeDate | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    profileImage: string;
    isVerified: boolean;
    age?: number | null;
    gender?: string | null;
    verificationToken?: string | null;
    otp?: string | null;
    otpExpiry?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    profileImage: string;
    isVerified: boolean;
    age?: number | null;
    gender?: string | null;
    verificationToken?: string | null;
    otp?: string | null;
    otpExpiry?: NativeDate | null;
}, mongoose.Document<unknown, {}, {
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    profileImage: string;
    isVerified: boolean;
    age?: number | null;
    gender?: string | null;
    verificationToken?: string | null;
    otp?: string | null;
    otpExpiry?: NativeDate | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    profileImage: string;
    isVerified: boolean;
    age?: number | null;
    gender?: string | null;
    verificationToken?: string | null;
    otp?: string | null;
    otpExpiry?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    profileImage: string;
    isVerified: boolean;
    age?: number | null;
    gender?: string | null;
    verificationToken?: string | null;
    otp?: string | null;
    otpExpiry?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    profileImage: string;
    isVerified: boolean;
    age?: number | null;
    gender?: string | null;
    verificationToken?: string | null;
    otp?: string | null;
    otpExpiry?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default User;
//# sourceMappingURL=User.d.ts.map
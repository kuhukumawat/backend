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
export declare const getUsersService: (query: {
    page?: string;
    limit?: string;
    search?: string;
    name?: string;
    role?: string;
}) => Promise<{
    users: (import("mongoose").Document<unknown, {}, {
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
    }, import("mongoose").DefaultSchemaOptions> & Omit<{
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
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    })[];
    total: number;
    page: number;
    limit: number;
}>;
export declare const createUserService: (data: UserData) => Promise<import("mongoose").Document<unknown, {}, {
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
}, import("mongoose").DefaultSchemaOptions> & Omit<{
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
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const updateUserService: (id: string, data: UserData) => Promise<(import("mongoose").Document<unknown, {}, {
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
}, import("mongoose").DefaultSchemaOptions> & Omit<{
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
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}) | null>;
export declare const deleteUserService: (id: string) => Promise<(import("mongoose").Document<unknown, {}, {
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
}, import("mongoose").DefaultSchemaOptions> & Omit<{
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
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}) | null>;
//# sourceMappingURL=userService.d.ts.map
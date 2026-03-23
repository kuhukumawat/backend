export interface UserData {
    name: string;
    email: string;
    password: string;
    age?: number;
    gender?: string;
}
export declare const getUsersService: () => Promise<(import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    password: string;
    age?: number | null;
    gender?: string | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    name: string;
    email: string;
    password: string;
    age?: number | null;
    gender?: string | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
})[]>;
export declare const createUserService: (data: UserData) => Promise<import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    password: string;
    age?: number | null;
    gender?: string | null;
}, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<{
    name: string;
    email: string;
    password: string;
    age?: number | null;
    gender?: string | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
//# sourceMappingURL=userService.d.ts.map
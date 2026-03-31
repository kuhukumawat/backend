import { Request, Response, NextFunction } from "express";
import { IUser } from "../types/user.types";
export interface AuthRequest extends Request {
    user?: IUser;
}
declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default authMiddleware;
export declare const authorize: (roles: string[]) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map
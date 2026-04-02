import { NextFunction, Request, Response } from "express";
export declare const registerUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const loginUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const forgortPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const refreshTokenHandler: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const verifyMail: (req: Request, res: Response) => Promise<void>;
export declare const resendCode: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=authController.d.ts.map
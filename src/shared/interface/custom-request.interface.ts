import { Request } from "express";

export interface ICustomRequest extends Request {
    user?: {
        userId: string;
        roleId: string;
        tenantId: string;
        userName: string;
    };
}
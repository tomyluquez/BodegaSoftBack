import { Request, Response } from "express";
import { UserResponse } from "./models/user-response.model";
import { getUserByUuidService } from "./user.service";
import { AuthLoginResponse } from "../auth/models/auth-login-response";
import { LoginResponse } from "../auth/models/login-response.model";

export const getUserByUuid = async (req: Request, res: Response) => {
    try {
        const userId = req.params.uuid;
        if (!userId) throw new Error('No se encontro el usuario');
        let response = getUserByUuidService(userId);
        return res.status(200).json(response);
    } catch (error: any) {
        let response = new UserResponse();
        response.setError(error.message);
        return res.status(500).json(response);
    }
};
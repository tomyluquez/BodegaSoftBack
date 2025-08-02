import { Request, Response } from "express";
import { ResponseMessages } from "../../shared/models/response-messages.model";
import { loginUserService, registerUserService, selectCompanyAndLoginService } from "./auth.service";
import { IAuthRegister } from "./interface/auth-register.interface";
import { IAuthLogin } from "./interface/auth-login.interface";
import { AuthLoginResponse } from "./models/auth-login-response";
import { LoginResponse } from "./models/login-response.model";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const data: IAuthRegister = req.body;
        const response = await registerUserService(data);
        return res.status(200).json(response);
    } catch (error: any) {
        let response = new ResponseMessages();
        response.setError(error.message);
        return res.status(500).json(response);
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const data: IAuthLogin = req.body;
        const response = await loginUserService(data);
        return res.status(200).json(response);
    } catch (error: any) {
        let response = new AuthLoginResponse();
        response.setError(error.message);
        return res.status(500).json(response);
    }
};

export const selectCompanyAndLogin = async (req: Request, res: Response) => {
    try {
        const { tenantName, tenantId, userId } = req.body;
        if (!tenantId || !tenantName || !userId) throw new Error('No se encontro el usuario o la compañia');
        let response = await selectCompanyAndLoginService(tenantName, tenantId, userId);
        // Setear cookie con el token, segura y httpOnly
        res.cookie('access_token', response.Token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // solo HTTPS en prod
            sameSite: 'strict',
            maxAge: 2 * 60 * 60 * 1000, // 2 horas en ms
        });

        // Retornar el resto de los datos sin el token
        const { Token, ...responseWithoutToken } = response;
        return res.status(200).json(responseWithoutToken);
    } catch (error: any) {
        let response = new LoginResponse();
        response.setError(error.message);
        return res.status(500).json(response);
    }
}
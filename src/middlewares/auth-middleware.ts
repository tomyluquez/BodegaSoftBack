import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { authHelper } from "../modules/auth/helpers/auth.helper";
import { ICustomRequest } from "../shared/interface/custom-request.interface";


export const authMiddleware = (req: ICustomRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.access_token;
    if (!token) {
        return res.status(401).json({ message: "Token faltante" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

        if (!decoded.exp) {
            return res.status(401).json({ message: "Token inválido: sin expiración" });
        }
        // Expiración en segundos
        const now = Math.floor(Date.now() / 1000);
        const timeToExpire = decoded.exp - now;

        // Si queda menos de 15 minutos (900 segundos), renovar token
        if (timeToExpire < 900) {
            const { userId, userName, roleId, tenantId } = decoded;
            const newToken = authHelper.generateToken(userId, userName, roleId, tenantId);

            // Setear cookie nueva
            res.cookie("access_token", newToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 2 * 60 * 60 * 1000,
            });
        }

        req.user = {
            userId: decoded.userId,
            roleId: decoded.roleId,
            tenantId: decoded.tenantId,
            userName: decoded.userName,
        };

        next();
    } catch (err) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};
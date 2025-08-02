import { Request, Response, NextFunction } from "express";

export const authorizeRoles = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const roleId = req.user?.roleId;

        if (!roleId || !allowedRoles.includes(roleId)) {
            return res.status(403).json({ message: "Acceso denegado" });
        }

        next();
    };
};
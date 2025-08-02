import jwt from 'jsonwebtoken';
import { IJwtPayload } from '../../../shared/interface/jwtPayload.interface';
const JWT_SECRET = process.env.JWT_SECRET!;
class AuthHelper {

    generateToken(userId: string, userName: string, roleId: number, tenantId: number): string {
        const tokenPayload: IJwtPayload = {
            userId,
            userName,
            tenantId: tenantId.toString(),
            roleId: roleId.toString(),

        };

        const token = jwt.sign(tokenPayload, JWT_SECRET, {
            expiresIn: '2h',
        });

        return token;
    }
}

export const authHelper = new AuthHelper();
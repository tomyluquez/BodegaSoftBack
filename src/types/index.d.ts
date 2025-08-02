import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        roleId: string;
        tenantId: string;
        userName: string;
      };
    }
  }
}
export { };
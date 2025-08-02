import { Router } from "express";
import { loginUser, registerUser, selectCompanyAndLogin } from "./auth.controller";

const router = Router();

router
    .get("/login", loginUser)
    .get("/selectCompany", selectCompanyAndLogin)
    .post("/register", registerUser);

export { router as authRoutes };
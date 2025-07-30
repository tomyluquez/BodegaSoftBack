import { Router } from "express";
import { getAllTenants } from "./tenants.controller";

const router = Router();

router.get("/getAlltenants", getAllTenants);

export { router as tenantsRoutes };


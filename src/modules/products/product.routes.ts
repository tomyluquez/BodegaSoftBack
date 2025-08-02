import { Router } from "express";
import { getPaginatedProducts } from "./product.controller";

const router = Router();

router.get("/getPaginatedProducts", getPaginatedProducts);

export { router as productRoutes };
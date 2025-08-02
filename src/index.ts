import express, { application, Request, Response } from "express";
import cors from "cors";
import { tenantsRoutes } from "./modules/tenants/tenants.routes";
import { productRoutes } from "./modules/products/product.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { authMiddleware } from "./middlewares/auth-middleware";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use(authMiddleware);

app.use("/api/tenants", tenantsRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Servidor en http://localhost:${PORT}`));

// export default app;

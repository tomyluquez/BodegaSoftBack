import express, { application, Request, Response } from "express";
import cors from "cors";
import { tenantsRoutes } from "./modules/tenants/tenants.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tenants", tenantsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor en http://localhost:${PORT}`));

// export default app;

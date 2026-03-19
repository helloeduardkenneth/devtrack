
import cors from "cors";
import express, { type Express } from "express";
import swaggerUi from "swagger-ui-express";
import AUTH_ROUTER from "./src/modules/auth/auth.routes";
import { swaggerSpec } from "./src/shared/config/swagger";

const app: Express = express();
const DEFAULT_PORT: number = 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/auth", AUTH_ROUTER);

if (process.env.NODE_ENV !== "test") {
  app.listen(DEFAULT_PORT, () => {
    console.log(`Server is running on port ${DEFAULT_PORT}`);
    console.log(`Swagger docs available at http://localhost:${DEFAULT_PORT}/api-docs`);
  });
}

export default app;

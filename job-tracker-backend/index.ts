
import express, { type Express } from "express";
import AUTH_ROUTER from "./src/modules/auth/auth.routes";

const app: Express = express();
const DEFAULT_PORT: number = 3000;

app.use(express.json());

app.use("/auth", AUTH_ROUTER);

if (process.env.NODE_ENV !== "test") {
  app.listen(DEFAULT_PORT, () => {
    console.log(`Server is running on port ${DEFAULT_PORT}`);
  });
}

export default app;

import { Router } from "express";
import { signIn, signUp } from "./auth.controller";

const router = Router();

// Registers a new user and returns a JWT
router.post("/signup", signUp);

// Authenticates a user and returns a JWT
router.post("/signin", signIn);

export default router;

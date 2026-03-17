import type { Request, Response } from "express";

import type { ISignInRequestBody, ISignUpRequestBody } from "./auth.types";
import { SignInSchema, SignUpSchema } from "./auth.validation";
import { authenticateUser, createUser } from "./auth.service";

export const signUp = async (
  req: Request<{}, {}, ISignUpRequestBody>,
  res: Response,
) => {
  try {
    const validation = SignUpSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        error: "Validation failed.",
        details: validation.error.issues,
      });
    }

    const user = await createUser(validation.data);

    if (!user) {
      return res.status(409).json({ error: "Email already in use." });
    }

    return res.status(201).json(user);
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const signIn = async (
  req: Request<{}, {}, ISignInRequestBody>,
  res: Response,
) => {
  try {
    const validation = SignInSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        error: "Validation failed.",
        details: validation.error.issues,
      });
    }

    const result = await authenticateUser(validation.data);
    if (!result) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

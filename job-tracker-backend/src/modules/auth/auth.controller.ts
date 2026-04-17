import type { Request, Response } from "express";

import { verifyToken, type ITokenPayload } from "../../shared/helpers/jwt";
import { authenticateUser, createUser, getUserById } from "./auth.service";
import type { ISignInRequestBody, ISignUpRequestBody } from "./auth.types";
import { SignInSchema, SignUpSchema } from "./auth.validation";

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

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const token = authHeader.split(" ")[1];

    console.log(token);

    if (!token) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const payload = verifyToken(token) as ITokenPayload;

    const user = await getUserById(payload.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      user_id: user.id,
      email: user.email,
      full_name: user.full_name,
      current_job: user.current_job,
    });
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

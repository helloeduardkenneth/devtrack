import { prisma } from "../../db/prisma";
import { generateToken } from "../../shared/helpers/jwt";
import { comparePassword, hashPassword } from "../../shared/helpers/password";

import type {
  IAuthResult,
  ISignInRequestBody,
  ISignUpRequestBody,
} from "./auth.types";


// Create a new user in the database 
// and return the user data along with a JWT token

export const createUser = async (
  data: ISignUpRequestBody,
): Promise<IAuthResult | null> => {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existing) return null;

  const user = await prisma.user.create({
    data: {
      email: data.email,
      full_name: data.full_name,
      password: await hashPassword(data.password),
    },
    select: {
      id: true,
      email: true,
      full_name: true,
    },
  });

  const token = generateToken({ userId: user.id, email: user.email });

  return { user, token };
};

// Authenticate a user by verifying their email and password,
// and return the user data along with a JWT token if successful

export const authenticateUser = async (
  data: ISignInRequestBody,
): Promise<IAuthResult | null> => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) return null;

  const isPasswordValid = await comparePassword(data.password, user.password);
  if (!isPasswordValid) return null;

  const safeUser = {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
  };

  const token = generateToken({ userId: user.id, email: user.email });

  return { user: safeUser, token };
};

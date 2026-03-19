import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";

// Load JWT configuration from environment variables
const JWT_EXPIRES_IN: SignOptions["expiresIn"] =
  (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) ?? "7d";
const JWT_ISSUER = process.env.JWT_ISSUER;
const JWT_AUDIENCE = process.env.JWT_AUDIENCE;

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }
  return secret;
};

const baseOptions: SignOptions = {
  algorithm: "HS256",
  expiresIn: JWT_EXPIRES_IN,
  ...(JWT_ISSUER ? { issuer: JWT_ISSUER } : {}),
  ...(JWT_AUDIENCE ? { audience: JWT_AUDIENCE } : {}),
};

/**
 * Payload structure for JWT token
 */
export interface ITokenPayload {
  userId: number;
  email: string;
}

/**
 * Generate a JWT token for the given user payload
 */
export const generateToken = (payload: ITokenPayload): string => {
  return jwt.sign(payload, getJwtSecret(), baseOptions);
};

/**
 * Verify a JWT token and return its payload
 */
export const verifyToken = (token: string): JwtPayload | ITokenPayload => {
  return jwt.verify(token, getJwtSecret(), {
    ...(JWT_ISSUER ? { issuer: JWT_ISSUER } : {}),
    ...(JWT_AUDIENCE ? { audience: JWT_AUDIENCE } : {}),
  }) as JwtPayload | ITokenPayload;
};

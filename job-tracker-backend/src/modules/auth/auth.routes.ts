import { Router } from "express";
import { getUserProfile, signIn, signUp } from "./auth.controller";

const router = Router();

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     description: Creates a new user account and returns user details plus a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - email
 *               - password
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: eduard@example.com
 *               current_job:
 *                 type: string
 *                 description: Optional. If omitted or empty, defaults to "Unemployed".
 *                 example: Software Engineer
 *               password:
 *                 type: string
 *                 format: password
 *                 example: secret123
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation failed
 *       409:
 *         description: Email already in use
 */
router.post("/signup", signUp);

/**
 * @openapi
 * /auth/signin:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Sign in user
 *     description: Authenticates user credentials and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Authentication successful
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Invalid email or password
 */
router.post("/signin", signIn);

/**
 * @openapi
 * /auth/profile:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get current user profile
 *     description: Returns the authenticated user's profile details.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: john@example.com
 *                 full_name:
 *                   type: string
 *                   nullable: true
 *                   example: John Doe
 *                 current_job:
 *                   type: string
 *                   example: Frontend Developer
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get("/profile", getUserProfile);

export default router;

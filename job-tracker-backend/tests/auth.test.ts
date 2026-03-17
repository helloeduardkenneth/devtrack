import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import app from "../index";
import { prisma } from "../src/db/prisma";

const makeEmail = () => `test_${Date.now()}@example.com`;

describe("/auth", () => {
  const email = makeEmail();
  const password = "Password123!";
  const full_name = "Test User";

  // Ensure a clean state so the signup test isn't affected by existing users
  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email } });
  });

  // Clean up test data and close DB connection after tests finish
  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email } });
    await prisma.$disconnect();
  });

  // Verifies that /auth/signup creates a user and returns a JWT token
  it("should signup", async () => {
    const res = await request(app)
      .post("/auth/signup")
      .send({ email, password, full_name });

    expect(res.status).toBe(201);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.email).toBe(email);
    expect(res.body.token).toBeDefined();
  });

  // Verifies that /auth/signin authenticates and returns a JWT token
  it("should signin", async () => {
    const res = await request(app)
      .post("/auth/signin")
      .send({ email, password });

    expect(res.status).toBe(200);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.email).toBe(email);
    expect(res.body.token).toBeDefined();
  });
});

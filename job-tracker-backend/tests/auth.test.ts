import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import app from "../server";
import { prisma } from "../src/db/prisma";

const makeEmail = () => `test_${Date.now()}@example.com`;

describe("/auth", () => {
  const email = makeEmail();
  const password = "Password123!";
  const full_name = "Test User";

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email } });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email } });
    await prisma.$disconnect();
  });

  it("should signup", async () => {
    const res = await request(app)
      .post("/auth/signup")
      .send({
        email,
        password,
        full_name,
        current_job: "Software Engineer",
      });

    expect(res.status).toBe(201);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.email).toBe(email);
    expect(res.body.token).toBeDefined();
  });

  it("should signin", async () => {
    const res = await request(app)
      .post("/auth/signin")
      .send({ email, password });

    expect(res.status).toBe(200);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.email).toBe(email);
    expect(res.body.user.current_job).toBeDefined();
    expect(res.body.token).toBeDefined();
  });

  it("should return profile for authenticated user", async () => {
    const signinRes = await request(app)
      .post("/auth/signin")
      .send({ email, password });

    const token = signinRes.body.token as string;

    const res = await request(app)
      .get("/auth/profile")
      .set("Authorization", `Bearer ${token}`);

    expect([200, 201]).toContain(res.status);
    expect(res.body.email).toBe(email);
    expect(res.body.full_name).toBe(full_name);
    expect(res.body.current_job).toBeDefined();
  });

  it("should return 401 when /auth/profile has no token", async () => {
    const res = await request(app).get("/auth/profile");

    expect(res.status).toBe(401);
  });

  it("should return 401 when /auth/profile token is invalid", async () => {
    const res = await request(app)
      .get("/auth/profile")
      .set("Authorization", "Bearer invalid.token.value");

    expect(res.status).toBe(401);
  });
});

import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import app from "../server";
import { prisma } from "../src/db/prisma";

const makeEmail = () => `application_test_${Date.now()}@example.com`;

describe("/applications", () => {
  const email = makeEmail();
  const password = "Password123!";
  const full_name = "Application Test User";

  let token = "";
  let userId = 0;
  let applicationId = 0;

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email } });

    const signUpRes = await request(app).post("/auth/signup").send({
      email,
      password,
      full_name,
      current_job: "Frontend Developer",
    });

    expect(signUpRes.status).toBe(201);

    token = signUpRes.body.token as string;
    userId = signUpRes.body.user.id as number;
  });

  afterAll(async () => {
    if (userId) {
      await prisma.application.deleteMany({ where: { user_id: userId } });
    }

    await prisma.user.deleteMany({ where: { email } });
    await prisma.$disconnect();
  });

  it("should create application", async () => {
    const res = await request(app)
      .post("/applications")
      .set("Authorization", `Bearer ${token}`)
      .send({
        company: "GCash",
        position: "Senior Frontend Engineer",
        jobUrl: "https://example.com/jobs/123",
        location: "BGC, Taguig",
        jobType: "Full-time",
        workMode: "Hybrid",
        salaryMin: 120000,
        salaryMax: 180000,
        status: "Applied",
        appliedDate: "2026-03-24",
        priority: "High",
        source: "Jobstreet",
        jobDescription: "Build and maintain frontend features.",
        requirements: "React, TypeScript",
        notes: "Priority application",
        recruiterName: "Jane Recruiter",
        recruiterEmail: "jane@example.com",
        recruiterPhone: "+63 917 123 4567",
      });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.company).toBe("GCash");
    expect(res.body.position).toBe("Senior Frontend Engineer");
    expect(res.body.source).toBe("JOBSTREET");

    applicationId = res.body.id as number;
  });

  it("should list applications for current user", async () => {
    const res = await request(app)
      .get("/applications")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    const found = res.body.find((item: { id: number }) => item.id === applicationId);
    expect(found).toBeDefined();
  });

  it("should get application by id", async () => {
    const res = await request(app)
      .get(`/applications/${applicationId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(applicationId);
    expect(res.body.company).toBe("GCash");
  });

  it("should update application by id", async () => {
    const res = await request(app)
      .patch(`/applications/${applicationId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        status: "Technical",
        priority: "Medium",
        notes: "Passed initial screening",
      });

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(applicationId);
    expect(res.body.status).toBe("TECHNICAL");
    expect(res.body.priority).toBe("MEDIUM");
    expect(res.body.notes).toBe("Passed initial screening");
  });

  it("should return 401 when creating without token", async () => {
    const res = await request(app).post("/applications").send({
      company: "No Token Inc",
      position: "Backend Engineer",
      appliedDate: "2026-03-24",
    });

    expect(res.status).toBe(401);
  });

  it("should delete application by id", async () => {
    const res = await request(app)
      .delete(`/applications/${applicationId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Application deleted successfully.");
  });

  it("should return 404 when fetching deleted application", async () => {
    const res = await request(app)
      .get(`/applications/${applicationId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(404);
  });
});

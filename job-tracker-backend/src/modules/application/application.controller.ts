import type { Request, Response } from "express";

import { verifyToken, type ITokenPayload } from "../../shared/helpers/jwt";
import {
  createApplication as createApplicationService,
  deleteApplicationById as deleteApplicationByIdService,
  getApplicationById as getApplicationByIdService,
  listApplications as listApplicationsService,
  updateApplicationById as updateApplicationByIdService,
} from "./application.service";
import type {
  ICreateApplicationRequestBody,
  IUpdateApplicationRequestBody,
} from "./application.types";
import {
  CreateApplicationSchema,
  UpdateApplicationSchema,
} from "./application.validation";

const getUserIdFromRequest = (req: Request): number | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];
  if (!token) return null;

  const payload = verifyToken(token) as ITokenPayload;
  return payload.userId;
};

export const createApplication = async (
  req: Request<{}, {}, ICreateApplicationRequestBody>,
  res: Response,
) => {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized." });

    const validation = CreateApplicationSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        error: "Validation failed.",
        details: validation.error.issues,
      });
    }

    const created = await createApplicationService(userId, validation.data);
    return res.status(201).json(created);
  } catch (error) {
    console.error("Create application error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const listApplications = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized." });

    const rows = await listApplicationsService(userId);
    return res.status(200).json(rows);
  } catch (error) {
    console.error("List applications error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getApplicationById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized." });

    const applicationId = Number(req.params.id);
    if (Number.isNaN(applicationId)) {
      return res.status(400).json({ error: "Invalid application id." });
    }

    const row = await getApplicationByIdService(userId, applicationId);
    if (!row) return res.status(404).json({ error: "Application not found." });

    return res.status(200).json(row);
  } catch (error) {
    console.error("Get application error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const updateApplicationById = async (
  req: Request<{ id: string }, {}, IUpdateApplicationRequestBody>,
  res: Response,
) => {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized." });

    const applicationId = Number(req.params.id);
    if (Number.isNaN(applicationId)) {
      return res.status(400).json({ error: "Invalid application id." });
    }

    const validation = UpdateApplicationSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        error: "Validation failed.",
        details: validation.error.issues,
      });
    }

    const updated = await updateApplicationByIdService(userId, applicationId, validation.data);
    if (!updated) return res.status(404).json({ error: "Application not found." });

    return res.status(200).json(updated);
  } catch (error) {
    console.error("Update application error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const deleteApplicationById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized." });

    const applicationId = Number(req.params.id);
    if (Number.isNaN(applicationId)) {
      return res.status(400).json({ error: "Invalid application id." });
    }

    const deleted = await deleteApplicationByIdService(userId, applicationId);
    if (!deleted) return res.status(404).json({ error: "Application not found." });

    return res.status(200).json({ message: "Application deleted successfully." });
  } catch (error) {
    console.error("Delete application error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

import { Router } from "express";
import {
  createApplication,
  deleteApplicationById,
  getApplicationById,
  listApplications,
  updateApplicationById,
} from "./application.controller";

const router = Router();

/**
 * @openapi
 * /applications:
 *   get:
 *     tags:
 *       - Applications
 *     summary: List applications of current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Applications fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", listApplications);

/**
 * @openapi
 * /applications:
 *   post:
 *     tags:
 *       - Applications
 *     summary: Create a new application
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company
 *               - position
 *               - appliedDate
 *             properties:
 *               company:
 *                 type: string
 *                 example: GCash
 *               companyLogoUrl:
 *                 type: string
 *                 nullable: true
 *                 example: https://logo.clearbit.com/gcash.com
 *               position:
 *                 type: string
 *                 example: Senior Frontend Engineer
 *               jobUrl:
 *                 type: string
 *                 nullable: true
 *                 example: https://example.com/jobs/123
 *               location:
 *                 type: string
 *                 nullable: true
 *                 example: BGC, Taguig
 *               jobType:
 *                 type: string
 *                 enum: [Full-time, Contract, Part-time, Internship]
 *               workMode:
 *                 type: string
 *                 enum: [Remote, Hybrid, On-site]
 *               salaryMin:
 *                 type: integer
 *                 nullable: true
 *                 example: 120000
 *               salaryMax:
 *                 type: integer
 *                 nullable: true
 *                 example: 180000
 *               status:
 *                 type: string
 *                 enum: [Applied, Phone Screen, Technical, Onsite, Offer, Rejected]
 *               appliedDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-03-24
 *               priority:
 *                 type: string
 *                 enum: [High, Medium, Low]
 *               source:
 *                 type: string
 *                 enum: [LinkedIn, Indeed, Jobstreet, Company Website, Referral, Other]
 *               jobDescription:
 *                 type: string
 *                 nullable: true
 *               requirements:
 *                 type: string
 *                 nullable: true
 *               notes:
 *                 type: string
 *                 nullable: true
 *               recruiterName:
 *                 type: string
 *                 nullable: true
 *               recruiterEmail:
 *                 type: string
 *                 format: email
 *                 nullable: true
 *               recruiterPhone:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Application created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */
router.post("/", createApplication);

/**
 * @openapi
 * /applications/{id}:
 *   get:
 *     tags:
 *       - Applications
 *     summary: Get application by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Application fetched successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Application not found
 */
router.get("/:id", getApplicationById);

/**
 * @openapi
 * /applications/{id}:
 *   patch:
 *     tags:
 *       - Applications
 *     summary: Update application by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *               position:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Applied, Phone Screen, Technical, Onsite, Offer, Rejected]
 *               priority:
 *                 type: string
 *                 enum: [High, Medium, Low]
 *               source:
 *                 type: string
 *                 enum: [LinkedIn, Indeed, Jobstreet, Company Website, Referral, Other]
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Application updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Application not found
 */
router.patch("/:id", updateApplicationById);

/**
 * @openapi
 * /applications/{id}:
 *   delete:
 *     tags:
 *       - Applications
 *     summary: Delete application by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Application deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Application not found
 */
router.delete("/:id", deleteApplicationById);

export default router;

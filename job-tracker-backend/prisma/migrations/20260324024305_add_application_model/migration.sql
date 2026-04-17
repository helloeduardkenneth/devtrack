/*
  Warnings:

  - Added the required column `applied_date` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ApplicationJobType" AS ENUM ('FULL_TIME', 'CONTRACT', 'PART_TIME', 'INTERNSHIP');

-- CreateEnum
CREATE TYPE "ApplicationWorkMode" AS ENUM ('REMOTE', 'HYBRID', 'ON_SITE');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('APPLIED', 'PHONE_SCREEN', 'TECHNICAL', 'ONSITE', 'OFFER', 'REJECTED');

-- CreateEnum
CREATE TYPE "ApplicationPriority" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "ApplicationSource" AS ENUM ('LINKEDIN', 'INDEED', 'COMPANY_WEBSITE', 'REFERRAL', 'OTHER');

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "applied_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "company_logo_url" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "job_description" TEXT,
ADD COLUMN     "job_type" "ApplicationJobType" NOT NULL DEFAULT 'FULL_TIME',
ADD COLUMN     "job_url" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "position" TEXT NOT NULL,
ADD COLUMN     "priority" "ApplicationPriority" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "recruiter_email" TEXT,
ADD COLUMN     "recruiter_name" TEXT,
ADD COLUMN     "recruiter_phone" TEXT,
ADD COLUMN     "requirements" TEXT,
ADD COLUMN     "salary_max" INTEGER,
ADD COLUMN     "salary_min" INTEGER,
ADD COLUMN     "source" "ApplicationSource" NOT NULL DEFAULT 'LINKEDIN',
ADD COLUMN     "status" "ApplicationStatus" NOT NULL DEFAULT 'APPLIED',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD COLUMN     "work_mode" "ApplicationWorkMode" NOT NULL DEFAULT 'REMOTE';

-- CreateIndex
CREATE INDEX "Application_user_id_idx" ON "Application"("user_id");

-- CreateIndex
CREATE INDEX "Application_status_idx" ON "Application"("status");

-- CreateIndex
CREATE INDEX "Application_applied_date_idx" ON "Application"("applied_date");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

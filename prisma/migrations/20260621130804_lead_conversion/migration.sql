-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "converted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "projectId" TEXT;

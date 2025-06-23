/*
  Warnings:

  - Added the required column `terms_drive_id` to the `depoimentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "depoimentos" ADD COLUMN     "terms_drive_id" TEXT NOT NULL;

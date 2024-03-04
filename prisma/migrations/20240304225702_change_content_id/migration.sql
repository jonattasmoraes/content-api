/*
  Warnings:

  - The primary key for the `api_content` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "api_content" DROP CONSTRAINT "api_content_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "api_content_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "api_content_id_seq";

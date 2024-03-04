/*
  Warnings:

  - The primary key for the `api_content` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `api_content` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `avatar` to the `api_content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `banner` to the `api_content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "api_content" DROP CONSTRAINT "api_content_pkey",
ADD COLUMN     "avatar" TEXT NOT NULL,
ADD COLUMN     "banner" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "api_content_pkey" PRIMARY KEY ("id");

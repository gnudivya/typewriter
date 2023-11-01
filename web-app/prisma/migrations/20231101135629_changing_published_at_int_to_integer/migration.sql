/*
  Warnings:

  - Added the required column `published_at_int` to the `DevToFeeds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DevToFeeds" DROP COLUMN "published_at_int",
ADD COLUMN     "published_at_int" INTEGER NOT NULL;

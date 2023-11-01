/*
  Warnings:

  - Added the required column `article_id` to the `DevToFeeds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DevToFeeds" DROP COLUMN "article_id",
ADD COLUMN     "article_id" INTEGER NOT NULL;

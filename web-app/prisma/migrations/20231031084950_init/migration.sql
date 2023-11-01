-- CreateTable
CREATE TABLE "YoutubeUrls" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "url" TEXT,

    CONSTRAINT "YoutubeUrls_pkey" PRIMARY KEY ("id")
);

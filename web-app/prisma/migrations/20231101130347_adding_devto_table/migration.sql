-- CreateTable
CREATE TABLE "DevToFeeds" (
    "id" SERIAL NOT NULL,
    "path" TEXT,
    "title" TEXT,
    "published_at_int" TEXT,
    "tag_list" TEXT[],

    CONSTRAINT "DevToFeeds_pkey" PRIMARY KEY ("id")
);

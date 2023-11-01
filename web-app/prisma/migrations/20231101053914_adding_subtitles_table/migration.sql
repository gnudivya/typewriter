-- CreateTable
CREATE TABLE "YoutubeSubtitles" (
    "id" SERIAL NOT NULL,
    "youtubeUrlId" INTEGER NOT NULL,
    "start" TEXT,
    "dur" TEXT,
    "text" TEXT,

    CONSTRAINT "YoutubeSubtitles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "YoutubeSubtitles" ADD CONSTRAINT "YoutubeSubtitles_youtubeUrlId_fkey" FOREIGN KEY ("youtubeUrlId") REFERENCES "YoutubeUrls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
declare var require: any
var getSubtitles = require('youtube-captions-scraper').getSubtitles;

const run = async () => {

  const firstItem: any = await prisma.youtubeUrls.findFirst({
    orderBy: {
      id: 'asc',
    },
    take: 1,
  })
  const lastItem: any = await prisma.youtubeUrls.findFirst({
    orderBy: {
      id: 'desc',
    },
    take: 1,
  })

  for (let cursor = firstItem.id; cursor <= lastItem.id; cursor++) {
    let results = await prisma.youtubeUrls.findFirst({
      take: 1,
      cursor: { id: cursor }
    })
    // console.log(results)
    try {
      const subtitles = await getSubtitles({
        videoID: results?.url?.split('?v=')[1],
        lang: 'en' // default: `en`
      })
      const inserted = await prisma.youtubeSubtitles.createMany({
        data: subtitles.map((item: any) => ({ ...item, youtubeUrlId: results?.id }))
      })
      console.log(inserted, '---------' ,cursor)
    } catch (e) {
      console.log(e)
    }

  }

  // getSubtitles({
  //   videoID: 'vHwVttzYiYk', // youtube video id
  //   lang: 'en' // default: `en`
  // }).then((captions: any) => {
  //   console.log(captions);
  // });


}

run().then(console.log).catch(console.error);

// prisma.youtubeSubtitles.deleteMany({}).then(console.log).catch(console.error);

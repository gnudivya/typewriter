import { PrismaClient } from '@prisma/client'
import { videos } from './AlexKaltsMotivation'

const prisma = new PrismaClient()

const run = async () => {

    const result = await prisma.youtubeUrls.createMany({
        data: videos.map(item => ({...item, title: decodeURIComponent( item.title) }))
    })
    console.log(result) 

}

run().then(console.log).catch(console.error);
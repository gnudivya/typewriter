import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


var requestOptions: any = {
    method: 'GET',
    redirect: 'follow'
};

const run = async () => {
    try {
        const prisma = new PrismaClient();
        const latestPost = await prisma.devToFeeds.findFirst({
            orderBy: { published_at_int: 'desc'},
        })
        for(let i=1; i<5001; i=i+100) {
            const url = `https://dev.to/search/feed_content?per_page=100&page=${i}`;
            const apiCall = await fetch(url, requestOptions);
            const response = await apiCall.json();
            const result: any = response;
            if (result && result.result) {
                const apiCallPublishedAt = result.result.map((item: any) => item.published_at_int).sort((a: any, b: any) => b - a)[0];
                if( (latestPost?.published_at_int || 0) >= apiCallPublishedAt ) {
                    console.log(`Latest post is filled into DB. Latest post on DB ${JSON.stringify(latestPost)} . Latest post on response ${JSON.stringify(apiCallPublishedAt)} . ${latestPost?.published_at_int } >= ${apiCallPublishedAt} is  ${(latestPost?.published_at_int || 0) > apiCallPublishedAt}`);
                    break;
                }
                console.log(`Result count ${result.result.length} for making api call ${url}`);
                await prisma.devToFeeds.createMany({
                    data: result.result.map((item: any) => {
                        return {
                            article_id: item.id,
                            path: item.path,
                            title: item.title,
                            published_at_int: item.published_at_int,
                            tag_list: item.tag_list
                        }
                    })
                })
            } else {
                console.log(`No Data came form api call ${url} . response: ${result}`)
            }
        }
    } catch(e) {
        console.error(e);
    }
}

run().then(console.log).catch(console.error);


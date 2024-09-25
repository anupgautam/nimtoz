import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const initialPosts: Prisma.PostCreateInput[] = [
    {
        title: "Hello World!",
        slug: 'hello-world',
        content: "Written by Programming God himself, Hello World! is the first post that you see in your post table.",
        // author: {
        //     connectOrCreate: {
        //         where: {
        //             email: "lemon@gmail.com",
        //         },
        //         create: {
        //             email: "lemon@gmail.com",
        //             hashedPassword: "asdf23t23235ln23k5h23k5k",
        //         }
        //     }
        // }
    }
]

async function main() {
    console.log(`Start seeding...`)

    for (const post of initialPosts) {
        const newPost = await prisma.post.create({
            data: post,
        });
        console.log(`Created post with id: ${newPost.id}`);
    }
    console.log(`Seeding finished`)
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
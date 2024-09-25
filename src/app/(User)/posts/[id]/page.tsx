
import prisma from '@/lib/db';
import Link from 'next/link';

// interface Post {
//     id: string;
//     title: string;
// }
const PostPage = async ({ params }: { params: { id: string } }) => {

    // const post = await prisma.post.findUnique({
    //     where: {
    //         id: params.id,
    //     }
    // })

    const id = parseInt(params.id,10)
    const post = await prisma.post.findUnique({
        where: {
            id: id,
        }
    })

    return (
        <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
            <h1 className="text-3xl font-semibold">
                {post?.title}
            </h1>
            <p>{post?.content}</p>
        </main>
    )
}
export default PostPage 
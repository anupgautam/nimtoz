import { createPost } from '@/actions/actions';
import prisma from '@/lib/db';
import Link from 'next/link';

// interface Post {
//     id: string;
//     title: string;
// }
const PostsPage = async () => {

    const posts = await prisma.post.findMany();

    //! Kunai Specific user ko post chaiyo
    const user = await prisma.user.findUnique({
        where: {
            email: "lemon@gmail.com",
        },
        include: {
            posts: true,
        }
    })

    //! Filtering
    // const posts = await prisma.post.findMany({
    //     where: {
    //         title: {
    //             // endsWith: "Gautam",
    //         }
    //     },
    //     orderBy: {
    //         createdAt: "desc"
    //     },
    //     select: {
    //         id: true,
    //         title: true,
    //         slug: true,
    //     },
    //     // take: 1,
    //     // skip: 1,
    // });

    const postsCount = await prisma.post.count();
    return (
        <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
            <h1 className="text-3xl font-semibold">
                All Posts({user.postsCount})
            </h1>
            <ul className="border-t border-b border-black/10 py-5 leading-8">
                {user.posts.map((post: { id: number; title: string; slug: string }) => (
                    <li key={post.id} className="flex items-center justify-between px-5">
                        <Link href={`/posts/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>

            <form action={createPost} className='flex flex-col gap-y-2 w-[300px]'>
                <input type="text"
                    name="title"
                    placeholder="Title"
                    className="px-2 py-1 rounded-sm"
                />
                <textarea name="content" rows={5} placeholder='Content' className="px-2 py-1 rounded-sm" />
                <button type="submit" className="bg-blue-500 py-2 text-white rounded-sm"> Create Post</button>
            </form>
        </main>
    )
}
export default PostsPage 
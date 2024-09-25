"use server";

import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

//! CreatePost
export async function createPost(formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!title || typeof title !== 'string') {
        throw new Error('Title is required and must be a string.');
    }
    if (!content || typeof content !== 'string') {
        throw new Error('Content is required and must be a string.');
    }

    const slug = title
        .replace(/\s+/g, "-") // Corrected the regex syntax
        .toLowerCase();

    try {
        const post = await prisma.post.create({
            data: {
                title: title,
                slug: slug,
                content: content,
                author: {
                    connect: {
                        email: "piyushchutiya@gmail.com"
                    }
                }
            },
        });
        revalidatePath('/posts')
        return post; // Optionally return the created post
    } catch (error) {
        console.error('Error creating post:', error);
        throw error; // Rethrow or handle the error accordingly
    }
}

//! EditPost
export async function editPost(formData: FormData, id: number) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!title || typeof title !== 'string') {
        throw new Error('Title is required and must be a string.');
    }
    if (!content || typeof content !== 'string') {
        throw new Error('Content is required and must be a string.');
    }

    const slug = title
        .replace(/\s+/g, "-") // Corrected the regex syntax
        .toLowerCase();

    try {
        const updatePost = await prisma.post.update({
            where: { id },
            data: {
                title: title,
                content: content,
                slug: slug,
            }
        })
    }
    catch (error) {
        console.error('Error editing post:', error);
        throw error; // Rethrow or handle the error accordingly
    }
}

//! DeletePost
export async function deletePost(id: number) {
    await prisma.post.delete({ where: { id } })
}

//! Create Blog
export async function createBlog(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as string;
    const author = formData.get('author') as string;

    if (!title || typeof title !== 'string') {
        throw new Error('Title is required and must be a string.');
    }
    if (!description || typeof description !== 'string') {
        throw new Error('Description is required and must be a string.');
    }

    const short_description = title.split(" ").slice(0, 2).join(" ");

    try {
        const blog = await prisma.blog.create({
            data: {
                title: title,
                short_description: short_description,
                description: description,
                image: image,
                author: author,
            }
        })
        revalidatePath('/blog')
        return blog;
    }
    catch (error) {
        console.error("Error creating blog:", error)
        throw error;
    }
}


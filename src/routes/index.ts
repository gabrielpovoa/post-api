import { Request, Response, Router } from 'express';
import { useScheme } from '../zod';
import { DataType } from '../types/DataType';
import { readPosts, savePosts } from '../services/fs.functions';

const router = Router();


router.get('/posts', async (req: Request, res: Response) => {
    const posts = await readPosts();
    res.status(200).json({ data: posts });
});

router.post('/posts', async (req: Request, res: Response) => {
    const { title, content, author, category, views, status }: DataType = req.body;

    if (!title || !content) {
        res.status(400).json({
            error: {
                code: 400,
                message: "You need to send at least the title and content to post! ",
                details: {
                    missingFields: {
                        title: !title,
                        content: !content
                    }
                }
            }
        });
        return;
    }

    const validated = useScheme({ title, content, author, category, views, status });
    const posts = await readPosts();
    posts.push(validated);
    await savePosts(posts);

    res.status(201).json({ data: posts });
});

router.delete('/posts', async (req: Request, res: Response) => {
    const { title }: { title: string } = req.body;

    if (!title) {
        res.status(400).json({
            error: {
                code: 400,
                message: "You need to send the title to delete a post! ",
                details: {
                    missingFields: {
                        title: !title
                    }
                }
            }
        });
        return;
    }

    const posts = await readPosts();
    const index = posts.findIndex(post => post.title === title);

    if (index === -1) {
        res.status(404).json({
            error: {
                code: 404,
                message: "Post not found! ",
                details: { title }
            }
        });
        return;
    }

    posts.splice(index, 1);
    await savePosts(posts);

    res.status(200).json({ data: posts });
});

export default router;

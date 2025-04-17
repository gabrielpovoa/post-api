import z from 'zod';
import { DataType } from '../types/DataType';

export const schema = z.object({
    title: z.string().min(5, { message: 'O título deve ter no mínimo 5 caracteres' }),
    content: z.string().min(10, { message: 'O conteúdo do post deve ter no mínimo 10 caracteres' }),
    author: z.string().min(2, { message: 'O nome do autor deve ter no mínimo 2 caracteres' }),
    category: z.string().min(5, { message: 'A categoria deve ter no mínimo 5 caracteres' }),
    views: z.number().int().min(0, { message: 'Visualizações devem ser >= 0' }),
    status: z.boolean().default(false)
});

export const useScheme = (item: DataType) => {
    const result = schema.safeParse(item);

    if (!result.success) {
        throw result.error;
    }

    return result.data;
};
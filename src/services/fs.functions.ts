import { promises as fs } from 'fs';
import path from 'path';
import { DataType } from '../types/DataType';

const filePath = path.join(__dirname, '..', 'data', 'posts.json');
const dirPath = path.dirname(filePath);

export const readPosts = async (): Promise<DataType[]> => {
    try {
        // Verifica se o diretório existe, senão cria
        await fs.mkdir(dirPath, { recursive: true });

        // Verifica se o arquivo existe
        try {
            await fs.access(filePath);
        } catch {
            // Se não existir, cria com um array vazio
            await fs.writeFile(filePath, '[]', 'utf-8');
        }

        // Agora lê o arquivo
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao ler posts:', error);
        return [];
    }
};

// Função para salvar os posts no arquivo
export const savePosts = async (posts: DataType[]) => {
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2));
};
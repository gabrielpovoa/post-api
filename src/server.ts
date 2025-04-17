import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import router from './routes';

dotenv.config();

const server = express();

server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, '../public')));

server.use('/', router)


server.listen(process.env.PORT, () => console.log(`🚀 Server on port ${process.env.PORT}`));
server.on('error', err => (console.error('🧨 Error during start:', err), process.exit(1)));
import http from 'http';
import path from 'path';
import { app } from './services/app';
import * as dotenv from 'dotenv';

const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });
const server: http.Server = http.createServer(app);
const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server hosted at PORT: ${PORT}`));

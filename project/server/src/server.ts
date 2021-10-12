import { app } from './services/app';
import http from 'http';
import * as dotenv from 'dotenv';
import path from 'path';

/* --------------------------- SERVER, APP & SOCKET ----------------------------- */

const server: http.Server = http.createServer(app);
const PORT = process.env.PORT;
const envPath = path.resolve(__dirname, '../.env');
server.listen(PORT, () => console.log(`Server hosted at PORT: ${PORT}`));
dotenv.config({ path: envPath }); // Applying dotenv config

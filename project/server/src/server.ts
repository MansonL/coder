import express from 'express';
import http from 'http';
import router from './routes/index';
import cors from 'cors';
import unknownRoute from './utils/routeUndefined';
import { createMockProducts } from './models/DAOs/FS/mockProducts';
import { errorHandler } from './common/ErrorHandler';
import * as dotenv from 'dotenv';
import path from 'path';

/* --------------------------- SERVER, APP & SOCKET ----------------------------- */

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const PORT = 8080;
const envPath = path.resolve(__dirname, '../.env');
server.listen(PORT, () => console.log(`Server hosted at PORT: ${PORT}`));
dotenv.config({ path: envPath }); // Applying dotenv config
console.log(process.env.DB_USER);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', router);
app.use(unknownRoute);
app.use(errorHandler);

createMockProducts(); // This line is just for mocking data to FS Storage

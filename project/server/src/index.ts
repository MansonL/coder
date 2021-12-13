import http from 'http';
import path from 'path';
import { app } from './services/app';
import * as dotenv from 'dotenv'
import { socketConnection } from './services/socket';
import { commandData } from './passport/facebook';




const envPath = path.resolve(__dirname, '../.env');

dotenv.config({ path: envPath });

export const server: http.Server = http.createServer(app);

const PORT = commandData[0] && commandData[0].length  === 4 && !isNaN(Number(commandData[0])) ? Number(commandData[0]) : process.env.PORT; // Checking if the 
// first command argument is valid to use as PORT number.

server.listen(PORT, () => {
    console.log(`Server hosted at PORT: ${PORT}`);
    socketConnection(server);
});

process.on("exit", (code) => {
    console.log(`Process closed. Code ${code}`)
})
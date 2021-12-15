import { fork } from "child_process";

const server1 = fork('./src/services/server.ts');
const server2 = fork('./src/services/server.ts');
const server3 = fork('./src/services/server.ts');

server1.send(8081);
server2.send(8082);
server3.send(8083);
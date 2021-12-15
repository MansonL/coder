"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const server1 = child_process_1.fork('./src/services/server.js');
const server2 = child_process_1.fork('./src/services/server.js');
const server3 = child_process_1.fork('./src/services/server.js');
server1.send(8081);
server2.send(8082);
server3.send(8083);

import { createServer } from "http";
import { app } from "./services/app";

const PORT = 8080;

const server = createServer(app);
server.listen(PORT, () => console.log(`Server hosted at PORT: ${PORT}`));
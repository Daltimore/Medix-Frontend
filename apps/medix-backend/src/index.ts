import { start as startRestServer } from "./app";
import { startWsServer } from "./websocket/server";

const server = startRestServer();
startWsServer(server);

import Nullstack, { NullstackServerContext } from "nullstack";
import { Server } from "socket.io";
import Application from "./src/Application";

const context = Nullstack.start(Application) as NullstackServerContext;

context.start = async function start() {
  const io = new Server(3001, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    // Just re-assuring when user is connected
    socket.emit("connected", "[server to front-end] connected!");

    // On receive a message, send it to everybody
    socket.on("chat message", (msg) => {
      io.emit("chat update", msg);
    });
  });
};

export default context;

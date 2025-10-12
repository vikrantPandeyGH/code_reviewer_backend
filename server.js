import app from "./src/app.js";
import http from "http";
import messagemodel from "./src/models/message.model.js";
import projectModel from "./src/models/project.model.js";
import { Server as SocketServer } from "socket.io";
import { codereviewer } from "./src/services/ai.service.js";
import { constrainedMemory } from "process";




const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("user connected to server successfully");

  const room = socket.handshake.query.project;

  //console.log(room)
  socket.join(room); // ✅ MUST join the room first

  socket.on("disconnect", () => {
    console.log("disconnectet from server");
  });

  socket.on("chat-history", async function () {
    const allmessages = await messagemodel.find({ project: room });
    socket.emit("chat-history", allmessages);
  });

  socket.on("chat-message", async (msg) => {
    console.log(msg);
    socket.broadcast.to(room).emit("chat-message", msg);
    await messagemodel.create({
      project: room,
      text: msg,
    });
  });

  socket.on("code-update", async (code) => {
    socket.broadcast.to(room).emit("code-update", code);
    await projectModel.findOneAndUpdate(
      { _id: room },
      {
        code: code,
      }
    );
  });

  socket.on("get-code", async () => {
    const project = await projectModel.findById(room);
    socket.emit("code-history", project.code || "");
  });

  socket.on("code-review", async function (code) {
    const review = await codereviewer(code);
    socket.emit("code-review", review);
  });
});

// server.listen(3000, function () {
//   console.log("server is running on port 3000");
// });

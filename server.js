import app from "./src/app.js";
import http from "http";
import messagemodel from "./src/models/message.model.js";
import projectModel from "./src/models/project.model.js";
import { Server as SocketServer } from "socket.io";
import { codereviewer } from "./src/services/ai.service.js";

const server = http.createServer(app);

const io = new SocketServer(server, {
  cors: {
    origin: "*", // ya specific frontend URL: 'https://code-reviewer-frontend.vercel.app'
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Room id from frontend query
  const room = socket.handshake.query.project;
  if (!room) return;

  socket.join(room);

  // Disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  // Emit previous messages when a client joins
  socket.on("chat-history", async () => {
    try {
      const allMessages = await messagemodel.find({ project: room }).sort({ createdAt: 1 });
      socket.emit("chat-history", allMessages.map((m) => m.text));
    } catch (err) {
      console.error(err);
    }
  });

  // Save and broadcast new chat messages
  socket.on("chat-message", async (msg) => {
    try {
      await messagemodel.create({ project: room, text: msg });
      io.to(room).emit("chat-message", msg); // Broadcast to everyone in room including sender
    } catch (err) {
      console.error(err);
    }
  });

  // Save and broadcast code updates
  socket.on("code-update", async (code) => {
    try {
      await projectModel.findOneAndUpdate({ _id: room }, { code });
      io.to(room).emit("code-update", code);
    } catch (err) {
      console.error(err);
    }
  });

  // Send current code on request
  socket.on("get-code", async () => {
    try {
      const project = await projectModel.findById(room);
      socket.emit("code-history", project?.code || "");
    } catch (err) {
      console.error(err);
    }
  });

  // AI code review
  socket.on("code-review", async (code) => {
    try {
      const review = await codereviewer(code);
      socket.emit("code-review", review);
    } catch (err) {
      console.error(err);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default server;

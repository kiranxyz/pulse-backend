import { Server } from "socket.io";

const onlineUsers = new Map<string, string>(); // userId → socketId

export default function registerSocketHandlers(io: Server) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Receive userId from frontend after login
    socket.on("register", (userId: string) => {
      onlineUsers.set(userId, socket.id);
      console.log(`User ${userId} registered`);
    });

    // Disconnect logic
    socket.on("disconnect", () => {
      [...onlineUsers.entries()].forEach(([uid, sid]) => {
        if (sid === socket.id) onlineUsers.delete(uid);
      });
      console.log("User disconnected:", socket.id);
    });
  });
}

export { onlineUsers };

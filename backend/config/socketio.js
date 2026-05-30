import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let io = null;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("auth:hospital", (token) => {
      try {
        if (!token) return;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (payload && payload.hospitalId) {
          const room = payload.hospitalId.toString();
          socket.join(room);
          console.log(`Socket ${socket.id} joined hospital room ${room}`);
        }
      } catch (e) {
        console.log("Socket auth failed:", e.message);
      }
    });

    socket.on("auth:admin", (token) => {
      try {
        if (!token) return;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // admin token payload may be a string (email+password) or object; presence means verified
        socket.isAdmin = true;
        console.log(`Socket ${socket.id} authenticated as admin`);
      } catch (e) {
        console.log("Admin socket auth failed:", e.message);
      }
    });

    socket.on("admin:join", (hospitalId) => {
      try {
        if (!socket.isAdmin) return;
        if (!hospitalId) return;
        socket.join(hospitalId.toString());
        console.log(`Admin socket ${socket.id} joined room ${hospitalId}`);
      } catch (e) {
        console.log("admin join error:", e.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => io;

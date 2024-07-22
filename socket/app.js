import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExists = onlineUser.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUser.push({ userId, socketId });
    console.log(`User added: ${userId}`);
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
  console.log(`User disconnected: ${socketId}`);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
      console.log(`Message sent from ${socket.id} to ${receiverId}`);
    } else {
      console.log(`User not found: ${receiverId}`);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen(4000, () => {
  console.log("Socket.io server running on port 4000");
});

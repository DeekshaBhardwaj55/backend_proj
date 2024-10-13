const express = require("express");
const app = express();
const taskRouter = require("./routes/taskRoutes");
const userRouter = require("./routes/userRoutes");

const {
  MONGO_IP,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PASSWORD,
} = require("./config/config");
const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const mongoose = require("mongoose");
mongoose
  .connect(MONGO_URL)
  // ("mongodb://root:root@172.19.0.2:27017/?authSource=admin")
  // ("mongodb://root:root@mongo:27017/?authSource=admin")
  .then(() => {
    console.log("Successfully conected to mongodb");
  })
  .catch((e) => {
    console.log("error");
  });

app.use(express.json());


app.get("/", (req, res) => {
  res.send("<h1>Hello world using Express Docker...</h1>");
});

app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/users", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});

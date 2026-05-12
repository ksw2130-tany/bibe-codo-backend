const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoutes = require("./routers/todoRoutes");

const app = express();
const PORT = process.env.PORT || process.env.port || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI 환경변수가 설정되지 않았습니다.");
  process.exit(1);
}

app.use(express.json());
app.use(cors());

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("연결 성공");

    app.get("/", (req, res) => {
      res.send("Todo backend is running");
    });

    app.use("/todos", todoRoutes);

    app.listen(PORT, () => {
      console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
    });
  } catch (error) {
    console.error("MongoDB 연결 실패:", error.message);
    process.exit(1);
  }
}

startServer();

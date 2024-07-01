require("dotenv").config();
const pool = require("./Server/Config/dbConfig");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const userRouter = require("./Server/api/users/user.router");
const questionRouter = require("./Server/api/question/question.router");
const answerRouter = require("./Server/api/answer/answer.router");

// Middlewares //
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// routings //
app.use("/api/users", userRouter);
app.use("/api/questions", questionRouter);
app.use("/api/answers", answerRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.listen(port, (res, req) =>
  console.log(`Listening at http://localhost:${port}`)
);

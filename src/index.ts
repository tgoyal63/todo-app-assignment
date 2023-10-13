require("dotenv").config();
import express from "express";
import cors from "cors";
import { router } from "./router";
import { errorHandlerMiddleware } from "./middlewares/errorMiddleware";

const PORT: number = Number(process.env.PORT) || 3000;
const app: express.Application = express();

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Cross-Origin Resource Sharing (CORS)
app.use(cors());

// V1 API routes
app.use("/api/v1", router);

//
// app.get("/", (req, res) => {
//   res.send(
//     "<h1>Hi there, wekcome to Todo Assignment Portal. Please use /api/v1/ to access the API.<br>Here is the Postman Documentation: https://documenter.getpostman.com/view/30494926/2s9YR56aWw<h1>"
//   );
// });

app.get("/", (req, res) => {
  res.send(
    `<h1>Hi, Welcome to ToDo Assignment Portal.</h1>
    <h2>Please use /api/v1/ to access the API.</h2>
    <h3>Postman Documentation: <a href="https://documenter.getpostman.com/view/30494926/2s9YR56aWw">HERE</a><h3>
    <h3>Github Repo Link: <a href="https://github.com/tgoyal63/todo-app-assignment">github.com/tgoyal63/todo-app-assignment</a><h3>`
  );
});

// 404 Page not found
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

// Error handling middleware
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error, promise) => {
  console.log(`Error: ${err.message}`);
});

export default app;

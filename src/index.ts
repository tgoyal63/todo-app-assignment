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
import express from "express";
import cors from "cors";
import userRoute from "./src/routers/userRouter.js";
import shortenRouter from "./src/routers/shortenRouter.js";
import dotenv from "dotenv";

dotenv.config();

const app = start();

app.use(userRoute);
app.use(shortenRouter);

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});

function start() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  return app;
}

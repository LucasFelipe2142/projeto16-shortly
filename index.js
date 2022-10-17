import express from "express";
import cors from "cors";
import userRoute from "./src/routers/userRouter.js";
import shortenRouter from "./src/routers/shortenRouter.js";

const app = start();

app.use(userRoute);
app.use(shortenRouter);

app.listen(4000, () => {
  console.log("Server running on port " + 4000);
});

function start() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  return app;
}

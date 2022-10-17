import express from "express";
import { validatePostShorten } from "../midleweres/validations.js";
import { postShorter } from "../controllers/shortenController.js";

const router = express.Router();

router.use("/urls/shorten", validatePostShorten, postShorter);

export default router;

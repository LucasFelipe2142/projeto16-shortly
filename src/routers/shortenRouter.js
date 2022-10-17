import express from "express";
import { validatePostShorten } from "../midleweres/validations.js";
import { postShorter, getShorterId } from "../controllers/shortenController.js";

const router = express.Router();

router.post("/urls/shorten", validatePostShorten, postShorter);
router.get("/urls/:id", getShorterId);

export default router;

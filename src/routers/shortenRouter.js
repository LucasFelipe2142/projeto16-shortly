import express from "express";
import { validatePostShorten } from "../midleweres/validations.js";
import {
  postShorten,
  getShortenId,
  getShortenUrl,
} from "../controllers/shortenController.js";

const router = express.Router();

router.post("/urls/shorten", validatePostShorten, postShorten);
router.get("/urls/:id", getShortenId);
router.get("/urls/open/:shortUrl", getShortenUrl);

export default router;

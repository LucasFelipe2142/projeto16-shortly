import express from "express";
import { validatePostShorten } from "../midleweres/validations.js";
import {
  postShorten,
  getShortenId,
  getShortenUrl,
  deleteShorten,
} from "../controllers/shortenController.js";

const router = express.Router();

router.post("/urls/shorten", validatePostShorten, postShorten);
router.get("/urls/:id", getShortenId);
router.get("/urls/open/:shortUrl", getShortenUrl);
router.delete("/urls/:id", deleteShorten);

export default router;

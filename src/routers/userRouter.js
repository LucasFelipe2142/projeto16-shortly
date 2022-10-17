import { postUser } from "../controllers/usersController.js";
import { validaPostUser } from "../midleweres/validations.js";
import express from "express";

const router = express.Router();

router.use("/singup", validaPostUser, postUser);

export default router;

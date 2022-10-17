import { postUser, postLogin } from "../controllers/usersController.js";
import {
  validaPostUser,
  validatePostLogin,
} from "../midleweres/validations.js";
import express from "express";

const router = express.Router();

router.post("/singup", validaPostUser, postUser);
router.post("/singin", validatePostLogin, postLogin);

export default router;

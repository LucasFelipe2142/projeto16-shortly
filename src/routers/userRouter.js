import {
  postUser,
  postLogin,
  getUserMe,
  getRanking,
} from "../controllers/usersController.js";
import {
  validaPostUser,
  validatePostLogin,
} from "../midleweres/validations.js";
import express from "express";

const router = express.Router();

router.post("/singup", validaPostUser, postUser);
router.post("/singin", validatePostLogin, postLogin);
router.get("/users/me", getUserMe);
router.get("/ranking", getRanking);

export default router;

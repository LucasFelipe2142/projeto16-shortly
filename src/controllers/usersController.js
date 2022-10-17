import connection from "../banco/conection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function postUser(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  const token = bcrypt.hashSync(password, 10);
  if (password !== confirmPassword)
    return res.status(422).send("senhas não são iguáis");

  const verifyEmail = await connection.query(
    `SELECT * FROM users WHERE email LIKE $1;`,
    [email]
  );
  if (verifyEmail.rows.length > 0)
    return res.status(409).send("email ja resgistrado");

  await connection.query(
    `INSERT INTO users (name,email,password) VALUES ($1,$2,$3);`,
    [name, email, token]
  );

  res.sendStatus(201);
}

export async function postLogin(req, res) {
  const { email, password } = req.body;

  const verifyEmail = await connection.query(
    `SELECT * FROM users WHERE email LIKE $1;`,
    [email]
  );
  if (verifyEmail.rows.length === 0)
    return res.status(401).send("email e(ou) senha estão incorretos");

  if (
    verifyEmail.rows[0] &&
    bcrypt.compareSync(password, verifyEmail.rows[0].password)
  ) {
    const token = uuid();

    await connection.query(
      `INSERT INTO logados ("userId",token) VALUES ($1,$2);`,
      [verifyEmail.rows[0].id, token]
    );
    res.status(200).send(token);
  } else res.status(401).send("email e(ou) senha estão incorretos");
}

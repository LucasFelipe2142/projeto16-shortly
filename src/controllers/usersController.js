import connection from "../banco/conection.js";
import bcrypt from "bcrypt";

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

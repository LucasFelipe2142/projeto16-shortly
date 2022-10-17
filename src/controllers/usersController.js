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

export async function getUserMe(req, res) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const verifyToken = await connection.query(
    `SELECT * FROM logados WHERE token LIKE $1;`,
    [token]
  );
  const userId = verifyToken.rows[0].userId;
  console.log(userId);
  if (verifyToken.rows.length === 0) return res.sendStatus(401);
  const getUsers = await connection.query(
    `SELECT users.id,users.name, 
        JSON_BUILD_OBJECT('id',encurtados.id,'shortUrl',encurtados."shortUrl",'url',encurtados.url,'visitCount',encurtados.visits) AS "shortenedUrls"
        FROM users 
      JOIN encurtados ON users.id=encurtados."userId"
      WHERE users.id = $1;`,
    [userId]
  );
  if (getUsers.rows.length === 0) return res.sendStatus(404);
  let aux = {
    id: getUsers.rows[0].id,
    name: getUsers.rows[0].name,
    visitCount: null,
    shortenedUrls: [],
  };
  let visits = 0;
  for (let i = 0; i < getUsers.rows.length; i++) {
    aux.shortenedUrls.push(getUsers.rows[i].shortenedUrls);
    visits += getUsers.rows[i].shortenedUrls.visitCount;
  }
  let newResponse = { ...aux, visitCount: visits };

  res.status(200).send(newResponse);
}

export async function getRanking(req, res) {
  const getUsers = await connection.query(
    `SELECT users.id, users.name, COUNT(encurtados."userId") AS "linksCount", SUM(COALESCE(encurtados.visits,0)) as visitCount FROM users
    LEFT JOIN encurtados ON users.id = encurtados."userId" GROUP BY users.id ORDER BY visitCount DESC LIMIT 10;`
  );
  if (getUsers.rows.length === 0) return res.sendStatus(404);
  res.send(getUsers.rows);
}

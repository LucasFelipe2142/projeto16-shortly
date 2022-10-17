import connection from "../banco/conection.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

export async function postShorter(req, res) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const { url } = req.body;

  const verifyToken = await connection.query(
    `SELECT * FROM logados WHERE token LIKE $1;`,
    [token]
  );
  if (verifyToken.rows.length === 0) return res.sendStatus(401);

  const newLink = nanoid();

  await connection.query(
    `INSERT INTO encurtados ("shortUrl",url,"userId",visits) VALUES ($1,$2,$3,$4);`,
    [newLink, url, verifyToken.rows[0].userId, 0]
  );
  res.status(201).send({ shortUrl: newLink });
}

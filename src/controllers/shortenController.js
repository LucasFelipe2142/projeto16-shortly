import connection from "../banco/conection.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

export async function postShorten(req, res) {
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

export async function getShortenId(req, res) {
  const encurtados = await connection.query(
    `SELECT * FROM encurtados WHERE id = $1;`,
    [req.params.id]
  );
  if (encurtados.rows.length === 0) return res.sendStatus(401);

  res.status(201).send(encurtados.rows);
}

export async function getShortenUrl(req, res) {
  const encurtados = await connection.query(
    `SELECT * FROM encurtados WHERE "shortUrl" = $1;`,
    [req.params.shortUrl]
  );
  if (encurtados.rows.length === 0) return res.sendStatus(404);

  await connection.query(
    `UPDATE encurtados SET visits = $1 WHERE "shortUrl" = $2;`,
    [encurtados.rows[0].visits + 1, req.params.shortUrl]
  );

  res.redirect(encurtados.rows[0].url);
}

export async function deleteShorten(req, res) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const urlId = req.params.id;

  const verifyToken = await connection.query(
    `SELECT * FROM logados WHERE token LIKE $1;`,
    [token]
  );
  if (verifyToken.rows.length === 0) return res.sendStatus(401);
  console.log(100);

  const userId = verifyToken.rows[0].userId;
  console.log(userId);

  const verifyUrl = await connection.query(
    `SELECT * FROM encurtados WHERE id = $1 AND "userId" = $2;`,
    [urlId, userId]
  );
  if (verifyUrl.rows.length === 0) {
    const verifyUrlExiste = await connection.query(
      `SELECT * FROM encurtados WHERE WHERE id = $1;`,
      [urlId]
    );
    if (verifyUrlExiste.rows.length === 0) return res.sendStatus(404);
    else return res.sendStatus(401);
  }
  console.log(200);

  await connection.query(
    `DELETE FROM encurtados WHERE id = $1 AND "userId" = $2`,
    [urlId, userId]
  );
  res.sendStatus(204);
}

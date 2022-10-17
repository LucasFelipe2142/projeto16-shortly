CREATE DATABASE banco_shortly;

CREATE TABLE "users" (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "logados" (
	id SERIAL PRIMARY KEY,
	"userId" INTEGER REFERENCES "users"("id"),
    token TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "encurtados" (
	id SERIAL PRIMARY KEY,
	"shortUrl" TEXT NOT NULL,
    url TEXT NOT NULL,
    "userId" INTEGER REFERENCES "users"("id"),
    visits INTEGER NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
);
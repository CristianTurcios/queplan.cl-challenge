const { Client } = require("pg");

const connectionString = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

const client = new Client({
  ssl: {
    rejectUnauthorized: false,
  },
  connectionString,
});

exports.client = client;

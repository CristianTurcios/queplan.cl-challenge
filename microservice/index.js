const express = require('express');
const http = require('http');
const cors = require('cors');
require("dotenv").config();
const { Client } = require("pg");

const app = express();
const server = http.createServer(app);
app.use(cors());

app.get("/events", async (req, res) => {
    try {
      const headers = {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
      };

      res.writeHead(200, headers);

      const client = new Client({
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        database: process.env.POSTGRES_DB,
        ssl: {
          rejectUnauthorized: false,
        },
      });

      await client.connect();
      await client.query("LISTEN friends_update_notification");

      client.on("notification", async (data) => {
        res.write(`data: ${JSON.stringify(data.payload)}\n\n`);
      });
    } catch (err) {
      next(err);
    }
});

server.listen(process.env.APP_PORT || 8000, () => {
  console.log("server started at port", 8000);
});
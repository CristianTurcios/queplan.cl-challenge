require("dotenv").config();
const { client } = require('./util/db.js');
const { actionOnNotification } = require("./util/notification.js");
const io = require("socket.io");
const server = io.listen(8000);

server.on("connection", function (socket) {
  console.log("client id - " + socket.id);

  client.connect((err, client) => {
    if (err) {
      console.log("error in db connection");
    } else {
      client.query("LISTEN customer_update_notification");
      client.on("notification", (msg) => {
        actionOnNotification(msg.channel, msg.payload, socket);
      });
    }
  });

  socket.on("message", (data) => {
    console.log("FROM CLIENT::", data);
  });

  socket.emit("message", "HELLO");
});

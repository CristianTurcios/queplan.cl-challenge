const actionOnNotification = (channel, payload, socket) => {
  switch (channel) {
    case "customer_update_notification":
      console.log('CHANGES IN DATABSE::', payload);
      socket.emit("message", payload);
      break;
  }
};

exports.actionOnNotification = actionOnNotification;
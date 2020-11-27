var http = require("http");
var url = require("url");
http
  .createServer(function (req, res) {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "application/json");
    if (path === "/") {
      res.end(JSON.stringify({ message: "Home" }, null, 3));
    } else if (path === "/api/getusers") {
      const users = require("./users.json");
      res.end(JSON.stringify(users.user, null, 3));
    } else if (path.match("/api/getmessages/*")) {
      let urlParams = path.split("/");
      let userId = urlParams[2];
      if (urlParams.length != 3) {
        res.writeHead(404, "Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Missing Params" }, null, 3));
      } else {
        const usersMessage = require("./messages.json");
        const users = require("./users.json");
        if (usersMessage[userId]) {
          res.end(JSON.stringify(usersMessage[userId], null, 3));
        }
        res.end(JSON.stringify({ error: "User not found" }, null, 3));
      }
      res.end(
        JSON.stringify({ message: "messages N°", userID: userId }, null, 3)
      );
    } else {
      res.writeHead(404, "Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Invalid route" }, null, 3));
    }
    res.end();
  })
  .listen(4000);

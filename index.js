const express = require("express");

const server = express();

server.get("/home", (req, res) => {
  return res.json({
    message: "Hello World"
  });
});

server.listen(3030, () => {
  return console.log("Application started at port 3030 ...");
});

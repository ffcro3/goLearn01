const express = require("express");

const server = express();

//ROUTE
server.get("/home", (req, res) => {
  return res.json({
    message: "Hello World"
  });
});

//ROUTE WITH QUERY PARAMS
server.get("/welcome", (req, res) => {
  const nome = req.query.nome;

  if (!nome) {
    return res.json({
      message: "Usuário não definido. Por favor digite o seu nome"
    });
  }
  return res.json({
    message: `Hello ${nome}`
  });
});

//ROUTE WITH ROUTE PARAMS
server.get("/users/:id", (req, res) => {
  const id = req.params.id;

  return res.json({
    message: `Dados do usuário ${id}`
  });
});

server.listen(3030, () => {
  return console.log("Application started at port 3030 ...");
});

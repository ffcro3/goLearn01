const express = require("express");

const server = express();

server.use(express.json());

const users = ["Fabricio", "Jessica", "Lola"];

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
server.get("/users/:index", (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});

//ALL USERS
server.get("/users", (req, res) => {
  return res.json({
    usuarios: users
  });
});

//CREATE USER
server.post("/users", (req, res) => {
  const { name } = req.body;
  const total = users.length;

  users.push(name);

  return res.json({
    usuario: `${users[total]}`
  });
});

//EDIT USER
server.put("/users/:index", (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

//DELETE USER
server.delete("/users/:index", (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.json({
    message: true
  });
});

server.listen(3030, () => {
  return console.log("Application started at port 3030 ...");
});

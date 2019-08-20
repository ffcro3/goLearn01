const express = require("express");

const server = express();

server.use(express.json());

const users = ["Fabricio", "Jessica", "Lola"];

//GLOBAL MIDDLEWARE
server.use((req, res, next) => {
  //CHECKS IF THE ROUTE EXIST. IF DONT, RETURN THE ERROR.
  /*  
    const route = req.url;
    
    if (res.status(404))
    return res.json({
      message: "Not Found. Please, check the url and try again"
    });*/

  return next();
});

//LOCAL MIDDLEWARE
function checkUserExists(req, res, next) {
  if (!req.body.name)
    return res.status(400).json({
      error: "Username is required"
    });

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user)
    return res.status(400).json({
      error: "User does not exists"
    });

  req.user = user;

  return next();
}

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
      message: "User undefined. Please, try again"
    });
  }
  return res.json({
    message: `Hello ${nome}`
  });
});

//ROUTE WITH ROUTE PARAMS
server.get("/users/:index", checkUserInArray, (req, res) => {
  return res.json(req.user);
});

//ALL USERS
server.get("/users", (req, res) => {
  return res.json({
    usuarios: users
  });
});

//CREATE USER
server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;
  const total = users.length;

  users.push(name);

  return res.json({
    usuario: `${users[total]}`
  });
});

//EDIT USER
server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

//DELETE USER
server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.json({
    message: true
  });
});

server.listen(3030, () => {
  return console.log("Application started at port 3030 ...");
});

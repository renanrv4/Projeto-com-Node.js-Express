const express = require("express");
const routes = express.Router();

const ClienteController = require("../controllers/ClienteController");
const ClienteController2 = require("../controllers/ClienteController2");

// routes.get("/clientes", ClienteController.listar);
// routes.get("/clientes/cadastro", ClienteController.cadastrarRoute);
// routes.post("/clientes/cadastro", ClienteController.cadastrar);
// routes.get("/clientes/:id", ClienteController.detalhar);

routes.get("/clientes", ClienteController2.listar);
routes.get("/clientes/cadastro", ClienteController2.cadastrarRoute);
routes.post("/clientes/cadastro", ClienteController2.cadastrar);
routes.get("/clientes/:id", ClienteController2.detalhar);

module.exports = routes;
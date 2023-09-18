const express = require("express");
const routesPaciente = express.Router();

const PacienteController = require("../controllers/PacienteController");

routesPaciente.get("/pacientes", PacienteController.listar);
routesPaciente.get("/pacientes/cadastro", PacienteController.cadastrarRoute);
routesPaciente.post("/pacientes/cadastro", PacienteController.cadastrar);
routesPaciente.get("/pacientes/:id", PacienteController.detalhar);

module.exports = routesPaciente;

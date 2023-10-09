const express = require("express");
const routesPaciente = express.Router();

const PacienteController = require("../controllers/PacienteController");

routesPaciente.get("/pacientes", PacienteController.listar);
routesPaciente.get("/pacientes/cadastro", PacienteController.cadastrarRoute);
routesPaciente.post("/pacientes/cadastro", PacienteController.cadastrar);
routesPaciente.get("/pacientes/:id", PacienteController.detalhar);
routesPaciente.get("/pacientes/excluir/:id", PacienteController.delete);
routesPaciente.get("/pacientes/cadastro/:id", PacienteController.update);
routesPaciente.post("/pacientes/cadastro/:id", PacienteController.updatePost);

module.exports = routesPaciente;

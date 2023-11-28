const express = require("express");
const routesPaciente = express.Router();
const auth = require("../middlewares/usuarioAuth");
const PacienteController = require("../controllers/PacienteController");

routesPaciente.get("/pacientes", auth, PacienteController.listar);
routesPaciente.get("/pacientes/cadastro", auth, PacienteController.cadastrarRoute);
routesPaciente.post("/pacientes/cadastro", PacienteController.cadastrar);
routesPaciente.get("/pacientes/excluir/:id", PacienteController.delete);
routesPaciente.get("/pacientes/cadastro/:id", auth, PacienteController.update);
routesPaciente.post("/pacientes/cadastro/:id", PacienteController.updatePost);
routesPaciente.get("/pacientes/:id", auth, PacienteController.detalhar);
module.exports = routesPaciente;

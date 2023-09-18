const express = require("express");
const routesMedico = express.Router();

const MedicoController = require("../controllers/MedicoController");

routesMedico.get("/medicos", MedicoController.listar);
routesMedico.get("/medicos/cadastro", MedicoController.cadastrarRoute);
routesMedico.post("/medicos/cadastro", MedicoController.cadastrar);
routesMedico.get("/medicos/:id", MedicoController.detalhar);

module.exports = routesMedico;
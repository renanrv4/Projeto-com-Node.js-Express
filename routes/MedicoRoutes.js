const express = require("express");
const routesMedico = express.Router();
const auth = require("../middlewares/usuarioAuth");
const MedicoController = require("../controllers/MedicoController");

routesMedico.get("/medicos", auth, MedicoController.listar);
routesMedico.get("/medicos/cadastro", auth, MedicoController.cadastrarRoute);
routesMedico.post("/medicos/cadastro", MedicoController.cadastrar);
routesMedico.get("/medicos/excluir/:id", MedicoController.delete);
routesMedico.get("/medicos/cadastro/:id",auth, MedicoController.update);
routesMedico.post("/medicos/cadastro/:id", MedicoController.updatePost);
routesMedico.get("/medicos/:id",auth , MedicoController.detalhar);

module.exports = routesMedico;
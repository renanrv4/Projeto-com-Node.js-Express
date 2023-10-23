const express = require("express");
const routesUsuario = express.Router();

const UsuarioController = require("../controllers/UsuarioController");

routesUsuario.get("/usuarios", UsuarioController.listar);
routesUsuario.get("/usuarios/cadastro", UsuarioController.cadastrarRoute);
routesUsuario.post("/usuarios/cadastro", UsuarioController.cadastrar);
routesUsuario.get("/usuarios/:id", UsuarioController.detalhar);
routesUsuario.get("/usuarios/excluir/:id", UsuarioController.delete);
routesUsuario.get("/usuarios/cadastro/:id", UsuarioController.update);
routesUsuario.post("/usuarios/cadastro/:id", UsuarioController.updatePost);

module.exports = routesUsuario;
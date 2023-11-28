const express = require("express");
const routesUsuario = express.Router();
const auth = require("../middlewares/usuarioAuth");
const UsuarioController = require("../controllers/UsuarioController");

routesUsuario.get("/usuarios", auth, UsuarioController.listar);
routesUsuario.get("/usuarios/cadastro", UsuarioController.cadastrarRoute);
routesUsuario.post("/usuarios/cadastro", UsuarioController.cadastrar);
routesUsuario.get("/usuarios/excluir/:id", UsuarioController.delete);
routesUsuario.get("/usuarios/cadastro/:id", auth, UsuarioController.update);
routesUsuario.post("/usuarios/cadastro/:id", UsuarioController.updatePost);
routesUsuario.get("/usuarios/login", UsuarioController.login);
routesUsuario.post("/usuarios/login", UsuarioController.loginPost);
routesUsuario.get("/usuarios/:id", auth, UsuarioController.detalhar);
module.exports = routesUsuario;
const req = require("express/lib/request");
const res = require("express/lib/response");
const UsuarioModel = require("../models/UsuarioModel");
const bcryptjs = require("bcryptjs");
const { redirect } = require("express/lib/response");

class UsuarioController {

    static async listar(req, res){
        const id = req.params.id;
        const salvo = req.query.s;
        const usuarios = await UsuarioModel.find();
        if(id == undefined){
            res.render("usuario/relatorio", {usuarios, salvo});
        }
    }

    static login(req, res){
        const salvo = req.query.s;
        res.render("usuario/login", {salvo});
    }

    static async loginPost(req, res){
        const usuario = await UsuarioModel.findOne({email: req.body.email});
        console.log(usuario);
        if(usuario != undefined){
            if(bcryptjs.compareSync(req.body.senha, usuario.senha)){
                req.session.usuario = usuario.email;
                res.redirect("/");
            }else{
                res.redirect(`/usuarios/login?s=4&email=${req.body.email}`);
            }
        }
    }

    static async update(req, res){
        const salvo = req.query.s;
        const usuario = await UsuarioModel.findOne({_id: req.params.id});
        res.render("usuario/cadastro", {usuario, salvo});
                
    }

    static async updatePost(req, res){
        const usuarioAtual = await UsuarioModel.findOne({_id: req.body.id});
        const usuarioEmail = await UsuarioModel.findOne({email: req.body.email});
        console.log(usuarioAtual);
        if(usuarioAtual.email == req.body.email || usuarioEmail == null){
            await UsuarioModel.findOneAndUpdate({_id: req.params.id}, 
                {
                    nome: req.body.nome,
                    email: req.body.email
                });
                res.redirect("/usuarios?s=2");
        } else{
            res.redirect(`/usuarios/cadastro/${req.body.id}?s=6`);
        }

    }

    static async delete(req, res){
        await UsuarioModel.findOneAndDelete(req.body.id);
        res.redirect("/usuarios?s=0");
    }

    static async detalhar(req, res){
        const usuario = await UsuarioModel.findOne({_id: req.params.id});
        res.render("usuario/detalhar", {usuario});
    }

    static cadastrarRoute(req, res){
        const salvo = req.query.s;
        let usuario = {
            email: req.query.email,
            nome: req.query.nome
        };
        res.render("usuario/cadastro", {usuario, salvo});
    }

    static async cadastrar(req, res){
        const salt = bcryptjs.genSaltSync();
        const hash = bcryptjs.hashSync(req.body.senha, salt);
        const usuario = await UsuarioModel.findOne({email: req.body.email});
        if(usuario == null){
            const u = new UsuarioModel({
                nome: req.body.nome,
                email: req.body.email,
                senha: hash
            });
            await u.save();
            res.redirect("/usuarios?s=1");
        }else{
            res.redirect(`/usuarios/cadastro?s=4&email=${req.body.email}&nome=${req.body.nome}`);
        }
    }
}

module.exports = UsuarioController;
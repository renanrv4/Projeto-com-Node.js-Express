const req = require("express/lib/request");
const res = require("express/lib/response");
const UsuarioModel = require("../models/UsuarioModel");

class UsuarioController {

    static async listar(req, res){
        const id = req.params.id;
        const salvo = req.query.s;
        const usuarios = await UsuarioModel.find();
        if(id == undefined){
            res.render("usuario/relatorio", {usuarios, salvo});
        }
    }

    static async update(req, res){
        const salvo = req.query.s;
        const usuario = await UsuarioModel.findOne({_id: req.params.id});
        res.render("usuario/cadastro", {usuario, salvo});
                
    }

    static async updatePost(req, res){
        await UsuarioModel.findOneAndUpdate({_id: req.params.id}, 
        {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        });
        res.redirect("/usuarios?s=2");
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
        const usuario = await UsuarioModel.findOne({email: req.body.email});
        if(usuario == null){
            const u = new UsuarioModel({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha
            });
            await u.save();
            res.redirect("/usuarios?s=1");
        }else{
            res.redirect(`/usuarios/cadastro?s=4&email=${req.body.email}&nome=${req.body.nome}`);
        }
    }
}

module.exports = UsuarioController;
const req = require("express/lib/request");
const res = require("express/lib/response");
const PacienteModel = require("../models/PacienteModel");

class PacienteController {

    static async listar(req, res){
        const id = req.params.id;
        const salvo = req.query.s;
        const pacientes = await PacienteModel.find();
        if(id == undefined){
            res.render("paciente/relatorio", {pacientes, salvo});
        }
    }

    static async update(req, res){
        const paciente = await PacienteModel.findOne({id: req.params.id});
        res.render("paciente/cadastro", {paciente});
    }

    static async updatePost(req, res){
        await PacienteModel.findOneAndUpdate({id: req.body.id}, 
        {
            nome: req.body.nome, 
            cpf: req.body.cpf, 
            idade: req.body.idade, 
            estado: {
                estado: req.body.estado, 
                cidade: req.body.cidade,
                rua: req.body.rua,
                bairro: req.body.bairro,
                logradouro: req.body.logradouro,
                numero: req.body.numero
            }
        });
        res.redirect("/pacientes?s=2");
    }

    static async delete(req, res){
        await PacienteModel.findOneAndDelete(req.body.id);
        res.redirect("/pacientes?s=0");
    }

    static async detalhar(req, res){
        const paciente = await PacienteModel.findOne({id: req.params.id});
        res.render("paciente/detalhar", {paciente});
    }

    static cadastrarRoute(req, res){
        let paciente = {};
        res.render("paciente/cadastro", {paciente});
    }

    static async cadastrar(req, res){
        const p = new PacienteModel({
            id: req.body.id, 
            nome: req.body.nome,
            cpf: req.body.cpf,
            idade: req.body.idade,
            endereco: {
                estado: req.body.estado,
                cidade: req.body.cidade,
                rua: req.body.rua,
                bairro: req.body.bairro,
                logradouro: req.body.logradouro,
                numero: req.body.numero
            }
        });
        await p.save();
        res.redirect("/pacientes?s=1");
    }
}

module.exports = PacienteController;
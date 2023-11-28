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
        const paciente = await PacienteModel.findOne({_id: req.params.id});
        res.render("paciente/cadastro", {paciente});
    }

    static async updatePost(req, res){
        const pacienteAtual = await UsuarioModel.findOne({_id: req.body.id});
        const pacienteCPF = await UsuarioModel.findOne({cpf: req.body.cpf});
        if(pacienteAtual.cpf == req.body.cpf || pacienteCPF == null){
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
        } else{
            res.redirect(`/pacientes/cadastro/${req.body.id}?s=6`);
        }
    }

    static async delete(req, res){
        await PacienteModel.findOneAndDelete(req.body.id);
        res.redirect("/pacientes?s=0");
    }

    static async detalhar(req, res){
        const paciente = await PacienteModel.findOne({_id: req.params.id});
        res.render("paciente/detalhar", {paciente});
    }

    static cadastrarRoute(req, res){
        const salvo = req.query.s;
        let paciente = {};
        res.render("paciente/cadastro", {paciente, salvo});
    }

    static async cadastrar(req, res){
        const paciente = await PacienteModel.findOne({cpf: req.body.cpf});
        if(paciente == null){
            const p = new PacienteModel({
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
        }else{
            res.redirect(`/pacientes/cadastro?s=4&nome=${req.body.nome}&idade=${req.body.idade}&estado=${req.body.estado}
            &cidade=${req.body.cidade}&rua=${req.body.rua}&bairro=${req.body.bairro}&logradouro=${req.body.logradouro}&numero=${req.body.numero}`);
        }
        
    }
}

module.exports = PacienteController;
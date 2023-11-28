const MedicoModel = require("../models/MedicoModel");

class MedicoController {

    static async listar(req, res){
        const id = req.params.id;
        const salvo = req.query.s;
        const medicos = await MedicoModel.find();
        if(id == undefined){
            res.render("medico/relatorio", {medicos, salvo});
        }
    }

    static async update(req, res){
        const salvo = req.query.s;
        const medico = await MedicoModel.findOne({_id: req.params.id});
        res.render("medico/cadastro", {medico, salvo});
                
    }

    static async updatePost(req, res){
        const medicoAtual = await MedicoModel.findOne({_id: req.body.id});
        const medicoCPF = await MedicoModel.findOne({cpf: req.body.cpf});
        console.log(medicoAtual);
        if(medicoAtual.cpf == req.body.cpf || medicoCPF == null){
            await MedicoModel.findOneAndUpdate({_id: req.params.id}, 
                {
                    nome: req.body.nome,
                    cpf: req.body.cpf,
                    idade: req.body.idade,
                    areaDeAtuacao: req.body.atuacao
                });
                res.redirect("/medicos?s=2");
        } else{
            res.redirect(`/medicos/cadastro/${req.body.id}?s=6`);
        }

    }

    static async delete(req, res){
        await MedicoModel.findOneAndDelete(req.body.id);
        res.redirect("/medicos?s=0");
    }

    static async detalhar(req, res){
        const medico = await MedicoModel.findOne({_id: req.params.id});
        res.render("medico/detalhar", {medico});
    }

    static cadastrarRoute(req, res){
        const salvo = req.query.s;
        let medico = {
            nome: req.query.nome,
            cpf: req.query.cpf,
            idade: req.query.idade,
            areaDeAtuacao: req.query.areaDeAtuacao
        };
        res.render("medico/cadastro", {medico, salvo});
    }

    static async cadastrar(req, res){
        const medico = await MedicoModel.findOne({cpf: req.body.cpf});
        if(medico == null){
            const m = new MedicoModel({
                nome: req.body.nome,
                cpf: req.body.cpf,
                idade: req.body.idade,
                areaDeAtuacao: req.body.atuacao
            });
            await m.save();
            res.redirect("/medicos?s=1");
        }else{
            res.redirect(`/medicos/cadastro?s=4&nome=${req.body.nome}&idade=${req.body.idade}&areaDeAtuacao=${req.body.atuacao}`);
        }
        
    }
}

module.exports = MedicoController;
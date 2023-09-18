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

    static async detalhar(req, res){
        const id = req.params.id;
        let encontrou = false;
        const Medicos = await MedicoModel.find();
        for(const medico of Medicos){
            if(id == medico.id){
                encontrou = true;
                res.render("medico/detalhar", {medico});
                break;
            }
        }
        if(encontrou == false){
            res.send("Medico não encontrado");
        }
    }

    static cadastrarRoute(req, res){
        res.render("medico/cadastro");
    }

    static async cadastrar(req, res){
        const m = new MedicoModel({
            id: req.body.id, 
            nome: req.body.nome,
            cpf: req.body.cpf,
            idade: req.body.idade,
            areaDeAtuacao: req.body.atuacao
        });
        await m.save();
    }
}

module.exports = MedicoController;
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

    static async detalhar(req, res){
        const id = req.params.id;
        let encontrou = false;
        const pacientes = await PacienteModel.find();
        for(const paciente of pacientes){
            if(id == paciente.id){
                encontrou = true;
                res.render("paciente/detalhar", {paciente});
                break;
            }
        }
        if(encontrou == false){
            res.send("Paciente não encontrado");
        }
    }

    static cadastrarRoute(req, res){
        res.render("paciente/cadastro");
    }

    static async cadastrar(req, res){
        const p = new PacienteModel({
            id: req.body.codigo, 
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
    }
}

module.exports = PacienteController;
const ClienteModel = require("../models/ClienteModel");

class ClienteController2 {

    static async listar(req, res){
        const id = req.params.id;
        const salvo = req.query.s;
        const clientes = await ClienteModel.find();
        if(id == undefined){
            res.render("cliente/relatorio", {clientes, salvo});
        }
    }

    static async detalhar(req, res){
        const id = req.params.id;
        let encontrou = false;
        const clientes = await ClienteModel.find();
        for(const cliente of clientes){
            if(id == cliente.id){
                encontrou = true;
                res.render("cliente/detalhar", {cliente});
                break;
            }
        }
        if(encontrou == false){
            res.send("Cliente não encontrado");
        }
    }

    static cadastrarRoute(req, res){
        res.render("cliente/cadastro");
    }

    static async cadastrar(req, res){
        const c = new ClienteModel({
            id: req.body.codigo, 
            nome: req.body.nome,
            idade: req.body.idade
        });
        await c.save();
    }
}

module.exports = ClienteController2;
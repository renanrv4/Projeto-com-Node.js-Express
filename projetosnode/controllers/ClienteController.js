const Cliente = require("../models/Cliente");

const vetorClientes = [];

class ClienteController {

    static listar(req, res){
        const id = req.params.id;
        const salvo = req.query.s;
        if(id == undefined){
            res.render("cliente/relatorio", {vetorClientes, salvo});
        }
    }

    static detalhar(req, res){
        const id = req.params.id;
        let encontrou = false;
        for(const cliente of vetorClientes){
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

    static cadastrar(req, res){
        const dados = req.body;
        const c = new Cliente(dados.codigo, dados.nome, dados.idade);
        vetorClientes.push(c);
        res.redirect("/clientes?s=1");
    }
}

module.exports = ClienteController;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pacienteSchema = Schema({
    nome: String,
    cpf: String,
    idade: Number,
    endereco:{
        estado: String,
        cidade: String,
        rua: String,
        bairro: String,
        logradouro: String,
        numero: Number
    }
});

module.exports = mongoose.model("Paciente", pacienteSchema);

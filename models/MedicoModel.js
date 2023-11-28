const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedicoSchema = Schema({
    nome: String,
    cpf: String,
    idade: Number,
    areaDeAtuacao: String
});

module.exports = mongoose.model("Medico", MedicoSchema);
const { VERSION } = require('ejs');
const express = require('express');
const res = require('express/lib/response');
const app = express();
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://rsc5:e1N3OW29TkCTTTze@cluster0.jkf7xb9.mongodb.net/?retryWrites=true&w=majority");

const PacienteRoutes = require("./routes/PacienteRoutes");
const MedicoRoutes = require("./routes/MedicoRoutes");
const UsuarioRoutes = require("./routes/UsuarioRoutes");
app.use(PacienteRoutes);
app.use(MedicoRoutes);
app.use(UsuarioRoutes);

app.get("/", function(req, res){
    res.render("index");
});

app.use(function(req, res){
    res.status(404).render("404");
});

app.listen("3000", function(){
    console.log("Rodando");
});
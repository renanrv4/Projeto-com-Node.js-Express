const { VERSION } = require('ejs');
const express = require('express');
const res = require('express/lib/response');
const app = express();
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
const mongoose = require("mongoose");
const session = require("express-session");
app.use(session({
    secret: 'ifpe',
    saveUninitialized: false,
    resave: false
}));
mongoose.connect("mongodb+srv://rsc5:e1N3OW29TkCTTTze@cluster0.jkf7xb9.mongodb.net/?retryWrites=true&w=majority");

const PacienteRoutes = require("./routes/PacienteRoutes");
const MedicoRoutes = require("./routes/MedicoRoutes");
const UsuarioRoutes = require("./routes/UsuarioRoutes");
app.use(PacienteRoutes);
app.use(MedicoRoutes);
app.use(UsuarioRoutes);

app.get("/", function(req, res){
    if(req.session.usuario != undefined){
        res.render("index");
    }else{
        res.redirect("/usuarios/login");
    }
});

app.get("/logout", function(req, res){
    req.session.usuario = null;
    res.redirect("/usuarios/login");
});

app.use(function(req, res){
    res.status(404).render("404");
});

app.listen("3000", function(){
    console.log("Rodando");
});
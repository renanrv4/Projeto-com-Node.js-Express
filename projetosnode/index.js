const { VERSION } = require('ejs');
const express = require('express');
const res = require('express/lib/response');
const app = express();
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://rsc5:e1N3OW29TkCTTTze@cluster0.jkf7xb9.mongodb.net/?retryWrites=true&w=majority");

const ClienteRoutes = require("./routes/ClienteRoutes");
app.use(ClienteRoutes);

app.get("/", function(req, res){
    res.render("index");
});

app.listen("9999", function(){
    console.log("Rodando");
});
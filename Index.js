const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const connection = require('./database/conexao');
const Contato = require('./Models/ContatoModel')

app.set('view engine', 'ejs');  //Apontando minha pasta View

app.use(express.static('public')); //apontando minha pasta de estilos

app.use(bodyParser.urlencoded({ extended: false })) //decodifica os dados do formulario e coloca em java Script
app.use(bodyParser.json()); //Lê dados enviados em Json


//Conexão com a banco de dados
connection
    .authenticate()
    .then(() => {
        console.log('Conexao feita com o banco de dados!')
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })





app.get("/", (req, res) => {
    res.render("index")
})


app.get("/contato", (req, res) => {
    res.render("contato")
})

app.post("/salvacontato", (req, res) => {

    var nome = req.body.nome;
    var ultimoNome = req.body.ultimoNome;
    var telefone = req.body.telefone;
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var email = req.body.email;

    //Envio de Email
    var remetente = nodemailer.createTransport({

        service: 'gmail',
        auth: {
            user: 'seu.email@gmail.com',
            pass: 'sua senha'
        }
    });

    var emailASerEnviado = {
        from: 'everton.goncalves92@gmail.com',
        to: email,
        subject: 'Contato',
        text: 'Olá ' + nome + ' recebemos a sua mensagem. Em breve nós iremos  te responder. Obrigado pelo contato',
    };


    remetente.sendMail(emailASerEnviado, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado com sucesso.');
        }
    });

    Contato.create({
        nome: nome,
        ultimoNome: ultimoNome,
        telefone: telefone,
        titulo: titulo,
        descricao: descricao,
        email: email
    }).then(() => {

        res.redirect("/")
    })

})


app.get("/mensagem", (req, res) => {
    Contato.findAll({
        raw: true,
        order: [
            ['id', 'DESC']]
    }).then(mensagens => {
        res.render("mensagem", {
            mensagens: mensagens
        })
    })
})

app.get("/detalhemensagem/:id", (req, res) => {
    var id = req.params.id;
    Contato.findOne({
        where: { id: id }
    }).then(mensagem => {
        res.render("detalhemensagem", {
            mensagens : mensagem

        });
    });
})

app.listen(3333, () => { console.log("Servidor Ok") })
const express       = require('express');
const { create }    = require('express-handlebars'); // Importa  o create
let app             = express();
const path          = require('path');
const bd            = require('./db/connection');
const bodyParser    = require('body-parser');
const Job           = require('./models/Job');
const Sequelize     = require('sequelize');
const { log } = require('console');
const Op            = Sequelize.Op;

const PORT = 3000;

app.listen(PORT, function(){
    console.log(`O Express está funcionando na porta ${PORT}`);
});

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Configuração do handlebars
const hbs = create({
    extname: '.handlebars', // extensão dos arquivos handlebars
    defaultLayout: 'main',  // layout principal
    layoutsDir: path.join(__dirname, 'views/'), // pasta dos layouts
    partialsDir: path.join(__dirname, 'views/partials') // pasta dos partials
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views/')); // onde ficam os templates do projeto

// Pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Conexão com bd
bd 
    .authenticate()
    .then(() => {
        console.log("Conectou ao banco com sucesso!");
    })
    .catch(erro => {
        console.log("Ocorreu um erro ao conectar ao banco", erro);
    });

// Rotas
app.get('/', (req, res) => {

    let pesquisa = req.query.job;  //quando é requisição get vem do query e nao do body
    let query    = '%'+pesquisa+'%'; //ex.: ph -> vagas dev php
    
    if(!pesquisa){
        //Busca tudo do BD ordenando pela data de criação de forma descrecente e depois joga no index
        Job.findAll({order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render('index', {
                jobs
            });
        })
        .catch(err => console.log(err));
    } else {
        Job.findAll({
            where: {titulo: {[Op.like]: query}},
            order: [
                ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render('index', {
                jobs, pesquisa
            });
        })
        .catch(err => console.log(err));
    }

    
    
});

// Jobs routes
app.use('/jobs', require('./routes/rotas'));

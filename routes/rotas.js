const express = require('express');
const router = express.Router();
const Job = require('../models/Job');


router.get('/teste', (req,res) => {
    res.send('deu certo');
});

router.get('/add', (req, res) => {
    res.render('add');
})

//mostrar detalhes da vaga
router.get('/views/:id', (req, res) => {
    Job.findOne({
        where: { id: req.params.id }
    })
    .then(job => {
        if (!job) {
            return res.status(404).json({ error: 'Vaga não encontrada' });
        }
        res.render('view', {
            job
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'Falha ao buscar detalhes da vaga' });
    });
});

//adicionar nova vaga via post
router.post('/add', (req, res) => {

    let {titulo, descricao, salario, empresa, email, nova_vaga} = req.body;

    //insert
    Job.create({
        titulo,
        descricao,
        salario,
        empresa,
        email,
        nova_vaga
    })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));

});

module.exports = router;
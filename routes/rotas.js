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
router.get('/view/:id', (req,res) => Job.findOne({
    where: {id: req.params.id}
})).then(job => {
    res.sender('view', {
        job
    })
})

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
const atendimento = require('../models/atendimentos')

module.exports = app => { 
    app.get('/atendimentos', (req, res) => {
        atendimento.lista(res)
    }),
    
    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        atendimento.buscaPorID(id, res)
    }),

    app.post('/atendimentos', (req, res) => {
        const id = parseInt(req.params.id)

        atendimento.adiciona(id, res)
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        atendimento.altera(id, valores, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        atendimento.deleta(id, res)
    })
}
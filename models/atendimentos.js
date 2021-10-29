const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class Atendimento {
    adiciona(atendimento, res) {

        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const date = moment(atendimento.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dataEhValida = moment(date).isSameOrAfter(dataCriacao)
        const clientEhValido = atendimento.clien.length >= 5
        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser igual ou maior que data atual!'
            },
            {
                nome: 'cliente',
                valido: clientEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracters!'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existeErros = erros.length

        if(existeErros) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, date}
    
            const sql = `INSERT INTO atendimentos SET ?`
    
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                }
                else { 
                    res.status(201).json(atendimento)
                }
            })
        }
    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            }
            else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorID(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    altera(id, valores, res) {
        if(valores.date) {
            valores.date = moment(valores.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
       
        const sql = 'UPDATE atendimentos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM atendimentos WHERE id=?'

        conexao.query(sql, id, (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento
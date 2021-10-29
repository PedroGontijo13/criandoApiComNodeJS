const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const tabelas = require('./infraestrutura/tabelas')

conexao.connect(error => {
    if(error) {
        console.log(error)
    }
    else { 
        console.log('conectado')

        tabelas.init(conexao)

        const app = customExpress()
        
        app.listen(3000, () => {
            console.log(`servidor rodando`)
        })
    }
})


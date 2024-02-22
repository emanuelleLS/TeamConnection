import { buscarPorId, listarFuncionarios, inserirFuncionario, atualizarFuncionario, apagarFuncionario, listarPorDepartamento } from "./db.js"
import express from 'express'
import bodyParser from 'body-parser'

const PORTA = 3000
const server = express()

server.use(express.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'Content-Type', 'Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
    next()
})


server.get('/', async (req, res) => {
    res.status(200).send('<h1>Página Inicial</h1>')
    console.log(req)
})


server.get('/funcionarios', async (req, res) => {
    const funcionarios = await listarFuncionarios()
    res.status(200).json(funcionarios)
})

 server.get('/funcionarios/departamento/:departamento', async(req, res) => {
    // extrai da url o número da categoria 0,1,2
    const {departamento} = req.params
    const funcionarios = await listarPorDepartamento(departamento)
    res.status(200).json(funcionarios)
 })


server.delete('/funcionarios/:id', async (req, res) => {
    const { id } = req.params
    const retorno = await apagarFuncionario(id)
    return res.status(200).json({ 'retorno': retorno.affectedRows == 1 })
})


server.post('/funcionarios', async (req, res) => {
    //recebe os dados enviados pelo cadastrar.js
    const funcionario = req.body
    const retorno = await inserirFuncionario(funcionario)
 
    console.log(retorno)
    return res.status(200).json({ 'retorno': retorno.affectedRows == 1 })
})


server.get('/funcionarios/:id', async (req, res) => {
    const {id} = req.params
    const funcionario = await buscarPorId(id)
    res.status(200).json(funcionario)
})


server.put('/funcionarios', async(req,res) => {
    const funcionario = req.body
    const retorno = await atualizarFuncionario(funcionario)
    res.status(200).json({'retorno' : retorno.affectedRows == 1})
})

// inicia a execução do servidor
server.listen(PORTA, () => {
    console.log(`Servidor executando na porta ${PORTA}`)
})
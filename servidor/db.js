
import mysql from 'mysql2/promise'


export async function conectar() {
    if (global.conexao && global.conexao.state != 'disconnected')
        return global.conexao
    const conexao = mysql.createConnection('mysql://root:root@localhost:3306/time_db')
    console.log('Conectou no MySQL')
    global.conexao = conexao
    return conexao
}



export async function buscarPorId(id) {
    const con = await conectar()
    const sql = 'SELECT * FROM membros WHERE id=?'
    const [dados] = await con.query(sql, id)
    return dados
}

export async function listarFuncionarios() {
    const con = await conectar()
    const sql = 'SELECT * FROM membros'
    const [dados] = await con.query(sql)
    return dados
}

export async function listarPorDepartamento(departamento){
    const con = await conectar()
    const sql = 'SELECT *FROM membros WHERE departamento=?'
    const [lista] = await con.query(sql, departamento)
    return lista
}

export async function inserirFuncionario(funcionario) {
    const con = await conectar()
    const sql = 'INSERT INTO membros (nome, departamento, email, telefone, url) VALUES (?, ?, ?, ?, ?)'
    const valores = [funcionario.nome, funcionario.departamento, funcionario.email, funcionario.telefone, funcionario.url]
    const inseriu = await con.query(sql, valores)
    return inseriu[0]
}

export async function atualizarFuncionario(funcionario) {
    const con = await conectar()
    const sql = 'UPDATE membros SET nome=?, departamento=?, email=?, telefone=?, url=? WHERE id=?'
    const valores = [funcionario.nome, funcionario.departamento, funcionario.email, funcionario.telefone, funcionario.url, funcionario.id]
    const retorno = await con.query(sql, valores)
    return retorno[0]
}

export async function apagarFuncionario(id) {
    const con = await conectar()
    const sql = 'DELETE FROM membros WHERE id=?'
    const retorno = await con.query(sql, id)
    return retorno[0]
}


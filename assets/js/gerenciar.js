//                          0             1                2         ...
const tipo_departamento = ['Finanças', 'Recursos Humanos', 'Vendas', 'Produção', 'Administração', 'Tecnologia da Informação', 'Outro' ]


// executa logo após a página gerenciar.html ser carrega
document.addEventListener('DOMContentLoaded', () => {

  
    fetch('http://localhost:3000/funcionarios')


    .then(res => res.json())

    // pega a lista (array javascript) recebida e processa
    .then(lista => {
        if (lista.length == 0)
            alerta_erro('Nenhum funcionário encontrado no banco de dados')
        else
            adicionarNaTabela(lista)

    }).catch(erro => alerta_erro(`Erro ao consultar funcionário: ${erro}`))

})


const adicionarNaTabela = (lista) => {

    const tabela = document.getElementById('tabela')

    lista.forEach(funcionario => {
        const tamanhoTabela = tabela.rows.length   

        // insere uma linha abaixo da última 
        const linha = tabela.insertRow(tamanhoTabela)

        // insere as células (colunas) da linha
        const id = linha.insertCell(0)

        // adiciona o id no elemento gráfico (linha da tabela)
        linha.id = funcionario.id

        // cria outras células (colunas)
        const nome = linha.insertCell(1)
        const departamento = linha.insertCell(2)
        const email = linha.insertCell(3)
        const telefone = linha.insertCell(4)
        const imagem = linha.insertCell(5)
        const alterar = linha.insertCell(6)
        const excluir = linha.insertCell(7)

        // preenche as células de cada linha com os dados recebidos do banco
        id.innerHTML = funcionario.id
        nome.innerHTML = funcionario.nome
        departamento.innerHTML = tipo_departamento[funcionario.departamento]
        email.innerHTML = funcionario.email
        telefone.innerHTML = funcionario.telefone
        const url = funcionario.url.toLowerCase()

        // se a url iniciar por 'http' => é uma imagem da web
        if (url.substring(0, 4) === 'http')
            imagem.innerHTML = `<img src='${url}' class='img-thumbnail' alt='Foto do Funcionário'>`
        // imagem da pasta galeria
        else   
            imagem.innerHTML = `<img src='galeria/${url}' class='img-thumbnail' alt='Foto do Funcionário'>`

        alterar.innerHTML = `<a href='alterar.html?id=${funcionario.id}' class='btn btn-outline-success mt-4'>Alterar</a>`

        excluir.innerHTML = `<button onclick='excluirDaTabela(${funcionario.id})' class='btn btn-outline-danger mt-4'>Excluir</button>` 
    })
}




const excluirDaTabela = (id) => {

    // envia solicitação para o servidor delete o funcionario id = ?
    fetch('http://localhost:3000/funcionarios/' + id, {method: 'DELETE'})

    .then(res => res.json())

    .then(res => {
        if (res.retorno)
            document.getElementById(id).remove()
    })


    .catch(erro => alerta_erro(`Erro ao excluir funcionário: ${erro}`))

}



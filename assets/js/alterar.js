document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    

    fetch('http://localhost:3000/funcionarios/' + id)


    .then(res => res.json())

    //processa os dados da resposta json
    .then(data => {
        if(data.length > 0 ) {
            const funcionario = data[0]
            preencher_formulario(funcionario)
        } else
        alerta_erro(`Erro: nenhum funcionario encontrado com a matricula = ${id}`) 
    }).catch(erro => alerta_erro(`Erro ao buscar funcionario com a matricula=${id}. \n Erro: ${erro}`))
})

const preencher_formulario = (p) => {
    setById('id', p.id)
    setById('nome', p.nome)
    setById('departamento', p.departamento)
    setById('email', p.email)
    setById('telefone', p.telefone)
    setById('url', p.url)
}

//funções auxiliares
const setById = (campo, valor) => {
    document.getElementById(campo).value = valor
}

const getById = (campo) => {
    return document.getElementById(campo).value
}

//função que envia os dados do formulário via método PUT para atualizar
const atualizar = () => {
    if(!validarFormulario())
    return

    const dados = {
        id: getById('id'),
        nome: getById('nome'),
        departamento:getById('departamento'),
        email: getById('email'),
        telefone:getById('telefone'),
        url: getById('url')
    }

    fetch('http://localhost:3000/funcionarios', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados) //converse json em string

       
    }).then(res => res.json ()
    //pega o objeto json retornado pelo servidor
    ).then(data => {
    
        //volta para a página de gerencimente
    }).then(() => {
        location.href = 'gerenciador.html'

     
    }).catch(erro => alerta_erro(`Erro ao atualizar funcionário:  ${erro}`))
}
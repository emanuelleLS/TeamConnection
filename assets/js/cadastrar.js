//funcao para enviar os dados do formulário para o servidor via POST
const salvar = () => {
    if (!validarFormulario())
        return
    const dados = {
        nome: document.getElementById('nome').value,
        departamento: document.getElementById('departamento').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        url: document.getElementById('url').value
    }
    //envia os dados para o servidor
    fetch('http://localhost:3000/funcionarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    }).then(res => res.json()
    ).then(data => {
        console.log('Retorno do Servidor: \n', data)
    }).then(() => {
        console.log('Sucesso ao cadastrar funcionario')
        location.href = 'index.html'
    }).catch(erro => alerta_erro(`Erro ao cadastrar funcionario: ${erro}`))
}
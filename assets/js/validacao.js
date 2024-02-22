const validarFormulario = () => {
    nome = document.getElementById('nome').value
    departamento = document.getElementById('departamento').value
    email = document.getElementById('email').value
    telefone = document.getElementById('telefone').value

    if (!nome) {
        alerta_erro('Preencha o nome!')
        return false
    }
    else if (!email) {
        alerta_erro('Preencha o campo email!')
        return false
    }
    else if (!telefone) {
        alerta_erro('Preencha o telefone!')
        return false
    }
    return true
}
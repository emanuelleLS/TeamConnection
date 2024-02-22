document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search)
    const departamento = urlParams.get('departamento')

    let url

    if (departamento == null)
        url = 'http://localhost:3000/funcionarios'
    else
        url = 'http://localhost:3000/funcionarios/departamento/' + departamento

 
    fetch(url)

        .then(res => res.json())

        .then(data => {
            if (data.lentgh == 0)
                alerta_erro('Nenhum funcionario encontrado')
            else
                criarGaleriaFuncionarios(data)
        }).catch(() => alerta_erro('Erro ao consultar funcionarios no banco de dados'))
})

const criarGaleriaFuncionarios = (dados) => {
    const galeria = document.getElementById('galeria')

    dados.forEach(p => {
        let url = p.url.toLowerCase()
        if (url.substring(0, 4) != 'http') {
            url = 'galeria/' + url
        }
        const email = p.email

        galeria.innerHTML +=
            `<div class="col">` +
            `<div class="card mb-4" style="width: 15rem;" >` +
            `<img src=${url} alt="Foto do funcionario" class="card-img-top" >` +
            `<div class="card-body text-center">` +
            ` <h5 class="card-title">${p.nome}</h5>` +
            `<h6 class="card-subtitle mb-2 text-muted">${p.email}</h6>` +
            ` <p class="card-text">Contato: ${p.telefone}</p>` +
            `<p class="card-text">Matrícula: ${p.id}</p>` +
            `</div>` +
            `</div>` +
            ` </div>`
    })
}
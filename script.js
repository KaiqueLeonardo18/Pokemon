var form = document.querySelector('form');

form.addEventListener('submit', function (e) {
    //bloqueia o refresh da pagina
    e.preventDefault()

    //url da api
    let urlform = "https://pokeapi.co/api/v2/pokemon/"

    //Valor do input name
    let nome = document.getElementById("name")

    urlform = urlform + this.name.value

    urlform = urlform.toLowerCase()

    let resposta = document.getElementById('content')
    let imagem = document.getElementById('imgPokemon')

    let html = ''

    fetch(urlform)
        .then(resposta => resposta.json())
        .then(function (data) {
            console.log(data)
            html = 'Nome: ' + deixarPrimeiraLetraMaiusculo(data.name) + '<br>'
            html = html + 'Type: ' + deixarPrimeiraLetraMaiusculo(data.types[0].type.name)
            resposta.innerHTML = html

            imagem.innerHTML = "<img src='" + data.sprites.front_default + "'> <img src='" + data.sprites.back_default + "'>"
        })
        .catch(function (err) {
            if (err == 'SyntaxError: Unexpected token '+"'"+ 'N' + "'"+', "Not Found" is not valid JSON') {
                html = 'Pokemon nao encontrado😢'
            }
            else {
                html = 'Erro: ' + err
            }
            resposta.innerHTML = html
        })
})

function deixarPrimeiraLetraMaiusculo(valor) {
    return valor[0].toUpperCase() + valor.substr(1)
}
function getProdutos() {

    var url = tratarDadosgetProdutos();

    $.ajax({
        url: url,
        type: 'GET',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: data => {
            console.log(data);
            var tamanho = data._produto.length;
            var produtos = data._produto;
            console.log(tamanho);
            console.log(produtos);
            for (i = 0; i < 4; i++) {
                var produto = produtos[i];

                retornarDiv(produto);

            }
        },
        error: result => {
            alert(result.status + ' ' + result.statusText);
        }
    });
}

function getProdutosFull() {

    var url = tratarDadosgetProdutos();

    $.ajax({
        url: url,
        type: 'GET',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: data => {
            console.log(data);
            var tamanho = data._produto.length;
            var produtos = data._produto;
            console.log(tamanho);
            console.log(produtos);
            for (i = 0; i < tamanho; i++) {
                var produto = produtos[i];

                retornarDiv(produto);

            }
        },
        error: result => {
            alert(result.status + ' ' + result.statusText);
        }
    });
}

function tratarDadosgetProdutos() {
    var url1 = 'http://localhost:8080/Produtos'
    var filtro = $("#nomePesquisa").val();
    if (!(filtro == null || filtro == '')) {
        console.log('entrei')
        url1 += '?Nome=' + filtro;
    }
    return url1;
}

function mostrarEstrelas(qtdEstrela) {

    let fullStar = '<i class="fas fa-star"></i>';
    let halfStar = '<i class="fas fa-star-half"></i>';
    let estrela = '';
    let x = Math.floor(qtdEstrela);
    for (let i = 0; i < x; i++) {
        estrela += fullStar;
    }
    if (x != qtdEstrela) {
        estrela += halfStar;
    }

    console.log(estrela);
    return estrela;


}

function retornarDiv(response) {
    console.log(response)
    response._preco = response._preco.toFixed(2);
    return $("#divPrincipal").append(
        '<a href="' + 'produto-especifico.html' + '" class="produtos-container col-md-3">' +
        '<img src="'+response._imagem+'" class="img-fluid" alt="Cropped rosa">' +
        '<article class="produtos-itens">' +
        '<h2>' + response._nomeProduto + '</h2>' +
        '<div class="produtos-stars">' + mostrarEstrelas(response._qualidadeProduto) + '</div>' +
        '<strong class="produtos-preco"> R$ ' + response._preco + '</strong>' +
        '</article>' +
        '</a>'


        /* '<div class="form-group col-md-4">' +
         '<div class="card" style="width: 18rem;">' +
         '<img class="card-img-top" src="images/teste.jpg" alt="Card image cap">' +
         '<div class="card-body">' +
         '<h5 class="card-title">' + response._nomeProduto + '</h5>' +
         '<p class="card-text">' + response._descricao + '</p>' +
         '<p class="card-text">' + response._preco + '</p>' +
         '<a href="#" class="btn btn-primary">Ver mais</a>' +
         '</div>' +
         '</div>' +
         '</div>'*/
    )

}
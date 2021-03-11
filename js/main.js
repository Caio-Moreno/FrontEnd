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

function getProdutoEspecifico() {

    var url = urlProdutoPorID();

    $.ajax({
        url: url,
        type: 'GET',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: data => {
            console.log(data);
            var produto = data._produto[0];
            popularTelaPrdutoEspecifico(produto);
        },
        error: result => {
            alert(result.status + ' ' + result.statusText);
        }
    });
}

function popularTelaPrdutoEspecifico(produto) {
    console.log('aqui')
    $('#nomeProdutoActive').text(produto._nomeProduto);
    $('#nomeProduto').text(produto._nomeProduto);
    $('#descricao').text(produto._descricao);
    $('#preco').text('R$ ' + produto._preco.toFixed(2));
    $('#estrelas').append(mostrarEstrelas(produto._qualidadeProduto));
    console.log('aqui')
    var imagens = produto._imagem;
    Object.keys(imagens).forEach(function(item) {
        console.log(item + " = " + imagens[item]);
        if (imagens[item] != null) {
            if (item == 'caminhoImagem1') {
                $('#imagensCarousel').append('<div class="carousel-item active">' +
                    '<img class="d-block w-100" src="' + imagens[item] + '" alt="First slide">' +
                    '</div>');
            } else {
                $('#imagensCarousel').append('<div class="carousel-item">' +
                    '<img class="d-block w-100" src="' + imagens[item] + '" alt="Second slide">' +
                    '</div>')
            }
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

function urlProdutoPorID() {

    var url = 'http://localhost:8080/Produtos?Id=';
    var queryString = window.location.search;
    var id = queryString.replace(/[^0-9]/g, '');
    return url + id;

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
        '<a href="' + 'produto-especifico.html?Id=' + response._idProduto + '" class="produtos-container col-md-3">' +
        '<img src="' + response._imagem + '"class="img-home" alt=' + response._nomeProduto + '>' +
        '<article class="produtos-itens">' +
        '<h2>' + response._nomeProduto + '</h2>' +
        '<div class="produtos-stars">' + mostrarEstrelas(response._qualidadeProduto) + '</div>' +
        '<strong class="produtos-preco"> R$ ' + response._preco + '</strong>' +
        '</article>' +
        '</a>'
    )

}


// ------------------------------ Função de pegar o produto especifico e mostrar na tela via JS -----------------------------------------------------

/*function retornaProdutoEspecifico(response) {
    console.log(response)
    response._preco = response._preco.toFixed(2);
    return $("#produtoID").append(
        '<figure class="col-md-7 mb-3">' +
        '<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">' +
        '<ol class="carousel-indicators">' +
        '<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>' +
        '<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>' +
        '<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>' +
        '</ol>' +
        '<div class="carousel-inner">' +
        '<div class="carousel-item active">' +
        '<img class="d-block w-100" src="http://imagens-bombapath-games.s3.amazonaws.com/9imagem0.jpg" alt="First slide">' +
        '</div>' +
        '<div class="carousel-item">' +
        '<img class="d-block w-100" src="http://imagens-bombapath-games.s3.amazonaws.com/9imagem1.jpg" alt="Second slide">' +
        '</div>' +
        '<div class="carousel-item">' +
        '<img class="d-block w-100" src="http://imagens-bombapath-games.s3.amazonaws.com/9imagem2.jpg" alt="Third slide">' +
        '</div>' +
        '<div class="carousel-item">' +
        '<img class="d-block w-100" src="http://imagens-bombapath-games.s3.amazonaws.com/9imagem3.jpg" alt="Third slide">' +
        '</div>' +
        '</div>' +
        '<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">' +
        '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
        '<span class="sr-only">Previous</span>' +
        '</a>' +
        '<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">' +
        '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
        '<span class="sr-only">Next</span>' +
        '</a>' +
        '</div>' +
        '</figure>' +
        '<section class="col-md-5 mb-3 d-flex flex-column justify-content-around">' +
        '<article class="produtos-conteudo">' +
        '<h1>' + response._nomeProduto + '</h1>' +
        '<p>' + response._descricao + '</p>' +
        '<article class="produtos-preco">' +
        '<div class="produtos-stars">' + mostrarEstrelas(response._qualidadeProduto) + '</div>' +
        '<strong>' + response._preco + '<span class="d-block">Em até 12x sem Juros</span> </strong>' +
        '<form action = "#" >' +
        '<div class = "form-group" >' +
        '<label for = "produtos-quantidade-itens" > Quantidade </label>' +
        '<select class = "form-control" id = "produtos-quantidade-itens" >' +
        '<option > 1 </option> <option> 2 </option> <option> 3 </option> <option> 4 </option> <option> 5 </option> </select>' +
        '</div>' +
        '<button type = "submit" class = "btn btn-success col-md-12" > Comprar </button>' +
        '</form>' +
        '</article>' +
        '</section>'
    )
}*/
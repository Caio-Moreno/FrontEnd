$(document).ready(function () {

    var dadosUsuario = localStorage.getItem('dadosUsuario');
    if(dadosUsuario == null || dadosUsuario == '' || dadosUsuario == undefined){
        $('#clienteLogado').hide();
        $("#entrarCliente").show();   
    }else{
        user = dadosUsuario.split(',')
        $('#clienteLogado').show();
        $("#entrarCliente").hide();   

        $('#bemVindoCliente').html('Bem-vindo ' + user[5]);
    }

    

    $("#entrarCliente").click(function(event){

        window.location.href = "login.html";
    
    });



$("#meusDados").click(function(e){
    var dadosUsuario = localStorage.getItem('dadosUsuario');
    if(dadosUsuario == null || dadosUsuario == '' || dadosUsuario == undefined){
       alert('Você não está logado!');
       window.location.href = "login.html";
    }else{
        var user = dadosUsuario.split(',')
        //alert(user[0]);
        var idCliente = user[0];
        
        window.location.href = 'Atualizar.html?id='+idCliente;
    }
});



});


function getProdutos() {

    var url = tratarDadosgetProdutos();
    console.log(url);

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

function getProdutosTotal() {

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

            $("#botaoVejaMais").click(function() {
                for (i = 4; i < tamanho; i++) {
                    var produto = produtos[i];

                    retornarDiv(produto);
                }
            });


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



$(document).ready(function () {
    var sessionId = localStorage.getItem('sessionId');
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

  

    if(!verificaSessao()) window.location.reload(true);

    function verificaSessao(){
        if(sessionId == null){
            localStorage.setItem('sessionId', getTokenSession())
            return true;
        }else {
            var splitar = sessionId.split(',')
            if(horaAtual() > splitar[1]){
                
                localStorage.removeItem('carrinho');
                localStorage.removeItem('sessionId');
                return false;
            }
        }
        return true;
    }



    function horaAtual() {
       // Obtém a data/hora atual
        var data = new Date();

        // Guarda cada pedaço em uma variável
        var dia     = data.getDate();           // 1-31
        var dia_sem = data.getDay();            // 0-6 (zero=domingo)
        var mes     = data.getMonth();          // 0-11 (zero=janeiro)
        var ano2    = data.getYear();           // 2 dígitos
        var ano4    = data.getFullYear();       // 4 dígitos
        var hora    = data.getHours();          // 0-23
        var min     = data.getMinutes();        // 0-59
        var seg     = data.getSeconds();        // 0-59
        var mseg    = data.getMilliseconds();   // 0-999
        var tz      = data.getTimezoneOffset(); // em minutos

        // Formata a data e a hora (note o mês + 1)
        var str_data = dia + '/' + (mes+1) + '/' + ano4;
        var str_hora = hora + ':' + min + ':' + seg;
        
        return hora;
    }

    function getTokenSession() {
        var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ";
        var tokenLength = 32;
        var tokenSession = "";
  
        for (var i = 0; i < tokenLength; i++) {
          var randomNumber = Math.floor(Math.random() * chars.length);
          tokenSession += chars.substring(randomNumber, randomNumber + 1);
        }


        // Obtém a data/hora atual
        var data = new Date();

        var hora    = data.getHours();          // 0-23
        
        var horaAcima = parseInt(hora) + 5;

        

        return  tokenSession + ','+horaAcima;
    }
});


function getProdutos() {

    var url = tratarDadosgetProdutos();
    

    $.ajax({
        url: url,
        type: 'GET',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: data => {
            

            var tamanho = data._produto.length;
            var produtos = data._produto;
       
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
    
            var tamanho = data._produto.length;
            var produtos = data._produto;
        

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
  
            var produto = data._produto[0];
            popularTelaPrdutoEspecifico(produto);
        },
        error: result => {
            alert(result.status + ' ' + result.statusText);
        }
    });
}

function popularTelaPrdutoEspecifico(produto) {
 
    $('#nomeProdutoActive').text(produto._nomeProduto);
    $('#nomeProduto').text(produto._nomeProduto);
    $('#descricao').text(produto._descricao);
    $('#preco').text('R$ ' + produto._preco.toFixed(2));
    $('#idDoProduto').val(produto._idProduto);
    $('#estrelas').append(mostrarEstrelas(produto._qualidadeProduto));
    
    var imagens = produto._imagem;
    Object.keys(imagens).forEach(function(item) {
        
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
    var url1 = 'http://localhost:8080/Produtos/Loja'
    var filtro = $("#nomePesquisa").val();
    if (!(filtro == null || filtro == '')) {
        
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

    
    return estrela;


}



function retornarDiv(response) {
    
    
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


function logout(){
    
    var url = 'http://localhost:8080/Login/logout';
    var dados = localStorage.getItem('dadosUsuario');
    dados = dados.split(',');

    var json = JSON.stringify({
        _id: dados[0],
        _login: dados[1],
        _password: dados[2],
        _permission: dados[3],
        _token: dados[4],
        _idCliente: dados[5]
    });

    $.ajax({
        url: url,
        type: 'POST',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: data => {
            if(data._codigo != 200) {
                alert(data._message);
            } 
            else {
                limparStorage();
                window.location.reload(true);
            }   
        },
        error: result => {
            console.log(result)
        },
    });
}

function limparStorage(){
    localStorage.removeItem('token');
    localStorage.removeItem('dadosUsuario');
}
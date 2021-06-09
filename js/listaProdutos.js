function verificaEstoquista() {
    var dados = localStorage.getItem('dadosUsuario').split(',');
    var tipo = dados[3];
  

    if(tipo == 'ESTOQUISTA'){
        $("#nomeProdutoAlterar").attr("disabled", true);
        $("#descricaoProdutoAlterar").attr("disabled", true);
        $("#half-stars-example").attr("disabled", true);
        $("#categoriaProdutoAlterar").attr("disabled", true);
        $("#statusProdutoAlterar").attr("disabled", true);
        $("#precoProdutoAlterar").attr("disabled", true);
        $("#plataformaProdutoAlterar").attr("disabled", true);
        $("#gallery-photo-add").attr("disabled", true);
        $("#rating2-0").attr("disabled", true);
        $("#rating2-05").attr("disabled", true);
        $("#rating2-10").attr("disabled", true);
        $("#rating2-15").attr("disabled", true);
        $("#rating2-20").attr("disabled", true);
        $("#rating2-25").attr("disabled", true);
        $("#rating2-30").attr("disabled", true);
        $("#rating2-35").attr("disabled", true);
        $("#rating2-40").attr("disabled", true);
        $("#rating2-45").attr("disabled", true);
        $("#rating2-50").attr("disabled", true);
    }
}



function getProdutosLista() {

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
            console.log(tamanho);
            //console.log(produtos);
            for (i = 0; i < tamanho; i++) {
                var produto = produtos[i];

                retornarLinha(produto);
            }

    


        },
        error: result => {
            alert(result.status + ' ' + result.statusText);
        }
    });
}

function tratarDadosgetProdutos() {
    var url1 = 'http://localhost:8080/Produtos?status=A'
    return url1;
}

function retornarLinha(response) {
    console.log(response);

    if (response._descricao.length > 11) {
        //Para não deixar muito grande a descrição
        response._descricao = response._descricao.substr(0, 11) + '...'
    }
    //instacio a tabela
    var tabela = $('#dataTable');
    //procuro o corpo da tabela e armazeno em uma variavel
    var body = tabela.find('tbody');
    //armazeno em uma variavel a linha tr = linha
    var tr = $('<tr></tr>')
        //cada coluna da linha eu armazeno numa var também
    var td1 = $('<td data-id="' + response._idProduto + '"></td>');
    var td2 = $('<td data-nome="' + response._nomeProduto + '"></td>');
    var td3 = $('<td data-descricao="' + response._descricao + '"></td>');
    var td4 = $('<td data-qualidade="' + response._qualidadeProduto + '"></td>');
    var td5 = $('<td data-categoria="' + response._categoria + '"></td>');
    if (response._statusProduto == 'A') {
        var td6 = $('<td ondblclick="mostrarModalAtualizar(' + response._idProduto + ',\'A\')">  <i class="fa fa-check-square-o" aria-hidden="true"></i> </td>');
        //console.log('<td ondblclick="mostrarModalAtualizar('+response._idProduto+',\'A\')">   <i class="fa fa-check-square-o" aria-hidden="true"></i> </td>')

    } else if (response._statusProduto == 'I') {
        var td6 = $('<td ondblclick="mostrarModalAtualizar(' + response._idProduto + ',\'I\')" data-status="' + response._statusProduto + '"> <i class="fa fa-ban" aria-hidden="true"></i></td>');
    }
    var td7 = $('<td data-status="' + response._qtdEstoque + '"></td>');
    var td8 = $('<td data-estoque="' + response._qtdEstoque + '"></td>');
    //console.log(response._imagem);
    //var td9 = $('<td data-imagem="'+response._imagem+'"><img src="'+response._imagem+'"></td>'); 
    var td9 = $('<td data-imagem="' + response._imagem + '"><img src="' + response._imagem + '" class="tratarImage"></td>'); //por enquanto pra teste
    var td10 = $('<td data-plataforma="' + response._plataforma + '"></td>');
    var td11 = $('<td onclick="mostrarModalEditar(' + response._idProduto + ')"><a href="#"><i class="fa fa-pencil" aria-hidden="true"></i></a></td>')
        //var td12 = $('<td onclick="mostrarModalExclusao(' + response._idProduto + ')" ><a href="#"><i class="fa fa-trash" aria-hidden="true"></i></a></td>')
    var td13 = $('<td> <a href="../Loja/produto-especifico.html?Id=' + response._idProduto + '" target="_blank"><i class="fa fa-eye" aria-hidden="true"></i></a> </td>')
        //passo os valores de cada coluna
    td1.text(response._idProduto);
    td2.text(response._nomeProduto)
    td3.text(response._descricao);
    td4.text(response._qualidadeProduto);
    td5.text(response._categoria);
    //td6.text(response._statusProduto);
    td7.text(response._qtdEstoque);
    td8.text(response._preco);
    //td9.text(response._imagem);
    td10.text(response._plataforma)
        //insiro na linhas todas colunas preenchidas
    tr.append(td1)
    tr.append(td2)
    tr.append(td3)
    tr.append(td4)
    tr.append(td5)
    tr.append(td6)
    tr.append(td7)
    tr.append(td8)
    tr.append(td9)
    tr.append(td10)
    tr.append(td11)
        // tr.append(td12)
    tr.append(td13)
        //insiro no corpo a linha
    body.append(tr);



    return;
}

/*function mostrarModalExclusao(idProduto) {
    $("#nomeProduto").html(idProduto);
    $("#codProduto").val(idProduto);
    $('#modalExclusao').modal('show');
}*/

function mostrarModalEditar(idProduto) {
    mostrarProduto(idProduto);
    $('#modalEditar').modal('show');

}

function mostrarModalAtualizar(idProduto, StatusAtual) {
    console.log('ENTREI' + idProduto + StatusAtual)
    $('#idProdutoAtualizarStatus').val(idProduto);
    $('#statusAtualizarProduto').val(StatusAtual);
    $('#modalAtualizaStatus').modal('show');
}


function mostrarProduto(id) {
    $('#alertaAtualizado').hide();
    var url = 'http://localhost:8080/Produtos?Id=' + id;
    console.log('Consumindo para o modal' + url);

    $.ajax({
        url: url,
        type: 'GET',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: data => {
            var produto = data._produto[0];
            $('#idProdutoAlterar').val(id);
            $('#nomeProdutoAlterar').val(produto._nomeProduto);
            $('#descricaoProdutoAlterar').val(produto._descricao);
            $('#qualidadeProdutoAlterar').val(produto._qualidadeProduto);
            $('#categoriaProdutoAlterar').val(produto._categoria);
            $('#statusProdutoAlterar').val(produto._statusProduto);
            $('#quantidadeProdutoAlterar').val(produto._qtdEstoque);
            $('#precoProdutoAlterar').val(produto._preco);
            $('#plataformaProdutoAlterar').val(produto._plataforma);
            $('#image1').attr('src', produto._imagem.caminhoImagem1);
            $('#image2').attr('src', produto._imagem.caminhoImagem2);
            $('#image3').attr('src', produto._imagem.caminhoImagem3);
            $('#image4').attr('src', produto._imagem.caminhoImagem4);

            
            mostrarEstrela();

            console.log(produto);


        },
        error: result => {
            alert(result.status + ' ' + result.statusText);
        }
    });

}


function atualizarProduto() {
    var token = localStorage.getItem('token');
    console.log(token);

    if( $('#quantidadeProdutoAlterar').val() < 0){
        alert('Quantidade não pode ser menor que 0')
        return;
    }

    var data = retornarObjUpdate();
    var id = $('#idProdutoAlterar').val();
    id = parseInt(id);
    console.log('ID' + id);
    var url = 'http://localhost:8080/Produtos?Id=' + id



    $.ajax({
        url: url,
        type: 'PUT',
        headers: { 'TOKEN': token },
        timeout: 2000000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: data,
        success: _ => {
            var mensagem = _._message;
            var produto = _._produto[0];
            console.log(produto + 'to aqui no produto')
            enviarImagens(produto);
            $('#modalEditar').modal('hide');
            alert(mensagem);
            window.location.reload();
        },
        error: result => {
            console.log(result)
        },
        done: _ => {
            alert('finalizou')
        }
    });
}

function retornarObjUpdate() {
    var nome = $('#nomeProdutoAlterar').val();
    console.log('No Retorno ->> ' + nome);
    var descricao = $('#descricaoProdutoAlterar').val();
    var qualidade = $('#qualidadeProdutoAlterar').val();

    console.log('No Retorno ->> ' + qualidade);
    var categoria = $('#categoriaProdutoAlterar').val();
    var quantidade = $('#quantidadeProdutoAlterar').val();
    console.log('No Retorno ->> ' + quantidade);
    var status = $('#statusProdutoAlterar').val();
    var preco = $('#precoProdutoAlterar').val();
    var plataforma = $('#plataformaProdutoAlterar').val();

    var json = JSON.stringify({
        _nomeProduto: nome,
        _descricao: descricao,
        _qualidadeProduto: qualidade,
        _categoria: categoria,
        _statusProduto: status,
        _qtdEstoque: quantidade,
        _preco: preco,
        _plataforma: plataforma
    })


    return json;
}

function atualizaStatus() {
    var token = localStorage.getItem('token');
    console.log(token)

    var id = $('#idProdutoAtualizarStatus').val();
    id = parseInt(id);
    console.log(id)
    var status = $('#statusAtualizarProduto').val();

    if (status == 'A') {
        status = 'I'
    } else {
        status = 'A'
    }

    var json = JSON.stringify({
        _id: id,
        _status: status
    })

    var url = 'http://localhost:8080/Produtos'


    $.ajax({
        url: url,
        type: 'PUT',
        headers: { 'TOKEN': token },
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: _ => {
            var mensagem = _._message;
            $('#modalAtualizaStatus').modal('hide');
            alert(mensagem);
            window.location.reload();
        },
        error: result => {
            console.log(result)
        },
        done: _ => {
            alert('finalizou')
        }
    });

}


function enviarImagens(produto) {

    // Read selected files
    console.log(produto);

    //var foto = document.querySelector('#gallery-photo-add').files[0];
    var formData = new FormData();
    var foto = document.querySelector('#gallery-photo-add').files.length;

    for (var index = 0; index < foto; index++) {
        formData.append("foto", document.querySelector('#gallery-photo-add').files[index]);
    }
    //formData.append("foto", foto);

    $.ajax({
        url: 'http://localhost:8080/imagem?id=' + produto._idProduto,
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(response) {
            //alert('Produto ' + produto._nomeProduto + ' foi cadastrado');
            $('#loading').hide(100)
            $('#alertaSucesso').show(200)
            $('#addProduct').show(200)

            $('#formulario').each(function() {
                this.reset();
            });
            $("#gallery").empty();
            //window.location.reload();
        },
        error: data => {
            alert(data)
            $('#alertaErro').show(200)
            $('#loading').hide(100)
            $('#addProduct').show(100)
            $("#gallery").empty();
        }
    });



}

function mostrarEstrela() {
    let star = document.getElementById('qualidadeProdutoAlterar').value;
    $("input[name=rating2][value='" + star + "']").prop('checked', true);
    console.log("Berimbola " + star);
}

/*
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


function urlProdutoPorID() {

  var url = 'http://localhost:8080/Produtos?Id=';
  var queryString = window.location.search;
  var id = queryString.replace(/[^0-9]/g, '');
  return url + id;

}*/
function enviarProduto() {
    var token = localStorage.getItem('token');
    console.log(token)
    $('#loading').show(200)
    $('#addProduct').hide(100)
    $('#alertaErro').hide()
    $('#alertaSucesso').hide()
    //var imagens = enviarImagens();
    var dataSend = retornarObj();

    var url = 'http://localhost:8080/Produtos'

    $.ajax({
        url: url,
        type: 'POST',
        headers: {'TOKEN': token},
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: dataSend,
        success: data => {
            var produto = data._produto[0];
            console.log(produto);
            enviarImagens(produto);
        },
        error: result => {
            console.log(result)
            $('#loading').hide(100)
            $('#alertaErro').show(200)
            $('#addProduct').show(100)
            $("#gallery").empty();
        }
    });
}

function retornarObj() {
    var nome = document.getElementById('nomeProduto').value;
    var descricao = document.getElementById('descricao').value;
    var qualidade = document.getElementById('ficarEscondido').value;
    var categoria = document.getElementById('categoria').value;
    var quantidade = document.getElementById('quantidade').value;
    var estado = document.getElementById('estado').value;
    var preco = document.getElementById('preco').value;
    var plataforma = document.getElementById('plataforma').value;

    var json = JSON.stringify({
        _nomeProduto: nome,
        _descricao: descricao,
        _qualidadeProduto: qualidade,
        _categoria: categoria,
        _statusProduto: estado,
        _qtdEstoque: quantidade,
        _preco: preco,
        //_imagem: imagens,
        _plataforma: plataforma
    })
    alert(json);
    return json;
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
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            //alert('Produto ' + produto._nomeProduto + ' foi cadastrado');
            $('#loading').hide(100)
            $('#alertaSucesso').show(200)
            $('#addProduct').show(200)

            $('#formulario').each (function(){
                this.reset();
              });
              $("#gallery").empty();
            //window.location.reload();
        },
        error: data => {
            $('#alertaErro').show(200)
            $('#loading').hide(100)
            $('#addProduct').show(100)
            $("#gallery").empty();
        }
    });



}
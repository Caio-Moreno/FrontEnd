function enviarProduto() {
    //var imagens = enviarImagens();
    var dataSend = retornarObj();

    var url = 'http://localhost:8080/Produtos'

    $.ajax({
        url: url,
        type: 'POST',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: dataSend,
        success: data => {
            console.log(data);
            var produto = data._produto[0];
            console.log(produto)
            alert('Produto ' + produto._nomeProduto + ' foi cadastrado');
        },
        error: result => {
            console.log(result)
        },
        done: result => {
            alert('finalizou')
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

    return json;
}

function enviarImagens() {
    var url = 'http://localhost:8080/Produtos?id=1' //FALTA ALTERAR O CAMINHO
    var formData = new FormData(this);
    /*
    AQUI PEGO AS IMAGENS NO FRONT PARA PASSAR PARA O ENDPOINT DO VITINHO
    */

    $.ajax({
        url: url,
        type: 'POST',
        timeout: 20000,
        data: formData,
        success: data => {
            console.log('Imagens cadastradas...');
        },
        error: result => {
            alert('Error')
            console.log(result)
        },
        done: result => {
            alert('finalizou')
        }
    });

    return imagens;

}
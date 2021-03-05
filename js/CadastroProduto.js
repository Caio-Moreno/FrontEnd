function enviarProduto(){
    var imagens = enviarImagens();
    var dataSend = retornarObj(imagens);
    
    var url = 'http://localhost:8080/Produtos'

    $.ajax({
        url: url,
        type: 'POST',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: dataSend,
        success: data => {      
            alert('Produto '+data._nomeProduto + ' foi cadastrado');
        },
        error: result => {
            console.log(result)
        },
        done: result => {
            alert('finalizou')
        }
      });
}

function retornarObj(imagens){
    var nome = document.getElementById('nomeProduto').value;
    var descricao = document.getElementById('descricao').value;
    var qualidade = document.getElementById('ficarEscondido').value;
    var categoria = document.getElementById('categoria').value;
    var quantidade = document.getElementById('quantidade').value;
    var estado = document.getElementById('estado').value;
    var preco = document.getElementById('preco').value;
    var plataforma = document.getElementById('plataforma').value;
   
    var json = JSON.stringify({
        _nomeProduto : nome,
        _descricao: descricao,
        _qualidadeProduto: qualidade,
        _categoria: categoria,
        _statusProduto: estado,
        _qtdEstoque: quantidade,
        _preco: preco,
        _imagem: imagens,
        _plataforma: plataforma
    })

    return json;
}

function enviarImagens(){
    var url = 'http://localhost:8080/Produtos' //FALTA ALTERAR O CAMINHO
    var imagens = null;
    /*
    AQUI PEGO AS IMAGENS NO FRONT PARA PASSAR PARA O ENDPOINT DO VITINHO
    */

    $.ajax({
        url: url,
        type: 'POST',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: dataSend,
        success: data => {      
            console.log('Imagens cadastradas...');
            imagens = data;
            console.log(imagens);
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
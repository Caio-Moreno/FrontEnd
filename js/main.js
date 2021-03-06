function getProdutos(){

var url = tratarDadosgetProdutos();

$.ajax({
    url: url,
    type: 'GET',
    timeout: 20000,
    contentType:"application/json; charset=utf-8",
    dataType:"json",  
    success: data => {      
      console.log(data);
      var tamanho = data._produto.length;
      var produtos = data._produto;
      console.log(tamanho);
      console.log(produtos);
      


      for(i = 0; i < tamanho; i++){
        var produto = produtos[i];
    
        retornarDiv(produto);
      }
    },
    error: result => {
        alert(result.status + ' ' + result.statusText);
    }
  });
}

function tratarDadosgetProdutos(dados){
  var url1 = 'http://localhost:8080/Produtos'
  var filtro = $("#nomePesquisa").val();
    if(!(filtro == null || filtro == '')){
      console.log('entrei')
      url1 += '?Nome='+filtro;
    }
    return url1;
}

function retornarDiv(response){
  console.log(response)
  response._preco = response._preco+'.00'
 return $("#divPrincipal").append(
    '<div class="form-group col-md-4">'+
    '<div class="card" style="width: 18rem;">'+
    '<img class="card-img-top" src="images/teste.jpg" alt="Card image cap">'+
    '<div class="card-body">'+
    '<h5 class="card-title">'+response._nomeProduto+'</h5>'+
    '<p class="card-text">'+response._descricao+'</p>'+
    '<p class="card-text">'+response._preco+'</p>'+
    '<a href="#" class="btn btn-primary">Ver mais</a>'+
    '</div>'+
    '</div>'+
    '</div>')
}
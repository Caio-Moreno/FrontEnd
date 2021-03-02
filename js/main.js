function consumoApi(){
    console.log('Entrei no consumo da API')
    var url1 = 'http://localhost:8080/Produtos'
    var filtro = $("#nomePesquisa").val();

    console.log(filtro);
    if(!(filtro == null || filtro == '')){
      console.log('entrei')
      url1 += '?Nome='+filtro;
    }

console.log('Consumindo... ' + url1);

jQuery.ajax({
    url: url1,
    type: 'GET',
    timeout: 20000,
    contentType:"application/json; charset=utf-8",
    dataType:"json",  
    success: data => {      
      console.log(data);
      var tamanho = data.length;
      console.log(tamanho);

      for(i = 0; i < tamanho; i++){
        var produto = data[i];
        document.getElementById('nomeExtenso').value = produto._nomeExtenso;
        document.getElementById('qualidade').value = produto._qualidadeProduto;
        document.getElementById('categoria').value = produto._categoria;
        
        $("#divPrincipal").append('<div class="card" style="width: 18rem;">'+
        '<img class="card-img-top" src="..." alt="Card image cap">'+
        '<div class="card-body">'+
        '<h5 class="card-title">'+produto._nomeExtenso+'</h5>'+
        '<p class="card-text">Some quick example text to build on the card title and make up the bulk of the  content.</p>'+
        '<a href="#" class="btn btn-primary">Go somewhere</a>'+
        '</div>'+
        '</div>')
        
       // console.log(produto._imagem.caminhoImagem1);
      }
      
      
    },
    error: result => {
        alert(result.status + ' ' + result.statusText);
    }
  });


}


function getProdutosLista(){

    var url = tratarDadosgetProdutos();
    
    $.ajax({
        url: url,
        type: 'GET',
        timeout: 20000,
        contentType:"application/json; charset=utf-8",
        dataType:"json",  
        success: data => {
          var tamanho = data._produto.length;
          var produtos = data._produto;
          console.log(tamanho);
          console.log(produtos);
          for(i = 0; i < tamanho; i++){
            var produto = produtos[i];
        
            retornarLinha(produto);
          }
        },
        error: result => {
            alert(result.status + ' ' + result.statusText);
        }
      });
    }
    
    function tratarDadosgetProdutos(){
      var url1 = 'http://localhost:8080/Produtos'
      var filtro = $("#nomePesquisa").val();
        if(!(filtro == null || filtro == '')){
          console.log('entrei')
          url1 += '?Nome='+filtro;
        }
        return url1;
    }
    
    function retornarLinha(response){
        if(response._descricao.length > 11){
            //Para não deixar muito grande a descrição
            response._descricao = response._descricao.substr(0,11)+'...'
        }
        //instacio a tabela
        var tabela = $('#dataTable');
        //procuro o corpo da tabela e armazeno em uma variavel
        var body = tabela.find('tbody');
        //armazeno em uma variavel a linha tr = linha
        var tr = $('<tr></tr>')
        //cada coluna da linha eu armazeno numa var também
        var td1 = $('<td></td>');
        var td2 = $('<td></td>');
        var td3 = $('<td></td>');
        var td4 = $('<td></td>');
        var td5 = $('<td></td>');
        var td6 = $('<td></td>');
        var td7 = $('<td></td>');
        var td8 = $('<td></td>');
        var td9 = $('<td><img src="'+response._imagem+'"></td>'); 
        var td10 = $('<td></td>');
        var td11 = $('<td><a href="#"><i class="fa fa-pencil" aria-hidden="true"></i></a></td>')
        var td12 = $('<td><a href="#"><i class="fa fa-trash" aria-hidden="true"></i></a></td>')
        //passo os valores de cada coluna
        td1.text(response._idProduto);
        td2.text(response._nomeProduto)
        td3.text(response._descricao);
        td4.text(response._qualidadeProduto);
        td5.text(response._categoria);
        td6.text(response._statusProduto);
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
        tr.append(td12)
        //insiro no corpo a linha
        body.append(tr);
        
        return;
    }
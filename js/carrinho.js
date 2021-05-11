	// JQuery simples para aplicar ou remover a classe que faz a transição do minicart
	
		$('.open-cart').on('click', function() {
			$('#cart').addClass('active');
			event.preventDefault();
		});
		$('#back-cart').on('click', function() {
			$('#cart').removeClass('active');
			event.preventDefault();
		});



		$('#add-carrinho').on('click', function(e){
			$('#cart').addClass('active');
			addCart();
			e.preventDefault();
		});

		function addCart(){


			if(localStorage.getItem('dadosUsuario') == null){

				var url = 'http://localhost:8080/Carrinho/Deslogado';

				json = montajson('deslogado')
			}else{
				var url = 'http://localhost:8080/Carrinho';
				json = montajson('logado') 
			}

		

			$.ajax({
				url: url,
				type: 'POST',
				timeout: 20000,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				data: json,
				success: data => {
						buscarCarrinho();
				},
				error: data => {
				
				}
			
			});
			}

			function buscarCarrinho(){
				var url = "";
				if(localStorage.getItem('dadosUsuario') == null){
					 url = 'http://localhost:8080/Carrinho/getCart?session='+retornarDados('sessionId');
				}else {
					 url = 'http://localhost:8080/Carrinho?id='+retornarDados('idCliente');
				}

				$.ajax({
					url: url,
					type: 'GET',
					timeout: 20000,
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: data => {
							popular(data);
							
					},
					error: data => {
						alert('erro para buscar carrinho');
					}
				
				});

			}
			
			function popular(carrinho){
				var total;
				var quantidade = carrinho._quantidade;
				var cart = carrinho._carrinho;
				var divPrincipal = $('#principalCarrinho');
				
				removeElements();
				
				var total = 0.00;

				for(let i = 0; i < quantidade; i++){
					var produto = cart[i];
					var valorDoProd = parseFloat(produto._valor);

					total += valorDoProd;
					
					if(produto._quantidade > 0){
						$('#qtdCarrinho').text(quantidade);
					var divCarrinho = '<div class="row mini-cart-list">'+
					'<div class="col-md-4 col-xs-4">'+
					  '<div class="img-ph">'+
						  '<img src="'+produto._imageProduto+'" class="img-ph" >'+
					  '</div>'+
					'</div>'+
					'<div>'+
						'<p>'+produto._nomeProduto+'</p>'+
						'<label>Quantidade:</label> <button type="button" class="btn btn-dark buttonDefault" onclick="decrementa('+produto._idProduto+')">-</button> <input value="'+produto._quantidade+'" style="width: 30px; text-align: center;" readonly> <button type="button" class="btn btn-dark buttonDefault" onclick="incrementa('+produto._idProduto+')">+</button>'+
						'<p>valor:'+produto._valor+'</p>'+
						'<p id="removerProd" onclick="deletar('+produto._idProduto+')">Remover</p>'+
					'</div>'+
				  '</div>'

					divPrincipal.append(divCarrinho);
				    }else{
						$('#qtdCarrinho').text(0);
					}

					
				}

				

				total = total.toFixed(2);

				//document.getElementById("valorTotal").innerHTML='teste';

				
				
				$('#valorTotal').html('Total: R$'+total);
				

			}

			function removeElements(){
				const div = $('#principalCarrinho');
				div.empty();

			}

			function deletar(id){
				var url = 'http://localhost:8080/Carrinho/deleteCart?id='+id+'&session='+retornarDados('sessionId');

				$.ajax({
					url: url,
					type: 'DELETE',
					timeout: 20000,
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: data => {
						
						buscarCarrinho();
						
					},
					error: data => {
						
					}
				
				});
				
			}

			function incrementa(id){
				var url;
				if(logado()){
					url = 'http://localhost:8080/Carrinho/increment/logged?id='+id+'&idCliente='+retornarDados('idCliente');
				}else {
					url = 'http://localhost:8080/Carrinho/increment?id='+id+'&session='+retornarDados('sessionId');
				}
				$.ajax({
					url: url,
					type: 'POST',
					timeout: 20000,
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: data => {
					
						buscarCarrinho();
						
					},
					error: data => {
						
					}
				
				});
				
			}

			function decrementa(id){
				var url;
				if(logado()){
					url = 'http://localhost:8080/Carrinho/decrement/logged?id='+id+'&idCliente='+retornarDados('idCliente');
				}else {
					url = 'http://localhost:8080/Carrinho/decrement?id='+id+'&session='+retornarDados('sessionId');
				}

				console.log(url)
				$.ajax({
					url: url,
					type: 'POST',
					timeout: 20000,
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: data => {
						console.log(data)
						buscarCarrinho();
					},
					error: data => {
						alert('erro')
						
					}
				
				});
				
			}

			function popularCarrinhoFinal(carrinho){
				
				var total = 0.00;
				var quantidade = carrinho._quantidade;
				var cart = carrinho._carrinho;
				
				var tabela = $('#tabelaProdutos');

				var body = tabela.find('tbody');

				limpaTabela();

				
				var tr2 = $('<tr></tr>')
				
			for(let i = 0; i < quantidade; i++){
				var tr = $('<tr  class="linhaEspaco1px"></tr>')
				var produto = cart[i];
				console.log('produto '+i);
				console.log(produto);
				var valorDoProd = parseFloat(produto._valor);
				

				total += valorDoProd;

				//alert(total)
			
				var td1 = $('<td style="text-align: center;"><img id="imagemAJuste" src="'+produto._imageProduto+'" class="imagemCarrinho"></td>')
				var td2 = $('<td id="nomeProd">'+produto._nomeProduto+'</td>')
				var td3 = $('<td>'+
				'<div class="input-group mb-3">'+
					'<div class="input-group-prepend">'+
					  '<span onclick="decrementaFinal('+produto._idProduto+')" id="increment" class="input-group-text bg-dark" >-</span>'+
					'</div>'+
					'<input class="text-center" type="text" id="qtdProdutoCart" value="'+produto._quantidade+'" readonly>'+
					'<div class="input-group-append">'+
					  '<span onclick="incrementaFinal('+produto._idProduto+')" id="decrement" class="input-group-text bg-dark" >+</span>'+
					'</div>'+
				  '</div>'+
				'</td>')
				var td4 = $('<td>R$'+produto._valor+'</td>')

				tr.append(td1);
				tr.append(td2);
				tr.append(td3);
				tr.append(td4);
				body.append(tr);
			}


			
				total = total.toFixed(2)
				

			var tdTotal = $('<td colspan="3">Total</td>')
			var tdTotal2 = $('<td>R$'+total+'</td>')

		
			tr2.append(tdTotal)
			tr2.append(tdTotal2)
			
			
			body.append(tr2)			
			}
			
			function buscarCarrinhoFinal(){
				
				var dadosSession = localStorage.getItem('sessionId').split(',');
				var sessionId = dadosSession[0];
				var url = 'http://localhost:8080/Carrinho/getCart?session='+sessionId;


				$.ajax({
					url: url,
					type: 'GET',
					timeout: 20000,
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: data => {		
						console.log(data)
							popularCarrinhoFinal(data);						
					},
					error: data => {
						
					}
				
				});

			}
	


			function incrementaFinal(id){
				var dadosSession = localStorage.getItem('sessionId').split(',');
				var sessionId = dadosSession[0];
				var url = 'http://localhost:8080/Carrinho/increment?id='+id+'&session='+sessionId;

				
				

				$.ajax({
					url: url,
					type: 'POST',
					timeout: 20000,
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: data => {
					
						buscarCarrinhoFinal();
						
					},
					error: data => {
						
					}
				
				});
				
			}

			function decrementaFinal(id){
				var dadosSession = localStorage.getItem('sessionId').split(',');
				var sessionId = dadosSession[0];
				var url = 'http://localhost:8080/Carrinho/decrement?id='+id+'&session='+sessionId;

				
				
				$.ajax({
					url: url,
					type: 'POST',
					timeout: 20000,
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: data => {
					
						buscarCarrinhoFinal();
					},
					error: data => {
						
					}
				
				});
				
			}

			function limpaTabela(){

				var tabela = $('#tabelaProdutos');

				var body = tabela.find('tbody');
				body.empty();
			}


			function montajson(tipo){
				var json;
				
				var sessionId = retornarDados('sessionId');

				var id = $('#idDoProduto').val();
				var preco = $('#preco').text().replace('R', '').replace('$', '');

				if(tipo == 'deslogado'){
					json = JSON.stringify({
					_idProduto: id,
    				_status: "PENDING",
    				_quantidade: 1,
    				_valor: preco,
    				_sessionId: sessionId
					});
				}else{
					var idCliente = retornarDados('idCliente');

					json = JSON.stringify({
					_idCliente: idCliente,
					_idProduto: id,
    				_status: "PENDING",
    				_quantidade: 1,
    				_valor: preco,
    				_sessionId: sessionId
					});
				}


				return json;

			}

			function retornarDados(valor) {
				var dados;
				var meuArray;
				if(logado()){
					dados = localStorage.getItem('dadosUsuario');
				    meuArray = dados.split(',');
				}

				var sessionId = localStorage.getItem('sessionId').split(',')
				
				
				

				switch (valor) {
					case 'idCliente':
						return meuArray[0];
						break;
					case 'email':
						return meuArray[1];
						break;
					case 'senha':
						return meuArray[2];
						break;
					case 'tipoUser':
						return meuArray[3];
						break;
					case 'token': 
						return meuArray[4];
						break;
					case 'nome':
						return meuArray[5];
						break;
					case 'sessionId':
						return sessionId[0];
						break;
					default:
						return 'parametro nao esperado'
						break;
				}
			}

			function logado(){
				if(localStorage.getItem('dadosUsuario') == null){
				
					return false;
				
				}else{
					return true;
				}

			}


			$('#btnFinalizarCompra').click(function(e){

				window.location.href = 'Pagamento.html'


			});
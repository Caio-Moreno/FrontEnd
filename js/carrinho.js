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
			var id = $('#idDoProduto').val();
			var sessionId = localStorage.getItem('sessionId').split(',');
			var preco = $('#preco').text().replace('R', '').replace('$', '');
			if(localStorage.getItem('dadosUsuario') == null){
				var url = 'http://localhost:8080/Carrinho/Deslogado';
			}else{
				//por enquanto
				var url = 'http://localhost:8080/Carrinho/Deslogado';
				//var url = 'http://localhost:8080/Carrinho';
			}

			var json = JSON.stringify({
				_idProduto: id,
    			_status: "PENDING",
    			_quantidade: 1,
    			_valor: preco,
    			_sessionId: sessionId[0]
			});

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

							

							popular(data);
							
					},
					error: data => {
						
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
				//	alert(valorDoProd)

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
						'<label>Quantidade:</label> <button type="button" class="btn btn-primary buttonDefault" onclick="decrementa('+produto._idProduto+')">-</button> <input value="'+produto._quantidade+'" style="width: 30px; text-align: center;" readonly> <button type="button" class="btn btn-primary buttonDefault" onclick="incrementa('+produto._idProduto+')">+</button>'+
						'<p>valor:'+produto._valor+'</p>'+
						'<p id="removerProd" onclick="deletar('+produto._idProduto+')">Remover</p>'+
					'</div>'+
				  '</div>'

					divPrincipal.append(divCarrinho);
				    }else{
						$('#qtdCarrinho').text(0);
					}

					
				}

				

				//total = total.toFixed(2);

				//document.getElementById("valorTotal").innerHTML='teste';

				
				
				$('#valorTotal').html('Total: R$'+total);
				

			}

			function removeElements(){
				const div = $('#principalCarrinho');
				div.empty();

			}

			function deletar(id){
				
				var dadosSession = localStorage.getItem('sessionId').split(',');
				var sessionId = dadosSession[0];
				var url = 'http://localhost:8080/Carrinho/deleteCart?id='+id+'&session='+sessionId;

				

				$.ajax({
					url: url,
					type: 'DELETE',
					timeout: 20000,
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: data => {
						alert('deletar')
						buscarCarrinho();
						
					},
					error: data => {
						
					}
				
				});
				
			}

			function incrementa(id){
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
					
						buscarCarrinho();
						
					},
					error: data => {
						
					}
				
				});
				
			}

			function decrementa(id){
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
					
						buscarCarrinho();
					},
					error: data => {
						
					}
				
				});
				
			}
			
			
	




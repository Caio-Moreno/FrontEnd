	// JQuery simples para aplicar ou remover a classe que faz a transição do minicart
	$(document).ready(function() {
		$('.open-cart').on('click', function() {
			$('#cart').addClass('active');
			event.preventDefault();
		});
		$('#back-cart').on('click', function() {
			$('#cart').removeClass('active');
			event.preventDefault();
		});



		$('#add-carrinho').on('click', function(e){
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
				var url = 'http://localhost:8080/Carrinho';
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
						console.log(data)
						buscarCarrinho();
				},
				error: data => {
					console.log(data)
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
							$('#cart').addClass('active');
					},
					error: data => {
						console.log(data)
					}
				
				});

			}
			
			function popular(carrinho){
				var quantidade = carrinho._quantidade;
				var cart = carrinho._carrinho;
				var divPrincipal = $('#principalCarrinho');

				removeElements();
				
				var total;

				for(let i = 0; i < quantidade; i++){
					var produto = cart[i];
					console.log(produto)
					var divCarrinho = '<div class="row mini-cart-list">'+
					'<div class="col-md-4 col-xs-4">'+
					  '<div class="img-ph">'+
						  '<img src="'+produto._imageProduto+'">'+
					  '</div>'+
					'</div>'+
					'<div>'+
						'<p>'+produto._idProduto+'</p>'+
						'<p>Quantidade:'+produto._quantidade+'</p>'+
						'<p>valor:'+produto._valor+'</p>'+
					'</div>'+
				  '</div>'

					divPrincipal.append(divCarrinho);
				}
				

			}

			function removeElements(){
				const div = $('#principalCarrinho');
				div.empty();

			}

			function preencherListaCarrinho(){
				
			}
			
			
	});




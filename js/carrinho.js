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
						$('#cart').addClass('active');
				},
				error: data => {
					console.log(data)
				}
			
			});
		}
			
			
	});




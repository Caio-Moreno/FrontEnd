

$(document).ready(function () {
  var codigo = "";
  

  
  if(!(localStorage.getItem('pedido') == null)){
    $('#numeroPedido').show()
    $('#dadosPagamento').show()
    vendaConcluida();
  }else{
    $('#numeroPedido').hide()
    $('#dadosPagamento').hide()
    
  }

 $('#app').hide();
 $('#boletoGerado').hide();
 $('#mercadoPagoPagamento').hide();
 $('#payPalPagamento').hide();
 $('#pixPagamento').hide();
 $('#fecharPedido').hide();
 $('#normalNaoMarcado').hide();
 $('#rapidoMarcado').hide();
 $('#retiradaMarcado').hide();




   $('#cartaoDeCredito').click(function(e){
     $('#tipoPagamento').val('cartao');

      $('#fecharPedido').show();
      $('#app').show(500);
      $('#boletoGerado').hide();
      $('#mercadoPagoPagamento').hide();
      $('#payPalPagamento').hide();
      $('#pixPagamento').hide();

      calcularParcelas();
   });
  
   $('#boleto').click(function(e){
    $('#tipoPagamento').val('boleto');
    
    $('#fecharPedido').show();
     if(codigo == ''){
       codigo = getCodigoDeBarras();
      }
     $('#codBarras').text(codigo)


     $('#boletoGerado').show(500);
     $('#app').hide();
     $('#mercadoPagoPagamento').hide();
     $('#payPalPagamento').hide();
     $('#pixPagamento').hide();
    
   });
  
   $('#pix').click(function(e){
    $('#tipoPagamento').val('pix');
    $('#fecharPedido').show();
    $('#pixPagamento').show(500);
    $('#app').hide();
    $('#boletoGerado').hide();
    $('#mercadoPagoPagamento').hide();
    $('#payPalPagamento').hide();
  });
  
  $('#mercadoPago').click(function(e){
    $('#tipoPagamento').val('mp');
    $('#fecharPedido').show();
    $('#mercadoPagoPagamento').show(500);
    $('#payPalPagamento').hide();
    $('#pixPagamento').hide();
    $('#app').hide();
    $('#boletoGerado').hide();
  });
  
  $('#paypal').click(function(e){
    $('#tipoPagamento').val('paypal');
    $('#fecharPedido').show();
    $('#payPalPagamento').show(500);
    $('#app').hide();
    $('#boletoGerado').hide();
    $('#mercadoPagoPagamento').hide();
    $('#pixPagamento').hide();
  });
  $('#mudarEndereco').click(function(e){
   
    window.location.href = 'Atualizar.html?id='+ retornarDados('idCliente')+'&reason=pagamento';
  });
  


/*
Tratamento de selecao de frete

*/


  $('#rapidoNaoMarcado').click(function(e){
    $('#tipoDeFrete').val('rapido');
    e.preventDefault();
    

    $('#normalNaoMarcado').show();
    $('#normalMarcado').hide();

    $('#retiradaNaoMarcado').show();
    $('#retiradaMarcado').hide();
    
    $('#rapidoMarcado').show();
    $('#rapidoNaoMarcado').hide();

    var valor = $('#valorRapido').text();
    $('#valorFrete').text(valor);

    calcularTotal()
    calcularParcelas()

  })

  $('#normalNaoMarcado').click(function(e){
    $('#tipoDeFrete').val('normal');
    e.preventDefault();



    $('#normalNaoMarcado').hide();
    $('#normalMarcado').show();

    $('#retiradaNaoMarcado').show();
    $('#retiradaMarcado').hide();
    
    $('#rapidoMarcado').hide();
    $('#rapidoNaoMarcado').show();

    var valor = $('#valorNormal').text();
    $('#valorFrete').text(valor);

    calcularTotal()
    calcularParcelas()

  })

  $('#retiradaNaoMarcado').click(function(e){
    $('#tipoDeFrete').val('gratis');
    e.preventDefault();



    $('#normalNaoMarcado').show();
    $('#normalMarcado').hide();

    $('#retiradaNaoMarcado').hide();
    $('#retiradaMarcado').show();
    
    $('#rapidoMarcado').hide();
    $('#rapidoNaoMarcado').show();

    var valor = $('#valorRetirada').text();
    $('#valorFrete').text(valor);

    calcularTotal()
    calcularParcelas()

  })
  
  $('#fecharPedido').click(function(e){

    if(!verificaPagamento()){
      alert('Verifique os dados do pagamento!')
      return;
    }
      

      buscarCarrinhoFinal();
      var minhaDiv = $('#enderecoClone').clone();
      $('#corpoEndereco').html(minhaDiv);
      preencherPagamentoResumo();
      $('#modalResumo').modal('show');
      
    //montarVenda();

  });

  function verificaPagamento(){
    var tipo = $('#tipoPagamento').val();

    if(tipo == 'cartao'){

      if($('#cardNumber').val() == '' || $('#cardNumber').val().length < 19 || $('#cardNumber').val() == null
      || $('#cardName').val() == '' || $('#cardName').val().trim().length < 5 ||  $('#cardName').val() == null
      || $('#cardMonth').val() == null
      || $('#cardYear').val() == null
      || $('#cardCvv').val() == null || $('#cardCvv').val() == '' || $('#cardCvv').val().trim().length < 3
      ) return false;


      return true;
    }
    else if(tipo == 'paypal'){

      if($('#emailPaypal').val() == '' || !($('#emailPaypal').val().includes('@')) || $('#emailPaypal').val().trim().length < 5 || $('#emailPaypal').val().includes(' ')
      || $('#cpfPaypal').val() == ''  || $('#cpfPaypal').val().trim().length < 11 || $('#cpfPaypal').val().includes(' ')
      ) return false;

      return true;
    }
    else if(tipo == 'mp'){
      if($('#mpEmail').val() == '' || !($('#mpEmail').val().includes('@')) || $('#mpEmail').val().trim().length < 5 || $('#mpEmail').val().includes(' ')
      || $('#mpCpf').val() == ''  || $('#mpCpf').val().trim().length < 11 || $('#mpCpf').val().includes(' ')) return false;

      return true;
    }

    return true;

  }

  $('#finalizarConfirmado').click(function(e){
     montarVenda();
  });


 


});

function getCodigoDeBarras() {
  var chars = "0123456789";
  
  var passwordLength = 47;
  var password = "";

  for (var i = 0; i < passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
}


new Vue({
  el: "#app",
  data() {
    return {
      currentCardBackground: Math.floor(Math.random()* 25 + 1), // just for fun :D
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      minCardYear: new Date().getFullYear(),
      amexCardMask: "#### ###### #####",
      otherCardMask: "#### #### #### ####",
      cardNumberTemp: "",
      isCardFlipped: false,
      focusElementStyle: null,
      isInputFocused: false
    };
  },
  mounted() {
    this.cardNumberTemp = this.otherCardMask;
    document.getElementById("cardNumber").focus();
  },
  computed: {
    getCardType () {
      let number = this.cardNumber;
      let re = new RegExp("^4");
      if (number.match(re) != null) return "visa";

      re = new RegExp("^(34|37)");
      if (number.match(re) != null) return "amex";

      re = new RegExp("^5[1-5]");
      if (number.match(re) != null) return "mastercard";

      re = new RegExp("^6011");
      if (number.match(re) != null) return "discover";
      
      re = new RegExp('^9792')
      if (number.match(re) != null) return 'troy'

      return "visa"; // default type
    },
		generateCardNumberMask () {
			return this.getCardType === "amex" ? this.amexCardMask : this.otherCardMask;
    },
    minCardMonth () {
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
      return 1;
    }
  },
  watch: {
    cardYear () {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = "";
      }
    }
  },
  methods: {
    flipCard (status) {
      this.isCardFlipped = status;
    },
    focusInput (e) {
      this.isInputFocused = true;
      let targetRef = e.target.dataset.ref;
      let target = this.$refs[targetRef];
      this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
      }
    },
    blurInput() {
      let vm = this;
      setTimeout(() => {
        if (!vm.isInputFocused) {
          vm.focusElementStyle = null;
        }
      }, 300);
      vm.isInputFocused = false;
    }
  }
});


  function buscaEnderecos(){
    var dados = localStorage.getItem('dadosUsuario').split(',');
    var token = localStorage.getItem('token');


    var url = 'http://localhost:8080/Clientes/BuscarCliente/Ativos?id='+dados[0]

    $.ajax({
      url: url,
      type: 'GET',
      headers: {'TOKEN': token},
      timeout: 20000,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: data => {
          tratarEndereco(data._endereco);
      },
      error: result => {
          alert(result.status + ' ' + result.statusText);
      }
  });

  }

  function tratarEndereco(enderecos){
    const tamanho = enderecos.length;
    
    var endereco;

    if(tamanho == 1){
      endereco = enderecos[0];
    }else{
      for(let i =0; i < tamanho; i++){
        var meuEnderecoComparar = enderecos[i];

        if(meuEnderecoComparar._tipo == 'E'){
          endereco = enderecos[i];
        }

      }
    }

    $('#logradouro').text(endereco._logradouro + ','+endereco._numero);
    $('#bairro').text(endereco._bairro);
    $('#UFCidade').text(endereco._estado + ' - ' + endereco._cidade);
    $('#cep').text('CEP - '+ endereco._cep);
    $('#idEnderecoHidden').val(endereco._id);

    calcularFrete(endereco._estado);

    
  }

  function resumoCompra(){
    var dados = localStorage.getItem('dadosUsuario').split(',');
    var url = 'http://localhost:8080/Carrinho?id='+dados[0];

    $.ajax({
      url: url,
      type: 'GET',
      timeout: 20000,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: data => {
          popularResumoCompra(data);
          
      },
      error: data => {
        alert('erro para buscar carrinho');
      }
    
    });

  }

  function popularResumoCompra(carrinho){
    var cart = carrinho._carrinho;
    var total = 0.00;
    var qtdProdutos = 0;
    var quantidade = carrinho._quantidade;

    for(let i = 0; i < quantidade; i++){

      var produto = cart[i];
      var valorDoProd = parseFloat(produto._valor);

      total += valorDoProd;
      qtdProdutos += produto._quantidade;
    }
      total = total.toFixed(2)

      if(qtdProdutos == 0){
        alert('Nenhum produto no carrinho')
        window.location.href = "IndexLoja.html"
        return;
      }
    $('#qtdProdutos').text(qtdProdutos + ' produtos')
    $('#valorProds').text('R$ '+total)

    calcularTotal();

  }

  

  function calcularTotal(){
    var valorFrete = 0.00;

    var valorProdutos = parseFloat($('#valorProds').text().replace('R','').replace('$',''));

    if(!($('#valorFrete').text().includes('Grátis'))){
      valorFrete = parseFloat($('#valorFrete').text().replace('R','').replace('$',''));
    }
    
    
    var valorTotal = parseFloat(valorProdutos + valorFrete).toFixed(2);

    $('#valorTotal').text('R$ '+valorTotal);

    return valorTotal;
    
  }


  function calcularFrete(uf){
    
    
    var url = 'http://localhost:8080/Clientes/valorFrete?uf='+uf;

    

    $.ajax({
      url: url,
      type: 'GET',
      timeout: 20000,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: data => {
          popularFrete(data);
          
      },
      error: data => {
        alert('erro para buscar carrinho');
      }
    
    });

    }

    function popularFrete(data){


      $('#valorNormal').text('R$ '+data._valorNormal);
      $('#valorRapido').text('R$ '+data._valorFast);
      

      $('#valorFrete').text('R$ '+data._valorNormal);

      calcularTotal()
    }    

    function calcularParcelas(){
      var valorTotal = parseFloat(calcularTotal());
      var select = $('#qtdParcelas');
      select.empty()

      for(let i = 1; i <= 10; i++){
        var convert = parseFloat(i);
        var divisao = (valorTotal / convert);
        const formatado = divisao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        
        select.append('<option value="'+i+'x de '+formatado+'">'+i+'x de '+formatado+'</option>')
      }

    }


    function montarVenda(){
      var idCliente = retornarDados('idCliente');
      var qtdProdutosTotal = qtdProdutos();
      var total = calcularTotal();
      var idEndereco = $('#idEnderecoHidden').val();
      var tipo = $('#tipoDeFrete').val();

      if(tipo == 'gratis') idEndereco = 0;

      var venda = {
        _idCliente: idCliente,
        _quantidade: qtdProdutosTotal,
        _valorTotal: total,
        _idEndereco: idEndereco
      }
      

      var url = 'http://localhost:8080/Carrinho?id='+idCliente;
  
      $.ajax({
        url: url,
        type: 'GET',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: data => {

           montarJsonVenda(venda, data._carrinho);
          
        },
        error: data => {
          alert('erro para buscar carrinho');
        }
      
      });
    }

    function montarJsonVenda(venda, carrinho){
      var meusProdutos=[];


      for(let i =0; i < carrinho.length;i++){
        var produto = carrinho[i];

        var obj = {
          _idProduto: produto._idProduto,
          _preco: produto._valor,
          _qtdEstoque: produto._quantidade
        }

        meusProdutos.push(obj);

      }

      var json = JSON.stringify({
        venda: venda,
        produtos: meusProdutos
      });

      finalizarVenda(json);
    }



    function finalizarVenda(json){
      console.log(json);
      var url = 'http://localhost:8080/Vendas';
      
          $.ajax({
            url: url,
            type: 'POST',
            timeout: 20000,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: json,
            success: data => {
                //alert(data._message);
                inserirPagamento(data._idVenda);
            },
            error: result => {
                console.log(result)
               
            }
        });
    }



    function retornarDados(valor) {
      var dados= localStorage.getItem('dadosUsuario');;
      var meuArray = dados.split(',');
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

    function qtdProdutos(){
      var produtos = $('#qtdProdutos').text().split(' ');
      var qtd = parseInt(produtos[0]);
      return qtd;
    }

    function inserirPagamento(idVenda){
      var tipo = $('#tipoPagamento').val();
      var json;
      switch(tipo){
        case 'cartao':
          json = jsonCartao(idVenda)
          break;
        case 'boleto':
          json = jsonBoleto(idVenda)
          break;
        case 'pix': 
          json = jsonPix(idVenda);
          break;
        case 'mp':
          json = jsonMp(idVenda);
          break;
        case 'paypal':
          json = jsonPaypal(idVenda);
          break;
      }

      console.log('json pagamento:');
      console.log(json)
      var url = 'http://localhost:8080/Vendas/paymentoInsert';

      $.ajax({
        url: url,
        type: 'POST',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: data => {
            
            localStorage.setItem('pedido', data._numPedido);
            sendEmail();
            vendaConcluida();
            preencherPagamento(data._pagamento);

        },
        error: result => {
            console.log(result)
           
        }
      });
    }
    function jsonCartao(idVenda){
      var nameCart = $('#cardName').val();
      var numberCart = $('#cardNumber').val();
      
      var select = $('#qtdParcelas').val().split(' ');
      var valor = parseFloat(select[2].replace('R', '').replace('$','').replace(',','.'));
      var qtdParcelas = select[0].replace('x','');
      //alert(valor)




      return JSON.stringify({
        _nameCart: nameCart,
        _numberCart: numberCart,
        _idVendaFk: idVenda,
        _valor: valor,
        _qtdParcelas: qtdParcelas,
        _tipo: "cartao",
      })
    }
    function jsonBoleto(idVenda){
        var codBarras = $('#codBarras').text();
        var valor =calcularTotal();

        return JSON.stringify({
          _numBoleto: codBarras,
          _idVendaFk: idVenda,
          _valor: valor,
          _qtdParcelas: 1,
          _tipo: "boleto",
        })

    }
    function jsonPix(idVenda){
      var valor =calcularTotal();


      return JSON.stringify({
        _tipo: "pix",
        _idVendaFk: idVenda,
        _valor: valor,
        _qtdParcelas: 1
      })
      

    }
    function jsonMp(idVenda){
      var email = $('#mpEmail').val();
      var cpf = $('#mpCpf').val();
      var qtdParcelas = 1;
      var valor =calcularTotal();

      return JSON.stringify({
        _paypalEmail: email,
        _paypalCpf: cpf,
        _idVendaFk: idVenda,
        _valor: valor,
        _qtdParcelas: qtdParcelas,
        _tipo: "mp",
      })

    }
    function jsonPaypal(idVenda){
      var email = $('#emailPaypal').val();
      var cpf = $('#cpfPaypal').val();
      var qtdParcelas = 1;
      var valor =calcularTotal();

      return JSON.stringify({
        _paypalEmail: email,
        _paypalCpf: cpf,
        _idVendaFk: idVenda,
        _valor: valor,
        _qtdParcelas: qtdParcelas,
        _tipo: "paypal",
      })

    }
    

    function vendaConcluida(){
      $('#modalResumo').modal('hide');
      $('#opcoesDeFrete').hide(1000);
      $('#opcoesDePagamento').hide(1000);
      $('#app').hide(1000);
      $('#boletoGerado').hide(1000);
      $('#mercadoPagoPagamento').hide(1000);
      $('#payPalPagamento').hide(1000);
      $('#pixPagamento').hide(1000);
      $('#mudarEndereco').hide(1000);
      $('#fecharPedido').hide(1000);
      
      $('#numeroPedido').show()
      $('#dadosPagamento').show()

      $('#numPedido').text(localStorage.getItem('pedido'));
      $('#emailEnviado').text(retornarDados('email'));

      

      


    }



  


      function sendEmail(){
        var pedido = localStorage.getItem('pedido');
        var email = retornarDados('email');
        var nome = retornarDados('nome');

        var url = "http://localhost:8080/Email/order?email="+email+"&numPedido="+pedido+"&name="+nome;

              
    
        $.ajax({
            url: url,
            type: 'POST',
            timeout: 20000,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: data => {
                       console.log('Email enviado') 
                       $('#emailEnviado').text(email);
            },
            error: result => {
                
            }
        });
    
    }



    function preencherPagamento(formaPagamento){
      console.log(formaPagamento)
      var lista = $('#listaDadosPagamento');
      


      
      $('#qtdParcelasPagamento').text('Parcelas: '+formaPagamento._qtdParcelas+'x de R$'+ formaPagamento._valor);

      if(formaPagamento._tipo == 'cartao'){
        $('#tipoCompra').text('Tipo: Cartão');
        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
                     '<div>'+
                     '<h6  class="my-0">Final num: **** **** **** '+ultimosDigitos(formaPagamento._numberCart)+'</h6>'+
                     '</div>'+
                     '</li>'
        )
        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
                     '<div>'+
                     '<h6 class="my-0">Titular: '+formaPagamento._nameCart+'</h6>'+
                     '</div>'+
                     '</li>'
        )
      }
      else if(formaPagamento._tipo == 'boleto'){
        $('#tipoCompra').text('Tipo: Boleto');
        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
                     '<div>'+
                     '<h6 class="my-0">Número boleto: '+formaPagamento._numBoleto+'</h6>'+
                     '</div>'+
                     '</li>'
        )
      }
      else if(formaPagamento._tipo == 'paypal'){
        $('#tipoCompra').text('Tipo: Paypal');
        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
                     '<div>'+
                     '<h6 class="my-0">Titular: '+formaPagamento._paypalEmail+'</h6>'+
                     '</div>'+
                     '</li>'
        )
        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
        '<div>'+
        '<h6 class="my-0">Titular CPF: '+formaPagamento._paypalCpf+'</h6>'+
        '</div>'+
        '</li>'
        )
      }
      else if(formaPagamento._tipo == 'mp'){
        $('#tipoCompra').text('Tipo: Mercado pago');
        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
                     '<div>'+
                     '<h6 class="my-0">Titular: '+formaPagamento._paypalEmail+'</h6>'+
                     '</div>'+
                     '</li>'
        )
        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
        '<div>'+
        '<h6 class="my-0">Titular: '+formaPagamento._paypalCpf+'</h6>'+
        '</div>'+
        '</li>'
        )
      } else{
        $('#tipoCompra').text('Tipo: pix');
      }
    }

    function ultimosDigitos(num){
      return num.substring(num.length - 4)
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

    function popularCarrinhoFinal(carrinho){
				
      var total = 0.00;
      var quantidade = carrinho._quantidade;
      var cart = carrinho._carrinho;
      var qtdProdutos= 0;
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
        qtdProdutos += produto._quantidade;
      
        //alert(total)
      
        var td1 = $('<td style="text-align: center;"><img id="imagemAJuste" src="'+produto._imageProduto+'" class="imagemCarrinho"></td>')
        var td2 = $('<td id="nomeProd">'+produto._nomeProduto+'</td>')
        var td3 = $('<td>'+
        '<div class="input-group mb-3">'+
          
          '<input class="text-center" type="text" id="qtdProdutoCart" value="'+produto._quantidade+'" readonly>'+
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
      
      $('#totalProdutoResumo').text('R$ '+total);
      
      $('#qtdProdutosResumo').text(qtdProdutos+' Produto(s)')
      
      $('#contCarrinho').text(quantidade);
      
      calcularTotal();
      
      tr2.append(tdTotal)
      tr2.append(tdTotal2)
      
      
      body.append(tr2)			
    }
    





    function preencherPagamentoResumo(){
      var formaPagamento = $('#tipoPagamento').val();
      var lista = $('#listaDadosPagamentoResumo');
      lista.empty()
      
      
      //forma de pagamento cartao
      if(formaPagamento == 'cartao'){
        //tipo da compra
        

        //valor da compra e qtd de parcelas
        var select = $('#qtdParcelas').val().split(' ');
        var valor = parseFloat(select[2].replace('R', '').replace('$','').replace(',','.'));
        var qtdParcelas = select[0].replace('x','');

        //já preencho o valor
        

        var nameCart = $('#cardName').val();
        
        var numberCart = $('#cardNumber').val();
        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
                     '<div>'+
                     '<h6  class="my-0">Tipo: Cartão</h6>'+
                     '</div>'+
                     '</li>'
        )
        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
                     '<div>'+
                     '<h6  class="my-0">Parcelas: '+qtdParcelas+'x de R$'+valor+'</h6>'+
                     '</div>'+
                     '</li>'
        )

        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
                     '<div>'+
                     '<h6  class="my-0">Final num: **** **** **** '+ultimosDigitos(numberCart)+'</h6>'+
                     '</div>'+
                     '</li>'
        )
        
        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
                     '<div>'+
                     '<h6 class="my-0">Titular: '+nameCart+'</h6>'+
                     '</div>'+
                     '</li>'
        )
      }

      //forma de pagamento boleto
      else if(formaPagamento == 'boleto'){
        

        var codBarras = $('#codBarras').text();
        var valor =calcularTotal();



        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
        '<div>'+
        '<h6  class="my-0">Tipo: Boleto</h6>'+
        '</div>'+
        '</li>'
        )
        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
        '<div>'+
        '<h6  class="my-0">Valor: R$ '+valor+'</h6>'+
        '</div>'+
        '</li>'
        )
        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
                     '<div>'+
                     '<h6 class="my-0">Número boleto: '+codBarras+'</h6>'+
                     '</div>'+
                     '</li>'
        )
      }
      else if(formaPagamento == 'paypal'){
        

        var email = $('#emailPaypal').val();
        var cpf = $('#cpfPaypal').val();
       
        var valor =calcularTotal();

        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
        '<div>'+
        '<h6 class="my-0">Tipo: Paypal</h6>'+
        '</div>'+
        '</li>'
        )
        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
        '<div>'+
        '<h6 class="my-0">Valor: R$ '+valor+'</h6>'+
        '</div>'+
        '</li>'
        )
        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
                     '<div>'+
                     '<h6 class="my-0">Titular Email: '+email+'</h6>'+
                     '</div>'+
                     '</li>'
        )
        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
        '<div>'+
        '<h6 class="my-0">Titular CPF: '+cpf+'</h6>'+
        '</div>'+
        '</li>'
        )

      }
      else if(formaPagamento == 'mp'){
        $('#tipoCompra').text('Tipo: Mercado pago');

        var email = $('#mpEmail').val();
        var cpf = $('#mpCpf').val();
    
        var valor =calcularTotal();


        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
        '<div>'+
        '<h6 class="my-0">Tipo: Mercado pago</h6>'+
        '</div>'+
        '</li>'
        )
        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
        '<div>'+
        '<h6 class="my-0">Valor: R$ '+valor+'</h6>'+
        '</div>'+
        '</li>'
        )
        $('#qtdParcelasPagamentoResumo').text('Valor: R$ '+valor);
        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
                     '<div>'+
                     '<h6 class="my-0">Titular Email: '+email+'</h6>'+
                     '</div>'+
                     '</li>'
        )
        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
        '<div>'+
        '<h6 class="my-0">Titular CPF: '+cpf+'</h6>'+
        '</div>'+
        '</li>'
        )

      } else{
        $('#tipoCompra').text('Tipo: pix');
        var valor =calcularTotal();
        

        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
        '<div>'+
        '<h6 class="my-0">Tipo: Pix</h6>'+
        '</div>'+
        '</li>'
        )
        lista.append(' <li class="list-group-item d-flex justify-content-between lh-condensed">'+
        '<div>'+
        '<h6 class="my-0">Valor: R$ '+valor+'</h6>'+
        '</div>'+
        '</li>'
        )
      }
    }
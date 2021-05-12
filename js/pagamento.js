

$(document).ready(function () {
  var codigo = "";
  

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


/*
Tratamento de selecao de frete

*/


  $('#rapidoNaoMarcado').click(function(e){
    
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

    montarVenda();

    inserirPagamento(tipo);

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


    var url = 'http://localhost:8080/Clientes/BuscarCliente?id='+dados[0]

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

        
        select.append('<option value="'+i+'">'+i+'x de '+formatado+'</option>')
      }
    }


    function montarVenda(){
      var idCliente = retornarDados('idCliente');
      var qtdProdutosTotal = qtdProdutos();
      var total = calcularTotal();
      var venda = {
        _idCliente: idCliente,
        _quantidade: qtdProdutosTotal,
        _valorTotal: total
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
                alert(data._message);
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

      var url = 'http://localhost:8080/Vendas/paymentoInsert';

      $.ajax({
        url: url,
        type: 'POST',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: data => {
            alert(data._message);
        },
        error: result => {
            console.log(result)
           
        }
      });
    }
    function jsonCartao(idVenda){
      

    }
    function jsonBoleto(idVenda){

    }
    function jsonPix(idVenda){

    }
    function jsonMp(idVenda){

    }
    function jsonPaypal(idVenda){

    }
    


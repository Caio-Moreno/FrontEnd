

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
    $('#fecharPedido').show();
      $('#app').show(500);
      
      $('#boletoGerado').hide();
      $('#mercadoPagoPagamento').hide();
      $('#payPalPagamento').hide();
      $('#pixPagamento').hide();
   });
  
   $('#boleto').click(function(e){
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
    $('#fecharPedido').show();
    $('#pixPagamento').show(500);
    $('#app').hide();
    $('#boletoGerado').hide();
    $('#mercadoPagoPagamento').hide();
    $('#payPalPagamento').hide();
  });
  
  $('#mercadoPago').click(function(e){
    $('#fecharPedido').show();
    $('#mercadoPagoPagamento').show(500);
    $('#payPalPagamento').hide();
    $('#pixPagamento').hide();
    $('#app').hide();
    $('#boletoGerado').hide();
  });
  
  $('#paypal').click(function(e){
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

  })  
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
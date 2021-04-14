$(document).ready(function(e){

   

    $("#updateEndereco").hide();

    $('#dataNascimento').mask("00/00/0000", {
        placeholder: "__/__/____"
    });
    $('#cpf').mask('000.000.000-00', {
        placeholder: "999.999.999-99"
    });

    $('#celular').mask('(00) 00000-0000', {
        placeholder: "(11) 94787-4059"
    });


    $('#Endereco').click(function(e){
        e.preventDefault();
        $("#Cadastro").attr("disabled", true);
        $( "#updateDados" ).fadeOut( 500, function() {
            $( "#updateEndereco" ).fadeIn( 500, function(){
                $("#Cadastro").attr("disabled", false);
            } );
            
          });

          
    });

    $('#Cadastro').click(function(e){
        e.preventDefault();
        $("#Endereco").attr("disabled", true);
        $( "#updateEndereco" ).fadeOut( 500, function() {
            $( "#updateDados" ).fadeIn( 500, function(){
                $("#Endereco").attr("disabled", false);
            } );
          });

          
    });


    var token = localStorage.getItem('token');
    var url =  urlClientePorID();
    $.ajax({
        url: url,
        type: 'GET',
        headers: {'TOKEN': token},
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: data => {
            console.log(data);
            var cliente = data;
            poupularCadastro(cliente)
        },
        error: result => {
            alert(result.status + ' ' + result.statusText);
        }
    });

    function urlClientePorID() {
        var url = 'http://localhost:8080/Clientes/BuscarCliente?id=';
        var queryString = window.location.search;
        var id = queryString.replace(/[^0-9]/g, '');
        return url + id;
    }

    function poupularCadastro(cliente){
        var enderecos = cliente._endereco;
        console.log(enderecos)
        var enderecoEntrega = enderecos[0];


        $('#nome').val(cliente._nome);
        $('#email').val(cliente._email);
        $('#cpf').val(cliente._cpf);
        $('#dataNascimento').val(cliente._dataNascimento)
        $('#senha').val(cliente._senha)
        $('#sexo').val(cliente._sexo);
        $('#celular').val(cliente._telefone);
        $('#cep').val(enderecoEntrega._cep);
        $('#rua').val(enderecoEntrega._logradouro);
        $('#numero').val(enderecoEntrega._numero);
        $('#complemento').val(enderecoEntrega._complemento);
        $('#bairro').val(enderecoEntrega._bairro);
        $('#estado').val(enderecoEntrega._estado);
        $('#cidade').val(enderecoEntrega._cidade);



        if(enderecos.length == 2){
            var enderecoFatura = enderecos[1];
            console.log(enderecoFatura)
            $('#cepFatura').val(enderecoFatura._cep);
            $('#ruaFatura').val(enderecoFatura._logradouro);
            $('#numeroFatura').val(enderecoFatura._numero);
            $('#complementoFatura').val(enderecoFatura._complemento);
            $('#bairroFatura').val(enderecoFatura._bairro);
            $('#estadoFatura').val(enderecoFatura._estado);
            $('#cidadeFatura').val(enderecoFatura._cidade);
            $('enderecoFaturaDiv').show();
            var status = document.getElementById('enderecoFatura');
            status.checked = false;
           
        }else{
            var status = document.getElementById('enderecoFatura');
            status.checked = true;
            $('#enderecoFaturaDiv').hide();
        }

    }


    $('#enderecoFatura').click(function (e){  
        var status = document.getElementById('enderecoFatura');


        if(!status.checked){
            $('#enderecoFaturaDiv').show(1000);
        }else{
            $('#enderecoFaturaDiv').hide(1000);
        }
    });


});
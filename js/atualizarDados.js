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

        $( "#updateDados" ).fadeOut( 1000, function() {
            $( "#updateEndereco" ).fadeIn( 1000 );
          });
    });

    $('#Cadastro').click(function(e){

        $( "#updateEndereco" ).fadeOut( 1000, function() {
            $( "#updateDados" ).fadeIn( 1000 );
          });
    });



});
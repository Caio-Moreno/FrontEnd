$(document).ready(function(){
    $("#cepInvalido").hide();
    $("#cpfInvalido").hide();
    


    $('#cep').blur(function(e){
        e.preventDefault();

        var cep = $('#cep').val().replace('-','');


        if(cep.length >= 8){
            $("#cepInvalido").hide();
            $.ajax({
                url: 'https://viacep.com.br/ws/'+cep+'/json/',
                type: 'GET',
                contentType:"application/json; charset=utf-8",
                dataType:"json",    
                success: data => {
                          $('#rua').val(data.logradouro);
                          $('#complemento').val(data.complemento);
                          $('#bairro').val(data.bairro);
                          $('#cidade').val(data.localidade);
                          $('#estado').val(data.uf)
                          console.log(data)
                    },
                error: _ => {
                    console.log('error, CEP Não encontrado ' )
                }
              });
        }else{
            $("#cepInvalido").show();
        }
    });

    $('#cpf').blur(function(e){
        e.preventDefault();

        var cpf = $('#cpf').val();

        var valido = validarCPF(cpf);

        (valido) ? $("#cpfInvalido").hide() : $("#cpfInvalido").show();

    });

    

    
    function validarCPF(cpf) {	
        cpf = cpf.replace(/[^\d]+/g,'');	
        if(cpf == '') return false;	
        // Elimina CPFs invalidos conhecidos	
        if (cpf.length != 11 || 
            cpf == "00000000000" || 
            cpf == "11111111111" || 
            cpf == "22222222222" || 
            cpf == "33333333333" || 
            cpf == "44444444444" || 
            cpf == "55555555555" || 
            cpf == "66666666666" || 
            cpf == "77777777777" || 
            cpf == "88888888888" || 
            cpf == "99999999999")
                return false;		
        // Valida 1o digito	
        add = 0;	
        for (i=0; i < 9; i ++)		
            add += parseInt(cpf.charAt(i)) * (10 - i);	
            rev = 11 - (add % 11);	
            if (rev == 10 || rev == 11)		
                rev = 0;	
            if (rev != parseInt(cpf.charAt(9)))		
                return false;		
        // Valida 2o digito	
        add = 0;	
        for (i = 0; i < 10; i ++)		
            add += parseInt(cpf.charAt(i)) * (11 - i);	
        rev = 11 - (add % 11);	
        if (rev == 10 || rev == 11)	
            rev = 0;	
        if (rev != parseInt(cpf.charAt(10)))
            return false;		
        return true;   
    }



});



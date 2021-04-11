$(document).ready(function(){
    $("#cepInvalido").hide();
    $("#cpfInvalido").hide();
    $("#numCartaoInvalido").hide();
    $("#nomeInvalido").hide();
    $("#dataInvalida").hide();
    $("#senhaInvalida").hide();
    $("#senhaConfirmInvalida").hide();
    $("#celularInvalido").hide();

    


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

        if(valido){
            $("#cpfInvalido").hide();
            document.getElementById("cpf").style.borderColor = "gray";

        }else{
            $("#cpfInvalido").show();
            document.getElementById("cpf").style.borderColor = "red";
        }

    });

    $('#cpf').keypress(function(e){
        var cpf = document.getElementById('cpf').value;
        var tamanhoCpf = cpf.length;
       if(somenteNumeros(e)){
           if(tamanhoCpf == 3 || tamanhoCpf == 7){
                document.getElementById('cpf').value = cpf + '.';
           }
           if(tamanhoCpf == 11){
            document.getElementById('cpf').value = cpf + '-';
           }
       }else {
           return false;
       }
    });


    $('#numCartao').blur(function(e){
        e.preventDefault();

        var numCartao = $('#numCartao').val();

        if(numCartao.length == 16){
            $("#numCartaoInvalido").hide(); 
            document.getElementById("numCartao").style.borderColor = "gray";
        }else{
            $("#numCartaoInvalido").show() ; 
            document.getElementById("numCartao").style.borderColor = "red";
        }

    });

    $('#nome').blur(function(e){
        
        e.preventDefault();

        var nome = $('#nome').val();

        if(nome.length > 5){
            $("#nomeInvalido").hide(); 
            document.getElementById("nome").style.borderColor = "gray";
        }else{
            $("#nomeInvalido").show() ; 
            document.getElementById("nome").style.borderColor = "red";
        }

    });

    $('#dataNascimento').keypress(function(e){

        var dataNascimento = document.getElementById('dataNascimento').value;
        var tamanhoData = dataNascimento.length;
       if(somenteNumeros(e)){
           if(tamanhoData == 2 || tamanhoData == 5){
                document.getElementById('dataNascimento').value = dataNascimento + '/';
           }
       }else {
           return false;
       }
    });

    $('#dataNascimento').blur(function(e){
            var dataNascimento = $('#dataNascimento').val();
            console.log(dataNascimento);
            retiraLetras(dataNascimento);

            if(validardataDeNascimento(dataNascimento)){
                $("#dataInvalida").hide(); 
                document.getElementById("dataNascimento").style.borderColor = "gray";
            }else{
                $("#dataInvalida").show() ; 
                document.getElementById("dataNascimento").style.borderColor = "red";
            }
    });


    $('#password').blur(function(e){

        var password = $('#password').val();

        if(password.length >= 3){
            $("#senhaInvalida").hide(); 
            document.getElementById("password").style.borderColor = "gray";
        }else{
            $("#senhaInvalida").show() ; 
            document.getElementById("password").style.borderColor = "red";
        }
      
    });


    $('#passwordConfirm').blur(function(e){

        var password = $('#password').val();
        var passwordConfirm = $('#passwordConfirm').val();

        if(password == passwordConfirm){
            $("#senhaConfirmInvalida").hide(); 
            document.getElementById("passwordConfirm").style.borderColor = "gray";
            document.getElementById("password").style.borderColor = "gray";
        }else{
            $("#senhaConfirmInvalida").show(); 
            document.getElementById("passwordConfirm").style.borderColor = "red";
            document.getElementById("password").style.borderColor = "red";
        }
      
    });

    $('#celular').blur(function(e){

        var celular = $('#celular').val();
        console.log('aqui')
        console.log('retorno -->>'+(validaTelefone(celular)));

        if(validaTelefone(celular)){
            $("#celularInvalido").hide(); 
            document.getElementById("celular").style.borderColor = "gray";
        }else{
            $("#celularInvalido").show() ; 
            document.getElementById("celular").style.borderColor = "red";
        }
    });

    $('#celular').keypress(function(e){
        var celular = $('#celular').val();
        var celularTamanho = celular.length;
        if(celularTamanho == 0){
            document.getElementById('celular').value = '('+celular;
        }
        if(celularTamanho == 3){
            document.getElementById('celular').value = celular+')';
        }
        if(celularTamanho == 9){
            document.getElementById('celular').value = celular + '-';
        }
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

    function somenteNumeros(e) {
        var charCode = e.charCode ? e.charCode : e.keyCode;
        // charCode 8 = backspace   
        // charCode 9 = tab
        if (charCode != 8 && charCode != 9) {
            // charCode 48 equivale a 0   
            // charCode 57 equivale a 9
            if (charCode < 48 || charCode > 57) {
                return false;
            }
        }
        return true;
    }


    function validardataDeNascimento(data){
        if(data.length < 10){
            return false;
        }
        
        var dataAtual = new Date();
        var anoAtual = dataAtual.getFullYear();

        var separarData = data.split('/');
        var dia = separarData[0];
        var mes = separarData[1];
        var ano = separarData[3];


        if(dia > 31 || mes > 12 || ano > anoAtual) {
            return false
        }
        if(dia > 29 && mes == '02'){
            return false;
        }
        if(dia == 31 && (mes == '02' || mes == '04' || mes == '06' || mes == '09' || mes == '11')){
            return false;
        }

        return true;
    }


    function validaTelefone (phone) {
        console.log('telefone validar'+phone);
        var regex = new RegExp('^\\([0-9]{2}\\)((3[0-9]{3}-[0-9]{4})|(9[0-9]{3}-[0-9]{5}))$');
        return regex.test(phone);
    }

    function retiraLetras(data){
        var tem = false;
        var numeros = ['0','1','2','3','4','5','6','7', '8', '9'];
        var dataNascimento = document.getElementById('dataNascimento').value;
        var split = data.split('');

        for(i = 0; i < split.length; i++){
            for(j = 0; j < numeros.length; j++){
                if(split[i] == numeros[j]){
                   tem = true;
                }
            }
            if(tem == false){
                dataNascimento = dataNascimento.replace(split[i], '');
            }
        }
        document.getElementById('dataNascimento').value = dataNascimento;
    }


// fim do document ready

});



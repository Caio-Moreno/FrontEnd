

$(document).ready(function(){

    var nomeError = true;
    var emailError = true;
    var cpfError = true;
    var dataNascimentoError = true;
    var senhaError = true;
    var senhaConfirmError = true;
    var celularError = true;
    var cepError = true;
    var numeroError = true;
    var cepFaturaError = true;
    var numeroFaturaError = true;
    var enderecoFatura = true;

    $("#cepInvalido").hide();
    $("#cpfInvalido").hide();
    $("#numCartaoInvalido").hide();
    $("#nomeInvalido").hide();
    $("#dataInvalida").hide();
    $("#senhaInvalida").hide();
    $("#senhaConfirmInvalida").hide();
    $("#celularInvalido").hide();
    $("#emailInvalido").hide(); 
    $('#enderecoFaturaDiv').hide();
    $('#cepInvalidoFatura').hide();
    $('#cepNaoEncontrado').hide();
    $('#cepNaoEncontradoFatura').hide();
    $("#numeroInvalido").hide();
    $("#numeroFaturaInvalido").hide();

    


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
                          if(data.erro){
                            $('#rua').val(" ");
                            $('#complemento').val(" ");
                            $('#bairro').val(" ");
                            $('#cidade').val(" ");
                            $('#estado').val(" ")
                            document.getElementById("cep").style.borderColor = "red";
                            $('#cepNaoEncontrado').show();
                          }else{

                          cepError = false;
                          $('#rua').val(data.logradouro);
                          $('#complemento').val(data.complemento);
                          $('#bairro').val(data.bairro);
                          $('#cidade').val(data.localidade);
                          $('#estado').val(data.uf)
                          $('#cepNaoEncontrado').hide();
                          document.getElementById("cepFatura").style.borderColor = "gray";
                         
                         }
                    },
                error: _ => {
                    console.log('error, CEP Não encontrado ')
                    $('#rua').val(" ");
                    $('#complemento').val(" ");
                    $('#bairro').val(" ");
                    $('#cidade').val(" ");
                    $('#estado').val(" ")
                    cepError = true;
                    $('#cepNaoEncontrado').hide();
                    document.getElementById("cepFatura").style.borderColor = "red";
                    $("#cepInvalido").show();
                }
              });
        }else{
            cepError = true;
            $("#cepInvalido").show();
        }
    });

    //cep da fatura busca
    $('#cepFatura').blur(function(e){
        e.preventDefault();

        var cep = $('#cepFatura').val().replace('-','');


        if(cep.length >= 8){
            $("#cepInvalidoFatura").hide();
            $.ajax({
                url: 'https://viacep.com.br/ws/'+cep+'/json/',
                type: 'GET',
                contentType:"application/json; charset=utf-8",
                dataType:"json",    
                success: data => {
                    if(data.erro){
                        cepFaturaError = true;
                        $('#cepNaoEncontradoFatura').show();
                        document.getElementById("cepFatura").style.borderColor = "red";
                        $('#ruaFatura').val(" ");
                        $('#complementoFatura').val(" ");
                        $('#bairroFatura').val(" ");
                        $('#cidadeFatura').val(" ");
                        $('#estadoFatura').val(" ");
                    }else{
                    
                          cepFaturaError = false;
                          $('#ruaFatura').val(data.logradouro);
                          $('#complementoFatura').val(data.complemento);
                          $('#bairroFatura').val(data.bairro);
                          $('#cidadeFatura').val(data.localidade);
                          $('#estadoFatura').val(data.uf)
                          $('#cepNaoEncontradoFatura').hide();
                          document.getElementById("cepFatura").style.borderColor = "gray";
                    }     
                    },
                error: _ => {
                          cepFaturaError = true;
                          console.log('error, CEP Não encontrado')
                          $('#ruaFatura').val(" ");
                          $('#complementoFatura').val(" ");
                          $('#bairroFatura').val(" ");
                          $('#cidadeFatura').val(" ");
                          $('#estadoFatura').val(" ")
                          cepError = true;
                          $('#cepNaoEncontrado').hide();
                          document.getElementById("cepFatura").style.borderColor = "red";
                          $("#cepInvalidoFatura").show();
                }
              });
        }else{
            cepFaturaError = true;
            $("#cepInvalidoFatura").show();
        }
    });

    $('#numero').keypress(function(e){
        return somenteNumeros(e);
    });

    $('#numero').blur(function(e){
        var numero = $('#numero').val().trim();

        if(numero.length < 1 || numero == 0){
            console.log(numero.length);
            console.log(numero);
            numeroError = true;
            $("#numeroInvalido").show();
            document.getElementById("numero").style.borderColor = "red";
        }else{
            console.log(numero.trim.length);
            console.log(numero);
            numeroError = false;
            $("#numeroInvalido").hide();
            document.getElementById("numero").style.borderColor = "gray";
        }
    });

    $('#numeroFatura').keypress(function(e){
        return somenteNumeros(e);
    });

    $('#numeroFatura').blur(function(e){
        var numero = $('#numeroFatura').val().trim();

        if(numero.length < 1 || numero == 0){
            console.log(numero.length);
            console.log(numero);
            numeroFaturaError = true;
            $("#numeroFaturaInvalido").show();
            document.getElementById("numeroFatura").style.borderColor = "red";
        }else{
            console.log(numero.trim.length);
            console.log(numero);
            numeroFaturaError = false;
            $("#numeroFaturaInvalido").hide();
            document.getElementById("numeroFatura").style.borderColor = "gray";
        }
    });



    $('#cpf').blur(function(e){
        e.preventDefault();

        var cpf = $('#cpf').val();

        var valido = validarCPF(cpf);

        if(valido){
            cpfError = false;
            $("#cpfInvalido").hide();
            document.getElementById("cpf").style.borderColor = "gray";

        }else{
            cpfError = true;
            $("#cpfInvalido").show();
            document.getElementById("cpf").style.borderColor = "red";
        }

    });

    $('#cpf').keydown(function(e){
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


    $('#nome').blur(function(e){
        
        e.preventDefault();

        var nome = $('#nome').val().trim();
        validaNome(nome);

        if(validaNome(nome)){
            nomeError = false;
            $("#nomeInvalido").hide(); 
            document.getElementById("nome").style.borderColor = "gray";
        }else{
            nomeError = true;
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
                dataNascimentoError = false;
                $("#dataInvalida").hide(); 
                document.getElementById("dataNascimento").style.borderColor = "gray";
            }else{
                dataNascimentoError = true;
                $("#dataInvalida").show() ; 
                document.getElementById("dataNascimento").style.borderColor = "red";
            }
    });


    $('#password').blur(function(e){

        var password = $('#password').val();

        if(password.length >= 3){
            senhaError = false;
            $("#senhaInvalida").hide(); 
            document.getElementById("password").style.borderColor = "gray";
        }else{
            senhaError = true;
            $("#senhaInvalida").show() ; 
            document.getElementById("password").style.borderColor = "red";
        }
      
    });


    $('#passwordConfirm').blur(function(e){

        var password = $('#password').val();
        var passwordConfirm = $('#passwordConfirm').val();

        if(password == passwordConfirm){
            senhaConfirmError = false;
            $("#senhaConfirmInvalida").hide(); 
            document.getElementById("passwordConfirm").style.borderColor = "gray";
            document.getElementById("password").style.borderColor = "gray";
        }else{
            senhaConfirmError = true;
            $("#senhaConfirmInvalida").show(); 
            document.getElementById("passwordConfirm").style.borderColor = "red";
            document.getElementById("password").style.borderColor = "red";
        }
    });

    $('#celular').blur(function(e){

        var celular = $('#celular').val();
        

        if(celular.length >= 14){
            celularError = false;
            $("#celularInvalido").hide(); 
            document.getElementById("celular").style.borderColor = "gray";
        }else{
            celularError = true;
            $("#celularInvalido").show() ; 
            document.getElementById("celular").style.borderColor = "red";
        }
    });

    $('#celular').keypress(function(e){
        var celular = $('#celular').val();
        var celularTamanho = celular.length;
        if(somenteNumeros(e)){
            if(celularTamanho == 0){
                document.getElementById('celular').value = '('+celular;
            }
            if(celularTamanho == 3){
                document.getElementById('celular').value = celular+')';
            }
            if(celularTamanho == 9){
                document.getElementById('celular').value = celular + '-';
            }
        }else {
            return false;
        }
    });


    $('#email').blur(function(e){

        var email = $('#email').val();
        
        if(validateEmail(email)){
            emailError = false;
            $("#emailInvalido").hide(); 
            document.getElementById("email").style.borderColor = "gray";
        }else{
            emailError = true;
            $("#emailInvalido").show() ; 
            document.getElementById("email").style.borderColor = "red";
        }
    });

    $('#enderecoFatura').click(function (e){  
        if(enderecoFatura){
            enderecoFatura = false;
            $('#ruaFatura').val(" ");
            $('#complementoFatura').val(" ");
            $('#bairroFatura').val(" ");
            $('#cidadeFatura').val(" ");
            $('#estadoFatura').val(" ");
            $('#cepFatura').val(" ");
        }else{
            enderecoFatura = true;
        }

        if(!enderecoFatura){
            $('#enderecoFaturaDiv').show(1000);
        }else{
            $('#enderecoFaturaDiv').hide(1000);
        }
    });


    $('#btnFinalizar').click(function(e){

        verificaFormulario();

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

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function validaNome(nome){
        var nomeSplitado = nome.split(' ');
        console.log(nomeSplitado);
        console.log(nomeSplitado.length);

        if(nomeSplitado.length < 2) return false;

        if(nomeSplitado[0].length < 3 || nomeSplitado[1] < 3) return false;
        
        return true;
       
    }

    function verificaFormulario(){
        console.log('Nome-->>'+nomeError)
        console.log('Email-->>'+emailError)
        console.log('Cpf-->>'+cpfError)
        console.log('Data nascimento-->>'+dataNascimentoError)
        console.log('senha-->>'+senhaError)
        console.log('senhaConfirm-->>'+senhaConfirmError)
        console.log('celular-->>'+celularError)
        console.log('cep-->>'+cepError)
        console.log('numero-->>'+numeroError)
        console.log('cepFatura-->>'+cepFaturaError)
        console.log('numeroFatura-->'+numeroFaturaError)

        if(nomeError || emailError || cpfError || dataNascimentoError || senhaError || senhaConfirmError || celularError|| cepError || numeroError){
            alert ('Existem campos que não foram preenchidos corretamente')
            return;
        }else if(!enderecoFatura && ( cepFaturaError || numeroFaturaError)){
            alert('Preencha corretamente o endereço da fatura')
            return;
        } 

        alert('Passei')

    }


// fim do document ready (Brazukas technology)

});
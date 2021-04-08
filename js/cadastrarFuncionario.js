function enviarFuncionario() {
    $('#loading').show(200)
    $('#addFuncionario').hide(100)
    $('#alertaErro').hide()
    $('#alertaSucesso').hide()
        //var imagens = enviarImagens();
    var dataSend = retornarObj();

    var url = 'http://localhost:8080/administrador'

    $.ajax({
        url: url,
        type: 'POST',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: dataSend,
        success: data => {
            if(data._response == 200){
                $('#alertaSucesso').show(200)
        
            }else{
                $('#alertaErro').show(200)
            }
            $('#loading').hide(100)
            $('#alertaSucesso').show(200)
            $('#addFuncionario').show(200)
        },
        error: result => {
            console.log(result)
            $('#loading').hide(100)
            $('#alertaErro').show(200)
            $('#addFuncionario').show(100)
            $("#gallery").empty();
        }
    });
}

function retornarObj() {
    var nome = document.getElementById('nomeFuncionario').value;
    var cpf = document.getElementById('cpfFuncionario').value;
    var sexo = document.getElementById('sexoFuncionario').value;
    var dataNascimento = document.getElementById('dataNascimento').value;
    var email = document.getElementById('emailFuncionario').value;
    var senha = document.getElementById('senhaFuncionario').value;
    var cargo = document.getElementById('cargoFuncionario').value;

    var json = JSON.stringify({
        _nome: nome,
        _cpf: cpf,
        _sexo: sexo,
        _dataNascimento: dataNascimento,
        _email: email,
        _password: senha,
        _tipoUser: cargo,
    })
    return json;
}
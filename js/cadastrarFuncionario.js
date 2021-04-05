function enviarFuncionario() {
    $('#loading').show(200)
    $('#addProduct').hide(100)
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
            var funcionario = data._usuario[0];
            console.log(funcionario);
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
    var status = document.getElementById('statusFuncionario').value;

    var json = JSON.stringify({
        _nome: nome,
        _cpf: cpf,
        _sexo: sexo,
        _dataNascimento: dataNascimento,
        _email: email,
        _password: senha,
        _tipoUser: cargo,
        _status: status
    })
    alert(json);
    return json;
}
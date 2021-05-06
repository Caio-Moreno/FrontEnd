$(document).ready(function(e) {



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


    $('#Endereco').click(function(e) {
        e.preventDefault();
        $("#Cadastro").attr("disabled", true);
        $("#updateDados").fadeOut(500, function() {
            $("#updateEndereco").fadeIn(500, function() {
                $("#Cadastro").attr("disabled", false);
            });

        });


    });

    $('#Cadastro').click(function(e) {
        e.preventDefault();
        $("#Endereco").attr("disabled", true);
        $("#updateEndereco").fadeOut(500, function() {
            $("#updateDados").fadeIn(500, function() {
                $("#Endereco").attr("disabled", false);
            });
        });


    });


    /****************************************************************/

    /****************************************************************/








    $('#enderecoFatura').click(function(e) {
        var status = document.getElementById('enderecoFatura');


        if (!status.checked) {
            $('#enderecoFaturaDiv').show(1000);
        } else {
            $('#enderecoFaturaDiv').hide(1000);
        }
    });


});


function buscarCliente() {
    var token = localStorage.getItem('token');

    var logado = verificaSeLogado(token);

    if (logado) {
        var url = urlClientePorID();
        $.ajax({
            url: url,
            type: 'GET',
            headers: { 'TOKEN': token },
            timeout: 20000,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: data => {
                console.log(data);
                var cliente = data;
                console.log(data);
                poupularCadastro(cliente)
            },
            error: result => {
                alert(result.status + ' ' + result.statusText);
            }
        });
    } else {
        alert('Erro-->> usuário não logado ou sem permissão')
    }
}



function verificaSeLogado(token) {
    var dadosUsuario = localStorage.getItem('dadosUsuario');
    if (!(dadosUsuario == null || dadosUsuario == '' || dadosUsuario == undefined)) {
        var user = dadosUsuario.split(',');
        var queryString = window.location.search;
        var id = queryString.replace(/[^0-9]/g, '');

        if (id != user[0]) {
            return false;
        }

        if (token == null || token == '' || token == undefined) {
            return false;
        }

        return true;
    } else {
        return false;
    }

}



function urlClientePorID() {
    var url = 'http://localhost:8080/Clientes/BuscarCliente?id=';
    var queryString = window.location.search;
    var id = queryString.replace(/[^0-9]/g, '');
    return url + id;
}




function poupularCadastro(cliente) {
    var enderecos = cliente._endereco;
    console.log(enderecos)
    var enderecoEntrega = enderecos[0];


    $('#nome').val(cliente._nome);
    $('#idDadosClienteAlterar').val(cliente._id);
    $('#email').val(cliente._email);
    $('#cpf').val(cliente._cpf);
    $('#dataNascimento').val(cliente._dataNascimento)
    $('#password').val(cliente._password)
    $('#sexo').val(cliente._sexo);
    $('#celular').val(cliente._telefone);
    $('#cep').val(enderecoEntrega._cep);
    $('#rua').val(enderecoEntrega._logradouro);
    $('#numero').val(enderecoEntrega._numero);
    $('#complemento').val(enderecoEntrega._complemento);
    $('#bairro').val(enderecoEntrega._bairro);
    $('#estado').val(enderecoEntrega._estado);
    $('#cidade').val(enderecoEntrega._cidade);



    if (enderecos.length == 2) {
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

    } else {
        var status = document.getElementById('enderecoFatura');
        status.checked = true;
        $('#enderecoFaturaDiv').hide();
    }

}



function atualizaDados() {
    var token = localStorage.getItem('token');
    console.log(token)
    var data = retornarDadosUpdate();
    var cpf = $('#cpf').val();
    var url = 'http://localhost:8080/Clientes/atualiza?cpf=' + cpf



    $.ajax({
        url: url,
        type: 'PUT',
        headers: { 'TOKEN': token },
        timeout: 2000000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: data,
        success: _ => {
            var mensagem = _._message;
            alert(mensagem);
            window.location.reload();
        },
        error: result => {
            console.log(result)
        },
        done: _ => {
            alert('finalizou')
        }
    });

}


function retornarDadosUpdate() {
    var nome = $('#nome').val();

    var password = $('#password').val();

    var sexo = $('#sexo').val();
    var telefone = $('#celular').val();

    var json = JSON.stringify({
        _nome: nome,
        _password: password,
        _sexo: sexo,
        _telefone: telefone

    })
    return json;
}





function getEnderecosLista(id) {

    var url = tratarDadosgetEnderecos(id);

    console.log("to aqui novo" + url);

    $.ajax({
        url: url,
        type: 'GET',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: data => {
            console.log("sucesso")
            console.log(data)

            var tamanho = data._enderecos.length;
            console.log(tamanho)


            var enderecos = data._enderecos;
            console.log(enderecos)


            for (i = 0; i < tamanho; i++) {
                var endereco = enderecos[i];

                retornarLinha(endereco);
            }


        },
        error: result => {
            alert(result.status + ' ' + result.statusText);
        }
    });
}

function tratarDadosgetEnderecos(id) {
    var url1 = 'http://localhost:8080/endereco/listar?id=' + id;
    return url1;
}

function retornarLinha(response) {
    console.log('meuResponse')
    console.log(response);

    //instacio a tabela
    var tabela = $('#dataTable');
    //procuro o corpo da tabela e armazeno em uma variavel
    var body = tabela.find('tbody');
    //armazeno em uma variavel a linha tr = linha
    var tr = $('<tr></tr>')
        //cada coluna da linha eu armazeno numa var também
    var td1 = $('<td data-rua="' + response._logradouro + '"></td>');
    var td2 = $('<td data-numero="' + response._numero + '"></td>');
    var td3 = $('<td data-complemento="' + response._complemento + '"></td>');
    var td4 = $('<td data-bairro="' + response._bairro + '"></td>');
    var td5 = $('<td data-estado="' + response._estado + '"></td>');

    var td6 = $('<td data-cidade="' + response._cidade + '"></td>');
    var td7 = $('<td data-cep="' + response._cep + '"></td>');
    var td8 = $('<td data-tipo="' + response._tipo + '"></td>');

    var td9 = $('<td onclick="mostrarModalEditarEndereco(' + response._id + ')"><a href="#"><i class="fa fa-pencil" aria-hidden="true"></i></a></td>');
    /*if (response._tipo == 'I') {
        tr = $('<tr style="display: none;></tr>')
    }*/
    td1.text(response._logradouro);
    td2.text(response._numero)
    td3.text(response._complemento);
    td4.text(response._bairro);
    td5.text(response._estado);
    td6.text(response._cidade);
    td7.text(response._cep);
    td8.text(response._tipo);
    tr.append(td1)
    tr.append(td2)
    tr.append(td3)
    tr.append(td4)
    tr.append(td5)
    tr.append(td6)
    tr.append(td7)
    tr.append(td8)
    tr.append(td9)
        //insiro no corpo a linha
    body.append(tr);



    return;
}



function mostrarModalEditarEndereco(idProduto) {
    mostrarEndereco(idProduto);
    $('#mostrarModalEditarEndereco').modal('show');

}

function mostrarEndereco(id) {
    $('#alertaAtualizado').hide();
    var url = 'http://localhost:8080/endereco?id=' + id;
    console.log('Consumindo para o modal' + url);

    $.ajax({
        url: url,
        type: 'GET',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: data => {
            var endereco = data._enderecos[0];

            $('#ruaEnderecoAlterar').val(endereco._logradouro);
            $('#numeroEnderecoAlterar').val(endereco._numero);
            $('#complementoEnderecoAlterar').val(endereco._complemento);
            $('#bairroEnderecoAlterar').val(endereco._bairro);
            $('#estadoEnderecoAlterar').val(endereco._estado);
            $('#cidadeEnderecoAlterar').val(endereco._cidade);
            $('#cepEnderecoAlterar').val(endereco._cep);
            $('#tipoEnderecoAlterar').val(endereco._tipo);

            var dados = localStorage.getItem('dadosUsuario');
            var user = dados.split(',');
            var idUsuario = user[0];
            $('#idEnderecoAlterar').val(idUsuario);

            $('#idEndereco').val(id);


        },
        error: result => {
            alert(result.status + ' ' + result.statusText);
        }
    });

}


function atualizarEndereco() {
    var token = localStorage.getItem('token');
    console.log(token);


    var data = retornarEnderecoUpdate();

    var teste = $('#idEndereco').val();
    teste = parseInt(teste);
    console.log('ID' + teste);
    var id = $('#idEnderecoAlterar').val();
    id = parseInt(id);
    console.log('ID' + id);
    var url = 'http://localhost:8080/endereco?id=' + id;

    console.log('MEU OBJ' + data)

    $.ajax({
        url: url,
        type: 'PUT',
        timeout: 2000000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: data,
        success: _ => {
            var mensagem = _._message;
            $('#mostrarModalEditarEndereco').modal('hide');
            alert(mensagem);
            $("#dataTable td").remove();
            getEnderecosLista(id);
        },
        error: result => {
            console.log(result)
        },
        done: _ => {
            alert('finalizou')
        }
    });
}

function retornarEnderecoUpdate() {
    var cep = $('#cep').val();

    var rua = $('#rua').val();

    var numero = $('#numero').val();
    var complemento = $('#complemento').val();
    var bairro = $('#bairro').val();
    var estado = $('#estado').val();
    var cidade = $('#cidade').val();
    var tipo = $('#tipo').val();
    var idEndereco = $('#idEndereco').val();
    console.log("esse o id " + idEndereco.value);


    var json = JSON.stringify({
        _cep: cep,
        _logradouro: rua,
        _numero: numero,
        _bairro: bairro,
        _estado: estado,
        _cidade: cidade,
        _complemento: complemento,
        _tipo: tipo,
        _id: idEndereco

    })
    return json;
}


function enviarEndereco(id) {
    var dataSend = retornarObjInserir();
    var dados = localStorage.getItem('dadosUsuario');
    var user = dados.split(',');

    $('#alertaSucesso').hide()
    id = user[0];
    console.log("este o id atual " + id);

    var url = 'http://localhost:8080/endereco?id=' + id;

    console.log(url)

    $.ajax({
        url: url,
        type: 'POST',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: dataSend,
        success: data => {

            window.location.reload();
            if (data._response == 200) {
                $('#alertaSucesso').show(200);
                limpaCampos();

            } else {
                $('#alertaErro').show(200)
            }
            $('#loading').hide(100)
            $('#alertaSucesso').show(200)
            $('#addEndereco').show(200)
        },

        error: result => {


            limpaCampos()
            window.location.reload();
            console.log(result)
            $('#loading').hide(100)
            $('#alertaErro').show(200)
            $('#addEndereco').show(100)
        }
    });
}

function retornarObjInserir() {
    var cep = document.getElementById('cepFatura').value;
    var rua = document.getElementById('ruaFatura').value;
    var numero = document.getElementById('numeroFatura').value;
    var complemento = document.getElementById('complementoFatura').value;
    var bairro = document.getElementById('bairroFatura').value;
    var estado = document.getElementById('estadoFatura').value;
    var cidade = document.getElementById('cidadeFatura').value;
    var tipo = document.getElementById('tipoFatura').value;

    var json = JSON.stringify({
        _cep: cep,
        _logradouro: rua,
        _numero: numero,
        _complemento: complemento,
        _bairro: bairro,
        _estado: estado,
        _cidade: cidade,
        _tipo: tipo
    })
    return json;
}


function limpaCampos() {
    var elements = document.getElementsByName("form_txt");
    elements.forEach(element => {
        console.log(element);
        element.value = '';
    })
}
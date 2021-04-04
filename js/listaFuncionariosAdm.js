function getFuncionariosLista() {

    var url = tratarDadosgetFuncionarios()

    $.ajax({
        url: url,
        type: 'GET',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: data => {
            var total = data._usuario.length;
            var funcionarios = data._usuario;
            console.log(total);
            for (i = 0; i < total; i++) {
                var funcionario = funcionarios[i];

                retornarLinha(funcionario);
            }


        },
        error: result => {
            alert(result.status + ' ' + result.statusText);
        }
    });
}

function tratarDadosgetFuncionarios() {
    var url1 = 'http://localhost:8080/administrador/listarFuncionarios'
    return url1;
}

function retornarLinha(response) {
    console.log(response);

    //instacio a tabela
    var tabela = $('#dataTable');
    //procuro o corpo da tabela e armazeno em uma variavel
    var body = tabela.find('tbody');
    //armazeno em uma variavel a linha tr = linha
    var tr = $('<tr></tr>')
        //cada coluna da linha eu armazeno numa var também
    var td1 = $('<td data-nome="' + response._nomeUsuarioInterno + '"></td>');
    var td2 = $('<td data-Cargo="' + response._tipoUsuarioInternoEnum + '"></td>');
    if (response._statusEnum == 'A') {
        var td3 = $('<td ondblclick="mostrarModalAtualizar(' + response._idUsuario + ',\'A\')">  <i class="fa fa-check-square-o" aria-hidden="true"></i> </td>');
        //console.log('<td ondblclick="mostrarModalAtualizar('+response._idProduto+',\'A\')">   <i class="fa fa-check-square-o" aria-hidden="true"></i> </td>')

    } else if (response._statusEnum == 'I') {
        var td3 = $('<td ondblclick="mostrarModalAtualizar(' + response._idUsuario + ',\'I\')" data-status="' + response._statusEnum + '"> <i class="fa fa-ban" aria-hidden="true"></i></td>');
    }

    var td4 = $('<td onclick="mostrarModalEditar(' + response._idUsuario + ')"><a href="#"><i class="fa fa-pencil" aria-hidden="true"></i></a></td>')
        //var td12 = $('<td onclick="mostrarModalExclusao(' + response._idProduto + ')" ><a href="#"><i class="fa fa-trash" aria-hidden="true"></i></a></td>')
        //passo os valores de cada coluna
    td1.text(response._nomeUsuarioInterno);
    td2.text(response._tipoUsuarioInternoEnum)

    //insiro na linhas todas colunas preenchidas
    tr.append(td1)
    tr.append(td2)
    tr.append(td3)
    tr.append(td4)
        //insiro no corpo a linha
    body.append(tr);



    return;
}

/*function mostrarModalExclusao(idProduto) {
    $("#nomeProduto").html(idProduto);
    $("#codProduto").val(idProduto);
    $('#modalExclusao').modal('show');
}*/

function mostrarModalEditar(idUsuario) {
    mostrarProduto(idUsuario);
    $('#modalEditar').modal('show');

}

function mostrarModalAtualizar(idUsuario, StatusAtual) {
    console.log('ENTREI' + idUsuario + StatusAtual)
    $('#idUsuarioAtualizarStatus').val(idUsuario);
    $('#statusAtualizarUsuario').val(StatusAtual);
    $('#modalAtualizaStatus').modal('show');
}

/*function excluirProduto() {
    var idProduto = $('#codProduto').val();

    var nome = $('#nomeProdutoAlterar').val();
    idProduto = parseInt(idProduto);
    console.log(nome);

    console.log(typeof(idProduto));


    var url = 'http://localhost:8080/Produtos?Id=' + idProduto;
    console.log('URL' + url);
    $.ajax({
        url: url,
        type: 'DELETE',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: data => {
            var mensagem = data._message;
            $('#modalExclusao').modal('hide')
            alert(mensagem);
            window.location.reload();
        },
        error: result => {
            alert(result.status + ' ' + result.statusText);
        }
    });
}*/

function mostrarProduto(id) {
    $('#alertaAtualizado').hide();
    var url = 'http://localhost:8080/administrador?Id=' + id;
    console.log('Consumindo para o modal' + url);

    $.ajax({
        url: url,
        type: 'GET',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: data => {
            var funcionario = data._idUsuario[0];


            $('#nomeUsuarioAlterar').val(funcionario._nome);
            $('#cargoUsuarioAlterar').val(funcionario._tipoUsuarioInternoEnum);
            $('#senhaUsuarioAlterar').val(funcionario._password);

            $('#idUsuarioAlterar').val(id);


        },
        error: result => {
            alert(result.status + ' ' + result.statusText);
        }
    });

}




function atualizarFuncionario() {
    var data = retornarUserUpdate();
    var id = $('#idUsuarioAlterar').val();
    id = parseInt(id);
    console.log('ID' + id);
    var url = 'http://localhost:8080/administrador?Id=' + id

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
            var usuario = _._funcionarios[0];
            console.log(usuario + 'to aqui no produto')
            $('#modalEditar').modal('hide');
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

function retornarUserUpdate() {
    var nome = $('#nomeUsuarioAlterar').val();
    console.log('No Retorno ->> ' + nome);

    var tipoUser = $('#cargoUsuarioAlterar').val();
    console.log('No Retorno ->> ' + tipoUser);

    var password = $('#senhaUsuarioAlterar').val();
    console.log('No Retorno ->> ' + password);


    var json = JSON.stringify({
        _nome: nome,
        _tipoUser: tipoUser,
        _password: password
    })


    return json;
}

function atualizaStatus() {
    var id = $('#idUsuarioAtualizarStatus').val();
    id = parseInt(id);
    console.log(id)
    var status = $('#statusAtualizarUsuario').val();
    console.log(status)

    if (status == 'A') {
        status = 'I'
    } else {
        status = 'A'
    }

    var json = JSON.stringify({
        _id: id,
        _status: status
    })

    var url = 'http://localhost:8080/administrador/atualizaStatus'


    $.ajax({
        url: url,
        type: 'PUT',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: _ => {
            var mensagem = _._message;
            $('#modalAtualizaStatus').modal('hide');
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
$(document).ready(request => {

    $('#erroNome').hide();
    $('#erroSenha').hide();

    $('#nomeUsuarioAlterar').blur(function(e) {
        var nome = $('#nomeUsuarioAlterar').val();

        (nome.length < 5) ? $('#erroNome').show(500): $('#erroNome').hide(500);

    });

    $('#senhaUsuarioAlterar').change(function(e) {
        var senha = $('#senhaUsuarioAlterar').val();

        (senha.length < 3 && senha.length > 0) ? $('#erroSenha').show(500): $('#erroSenha').hide(500);

    });

    $('#atualizarUsuario').click(function(e) {
        var nome = $('#nomeUsuarioAlterar').val();
        var senha = $('#senhaUsuarioAlterar').val();

        (nome.length < 5 || (senha.length < 3 && senha.length > 0)) ? alert('Preencha os dados corretamente'): atualizarFuncionario();

    })




});














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

    var td1 = $('<td data-nome="' + response._id + '"></td>');
    var td2 = $('<td data-nome="' + response._nomeUsuarioInterno + '"></td>');
    var td3 = $('<td data-Cargo="' + response._tipoUsuarioInternoEnum + '"></td>');
    if (response._statusEnum == 'A') {
        var td4 = $('<td ondblclick="mostrarModalAtualizar(' + response._id + ',\'A\')">  <i class="fa fa-check-square-o" aria-hidden="true"></i> </td>');
        //console.log('<td ondblclick="mostrarModalAtualizar('+response._idProduto+',\'A\')">   <i class="fa fa-check-square-o" aria-hidden="true"></i> </td>')

    } else if (response._statusEnum == 'I') {
        var td4 = $('<td ondblclick="mostrarModalAtualizar(' + response._id + ',\'I\')" data-status="' + response._statusEnum + '"> <i class="fa fa-ban" aria-hidden="true"></i></td>');
    }

    var td5 = $('<td onclick="mostrarModalEditar(' + response._id + ')"><a href="#"><i class="fa fa-pencil" aria-hidden="true"></i></a></td>')
        //var td12 = $('<td onclick="mostrarModalExclusao(' + response._idProduto + ')" ><a href="#"><i class="fa fa-trash" aria-hidden="true"></i></a></td>')
        //passo os valores de cada coluna

    td1.text(response._id);
    td2.text(response._nomeUsuarioInterno);
    td3.text(response._tipoUsuarioInternoEnum)

    //insiro na linhas todas colunas preenchidas
    tr.append(td1)
    tr.append(td2)
    tr.append(td3)
    tr.append(td4)
    tr.append(td5)
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
    var dadosUsario = localStorage.getItem("dadosUsuario");
    dadosUsario = dadosUsario.split(',');
    if (dadosUsario[3] == 'ADMIN') {
        mostrarProduto(idUsuario);
        $('#modalEditar').modal('show');
    } else {
        alert('Você não tem permissão para editar')
    }

}

function mostrarModalAtualizar(idUsuario, StatusAtual) {
    var dadosUsario = localStorage.getItem("dadosUsuario");
    dadosUsario = dadosUsario.split(',');
    if (dadosUsario[3] == 'ADMIN') {
        console.log('ENTREI' + idUsuario + StatusAtual)
        $('#idUsuarioAtualizarStatus').val(idUsuario);
        $('#statusAtualizarUsuario').val(StatusAtual);
        $('#modalAtualizaStatus').modal('show');
    } else {
        alert('Você não tem permissão para realizar está ação');
    }
}

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
            var funcionario = data._usuario[0];
            console.log(funcionario);


            $('#nomeUsuarioAlterar').val(funcionario._nome);
            $('#cargoUsuarioAlterar').val(funcionario._tipoUser);
            $('#senhaUsuarioAlterar').val(funcionario._password);
            $('#cpfUsuarioAlterar').val(funcionario._cpf);
            $('#sexoUsuarioAlterar').val(funcionario._sexo);
            $('#dataNascimentoUsuarioAlterar').val(funcionario._dataNascimento);
            $('#emailUsuarioAlterar').val(funcionario._email);
            $('#idUsuarioAlterar').val(id);


        },
        error: result => {
            alert(result.status + ' ' + result.statusText);
        }
    });

}

function atualizarFuncionario() {
    var token = localStorage.getItem("token");
    var data = retornarUserUpdate();
    var id = $('#idUsuarioAlterar').val();
    id = parseInt(id);
    console.log('ID' + id);
    var url = 'http://localhost:8080/administrador?Id=' + id

    console.log('MEU OBJ' + data)

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
            var usuario = _._usuario[0];
            console.log(usuario + 'to aqui no usuario')
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

    var password = $('#senhaUsuarioAlterar').val();
    console.log('No Retorno ->> ' + password);

    var tipoUser = $('#cargoUsuarioAlterar').val();
    console.log('No Retorno ->> ' + tipoUser);

    var json = JSON.stringify({
        _nome: nome,
        _password: password,
        _tipoUser: tipoUser
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
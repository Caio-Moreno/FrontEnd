function getPedidosLista() {

    var url = tratarDadosgetPedidos()

    $.ajax({
        url: url,
        type: 'GET',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: data => {
            var total = data._pedido.length;
            var pedidos = data._pedido;
            console.log(total);
            for (i = 0; i < total; i++) {
                var pedido = pedidos[i];

                retornarLinha(pedido);
            }


        },
        error: result => {
            alert(result.status + ' ' + result.statusText);
        }
    });
}

function tratarDadosgetPedidos() {
    var url1 = 'http://localhost:8080/Pedidos'
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

    var td1 = $('<td data-Num. Pedido="' + response._numPedido + '"></td>');
    var td2 = $('<td data-Data="' + response._dataVenda + '"></td>');
    var td3 = $('<td data-Valor="' + response._valorTotal + '"></td>');
    if (response._status == 'APPROVED PAYMENT') {
        var td4 = $('<td ondblclick="mostrarModalAtualizar(' + response._numPedido + ',\'A\')">  <i class="fa fa-check-square-o" aria-hidden="true"></i> </td>');
        //console.log('<td ondblclick="mostrarModalAtualizar('+response._idProduto+',\'A\')">   <i class="fa fa-check-square-o" aria-hidden="true"></i> </td>')

    } else if (response._status == 'PENDING PAYMENT') {
        var td4 = $('<td ondblclick="mostrarModalAtualizar(' + response._numPedido + ',\'I\')" data-status="' + response._statusEnum + '"> <i class="fa fa-ban" aria-hidden="true"></i></td>');
    }

    td1.text(response._numPedido);
    td2.text(response._dataVenda);
    td3.text(response._valorTotal)

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

function atualizaStatus() {
    var id = $('#idPedidoAtualizarStatus').val();
    id = parseInt(id);
    console.log(id)
    var status = $('#statusAtualizarPedido').val();
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
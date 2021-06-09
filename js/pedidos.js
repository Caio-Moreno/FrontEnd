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


    if (response._status == 'PAGAMENTO PENDENTE') {
        var td4 = $('<td class="text-primary" ondblclick="mostrarModalAtualizar(' + response._idVenda + ',\'PAGAMENTO PENDENTE\')" data-status="' + response._statusEnum + '"> <i style="cursor: pointer;" class="fas fa-spinner" aria-hidden="true"></i></td>');

    } else if (response._status == 'PAGAMENTO NÃO APROVADO') {

        var td4 = $('<td class="text-danger"  ondblclick="mostrarModalAtualizar(' + response._idVenda + ',\'PAGAMENTO NÃO APROVADO\')" data-status="' + response._statusEnum + '"> <i style="cursor: pointer;" class="fa fa-ban" aria-hidden="true"></i></td>');

    } else if (response._status == 'PAGAMENTO APROVADO') {
        var td4 = $('<td class="text-success" ondblclick="mostrarModalAtualizar(' + response._idVenda + ',\'PAGAMENTO APROVADO\')"> <i style="cursor: pointer;" class="fa fa-check-square-o" aria-hidden="true"></i> </td>');

    } else if (response._status == 'AGUARDANDO RETIRADA') {
        var td4 = $('<td  class="text-info" ondblclick="mostrarModalAtualizar(' + response._idVenda + ',\'AGUARDANDO RETIRADA\')"> <i style="cursor: pointer;" class="fas fa-people-carry" aria-hidden="true"></i> </td>');

    } else if (response._status == 'PEDIDO A CAMINHO') {
        var td4 = $('<td class="text-secondary" ondblclick="mostrarModalAtualizar(' + response._idVenda + ',\'PEDIDO A CAMINHO\')" data-status="' + response._statusEnum + '"> <i style="cursor: pointer;" class="fas fa-truck" aria-hidden="true"></i></td>');
    } else if (response._status == 'PEDIDO ENTREGUE') {
        var td4 = $('<td class="text-warning"><i class="fas fa-truck-loading" aria-hidden="true"></i></td>');
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



function mostrarModalAtualizar(idVenda, StatusAtual) {
    console.log('ENTREI ' + idVenda + StatusAtual)
    $('#idPedidoAtualizarStatus').val(idVenda);
    $('#statusAtualizarPedido').val(StatusAtual);
    $('#modalAtualizaStatus').modal('show');
}

function atualizaStatus() {
    var id = $('#idPedidoAtualizarStatus').val();
    id = parseInt(id);
    console.log(id)
    var status = $('#statusAtualizarPedido').val();
    console.log(status)

    if (status == 'PAGAMENTO PENDENTE') {
        status = 'PAGAMENTO NÃO APROVADO'
    } else if (status == 'PAGAMENTO NÃO APROVADO') {
        status = 'PAGAMENTO APROVADO'
    } else if (status == 'PAGAMENTO APROVADO') {
        status = 'AGUARDANDO RETIRADA'
    } else if (status == 'AGUARDANDO RETIRADA') {
        status = 'PEDIDO A CAMINHO'
    } else if (status == 'PEDIDO A CAMINHO') {
        status = 'PEDIDO ENTREGUE'
    }
    
    var json = JSON.stringify({
        _idVenda: id,
        _status: status
    })

    var url = 'http://localhost:8080/Pedidos/atualizaStatusPedido'


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
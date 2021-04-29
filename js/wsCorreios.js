function calcWsCorreios() {
    var sendjson = {
        "nCdEmpresa": "",
        "sDsSenha": "",
        "nCdServico": "41106",
        "sCepOrigem": "37540000",
        "sCepDestino": "37540000",
        "nVlPeso": "1",
        "nCdFormato": "1",
        "nVlComprimento": "20",
        "nVlAltura": "5",
        "nVlLargura": "15",
        "nVlDiametro": "0",
        "sCdMaoPropria": "s",
        "nVlValorDeclarado": "200",
        "sCdAvisoRecebimento": "s"
    }



    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo",
        data: sendjson,
        dataType: "json",
        success: function(data) {
            console.log(data);
        },
        error: function(data, err) {

            console.log(data);
            console.log(err);
        },
    });

}


$.ajax({
    type: "GET",
    contentType: "application/json; charset=utf-8",
    url: "http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo",
    data: sendjson,
    dataType: "jsonp",
    jsonpCallback: "foo"
})

function foo(resultado) {
    // verifique que resultado é JSON válido
    console.log(resultado);
}
$.ajax({
    type: "GET",
    contentType: "application/json; charset=utf-8",
    url: "http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo",
    data: sendjson,
    dataType: "jsonp",
    jsonpCallback: "foo"
});

function foo (resultado) {
    // verifique que resultado é JSON válido
    console.log(resultado);
}
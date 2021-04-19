$(document).ready(function(){

    $('#success').hide();
    $('#error').hide();
    $('#noEmail').hide();
    $('#loading').hide();

});


function sendEmail(json){
    var url = "http://localhost:8080/Email/Recovery";

    $.ajax({
        url: url,
        type: 'POST',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: data => {
                    $('#success').show();
                    $('#error').hide();
                    $('#noEmail').hide();
                    $('#loading').hide();
        },
        error: result => {
            $('#success').hide();
            $('#error').show();
            $('#noEmail').hide();
            $('#loading').hide();
        }
    });

}


function montarEmail(){
    $('#loading').show();
    var email = document.getElementById('email').value;
    var url = "http://localhost:8080/Clientes/BuscarCliente?email="+email;
    
    $.ajax({
        url: url,
        type: 'GET',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: data => {
            var email = data._email;
            var assunto = 'Recuperação de senha'
            var body = "<p style='font-size: 20px;'>Olá <strong>"+data._nome+"!</strong></p>"+
            "<br>"+
            "<p style='font-size: 16px;'>Segue sua nova senha gerada, caso não queira permanecer com a senha e queria alterar basta acessar</p>"+
            "<strong><p style='font-size: 16px;'>Meus dados --> Cadastro</p><br></strong><br>"+
            "<p style='font-size: 22px;'><strong>Nova senha:</strong></p>"+
            "<p style='font-size: 22px;'><strong></strong></p>";
            
            var json = JSON.stringify({
                _email: email,
                _assunto: assunto,
                _mensagem: body,
            })
            sendEmail(json);
        },
        error: result => {
            $('#success').hide();
            $('#loading').hide();
            (result.status === 404) ? $('#noEmail').show() : $('#error').hide();
    
        }
    });


    
}

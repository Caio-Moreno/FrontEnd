/*global $, document, window, setTimeout, navigator, console, location*/
$(document).ready(function () {
    $('#BemVindoSuccess').hide();

    $("#login-button").click(function(event){
        event.preventDefault();
       


        var url = 'http://localhost:8080/Login';
        var login = $('#username').val();
        var senha = $('#password').val();
    
        var json = JSON.stringify({
            _username: login,
            _password: senha,
        })
    
        $.ajax({
            url: url,
            type: 'POST',
            timeout: 20000,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: json,
            success: data => {
                if(data._codigo != 200) {
                    alert(data._message);
                } 
                else {
                    var user = data._users[0];
                    $("#BemVindoSuccess").html('Bem-vindo ' + user._nome);
                    $('#bemVindo').hide();
                    $('#BemVindoSuccess').show();
                    $('form').fadeOut(500);
                    $('.wrapper').addClass('form-success');
                    
                    
                    var dadosUsuario = [user._id, user._email, user._password,user._permission, user._token];
                    localStorage.setItem('dadosUsuario', dadosUsuario);
                    
                    localStorage.setItem('token', dadosUsuario[4]);
                    
                    setTimeout(function(){ (user._permission == 'C') ? window.location.href = 'Loja/indexLoja.html' : window.location.href = 'Backoffice/index.html';},2000);
                    
                    
                }   
            },
            error: result => {
                console.log(result.responseJSON)
                var data = result.responseJSON;
                if(data._codigo == 401){
                    alert(data._message);
                }
            },
        });  
    });



    $("#login-buttonCliente").click(function(event){
        event.preventDefault();
       


        var url = 'http://localhost:8080/Login/Cliente';
        var login = $('#username').val();
        var senha = $('#password').val();
    
        var json = JSON.stringify({
            _username: login,
            _password: senha,
        })
    
        $.ajax({
            url: url,
            type: 'POST',
            timeout: 20000,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: json,
            success: data => {
                if(data._codigo != 200) {
                    alert(data._message);
                } 
                else {
                    var user = data._users[0];
                    
                    var dadosUsuario = [user._id, user._email, user._password,user._permission, user._token,user._nome];
                    localStorage.setItem('dadosUsuario', dadosUsuario);
                    
                    localStorage.setItem('token', dadosUsuario[4]);
                    
                    setTimeout(function(){  window.location.href = 'indexLoja.html' },1000);
                    
                    
                }   
            },
            error: result => {
                console.log(result.responseJSON)
                var data = result.responseJSON;
                if(data._codigo == 401){
                    alert(data._message);
                }
            },
        });  
    });

});

function logout(){
    console.log('entrei logout')
    var url = 'http://localhost:8080/Login/logout';
    var dados = localStorage.getItem('dadosUsuario');
    dados = dados.split(',');

    var json = JSON.stringify({
        _id: dados[0],
        _login: dados[1],
        _password: dados[2],
        _permission: dados[3],
        _token: dados[4],
        _idCliente: dados[5]
    });

    $.ajax({
        url: url,
        type: 'POST',
        timeout: 20000,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: data => {
            if(data._codigo != 200) {
                alert(data._message);
            } 
            else {
                limparStorage();
                window.location.href = '../login.html';
            }   
        },
        error: result => {
            console.log(result)
        },
    });
}


function limparStorage(){
    localStorage.clear();
}
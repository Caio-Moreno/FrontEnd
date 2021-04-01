/*global $, document, window, setTimeout, navigator, console, location*/
$(document).ready(function () {

    'use strict';

    var usernameError = true,
        emailError    = true,
        passwordError = true,
        passConfirm   = true;

    // Detect browser for css purpose
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        $('.form form label').addClass('fontSwitch');
    }

    // Label effect
    $('input').focus(function () {

        $(this).siblings('label').addClass('active');
    });

    // Form validation
    $('input').blur(function () {

        
        // User Name
        if ($(this).hasClass('name')) {
            if ($(this).val().length === 0) {
                $(this).siblings('span.error').text('Por favor, escreva seu nome').fadeIn().parent('.form-group').addClass('hasError');
                usernameError = true;
            } else if ($(this).val().length > 1 && $(this).val().length < 3) {
                $(this).siblings('span.error').text('Digite pelo menos 3 caracteres').fadeIn().parent('.form-group').addClass('hasError');
                usernameError = true;
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                usernameError = false;
            }
        }
        // Email
        if ($(this).hasClass('email')) {
            if ($(this).val().length == '') {
                $(this).siblings('span.error').text('Por favor digite seu e-mail').fadeIn().parent('.form-group').addClass('hasError');
                emailError = true;
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                emailError = false;
            }
        }

        // PassWord
        if ($(this).hasClass('pass')) {
            if ($(this).val().length < 8) {
                $(this).siblings('span.error').text('Digite pelo menos 8 caracteres').fadeIn().parent('.form-group').addClass('hasError');
                passwordError = true;
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                passwordError = false;
            }
        }

        // PassWord confirmation
        if ($('.pass').val() !== $('.passConfirm').val()) {
            $('.passConfirm').siblings('.error').text('As senhas não coincidem').fadeIn().parent('.form-group').addClass('hasError');
            passConfirm = false;
        } else {
            $('.passConfirm').siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
            passConfirm = false;
        }

        // label effect
        if ($(this).val().length > 0) {
            $(this).siblings('label').addClass('active');
        } else {
            $(this).siblings('label').removeClass('active');
        }
    });


    // form switch
    $('a.switch').click(function (e) {
        $(this).toggleClass('active');
        e.preventDefault();

        if ($('a.switch').hasClass('active')) {
            $(this).parents('.form-peice').addClass('switched').siblings('.form-peice').removeClass('switched');
        } else {
            $(this).parents('.form-peice').removeClass('switched').siblings('.form-peice').addClass('switched');
        }
    });


    // Form submit
    $('form.signup-form').submit(function (event) {
        event.preventDefault();

        if (usernameError == true || emailError == true || passwordError == true || passConfirm == true) {
            //aqui caso de erro
            $('.name, .email, .pass, .passConfirm').blur();
        } else {
            //aqui caso de certo
            $('.signup, .login').addClass('switched');

            setTimeout(function () { $('.signup, .login').hide(); }, 700);
            setTimeout(function () { $('.brand').addClass('active'); }, 300);
            setTimeout(function () { $('.heading').addClass('active'); }, 600);
            setTimeout(function () { $('.success-msg p').addClass('active'); }, 900);
            setTimeout(function () { $('.success-msg a').addClass('active'); }, 1050);
            setTimeout(function () { $('.form').hide(); }, 700);
        }
    });

    // Reload page
    $('a.profile').on('click', function () {
        location.reload(true);
    });


});


function autenticarLogin(){

    var url = 'http://localhost:8080/Login';
    var login = $('#loginemail').val();
    var senha = $('#loginPassword').val();

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
                var dadosUsuario = [user._id, user._email, user._password,user._permission, user._token];
                localStorage.setItem('dadosUsuario', dadosUsuario);
                localStorage.setItem('token', dadosUsuario[4]);

                (user._permission == 'C') ? window.location.href = 'indexLoja.html' : window.location.href = 'index.html';
            }   
        },
        error: result => {
            console.log(result)
        },
    });

}

function criarLogin(){
    var url = 'http://localhost:8080/Users/criar';
    var name = $('#name').val();
    var username = $('#username').val();
    var phone = $('#phone').val();
    var password = $('#password').val();

    var json = JSON.stringify({
        _name: name,
        _email: username,
        _phone: phone,
        _permission: "C",
        _password: password,
    })

    alert(json);

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
            }else{
                var user = data._users[0];
                localStorage.setItem('loginTemp', user._login);
                localStorage.setItem('passTemp', password);

            }
        },
        error: result => {
            console.log(result)
        },
    });
}

function autenticarAfter(){

    var url = 'http://localhost:8080/Login';

    var login = localStorage.getItem('loginTemp');
    var senha = localStorage.getItem('passTemp');

    localStorage.removeItem('loginTemp');
    localStorage.removeItem('passTemp');
    //alert(json)
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
                var dadosUsuario = [user._id, user._email, user._password,user._permission, user._token];
                
                localStorage.setItem('dadosUsuario', dadosUsuario);
                localStorage.setItem('token', dadosUsuario[4]);
                 (user._permission == 'C') ? window.location.href = 'indexLoja.html' : window.location.href = 'index.html';          
            }   
        },
        error: result => {
            console.log(result)
        },
    });

}

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
                window.location.href = 'login.html';
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
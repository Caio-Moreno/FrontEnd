$(document).ready(function () {
    var label = document.getElementById('LoginName1');
    var label2 = document.getElementById('LoginName2');
    var dados = localStorage.getItem('dadosUsuario');
    label.innerHTML = dados;
    label2.innerHTML = dados;
   // $('#LoginName').html(dados);

   
});



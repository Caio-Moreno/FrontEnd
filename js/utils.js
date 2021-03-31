$(document).ready(function () {
    var label = document.getElementById('LoginName1');
    var label2 = document.getElementById('LoginName2');
    var dados = localStorage.getItem('dadosUsuario');
    console.log(dados);
    if(!(dados == null || dados == '' || dados == undefined)){
        dados = dados.split(',');
        console.log(dados[1]);
        label.innerHTML = dados[1];
        label2.innerHTML = dados[1];
    }
});



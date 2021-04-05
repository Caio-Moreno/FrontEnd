var inputData = document.getElementById('dataNascimento');

inputData.addEventListener('keydown', function (e) {
  var char = e.keyCode || e.which;
  var letra = String.fromCharCode(char).toLowerCase();
  if (ignorar.indexOf(letra) != -1) e.preventDefault();
});
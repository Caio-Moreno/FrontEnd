// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

var url = "http://localhost:8080/Dashboard/listaUsuario?tipo=status";
var token = localStorage.getItem('token');
    console.log(token)

$.ajax({
  url: url,
  type: 'GET',
  headers: {'TOKEN': token},
  timeout: 20000,
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: data => {
      var status = data._status;

      var meuArray = [parseInt(status._ativo), parseInt(status._inativo)];

      var ctx = document.getElementById("usuarioStatus");
      var myPieChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
            labels: ["Ativo", "Inativo"],
            datasets: [{
            data: meuArray,
            backgroundColor: ['#fad014', '#141104'],
            hoverBackgroundColor: ['#dbba27', '#2e2e2d'],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
      },
        options: {
        maintainAspectRatio: false,
        tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            caretPadding: 10,
        },
        legend: {
        display: false
        },
        cutoutPercentage: 80,
        },
      });
  },
  error: result => {
      alert(result.status + ' ' + result.statusText);
  }
});
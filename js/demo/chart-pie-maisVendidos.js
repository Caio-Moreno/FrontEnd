// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function gerar_cor_hexadecimal()
{
  return '#' + parseInt((Math.random() * 0xFFF))
    .toString(16)
    .padStart(3, '0');
}

var url = "http://localhost:8080/Dashboard/maisvendidos";
var token = localStorage.getItem('token');

$.ajax({
  
  url: url,
  type: 'GET',
  headers: {'TOKEN': token},
  timeout: 20000,
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: data => {
      var produto = data;
      var meuArray = [];
      var meuArrayValor = [];
      var minhaCores = [];
      var minhahoverCores = [];

      for(let i = 0; i < produto.length; i++){
          var dados = produto[i]
          meuArray.push(dados._produto);
          meuArrayValor.push(dados._quantidade);
          minhaCores.push(gerar_cor_hexadecimal());
          minhahoverCores.push(gerar_cor_hexadecimal());
      }

      var ctx = document.getElementById("myPieChartPlataforma");
      var myPieChartPlataforma = new Chart(ctx, {
            type: 'doughnut',
            data: {
            labels: meuArray,
            datasets: [{
            data: meuArrayValor,
            backgroundColor: minhaCores,
            hoverBackgroundColor: minhahoverCores,
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

// Pie Chart Example
/*
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Ativo", "Inativo"],
    datasets: [{
      data: [55, 15],
      backgroundColor: ['#4e73df', '#1cc88a'],
      hoverBackgroundColor: ['#2e59d9', '#17a673'],
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
*/
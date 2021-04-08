// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

var url = "http://localhost:8080/Dashboard?tipo=plataforma";
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
      var produto = data.prod;
      var meuArray = [parseInt(produto._ps4), parseInt(produto._ps5), parseInt(produto._pc), parseInt(produto._xbox), parseInt(produto._outros)];

      var ctx = document.getElementById("myPieChartPlataforma");
      var myPieChartPlataforma = new Chart(ctx, {
            type: 'doughnut',
            data: {
            labels: ["PS4", "PS5", "PC", "XBOX", "OUTROS"],
            datasets: [{
            data: meuArray,
            backgroundColor: ['#4e73df', '#ffff21', '#000000', '#ff2626','#2dfc12'],
            hoverBackgroundColor: ['#2e59d9', '#fcfcbd', '#363636','#ff7070', '#9cff8f'],
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
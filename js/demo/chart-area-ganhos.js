// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
 // alert(s.join(dec))
  return s.join(dec);
}

function buscaDados(){
  var dataIni = $('#dataIni').val();
  var dataFim = $('#dataFim').val();
  
  var url = "http://localhost:8080/Dashboard/listaGanhos?dataIni="+dataIni+"&dataFim="+dataFim;
  var token = localStorage.getItem('token');
  
    


  $.ajax({
  
    url: url,
    type: 'GET',
    headers: {'TOKEN': token},
    timeout: 20000,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: data => {
    
    var ganhos = data._ganhos;
    var arrayDatas = [];
    var arrayValores = [];


    for(let i = 0; i < ganhos.length; i++){
      var ganhoAtual = ganhos[i];

      arrayDatas.push(ganhoAtual._data);
      //arrayValores.push(Math.round(ganhoAtual._valor));
      arrayValores.push(parseFloat(ganhoAtual._valor));

      
    }
    


    var ctx = document.getElementById("ganhos");
    
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: arrayDatas,
        datasets: [{
          label: "Ganhos",
          lineTension: 0.3,
          backgroundColor: "rgba(78, 115, 223, 0.05)",
          borderColor: "rgba(78, 115, 223, 1)",
          pointRadius: 3,
          pointBackgroundColor: "rgba(78, 115, 223, 1)",
          pointBorderColor: "rgba(78, 115, 223, 1)",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
          pointHoverBorderColor: "rgba(78, 115, 223, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          data: arrayValores,
        }],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }
        },
        scales: {
          xAxes: [{
            time: {
              unit: 'date'
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              maxTicksLimit: 7
            }
          }],
          yAxes: [{
            ticks: {
              maxTicksLimit: 5,
              padding: 10,
              callback: function(value, index, values) {
                //alert(value);
                return '$' + number_format(value);
              }
            },
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2]
            }
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          intersect: false,
          mode: 'index',
          caretPadding: 10,
          callbacks: {
            label: function(tooltipItem, chart) {
              var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
              return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
            }
          }
        }
      }
    });

   

  },
  error: result => {
      alert(result.status + ' ' + result.statusText);
  }
  
  });


}

function updateConfigAsNewObject(chart) {
  chart.options = {
      responsive: true,
      plugins: {
          title: {
              display: true,
              text: 'Chart.js'
          }
      },
      scales: {
          x: {
              display: true
          },
          y: {
              display: true
          }
      }
  };
  chart.update();
}


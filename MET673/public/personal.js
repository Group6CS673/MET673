var socket = io.connect('/');

var lookUpTable = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

$(document).ready(function() {
  var d = new Date();
  var start = new Date(d.getTime() - 7*24*3600000);
  socket.emit('get data', start);

  $('#updateData').click(function(){
    $('#myFile').submit();
  });
});

google.load('visualization', '1', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
// google.setOnLoadCallback(drawSleepChart);

function drawSleepChart(arr) {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Days');
  data.addColumn('number', 'Hours');
  for (var i = 0; i < arr.length; i++) {
    var date = new Date(arr[i].timestamp);
    data.addRows([
      [lookUpTable[date.getDay() - 1], arr[i].sleep_hours]
    ]);
  }
  // Set chart options
  var options = {'width':800,
                 'height':600};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.BarChart(document.getElementById('sleep_hours'));
  chart.draw(data, options);
}

socket.on('chart data', function(arr) {
  console.log("here");
  drawSleepChart(arr);
});

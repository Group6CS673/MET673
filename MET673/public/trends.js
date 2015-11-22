var socket = io.connect('/');

var lookUpTable = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var trendCapture = [0, 0, 0, 0, 0, 0, 0];
$(document).ready(function() {
  var d = new Date();
  var start = new Date(d.getTime() - 7*24*3600000);
  socket.emit('get trend data', {startDate  : start});

});

socket.on('chart trend data', function(arr) {
  console.log("here");
  drawChart(arr);
});

google.load('visualization', '1', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
// google.setOnLoadCallback(drawSleepChart);
function drawChart(arr) {
  drawSleepChart(arr);
  drawStepsChart(arr);
  drawCalorieChart(arr);
}

function drawSleepChart(arr) {
	trendCapture = [0, 0, 0, 0, 0, 0, 0];
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Days');
  data.addColumn('number', 'Hours');
  
  for (var i = 0; i < arr.length; i++) {
    var date = new Date(arr[i].timestamp);
	trendCapture[date.getDay()] += arr[i].sleep_hours;
  }

  for(var j = 0; j < lookUpTable.length; j++)
  {
	  data.addRows([
      [lookUpTable[j], trendCapture[j]]
    ]);
  }

  // Set chart options
  var options = {'width':800,
                 'height':600};
  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.BarChart(document.getElementById('sleep_hours'));
  chart.draw(data, options);
}

function drawStepsChart(arr) {
	trendCapture = [0, 0, 0, 0, 0, 0, 0];
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Days');
  data.addColumn('number', 'Steps');
  for (var i = 0; i < arr.length; i++) {
    var date = new Date(arr[i].timestamp);
	trendCapture[date.getDay()] += arr[i].steps;
  }

  for(var j = 0; j < lookUpTable.length; j++)
  {
	  data.addRows([
      [lookUpTable[j], trendCapture[j]]
    ]);
  }
  // Set chart options
  var options = {'width':800,
                 'height':600};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.ColumnChart(document.getElementById('running_steps'));
  chart.draw(data, options);

}

function drawCalorieChart(arr) {
	trendCapture = [0, 0, 0, 0, 0, 0, 0];
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Days');
  data.addColumn('number', 'Calories');
  for (var i = 0; i < arr.length; i++) {
    var date = new Date(arr[i].timestamp);
	trendCapture[date.getDay()] += arr[i].calorie;
  }

  for(var j = 0; j < lookUpTable.length; j++)
  {
	  data.addRows([
      [lookUpTable[j], trendCapture[j]]
    ]);
  }
  // Set chart options
  var options = {'width':800,
                 'height':600};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.LineChart(document.getElementById('calorie'));
  chart.draw(data, options);

}


google.load('visualization', '1', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);


// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

// Create the data table.
var data = new google.visualization.DataTable();
data.addColumn('string', 'Days');
data.addColumn('number', 'Hours');
data.addRows([
  ['Monday', 9.2],
  ['Tuesday', 8.5],
  ['Wednesday', 8.8],
  ['Thursday', 9],
  ['Friday', 9.1]
]);

// Set chart options
var options = {'width':800,
               'height':600};

// Instantiate and draw our chart, passing in some options.
var chart = new google.visualization.BarChart(document.getElementById('sleep_hours'));
chart.draw(data, options);

var data1 = new google.visualization.DataTable();
data1.addColumn('string', 'Days');
data1.addColumn('number', 'Steps');
data1.addRows([
  ['Monday', 300],
  ['Tuesday', 200],
  ['Wednesday', 300],
  ['Thursday', 400],
  ['Friday', 300]
]);

// Set chart options
var options = {'width':800,
               'height':600};

// Instantiate and draw our chart, passing in some options.
var chart = new google.visualization.ColumnChart(document.getElementById('running_steps'));
chart.draw(data1, options);

var data2 = new google.visualization.DataTable();
data2.addColumn('string', 'Days');
data2.addColumn('number', 'Calorie');
data2.addRows([
  ['Monday', 3000],
  ['Tuesday', 2000],
  ['Wednesday', 3000],
  ['Thursday', 4000],
  ['Friday', 3000]
]);

// Set chart options
var options = {'width':800,
               'height':600};

// Instantiate and draw our chart, passing in some options.
var chart = new google.visualization.LineChart(document.getElementById('calorie'));
chart.draw(data2, options);
}

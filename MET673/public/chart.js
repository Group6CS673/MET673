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
data.addColumn('number', 'Steps');
data.addRows([
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
var chart = new google.visualization.ColumnChart(document.getElementById('sleep_hours'));
chart.draw(data, options);
}

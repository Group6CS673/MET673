var socket = io.connect('/');

var lookUpTable = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

$(document).ready(function() {
  var d = new Date();
  var start = new Date(d.getTime() - 7*24*3600000);
  var email = $('#emailAddress').val();
  socket.emit('get data', {startDate  : start,
                            email     : email});

  $('#updateData').click(function(){
    $('#myFile').submit();
  });
});

socket.on('chart data', function(arr) {
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
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Days');
  data.addColumn('number', 'Hours');
  for (var i = 0; i < arr.length; i++) {
    var date = new Date(arr[i].timestamp);
    data.addRows([
      [lookUpTable[date.getDay()], arr[i].sleep_hours]
    ]);
  }
  // Set chart options
  var options = {'width':800,
                 'height':600};
  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.BarChart(document.getElementById('sleep_hours'));
  chart.draw(data, options);
  
  getSleepTips(arr);
}

function drawStepsChart(arr) {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Days');
  data.addColumn('number', 'Steps');
  for (var i = 0; i < arr.length; i++) {
    var date = new Date(arr[i].timestamp);
    data.addRows([
      [lookUpTable[date.getDay()], arr[i].steps]
    ]);
  }
  // Set chart options
  var options = {'width':800,
                 'height':600};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.ColumnChart(document.getElementById('running_steps'));
  chart.draw(data, options);
  
  getStepTips(arr);
}

function drawCalorieChart(arr) {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Days');
  data.addColumn('number', 'Calorie');
  for (var i = 0; i < arr.length; i++) {
    var date = new Date(arr[i].timestamp);
    data.addRows([
      [lookUpTable[date.getDay()], arr[i].calorie]
    ]);
  }
  // Set chart options
  var options = {'width':800,
                 'height':600};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.LineChart(document.getElementById('calorie'));
  chart.draw(data, options);
  
  getNutritionTips(arr);
}

function getSleepTips(arr) {
	console.log("enter sleep");
	var totalpoints = 0;
	var totalhours = 0;
	var min = 0;
	var max = 0;
	var avg = 0;
	for (var i = 0; i < arr.length; i++) {
		if(i == 0)
		{
			min = arr[i].sleep_hours;
			max = arr[i].sleep_hours;
		}
    totalhours += arr[i].sleep_hours;
	totalpoints = totalpoints + 1;
	if(min > arr[i].sleep_hours)
	{
		min = arr[i].sleep_hours;
	}
	if(max < arr[i].sleep_hours)
	{
		max = arr[i].sleep_hours;
	}
	
	}//end for

	if(totalhours !== 0)
	{
		avg = totalhours / arr.length;
	}
	
	if(totalpoints == 0)
	{
		document.getElementById('sleepTips').innerHTML += 'You don\'t have any sleep entries.  Try inputing the amount of sleep you got last night!';
	}
	else
	{
		document.getElementById('sleepTips').innerHTML += '<li>You have ' + totalpoints + ' sleep data entries</li>';
		
		var avgmsg = "Your average this week is " + avg + " hours."
		if(avg > 7)
		{
			avgmsg += "  That is great - keep it up!"
		}
		else
		{
			avgmsg += "  Try to get a little more sleep.  8 hours per night is recommended."
		}
		document.getElementById('sleepTips').innerHTML += '<li>' + avgmsg + '</li>';
		
		minmsg = "Your worst night had " + min + " hours of sleep.";
		document.getElementById('sleepTips').innerHTML += '<li>' + minmsg + '</li>';
		maxmsg = "Your best night had " + max + " hours of sleep.";
		document.getElementById('sleepTips').innerHTML += '<li>' + maxmsg + '</li>';
		
	}
	
}

function getNutritionTips(arr) {
	var totalpoints = 0;
	var totalCalories = 0;
	var min = 0;
	var max = 0;
	var avg = 0;
	for (var i = 0; i < arr.length; i++) {
		if(i == 0)
		{
			min = arr[i].calorie;
			max = arr[i].calorie;
		}
    totalCalories += arr[i].calorie;
	totalpoints = totalpoints + 1;
	if(min > arr[i].calorie)
	{
		min = arr[i].calorie;
	}
	if(max < arr[i].calorie)
	{
		max = arr[i].calorie;
	}
	
	}//end for
	if(totalCalories !== 0)
	{
		avg = totalCalories / arr.length;
	}
	if(totalpoints == 0)
	{
		document.getElementById('CalorieTips').innerHTML += 'You don\'t have any calorie entries.  Try inputing the amount of calories consumed today.';
	}
	else
	{
		document.getElementById('CalorieTips').innerHTML += '<li>You have ' + totalpoints + ' calorie entries</li>';
		var avgmsg = "Your average this week is " + avg + " calories."
		if((avg < 2000) && (avg > 1500))
		{
			avgmsg += "  That is great - keep it up!"
		}
		else
		{
			avgmsg += "  That is outside of our reccomended ranges.  We have some great nutrition articles - check them out on our Nutrition page."
		}
		document.getElementById('CalorieTips').innerHTML += '<li>' + avgmsg + '</li>';

	}
	
}

function getStepTips(arr){
	var totalpoints = 0;
	var totalSteps = 0;
	var min = 0;
	var max = 0;
	var avg = 0;
	for (var i = 0; i < arr.length; i++) {
		if(i == 0)
		{
			min = arr[i].steps;
			max = arr[i].steps;
		}
    totalSteps += arr[i].steps;
	totalpoints = totalpoints + 1;
	if(min > arr[i].steps)
	{
		min = arr[i].steps;
	}
	if(max < arr[i].steps)
	{
		max = arr[i].steps;
	}
	
	}//end for
	if(totalSteps !== 0)
	{
		avg = totalSteps / arr.length;
	}
	if(totalpoints == 0)
	{
		document.getElementById('ExerciseTips').innerHTML += 'You don\'t have any excercise entries.  Try inputing the amount of steps travelled today.';
	}
	else
	{
		document.getElementById('ExerciseTips').innerHTML += '<li>You have ' + totalpoints + ' excercise entries</li>';
		var avgmsg = "Your average this week is " + avg + " steps.";
		if(avg > 12000)
		{
			avgmsg += "  Congratulations!  A daily average of 12000 steps is recommended.";
		}
		else
		{
			avgmsg += "  Keep trying - attempt to increase your step count each day - soon you'll hit your goal!";
		}
		document.getElementById('ExerciseTips').innerHTML += '<li>' + avgmsg + '</li>';
		
		minmsg = "Your worst day had " + min + " steps.";
		document.getElementById('ExerciseTips').innerHTML += '<li>' + minmsg + '</li>';
		maxmsg = "Your best day had " + max + " steps.";
		document.getElementById('ExerciseTips').innerHTML += '<li>' + maxmsg + '</li>';

	}
}
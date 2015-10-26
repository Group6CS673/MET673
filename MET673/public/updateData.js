var socket = io.connect('/');

//cancel and return to the visulization page
$(document).ready(function() {
  $('#cancel').click(function(){
    $('#personal_data').submit();
  });

  //submit the new info of user
  $('#submit').click(function(){
    var personal_data = {
      email: $('#email').val(),
      steps: $('#steps').val(),
      calorie: $('#calorie').val(),
      sleep_hours: $('#sleep_hours').val(),
      nutrition: $('#nutrition').val(),
      heart_rates: $('#heart_rates').val()
    }
    socket.emit('personal_data',personal_data);
    $('#personal_data').submit();
  });
});

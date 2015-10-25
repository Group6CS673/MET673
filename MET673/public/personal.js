var socket = io.connect('/');

$(document).ready(function() {
  $('#updateData').click(function(){
    $('#myFile').submit();
  });
});

var socket = io.connect('/');

$(document).ready(function() {
  $('#signup-btn').click(function() {
    if ($('#inputUserName').val().length == 0) {
      alert('username cannot be empty');
    } else if ($('#inputEmail').val().length == 0) {
      alert('email cannot be empty');
    } else {
      socket.emit('checkUserByEmail', $('#inputEmail').val());
    }
  });
});

socket.on('email avaliable', function() {
  if ($('#inputPassword').val().length == 0) {
    alert('password cannot be empty');
  } else if ($('#inputPassword').val().length < 8) {
    alert('password should be at least 8 digits')
  } else if ($('#inputPassword').val() != $('#confirmPassword').val()) {
    alert('Password are not the same.');
  } else {
    var user_info = {
      username: $('#inputUserName').val(),
      email: $('#inputEmail').val(),
      password: CryptoJS.MD5($('#inputPassword').val()).toString()
    }
    socket.emit('createNewUser', user_info);
    $('#signup').submit();
  }
});
socket.on('email not avaliable', function(msg){
  alert(msg);
})

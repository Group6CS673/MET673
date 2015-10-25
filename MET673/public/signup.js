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
  } else if ($('#inputPassword').val() != $('#confirmPassword').val()) {
    alert('Password are not the same.');
  } else {
    var user_info = {
      username: $('#inputUserName').val(),
      email: $('#inputEmail').val(),
      password: $('#inputPassword').val()
    }
    socket.emit('createNewUser', user_info);
    window.location.href='/personal';
  }
});
socket.on('email not avaliable', function(){
  alert('email is already exist');
})

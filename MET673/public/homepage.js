var socket = io.connect('/');
// socket.emit('load finish');
$(document).ready(function() {
  $('#signin').click(function(){
    socket.emit('check user', {
      email: $('#email').val(),
      password: $('#password').val()
    })
  });
});

socket.on('user verified', function() {
  // window.location.href='/personal';
  $('#login').submit();
});

socket.on('user verification failed', function(){
  alert('user does not exist or password is wrong');
});

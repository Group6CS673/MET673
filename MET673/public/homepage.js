var socket = io.connect('/');
var connected = 0;
// socket.emit('load finish');
$(document).ready(function() {
  $('#signin').click(function(){
    socket.emit('check user', {
      email: $('#email').val(),
      password: CryptoJS.MD5($('#password').val()).toString()
    })
  });
});

socket.on('user verified', function() {
  // window.location.href='/personal';
  connected = 1;
  $('#login').submit();
});

socket.on('user verification failed', function(){
  alert('user does not exist or password is wrong');
});


 socket.emit('isConnected', function(){
 });
 
 socket.on('user connected', function(){
	 //alert('user connected');
	 connected = 1;
	 //document.getElementById('navbardynamic').innerHTML += '<H3>HELLO</h3>';
	 /*document.getElementById('navbarRight').innerHTML += '<form id="myFile" class="navbar-form navbar-right" method="post" action="/updateData">';
	 document.getElementById('navbarRight').innerHTML += '<label style="color:white">Welcome, </label>';
	 document.getElementById('navbarRight').innerHTML += '<a style="color: white" id="updateData" ><%=user_name%></a>';
	 document.getElementById('navbarRight').innerHTML += '<input type="hidden" id="emailAddress" value="<%=user_email%>" name="email"></input>';
	 document.getElementById('navbarRight').innerHTML += '<a class="btn btn-success" href="/">Sign out</a>';
	 document.getElementById('navbarRight').innerHTML += '</form>';*/
 });
 
  socket.on('user not connected', function(){
	 //alert('user not connected');
	 connected = 0;
	 //document.getElementById('navbardynamic').innerHTML += '<H3>HELLO2</h3>';
		 /*
	 document.getElementById('navbarRight').innerHTML += '<form id="myFile" class="navbar-form navbar-right" method="post" action="/updateData">';
	 document.getElementById('navbarRight').innerHTML += '<label style="color:white">Welcome, </label>';
	 document.getElementById('navbarRight').innerHTML += '<a style="color: white" id="updateData" ><%=user_name%></a>';
	 document.getElementById('navbarRight').innerHTML += '<input type="hidden" id="emailAddress" value="<%=user_email%>" name="email"></input>';
	 document.getElementById('navbarRight').innerHTML += '<a class="btn btn-success" href="/">Sign out</a>';
	 document.getElementById('navbarRight').innerHTML += '</form>'; */
 });

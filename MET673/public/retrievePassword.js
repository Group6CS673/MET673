var socket = io.connect('/');


function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


//cancel and return to the home page
$(document).ready(function() {
	
  $('#cancelpwd').click(function(){
	window.location.href="/";
    //$('#personal_data').submit();
  });//end cancelpwd

  
  
  //capture the email address, send a new password, update pwd in database
  $('#submitpwd').click(function(){
	//socket.emit('checkUserByEmail', $('#emailpwd').val());
	var newpwd = makeid();
	//alert(newpwd);
	var newEncryptedPwd = CryptoJS.MD5(newpwd).toString();
	//alert(newEncryptedPwd);
    //$('#personal_data').submit();
	  socket.emit('changePWD', {
      email: $('#emailpwd').val(),
      plaintextpassword: newpwd, 
	  encryptedpwd: newEncryptedPwd,
    })
  });//end submitpwd

});

socket.on('email bad', function(msg){
  alert(msg);
})

socket.on('email in db', function(msg){
  alert(msg);
})

socket.on('email is not in the database', function(msg){
  alert(msg);
})
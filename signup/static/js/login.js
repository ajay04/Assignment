$(document).ready(function(){


  var check_username=/^[a-zA-Z]{1}/;
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

  $("#username").focus();

  $("#registration_b").click(function(){

    $("#Registration").modal();
    $("#registration").prop('disabled',false);
  });

  $("#registration").unload(function(){
    alert("hi");
    $("#registration").prop('disabled',true);
  });


  $("#close").click(function(){
    $("#error").html("");
    $("#password_error").html("");
    $("#confirm_password_error").html("");
    $("#email_error").html("");
    $("#username_error").html("");
  });

  // email validation
  $("#email").focusout(function(){
    $("#email_error").html("");
    var email=$('#email').val();
    if( !emailReg.test(email) ){
      $("#email_error").html("Invalid email id.");
    }
  });

  // username validation
  $("#username").focusout(function(){
    var username=$('#username').val();

    $("#username_error").html("");
    if( !check_username.test(username))  {
      $("#username_error").html("Invalid username.");

    }
  });

  // password
  $("#password").focusout(function(){
    $("#password_error").html("");
    var password=$('#password').val();
    if($("#password").val().length < 5){
      $("#password_error").html("Password length should be more than 4 characters");
    }
  });



  $(document).ajaxStart(function(){
    $("#wait").css("display", "block");

  });

  $(document).ajaxComplete(function(){
    $("#wait").css("display", "none");

  });



  $("#register").click(function(){

    $("#error").html("");
    $("#password_error").html("");
    $("#confirm_password_error").html("");
    $("#email_error").html("");
    $("#username_error").html("");


    var username=$('#username').val();
    var email=$('#email').val();
    var password=$('#password').val();
    var confirm_password=$('#confirm_password').val();

    // Checking for blank fields.
    if( username  == '' || password == '' || confirm_password == '' || email == '' ){
      $("#error").html("All fields are mandatory!");
      $("#username").focus();
    } else if(!check_username.test(username)){
      $("#username_error").html("Invalid username.");
      $("#username").focus();
    } else if( !emailReg.test(email) ){
      $("#email_error").html("Invalid email id.");
      $("#email").focus();
    } else if($("#password").val().length < 5){
      $("#password_error").html("Password length should be more than 4 characters");
      $("#password").focus();
    } else if(password!=confirm_password){
      $("#confirm_password_error").html("Enter confirm password.");
      $("#confirm_password").focus();
    } else {
      $.ajax({
	type: "POST",
	url:"register",
	data: $('#register_form').serialize(),
	success: function(data)
	{

	  sweetAlert("Congrats!", "registration successful!", "success");
	  $(".confirm").click(function(){
	    window.location = '';
	  });

	  //sweetAlert({   title: "Auto close alert!",   text: "Verify your email.",   timer: 3000 });
	},
	error: function(data){
	  if(data.responseText=="usernameemail")
	  {
	    $("#error").html("Username already exists and  email address already exists.");
	  } else if(data.responseText=="email"){
	    $("#email_error").html("Email address already exists.");
	  } else {
	    $("#username_error").html("Username already exists.");
	  }
	}
      });
    }
  });


  $("#login_b").click(function(){
    $("#myModal").modal();
    $("#login_b").prop('disabled',false);
  });

  $("#login_b").unload(function(){
    $("#login_b").prop('disabled',true);
  });

  //login ajax
    $("#login").click(function(){

    if( $("#u_name").val() =='' || $("#login_password").val() ==''){
      $('input[id="u_name"],input[id="login_password"]').css("border","2px solid red");
      $("#error_login").html("Please fill all the fields!");
    } else {
      $.ajax({
	type: "POST",
	url:"/",
	data: $('#login_form').serialize(),
	success: function(data)
	  {

	  window.location = 'contact';
	},
	error: function(data){
	  $("#error_login").html(data.responseText);
	}
      });
    }
  });
});

$(function() {

	$('#login-form-link').hide();

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
		$('#login-form-link').fadeOut(100);

		
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$('#login-submit').show();


        $(this).addClass('active');

        $('#register-form-link').delay(100).fadeIn(100);

	});
	$('#register-form-link').click(function(e) {
		$('#login-submit').hide();
		$("#register-form").delay(100).fadeIn(100);
		$('#register-form-link').fadeOut(100);

		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		

		$(this).addClass('active');

        $('#login-form-link').delay(100).fadeIn(100);
        
	});

});

$(function(){
	$('.messageError').delay(4000).fadeOut();

});

$(document).ready(function () {
	if (isLoggedInUser()) {
		window.location.replace	('listing.html');		
	}

    $('form#registration').on('submit', function () {
        if (validateRegistration()) {
        	submitRegistration();
        }
		return false;    
	});

	// $('#profileImage').on('change', function (evt) {
	// 	var fileInfo = evt.target.files[0];

	// 	if (fileInfo.size > 524288 || fileInfo.type.split('/')[0] !== 'image') {
	// 		this.value = this.defaultValue;
	// 		$("#preview").attr('src', '');	
	// 		reader = new FileReader();
	// 		alert('Please upload an image file of less than 512kB size.');
	// 	}
	// 	else {
	// 		reader = new FileReader();
	// 		reader.onload = function() {
	// 			var dataUrl = reader.result;
	// 			$("#preview").attr('src', dataUrl);				
	// 		}
	// 		reader.readAsDataURL(fileInfo);
	// 	}
	// }); 
});



function validateRegistration() {
	var validFlag = true;

	//also check if email id alreadt exist
	var strEmail = $('#email').val()
	var users = window.localStorage.getItem('users');
	if (users != null) {
		users = JSON.parse(users);
		if (typeof users[strEmail] !== 'undefined') {
			validFlag = false;
			alert('Email Id already registered.');
		}
	}


	if (strEmail === '') {
		validFlag = false;
	}
	else {
		var regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!regExp.test($('#email').val().toLowerCase())) {
			validFlag = false;
		}
	}

	if ($('#password').val() === '' || $('#password').val() !== $('#confirmPassword').val()) {
		validFlag = false;
	}

	if ($('#firstName').val() === '') {
		validFlag = false;
	}

	return validFlag;
}

function submitRegistration () {
	// fetch users object from local storage 
	// if doesnot exist create one
	// get the max key exist & increament it by 1
	// push the latest object to the users  with key  as the increamented key
	// replace the existing object with the modifieduser object
	var row = {
		email : $("#email").val(),
		password : $("#password").val(),
		firstName : $("#firstName").val(),
		lastName : $("#lastName").val(),
		gender : $("input[name='gender']:checked").val(),
		address : $("#address").val(),
		fileElement : $("#profileImage"),
		profileImg : (typeof reader !== 'undefined') ? reader.result : null,
	};

	var users = window.localStorage.getItem('users');
	if (users == null) {
		users = new Object();
	}
	else {
		users = JSON.parse(users);
	}

	users[row.email] = row;
	window.localStorage.setItem('users', JSON.stringify(users));
	alert('Resgistration successfull');
	window.location.replace	('login.html');
}
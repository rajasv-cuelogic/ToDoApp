$(document).ready(function () {
    if ($('#profileImage').length > 0) {
        $('#profileImage').on('change', function (evt) {
            var fileInfo = evt.target.files[0];

            if (fileInfo.size > 524288 || fileInfo.type.split('/')[0] !== 'image') {
                this.value = this.defaultValue;
                $("#preview").attr('src', '');  
                reader = new FileReader();
                alert('Please upload an image file of less than 512kB size.');
            }
            else {
                reader = new FileReader();
                reader.onload = function() {
                    var dataUrl = reader.result;
                    $("#preview").attr('src', dataUrl);             
                }
                reader.readAsDataURL(fileInfo);
            }
        }); 
    }
});

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name+'=; Path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';  
}

function getUserIdentity() {
    var userIdentity = getCookie('userIdentity');
    if (userIdentity != null) {
        return JSON.parse(userIdentity);
    }
    else {
        return null;
    }
}

function isLoggedInUser() {
    var userIdentity = getCookie('userIdentity');
    if (userIdentity == null) {
        return false;
    }
    else {
        return true;
    }
}

$(function(){
    if ($("#header").length > 0) {
        $("#header").load("header.html", function() {
            var userIdentity = getUserIdentity();
            if (userIdentity) {
                $('#spnUserName').html(userIdentity.firstName);
            }
        }); 
    }
});

function logout() {
    eraseCookie('userIdentity');
    window.location.replace('login.html');
}

$('#profileImage').on('change', function (evt) {
    var fileInfo = evt.target.files[0];

    if (fileInfo.size > 524288 || fileInfo.type.split('/')[0] !== 'image') {
        this.value = this.defaultValue;
        $("#preview").attr('src', '');  
        reader = new FileReader();
        alert('Please upload an image file of less than 512kB size.');
    }
    else {
        reader = new FileReader();
        reader.onload = function() {
            var dataUrl = reader.result;
            $("#preview").attr('src', dataUrl);             
        }
        reader.readAsDataURL(fileInfo);
    }
}); 
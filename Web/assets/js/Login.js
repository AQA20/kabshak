function SignupByEmail() {
    document.getElementById('lblLoginError').innerText = "";
    document.getElementById("divLoginError").classList.add('d-none');
    document.getElementById("divLoginError").classList.remove('d-flex');

    document.getElementById('lblSuccessError').innerText = "";
    document.getElementById("divSuccessError").classList.add('d-none');
    document.getElementById("divSuccessError").classList.remove('d-flex');

    var val = true;

    var email = document.getElementById('up_email_1');
    var password = document.getElementById('up_password_1');
    var agree = document.getElementById('agree');

    if (email.value.trim() === "") {
        val = false;
        email.style.background = "#fff9b3";
    }
    else {
        if (!ValidateEmail(email.value.trim())) {
            val = false;
            email.style.background = "#fff9b3";
            document.getElementById('lblLoginError').innerText = IsArabic ? "صيغة بريد إلكتروني غير صحيحة!" : "Incorrect email format!";
            document.getElementById("divLoginError").classList.add('d-flex');
            document.getElementById("divLoginError").classList.remove('d-none');
        }
        else {
            email.style.background = "#ffffff";
        }
    }

    if (password.value.trim() === "") {
        val = false;
        password.style.background = "#fff9b3";
    }
    else {
        if (val && !ValidatePassword(password.value.trim())) {
            val = false;
            password.style.background = "#fff9b3";
            document.getElementById('lblLoginError').innerText = IsArabic ? "يجب ألا تقل كلمة المرور عن 8 أحرف!" : "Password length should not be less than 8 characters!";
            document.getElementById("divLoginError").classList.add('d-flex');
            document.getElementById("divLoginError").classList.remove('d-none');
        }
        else {
            password.style.background = "#ffffff";
        }
    }

    if (val) {
        if (!agree.checked) {
            val = false;
            document.getElementById('lblLoginError').innerText = IsArabic ? "لم تقم بالنقر فوق المربع للموافقة على سياسة الخصوصية الخاصة بنا!" : "You did not click the box to agree to our Privacy Policy!";
            document.getElementById("divLoginError").classList.add('d-flex');
            document.getElementById("divLoginError").classList.remove('d-none');
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');
        var fdata = new FormData();
        fdata.append('email', email.value.trim());
        fdata.append('password', password.value.trim());
        fdata.append('auth_token', "");  $.ajax({
            cache: false,
            data: fdata,
            url: '/api/users.asmx/sign_up_by_email',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.trim() !== "") {
                    document.getElementById('lblLoginError').innerText = data;

                    document.getElementById("divLoginError").classList.add('d-flex');
                    document.getElementById("divLoginError").classList.remove('d-none');
                    document.getElementById("divloader").classList.add('d-none');
                    document.getElementById("divloader").classList.remove('d-flex');
                }
                else {
                    document.getElementById("divloader").classList.add('d-flex');
                    document.getElementById("divloader").classList.remove('d-none');
                    window.location.reload();
                }
            }
        });
    }
}

function LoginByEmail() {
    document.getElementById('lblLoginError').innerText = "";
    document.getElementById("divLoginError").classList.add('d-none');
    document.getElementById("divLoginError").classList.remove('d-flex');

    document.getElementById('lblSuccessError').innerText = "";
    document.getElementById("divSuccessError").classList.add('d-none');
    document.getElementById("divSuccessError").classList.remove('d-flex');

    var val = true;

    var email = document.getElementById('log_email_1');
    var password = document.getElementById('log_password_1');
    var remember = document.getElementById('remember');

    if (email.value.trim() === "") {
        val = false;
        email.style.background = "#fff9b3";
    }
    else {
        if (!ValidateEmail(email.value.trim())) {
            val = false;
            email.style.background = "#fff9b3";
            document.getElementById('lblLoginError').innerText = IsArabic ? "صيغة بريد إلكتروني غير صحيحة!" : "Incorrect email format!";
            document.getElementById("divLoginError").classList.add('d-flex');
            document.getElementById("divLoginError").classList.remove('d-none');
        }
        else {
            email.style.background = "#ffffff";
        }
    }

    if (password.value.trim() === "") {
        val = false;
        password.style.background = "#fff9b3";
    }
    else {
        password.style.background = "#ffffff";
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');
        var fdata = new FormData();
        fdata.append('email', email.value.trim());
        fdata.append('password', password.value.trim());
        fdata.append('remember', remember.checked);
        fdata.append('auth_token', "");  $.ajax({
            cache: false,
            data: fdata,
            url: '/api/users.asmx/log_in_by_email',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.trim() !== "") {
                    document.getElementById('lblLoginError').innerText = data;

                    document.getElementById("divLoginError").classList.add('d-flex');
                    document.getElementById("divLoginError").classList.remove('d-none');
                    document.getElementById("divloader").classList.add('d-none');
                    document.getElementById("divloader").classList.remove('d-flex');
                }
                else {
                    document.getElementById("divloader").classList.add('d-flex');
                    document.getElementById("divloader").classList.remove('d-none');
                    window.location.reload();
                }
            }
        });
    }
}

function Reset_Your_Password() {
    document.getElementById('lblLoginError').innerText = "";
    document.getElementById("divLoginError").classList.add('d-none');
    document.getElementById("divLoginError").classList.remove('d-flex');
    document.getElementById('lblSuccessError').innerText = "";
    document.getElementById("divSuccessError").classList.add('d-none');
    document.getElementById("divSuccessError").classList.remove('d-flex');

    var val = true;

    var email = document.getElementById('log_email_1');
    var password = document.getElementById('log_password_1');
    password.style.background = "#ffffff";

    if (email.value.trim() === "") {
        val = false;
        email.style.background = "#fff9b3";
    }
    else {
        if (!ValidateEmail(email.value.trim())) {
            val = false;
            email.style.background = "#fff9b3";
            document.getElementById('lblLoginError').innerText = IsArabic ? "صيغة بريد إلكتروني غير صحيحة!" : "Incorrect email format!";
            document.getElementById("divLoginError").classList.add('d-flex');
            document.getElementById("divLoginError").classList.remove('d-none');
        }
        else {
            email.style.background = "#ffffff";
        }
    }

    if (val) {
        var fdata = new FormData();
        fdata.append('email', email.value.trim());
        fdata.append('auth_token', "");  $.ajax({
            cache: false,
            data: fdata,
            url: '/api/users.asmx/reset_your_password',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.trim() !== "") {
                    document.getElementById('lblLoginError').innerText = data;
                    document.getElementById("divLoginError").classList.add('d-flex');
                    document.getElementById("divLoginError").classList.remove('d-none');
                }
                else {
                    document.getElementById("divSuccessError").classList.add('d-flex');
                    document.getElementById("divSuccessError").classList.remove('d-none');
                    document.getElementById('lblSuccessError').innerText = IsArabic ? "تم إعادة تعيين كلمة المرور الخاصة بك وتم إرسال بريد إلكتروني لك بنجاح." :  "Your password has been reset and an email has been sent to you successfully.";
                }
            }
        });
    }
}

function ValidatePassword(myInput) {
    if (myInput.length >= 8) {
        return (true)
    }
    return (false)
}


window.fbAsyncInit = function () {
    FB.init({
        appId: '513424114160709',
        cookie: true,
        xfbml: true,
        version: 'v3.2'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function fbLogin() {
    FB.login(function (response) {
        if (response.authResponse) {
            getFbUserData();
        }
    }, { scope: 'email' });
}

function getFbUserData() {
    FB.api('/me', { locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture' },
        function (response) {
            document.getElementById("divloader").classList.add('d-flex');
            document.getElementById("divloader").classList.remove('d-none');
            var fdata = new FormData();
            fdata.append('id', response.id);
            fdata.append('first_name', response.first_name);
            fdata.append('last_name', response.last_name);
            fdata.append('email', response.email);
            fdata.append('auth_token', "");  $.ajax({
                cache: false,
                data: fdata,
                url: '/api/users.asmx/fb_login',
                type: 'post',
                processData: false,
                contentType: false,
                success: function (data) {
                    fbLogout();
                    window.location.reload();
                }
            });
        });
}

function fbLogout() {
    FB.logout(function () {
        console.log('User signed out.');
    });
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var fdata = new FormData();
    fdata.append('id', profile.getId());
    fdata.append('email', profile.getEmail());
    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/users.asmx/gmail_login',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            signOut();
            window.location.reload();
        }
    });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function gmailLogin() {
    var _url = "https://accounts.google.com/o/oauth2/auth?response_type=code&redirect_uri=/gmail&credirecturl%3e&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&client_id=560431364946-n4imj7j3j6cvosnmnsj33frmvlphrjol.apps.googleusercontent.com";
    popupCenter({ url: _url, title: 'xtf', w: 600, h: 700 });
}

const popupCenter = ({ url, title, w, h }) => {
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    const newWindow = window.open(url, title,
        `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
    )

    if (window.focus) newWindow.focus();
}
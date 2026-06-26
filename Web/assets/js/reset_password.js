function ChangePassword() {
    document.getElementById('lblLoginError').innerText = "";
    document.getElementById("divLoginError").classList.add('d-none');
    document.getElementById("divLoginError").classList.remove('d-flex');

    document.getElementById('lblSuccessError').innerText = "";
    document.getElementById("divSuccessError").classList.add('d-none');
    document.getElementById("divSuccessError").classList.remove('d-flex');

    var val = true;

    var password = document.getElementById('password');
    var confirm = document.getElementById('confirm');

    if (password.value.trim() === "") {
        val = false;
        password.style.background = "#fff9b3";
    }
    else {
        if (val && !ValidatePassword(password.value.trim())) {
            val = false;
            password.style.background = "#fff9b3";
            document.getElementById('lblLoginError').innerText = "Password length should not be less than 8 characters!";
            document.getElementById("divLoginError").classList.add('d-flex');
            document.getElementById("divLoginError").classList.remove('d-none');
        }
        else {
            password.style.background = "#ffffff";
        }
    }

    if (val && password.value.trim() !== confirm.value.trim()) {
        val = false;
        confirm.style.background = "#fff9b3";

        document.getElementById('lblLoginError').innerText = "The confirm password is not correct!";
        document.getElementById("divLoginError").classList.add('d-flex');
        document.getElementById("divLoginError").classList.remove('d-none');
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');
        var fdata = new FormData();

        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });

        fdata.append('token', params.token.trim());
        fdata.append('password', password.value.trim());
        fdata.append('auth_token', "");  $.ajax({
            cache: false,
            data: fdata,
            url: '/api/users.asmx/change_password',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                if (data != null && data.trim() !== "") {
                    document.getElementById('lblLoginError').innerText = data;

                    document.getElementById("divLoginError").classList.add('d-flex');
                    document.getElementById("divLoginError").classList.remove('d-none');
                    document.getElementById("divloader").classList.add('d-none');
                    document.getElementById("divloader").classList.remove('d-flex');
                    return false;
                }
                else {
                    document.getElementById("divloader").classList.add('d-flex');
                    document.getElementById("divloader").classList.remove('d-none');
                    window.location.href = "/home";
                }
            }
        });
    }
    else {
        return false;
    }
}

function ValidatePassword(myInput) {
    if (myInput.length >= 8) {
        return (true)
    }
    return (false)
}
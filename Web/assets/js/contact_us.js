function Send_Contact_Us_Message() {
    document.getElementById('lbl_contact_us_status').innerText = "";
    var val = true;

    var name = document.getElementById('username');
    var email = document.getElementById('email_1');
    var mobile = document.getElementById('mobile_1');
    var message = document.getElementById('message');

    if (name.value.trim() === "") {
        val = false;
        name.style.background = "#fff9b3";
    }
    else {
        name.style.background = "#ffffff";
    }

    if (email.value.trim() === "") {
        val = false;
        email.style.background = "#fff9b3";
    }
    else {
        if (!ValidateEmail(email.value.trim())) {
            val = false;
            email.style.background = "#fff9b3";
            document.getElementById('lbl_contact_us_status').innerText = IsArabic ? "صيغة بريد إلكتروني غير صحيحة!" : "Incorrect email format!";
        }
        else {
            email.style.background = "#ffffff";
        }
    }

    if (mobile.value.trim() === "") {
        val = false;
        mobile.style.background = "#fff9b3";
    }
    else {
        mobile.style.background = "#ffffff";
    }

    if (message.value.trim() === "") {
        val = false;
        message.style.background = "#fff9b3";
    }
    else {
        message.style.background = "#ffffff";
    }

    if (val) {
        var fdata = new FormData();
        fdata.append('name', name.value.trim());
        fdata.append('email', email.value.trim());
        fdata.append('mobile', mobile.value.trim());
        fdata.append('message', message.value.trim());
        fdata.append('auth_token', "");
        $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/send_contact_us_message',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                name.value = email.value = mobile.value = message.value = "";
                document.getElementById('lbl_contact_us_status').innerText = IsArabic ? "تم إرسال رسالتك بنجاح." :  "Your message has been successfully sent.";
            }
        });
    }
}
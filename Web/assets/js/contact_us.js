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

GetContactUsFAQs();

function GetContactUsFAQs() {
    var fdata = new FormData();
    fdata.append('auth_token', "");
    $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/contact_us_people_ask',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillContactUsFAQs(data);
        }
    });
}

function FillContactUsFAQs(data) {
    var accordion = $('#contact-us-faqs-accordion');
    accordion.html('');
    if (data.length > 0) {
        let index = 0;
        for (index; index < data.length; index++) {
            let item = data[index];
            let question = IsArabic ? item.TitleAr : item.TitleEn;
            let answer = IsArabic ? item.DescriptionAr : item.DescriptionEn;
            
            // Format answer text to support simple newlines
            let formattedAnswer = answer.trim().replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>');

            accordion.append(`
                <div class="card">
                    <div class="card-header">
                        <a href="#collapse${item.Id}" class="expand">${question}</a>
                    </div>
                    <div id="collapse${item.Id}" class="card-body collapsed">
                        <p class="mb-0">${formattedAnswer}</p>
                    </div>
                </div>
            `);
        }
    }
}
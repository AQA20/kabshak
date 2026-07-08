

if (window.location.href.indexOf("admin") > -1) {
    $('.dropdown-lang').remove();
}

function AdminMessagePopup(txt) {
    $('#MessagePopupInfo').html(txt);
    setTimeout(
        function () {
            showpopup();
        }, 1000);
}

$(document).ready(function () {
    $("#display_popup").click(function () {
        showpopup();
    });
    $("#cancel_button").click(function () {
        hidepopup();
    });
    $("#close_button").click(function () {
        hidepopup();
    });
});


function showpopup() {
    $("#popup_box").fadeToggle();
    $("#popup_box").css({ "visibility": "visible", "display": "block", "z-index": "999999", "padding-bottom": "30px" });
}

function hidepopup() {
    $("#popup_box").fadeToggle();
    $("#popup_box").css({ "visibility": "hidden", "display": "none" });
    document.getElementById("divloader").classList.add('d-none');
    document.getElementById("divloader").classList.remove('d-flex');
}

function AdminConfirm(message, onConfirm) {
    var confirmBox = document.getElementById('admin_confirm_box');
    if (!confirmBox) {
        var html = `
        <div id="admin_confirm_box" style="display: none; visibility: hidden; width: 350px; background-color: #eee; position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); border-radius: 10px; box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.3); font-family: helvetica; z-index: 1000000; padding: 20px;">
            <div id="confirm_info_text" style="padding: 10px; background-color: white; border-radius: 5px; color: #593930; font-size: 16px; display: flex; align-items: center; gap: 10px;">
                <i class="w-icon-warning" style="font-size: 32px; color: #cc0001; margin-right: 5px;"></i>
                <span id="admin_confirm_message">Are you sure?</span>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 15px;">
                <button type="button" id="admin_confirm_btn_yes" class="btn btn-dark btn-rounded btn-sm" style="padding: 6px 15px;">Yes</button>
                <button type="button" id="admin_confirm_btn_no" class="btn btn-outline btn-default btn-rounded btn-sm" style="padding: 6px 15px;">No</button>
            </div>
        </div>`;
        $('body').append(html);
        confirmBox = document.getElementById('admin_confirm_box');
    }

    document.getElementById('admin_confirm_message').innerText = message;

    $(confirmBox).fadeIn();
    $(confirmBox).css({ "visibility": "visible", "display": "block" });

    $('#admin_confirm_btn_yes').off('click').on('click', function () {
        hideConfirmBox();
        if (onConfirm) onConfirm();
    });

    $('#admin_confirm_btn_no').off('click').on('click', function () {
        hideConfirmBox();
    });

    function hideConfirmBox() {
        $(confirmBox).fadeOut(function () {
            $(confirmBox).css({ "visibility": "hidden", "display": "none" });
        });
    }
}
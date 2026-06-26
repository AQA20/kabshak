

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
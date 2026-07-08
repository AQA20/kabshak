GetAllFAQSList();

function GetAllFAQSList() {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    var fdata = new FormData();

    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/all_contact_us_people_ask',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillFAQS(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function FillFAQS(data) {
    $('.productsList').html(' ');
    if (data.length > 0) {
        let index = 0;
        let items = [];

        for (index; index < data.length; index++) {
            let item = data[index];

            let classRandom = (Math.random() + 1).toString(36).substring(7);

            var _date = new Date(item.CreatedOnDate.toString());
            var dd = String(_date.getDate()).padStart(2, '0');
            var mm = String(_date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = _date.getFullYear();
            _date = dd + '/' + mm + '/' + yyyy;

            items.push(`<tr class="RemoveRecord_14">
                            <td class="product-name">
                                <div class="product-cat">
                                    <ins class="new-price">Id: ${item.Id}</ins>
                                </div>
                                <div class="product-cat" style="color: #593930;">
                                    <ins class="new-price">Name: ${item.TitleEn}</ins>
                                </div>
                            </td>
                            <td class="product-price">
                                <ins class="new-price active${classRandom} ${item.IsActive ? '' : 'text-danger'}">${item.IsActive ? 'Is Active' : 'In Active'}</ins>
                            </td>
                            <td class="product-stock-status">
                                <span class="wishlist-in-stock">${_date}</span>
                            </td>
                            <td class="wishlist-action">
                                <div class="d-lg-flex justify-content-between">
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" onClick="EditQuestionInfo(${item.Id},'${item.TitleEn}','${item.TitleAr}','${item.DescriptionEn.trim()}','${item.DescriptionAr.trim()}');">Edit</button>
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" style=" padding-left: 20px;padding-right: 20px;" onClick="ChangeQuestionStatus(this,'active${classRandom}',${item.Id},${item.IsActive})">${item.IsActive ? 'Dectivate' : 'Activate'}</button>
                                    </div>
                                <div class="alert alert-icon alert-success alert-bg alert-inline show-code-action mt-2 d-none alert${classRandom}">
                                   <p style="margin:unset;">alert message.</p>
                                </div>
                            </td>
                        </tr>`);
        }

        $('.result').html(` <table class="shop-table wishlist-table">
                                            <thead>
                                                <tr>
                                                    <th class="product-name"><span>Item Info</span></th>
                                                    <th class="product-price" style="text-align: unset;"><span>Status</span></th>
                                                    <th class="product-stock-status" style="text-align: unset;"><span>Date</span></th>
                                                    <th class="wishlist-action">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody class="productsList">
                                            </tbody>
                                        </table>`);

        $('.productsList').prepend(items);
    }
    else {
        $('.result').html('<div style="font-weight: 500;color: #593930;padding: 5px;font-size: 20px;padding-bottom: 350px;"><span class="w-icon-search-plus" style="padding-right: 5px;padding-left: 5px;"></span>No result found!</div>');
    }
    setTimeout(
        function () {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }, 1000);
}

function ChangeQuestionStatus(btn, classname, id, active) {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    $('.' + classname.replace('active', 'alert')).addClass('d-none');
    $('.' + classname.replace('active', 'alert')).removeClass('d-flex');

    if (active) {
        btn.textContent = "Activate";
        btn.setAttribute("onclick", "ChangeQuestionStatus(this,'" + classname + "'," + id + ", false);");
        $('.' + classname).html('In Active')
        $('.' + classname).addClass('text-danger');
    }
    else {
        btn.textContent = "Deactivate";
        btn.setAttribute("onclick", "ChangeQuestionStatus(this,'" + classname + "'," + id + ", true);");
        $('.' + classname).removeClass('text-danger');
        $('.' + classname).html('Is Active');
    }

    var fdata = new FormData();

    fdata.append('id', id.toString());
    fdata.append('user_token', userId.trim());
    fdata.append('status', (!active).toString());

    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/chnage_contact_us_people_ask_activation_status',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            $('.' + classname.replace('active', 'alert')).removeClass('d-none');
            $('.' + classname.replace('active', 'alert')).addClass('d-flex');
            $('.alert' + classname.replace('active', '') + ' p').html('The question has been ' + (active ? 'deactivated.' : 'activated.'));
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });

    setTimeout(
        function () {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }, 1000);
}

function SaveQuestionInfo() {
    var val = true;

    var txtFAQsNameEn = document.getElementById('txtFAQsNameEn');
    var txtFAQsNameAr = document.getElementById('txtFAQsNameAr');

    if (txtFAQsNameEn.value.trim() === "") {
        val = false;
        txtFAQsNameEn.style.background = "#fff9b3";
    }
    else {
        txtFAQsNameEn.style.background = "#ffffff";
    }

    if (txtFAQsNameAr.value.trim() === "") {
        val = false;
        txtFAQsNameAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtFAQsNameAr.value.trim())) {
            txtFAQsNameAr.style.background = "#ffffff";
        } else {
            val = false;
            txtFAQsNameAr.style.background = "#fff9b3";
        }
    }

    var txtFAQsAnswerNameEn = document.getElementById('txtFAQsAnswerNameEn');
    var txtFAQsAnswerNameAr = document.getElementById('txtFAQsAnswerNameAr');

    if (txtFAQsAnswerNameEn.value.trim() === "") {
        val = false;
        txtFAQsAnswerNameEn.style.background = "#fff9b3";
    }
    else {
        txtFAQsAnswerNameEn.style.background = "#ffffff";
    }

    if (txtFAQsAnswerNameAr.value.trim() === "") {
        val = false;
        txtFAQsAnswerNameAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtFAQsNameAr.value.trim())) {
            txtFAQsAnswerNameAr.style.background = "#ffffff";
        } else {
            val = false;
            txtFAQsAnswerNameAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();

        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtFAQsNameEn.value.trim());
        fdata.append('name_ar', txtFAQsNameAr.value.trim());
        fdata.append('answer_en', txtFAQsAnswerNameEn.value.trim());
        fdata.append('answer_ar', txtFAQsAnswerNameAr.value.trim());

        fdata.append('auth_token', "");  $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/add_contact_us_people_ask_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllFAQSList();
                $('#lnkCategoriesList').click();
                ClearAddQuestionData();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');
            }
        });
    }

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

function ClearAddQuestionData() {
    var txtFAQsNameEn = document.getElementById('txtFAQsNameEn');
    var txtFAQsNameAr = document.getElementById('txtFAQsNameAr');
    var txtFAQsAnswerNameEn = document.getElementById('txtFAQsAnswerNameEn');
    var txtFAQsAnswerNameAr = document.getElementById('txtFAQsAnswerNameAr');

    txtFAQsNameEn.value = '';
    txtFAQsNameAr.value = '';
    txtFAQsAnswerNameEn.value = '';
    txtFAQsAnswerNameAr.value = '';
}


function EditQuestionInfo(id, en, ar, DescEn, DescAr) {
    $('#lnkEditCategory').click();

    var txtFAQsNameEn = document.getElementById('txtEditFAQsNameEn');
    var txtFAQsNameAr = document.getElementById('txtEditFAQsNameAr');
    var txtFAQsAnswerNameEn = document.getElementById('txtEditFAQsAnswerNameEn');
    var txtFAQsAnswerNameAr = document.getElementById('txtEditFAQsAnswerNameAr');

    txtFAQsNameEn.value = en;
    txtFAQsNameAr.value = ar;
    txtFAQsAnswerNameEn.value = DescEn;
    txtFAQsAnswerNameAr.value = DescAr;

    $('.EditQuestionInfo').attr('onclick', "EditQuestionInfoById(" + id + ");");

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

function EditQuestionInfoById(id) {

    let val = true;
    var txtFAQsNameEn = document.getElementById('txtEditFAQsNameEn');
    var txtFAQsNameAr = document.getElementById('txtEditFAQsNameAr');

    if (txtFAQsNameEn.value.trim() === "") {
        val = false;
        txtFAQsNameEn.style.background = "#fff9b3";
    }
    else {
        txtFAQsNameEn.style.background = "#ffffff";
    }

    if (txtFAQsNameAr.value.trim() === "") {
        val = false;
        txtFAQsNameAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtFAQsNameAr.value.trim())) {
            txtFAQsNameAr.style.background = "#ffffff";
        } else {
            val = false;
            txtFAQsNameAr.style.background = "#fff9b3";
        }
    }

    var txtFAQsAnswerNameEn = document.getElementById('txtEditFAQsAnswerNameEn');
    var txtFAQsAnswerNameAr = document.getElementById('txtEditFAQsAnswerNameAr');

    if (txtFAQsAnswerNameEn.value.trim() === "") {
        val = false;
        txtFAQsAnswerNameEn.style.background = "#fff9b3";
    }
    else {
        txtFAQsAnswerNameEn.style.background = "#ffffff";
    }

    if (txtFAQsAnswerNameAr.value.trim() === "") {
        val = false;
        txtFAQsAnswerNameAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtFAQsNameAr.value.trim())) {
            txtFAQsAnswerNameAr.style.background = "#ffffff";
        } else {
            val = false;
            txtFAQsAnswerNameAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();

        fdata.append('id', id);
        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtFAQsNameEn.value.trim());
        fdata.append('name_ar', txtFAQsNameAr.value.trim());
        fdata.append('answer_en', txtFAQsAnswerNameEn.value.trim());
        fdata.append('answer_ar', txtFAQsAnswerNameAr.value.trim());


        fdata.append('auth_token', "");  $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/edit_contact_us_people_ask_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllFAQSList();
                $('#lnkCategoriesList').click();
                ClearEditQuestionData();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');
            }
        });
    }

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

function ClearEditQuestionData() {
    var txtFAQsNameEn = document.getElementById('txtEditFAQsNameEn');
    var txtFAQsNameAr = document.getElementById('txtEditFAQsNameAr');
    var txtFAQsAnswerNameEn = document.getElementById('txtEditFAQsAnswerNameEn');
    var txtFAQsAnswerNameAr = document.getElementById('txtEditFAQsAnswerNameAr');

    txtFAQsNameEn.value = '';
    txtFAQsNameAr.value = '';
    txtFAQsAnswerNameEn.value = '';
    txtFAQsAnswerNameAr.value = '';
}

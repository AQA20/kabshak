let privacyList = [];
GetAllPrivacyList();

function GetAllPrivacyList() {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    var fdata = new FormData();
    fdata.append('auth_token', "");

    $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/all_privacy_policy',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillPrivacy(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function FillPrivacy(data) {
    privacyList = data;
    $('.productsList').html(' ');
    if (data.length > 0) {
        let index = 0;
        let items = [];

        for (index; index < data.length; index++) {
            let item = data[index];
            let classRandom = (Math.random() + 1).toString(36).substring(7);

            var _date = new Date(item.CreatedOnDate.toString());
            var dd = String(_date.getDate()).padStart(2, '0');
            var mm = String(_date.getMonth() + 1).padStart(2, '0');
            var yyyy = _date.getFullYear();
            _date = dd + '/' + mm + '/' + yyyy;

            items.push(`<tr class="RemoveRecord_${item.Id}">
                            <td class="product-name">
                                <div class="product-cat">
                                    <ins class="new-price">Id: ${item.Id}</ins>
                                </div>
                                <div class="product-cat" style="color: #593930;">
                                    <ins class="new-price">Title: ${item.TitleEn}</ins>
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
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" onClick="EditPrivacy(${index});">Edit</button>
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" style="padding-left: 10px; padding-right: 10px;" onClick="ChangePrivacyStatus(this,'active${classRandom}',${item.Id},${item.IsActive})">${item.IsActive ? 'Deactivate' : 'Activate'}</button>
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0 text-danger" style="border-color: #cc0001;" onClick="DeletePrivacy(${item.Id});">Delete</button>
                                </div>
                                <div class="alert alert-icon alert-success alert-bg alert-inline show-code-action mt-2 d-none alert${classRandom}">
                                   <p style="margin:unset;">alert message.</p>
                                </div>
                            </td>
                        </tr>`);
        }

        $('.result').html(`<table class="shop-table wishlist-table">
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
        $('.result').html('<div style="font-weight: 500; color: #593930; padding: 5px; font-size: 20px; padding-bottom: 350px;"><span class="w-icon-search-plus" style="padding-right: 5px; padding-left: 5px;"></span>No result found!</div>');
    }
    setTimeout(function () {
        document.getElementById("divloader").classList.add('d-none');
        document.getElementById("divloader").classList.remove('d-flex');
    }, 1000);
}

function ChangePrivacyStatus(btn, classname, id, active) {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    $('.' + classname.replace('active', 'alert')).addClass('d-none');
    $('.' + classname.replace('active', 'alert')).removeClass('d-flex');

    if (active) {
        btn.textContent = "Activate";
        btn.setAttribute("onclick", "ChangePrivacyStatus(this,'" + classname + "'," + id + ", false);");
        $('.' + classname).html('In Active');
        $('.' + classname).addClass('text-danger');
    }
    else {
        btn.textContent = "Deactivate";
        btn.setAttribute("onclick", "ChangePrivacyStatus(this,'" + classname + "'," + id + ", true);");
        $('.' + classname).removeClass('text-danger');
        $('.' + classname).html('Is Active');
    }

    var fdata = new FormData();
    fdata.append('id', id.toString());
    fdata.append('user_token', userId.trim());
    fdata.append('status', (!active).toString());
    fdata.append('auth_token', "");

    $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/chnage_privacy_policy_activation_status',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            $('.' + classname.replace('active', 'alert')).removeClass('d-none');
            $('.' + classname.replace('active', 'alert')).addClass('d-flex');
            $('.alert' + classname.replace('active', '') + ' p').html('The section status has been changed.');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });

    setTimeout(function () {
        document.getElementById("divloader").classList.add('d-none');
        document.getElementById("divloader").classList.remove('d-flex');
    }, 1000);
}

function SavePrivacyInfo() {
    var val = true;

    var txtPrivacyTitleEn = document.getElementById('txtPrivacyTitleEn');
    var txtPrivacyTitleAr = document.getElementById('txtPrivacyTitleAr');

    if (txtPrivacyTitleEn.value.trim() === "") {
        val = false;
        txtPrivacyTitleEn.style.background = "#fff9b3";
    }
    else {
        txtPrivacyTitleEn.style.background = "#ffffff";
    }

    if (txtPrivacyTitleAr.value.trim() === "") {
        val = false;
        txtPrivacyTitleAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtPrivacyTitleAr.value.trim())) {
            txtPrivacyTitleAr.style.background = "#ffffff";
        } else {
            val = false;
            txtPrivacyTitleAr.style.background = "#fff9b3";
        }
    }

    var txtPrivacyDescEn = document.getElementById('txtPrivacyDescEn');
    var txtPrivacyDescAr = document.getElementById('txtPrivacyDescAr');

    if (txtPrivacyDescEn.value.trim() === "") {
        val = false;
        txtPrivacyDescEn.style.background = "#fff9b3";
    }
    else {
        txtPrivacyDescEn.style.background = "#ffffff";
    }

    if (txtPrivacyDescAr.value.trim() === "") {
        val = false;
        txtPrivacyDescAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtPrivacyTitleAr.value.trim())) {
            txtPrivacyDescAr.style.background = "#ffffff";
        } else {
            val = false;
            txtPrivacyDescAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();
        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtPrivacyTitleEn.value.trim());
        fdata.append('name_ar', txtPrivacyTitleAr.value.trim());
        fdata.append('answer_en', txtPrivacyDescEn.value.trim());
        fdata.append('answer_ar', txtPrivacyDescAr.value.trim());
        fdata.append('auth_token', "");

        $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/add_privacy_policy_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllPrivacyList();
                $('#lnkPrivacyList').click();
                ClearAddPrivacyData();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');
            }
        });
    }

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300);
}

function ClearAddPrivacyData() {
    var txtPrivacyTitleEn = document.getElementById('txtPrivacyTitleEn');
    var txtPrivacyTitleAr = document.getElementById('txtPrivacyTitleAr');
    var txtPrivacyDescEn = document.getElementById('txtPrivacyDescEn');
    var txtPrivacyDescAr = document.getElementById('txtPrivacyDescAr');

    txtPrivacyTitleEn.value = '';
    txtPrivacyTitleAr.value = '';
    txtPrivacyDescEn.value = '';
    txtPrivacyDescAr.value = '';
}

function EditPrivacy(index) {
    let item = privacyList[index];
    ShowEditPrivacy(item.Id, item.TitleEn, item.TitleAr, item.DescriptionEn.trim(), item.DescriptionAr.trim());
}

function ShowEditPrivacy(id, en, ar, descEn, descAr) {
    $('#lnkEditPrivacy').click();

    var txtEditPrivacyTitleEn = document.getElementById('txtEditPrivacyTitleEn');
    var txtEditPrivacyTitleAr = document.getElementById('txtEditPrivacyTitleAr');
    var txtEditPrivacyDescEn = document.getElementById('txtEditPrivacyDescEn');
    var txtEditPrivacyDescAr = document.getElementById('txtEditPrivacyDescAr');

    txtEditPrivacyTitleEn.value = en;
    txtEditPrivacyTitleAr.value = ar;
    txtEditPrivacyDescEn.value = descEn;
    txtEditPrivacyDescAr.value = descAr;

    $('.EditPrivacyInfo').attr('onclick', "EditPrivacyInfoById(" + id + ");");

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300);
}

function EditPrivacyInfoById(id) {
    let val = true;
    var txtEditPrivacyTitleEn = document.getElementById('txtEditPrivacyTitleEn');
    var txtEditPrivacyTitleAr = document.getElementById('txtEditPrivacyTitleAr');

    if (txtEditPrivacyTitleEn.value.trim() === "") {
        val = false;
        txtEditPrivacyTitleEn.style.background = "#fff9b3";
    }
    else {
        txtEditPrivacyTitleEn.style.background = "#ffffff";
    }

    if (txtEditPrivacyTitleAr.value.trim() === "") {
        val = false;
        txtEditPrivacyTitleAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtEditPrivacyTitleAr.value.trim())) {
            txtEditPrivacyTitleAr.style.background = "#ffffff";
        } else {
            val = false;
            txtEditPrivacyTitleAr.style.background = "#fff9b3";
        }
    }

    var txtEditPrivacyDescEn = document.getElementById('txtEditPrivacyDescEn');
    var txtEditPrivacyDescAr = document.getElementById('txtEditPrivacyDescAr');

    if (txtEditPrivacyDescEn.value.trim() === "") {
        val = false;
        txtEditPrivacyDescEn.style.background = "#fff9b3";
    }
    else {
        txtEditPrivacyDescEn.style.background = "#ffffff";
    }

    if (txtEditPrivacyDescAr.value.trim() === "") {
        val = false;
        txtEditPrivacyDescAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtEditPrivacyTitleAr.value.trim())) {
            txtEditPrivacyDescAr.style.background = "#ffffff";
        } else {
            val = false;
            txtEditPrivacyDescAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();
        fdata.append('id', id);
        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtEditPrivacyTitleEn.value.trim());
        fdata.append('name_ar', txtEditPrivacyTitleAr.value.trim());
        fdata.append('answer_en', txtEditPrivacyDescEn.value.trim());
        fdata.append('answer_ar', txtEditPrivacyDescAr.value.trim());
        fdata.append('auth_token', "");

        $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/edit_privacy_policy_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllPrivacyList();
                $('#lnkPrivacyList').click();
                ClearEditPrivacyData();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');
            }
        });
    }

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300);
}

function ClearEditPrivacyData() {
    var txtEditPrivacyTitleEn = document.getElementById('txtEditPrivacyTitleEn');
    var txtEditPrivacyTitleAr = document.getElementById('txtEditPrivacyTitleAr');
    var txtEditPrivacyDescEn = document.getElementById('txtEditPrivacyDescEn');
    var txtEditPrivacyDescAr = document.getElementById('txtEditPrivacyDescAr');

    txtEditPrivacyTitleEn.value = '';
    txtEditPrivacyTitleAr.value = '';
    txtEditPrivacyDescEn.value = '';
    txtEditPrivacyDescAr.value = '';
}

function DeletePrivacy(id) {
    AdminConfirm("Are you sure you want to delete this item?", function() {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();
        fdata.append('id', id);
        fdata.append('user_token', userId.trim());
        fdata.append('auth_token', "");

        $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/delete_privacy_policy',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllPrivacyList();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');
            }
        });
    });
}


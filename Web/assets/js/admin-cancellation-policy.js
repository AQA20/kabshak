let cancellationList = [];
GetAllCancellationList();

function GetAllCancellationList() {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    var fdata = new FormData();
    fdata.append('auth_token', "");

    $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/all_cancellation_policy',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillCancellation(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function FillCancellation(data) {
    cancellationList = data;
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
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" onClick="EditCancellation(${index});">Edit</button>
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" style="padding-left: 10px; padding-right: 10px;" onClick="ChangeCancellationStatus(this,'active${classRandom}',${item.Id},${item.IsActive})">${item.IsActive ? 'Deactivate' : 'Activate'}</button>
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0 text-danger" style="border-color: #cc0001;" onClick="DeleteCancellation(${item.Id});">Delete</button>
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

function ChangeCancellationStatus(btn, classname, id, active) {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    $('.' + classname.replace('active', 'alert')).addClass('d-none');
    $('.' + classname.replace('active', 'alert')).removeClass('d-flex');

    if (active) {
        btn.textContent = "Activate";
        btn.setAttribute("onclick", "ChangeCancellationStatus(this,'" + classname + "'," + id + ", false);");
        $('.' + classname).html('In Active');
        $('.' + classname).addClass('text-danger');
    }
    else {
        btn.textContent = "Deactivate";
        btn.setAttribute("onclick", "ChangeCancellationStatus(this,'" + classname + "'," + id + ", true);");
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
        url: '/api/main.asmx/chnage_cancellation_policy_activation_status',
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

function SaveCancellationInfo() {
    var val = true;

    var txtCancellationTitleEn = document.getElementById('txtCancellationTitleEn');
    var txtCancellationTitleAr = document.getElementById('txtCancellationTitleAr');

    if (txtCancellationTitleEn.value.trim() === "") {
        val = false;
        txtCancellationTitleEn.style.background = "#fff9b3";
    }
    else {
        txtCancellationTitleEn.style.background = "#ffffff";
    }

    if (txtCancellationTitleAr.value.trim() === "") {
        val = false;
        txtCancellationTitleAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtCancellationTitleAr.value.trim())) {
            txtCancellationTitleAr.style.background = "#ffffff";
        } else {
            val = false;
            txtCancellationTitleAr.style.background = "#fff9b3";
        }
    }

    var txtCancellationDescEn = document.getElementById('txtCancellationDescEn');
    var txtCancellationDescAr = document.getElementById('txtCancellationDescAr');

    if (txtCancellationDescEn.value.trim() === "") {
        val = false;
        txtCancellationDescEn.style.background = "#fff9b3";
    }
    else {
        txtCancellationDescEn.style.background = "#ffffff";
    }

    if (txtCancellationDescAr.value.trim() === "") {
        val = false;
        txtCancellationDescAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtCancellationTitleAr.value.trim())) {
            txtCancellationDescAr.style.background = "#ffffff";
        } else {
            val = false;
            txtCancellationDescAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();
        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtCancellationTitleEn.value.trim());
        fdata.append('name_ar', txtCancellationTitleAr.value.trim());
        fdata.append('answer_en', txtCancellationDescEn.value.trim());
        fdata.append('answer_ar', txtCancellationDescAr.value.trim());
        fdata.append('auth_token', "");

        $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/add_cancellation_policy_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllCancellationList();
                $('#lnkCancellationList').click();
                ClearAddCancellationData();
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

function ClearAddCancellationData() {
    var txtCancellationTitleEn = document.getElementById('txtCancellationTitleEn');
    var txtCancellationTitleAr = document.getElementById('txtCancellationTitleAr');
    var txtCancellationDescEn = document.getElementById('txtCancellationDescEn');
    var txtCancellationDescAr = document.getElementById('txtCancellationDescAr');

    txtCancellationTitleEn.value = '';
    txtCancellationTitleAr.value = '';
    txtCancellationDescEn.value = '';
    txtCancellationDescAr.value = '';
}

function EditCancellation(index) {
    let item = cancellationList[index];
    ShowEditCancellation(item.Id, item.TitleEn, item.TitleAr, item.DescriptionEn.trim(), item.DescriptionAr.trim());
}

function ShowEditCancellation(id, en, ar, descEn, descAr) {
    $('#lnkEditCancellation').click();

    var txtEditCancellationTitleEn = document.getElementById('txtEditCancellationTitleEn');
    var txtEditCancellationTitleAr = document.getElementById('txtEditCancellationTitleAr');
    var txtEditCancellationDescEn = document.getElementById('txtEditCancellationDescEn');
    var txtEditCancellationDescAr = document.getElementById('txtEditCancellationDescAr');

    txtEditCancellationTitleEn.value = en;
    txtEditCancellationTitleAr.value = ar;
    txtEditCancellationDescEn.value = descEn;
    txtEditCancellationDescAr.value = descAr;

    $('.EditCancellationInfo').attr('onclick', "EditCancellationInfoById(" + id + ");");

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300);
}

function EditCancellationInfoById(id) {
    let val = true;
    var txtEditCancellationTitleEn = document.getElementById('txtEditCancellationTitleEn');
    var txtEditCancellationTitleAr = document.getElementById('txtEditCancellationTitleAr');

    if (txtEditCancellationTitleEn.value.trim() === "") {
        val = false;
        txtEditCancellationTitleEn.style.background = "#fff9b3";
    }
    else {
        txtEditCancellationTitleEn.style.background = "#ffffff";
    }

    if (txtEditCancellationTitleAr.value.trim() === "") {
        val = false;
        txtEditCancellationTitleAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtEditCancellationTitleAr.value.trim())) {
            txtEditCancellationTitleAr.style.background = "#ffffff";
        } else {
            val = false;
            txtEditCancellationTitleAr.style.background = "#fff9b3";
        }
    }

    var txtEditCancellationDescEn = document.getElementById('txtEditCancellationDescEn');
    var txtEditCancellationDescAr = document.getElementById('txtEditCancellationDescAr');

    if (txtEditCancellationDescEn.value.trim() === "") {
        val = false;
        txtEditCancellationDescEn.style.background = "#fff9b3";
    }
    else {
        txtEditCancellationDescEn.style.background = "#ffffff";
    }

    if (txtEditCancellationDescAr.value.trim() === "") {
        val = false;
        txtEditCancellationDescAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtEditCancellationTitleAr.value.trim())) {
            txtEditCancellationDescAr.style.background = "#ffffff";
        } else {
            val = false;
            txtEditCancellationDescAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();
        fdata.append('id', id);
        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtEditCancellationTitleEn.value.trim());
        fdata.append('name_ar', txtEditCancellationTitleAr.value.trim());
        fdata.append('answer_en', txtEditCancellationDescEn.value.trim());
        fdata.append('answer_ar', txtEditCancellationDescAr.value.trim());
        fdata.append('auth_token', "");

        $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/edit_cancellation_policy_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllCancellationList();
                $('#lnkCancellationList').click();
                ClearEditCancellationData();
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

function ClearEditCancellationData() {
    var txtEditCancellationTitleEn = document.getElementById('txtEditCancellationTitleEn');
    var txtEditCancellationTitleAr = document.getElementById('txtEditCancellationTitleAr');
    var txtEditCancellationDescEn = document.getElementById('txtEditCancellationDescEn');
    var txtEditCancellationDescAr = document.getElementById('txtEditCancellationDescAr');

    txtEditCancellationTitleEn.value = '';
    txtEditCancellationTitleAr.value = '';
    txtEditCancellationDescEn.value = '';
    txtEditCancellationDescAr.value = '';
}

function DeleteCancellation(id) {
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
            url: '/api/main.asmx/delete_cancellation_policy',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllCancellationList();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');
            }
        });
    });
}

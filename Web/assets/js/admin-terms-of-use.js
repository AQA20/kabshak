let termsList = [];
GetAllTermsList();

function GetAllTermsList() {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    var fdata = new FormData();
    fdata.append('auth_token', "");

    $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/all_terms_of_use',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillTerms(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function FillTerms(data) {
    termsList = data;
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
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" onClick="EditTerms(${index});">Edit</button>
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" style="padding-left: 10px; padding-right: 10px;" onClick="ChangeTermsStatus(this,'active${classRandom}',${item.Id},${item.IsActive})">${item.IsActive ? 'Deactivate' : 'Activate'}</button>
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0 text-danger" style="border-color: #cc0001;" onClick="DeleteTerms(${item.Id});">Delete</button>
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

function ChangeTermsStatus(btn, classname, id, active) {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    $('.' + classname.replace('active', 'alert')).addClass('d-none');
    $('.' + classname.replace('active', 'alert')).removeClass('d-flex');

    if (active) {
        btn.textContent = "Activate";
        btn.setAttribute("onclick", "ChangeTermsStatus(this,'" + classname + "'," + id + ", false);");
        $('.' + classname).html('In Active');
        $('.' + classname).addClass('text-danger');
    }
    else {
        btn.textContent = "Deactivate";
        btn.setAttribute("onclick", "ChangeTermsStatus(this,'" + classname + "'," + id + ", true);");
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
        url: '/api/main.asmx/chnage_terms_of_use_activation_status',
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

function SaveTermsInfo() {
    var val = true;

    var txtTermsTitleEn = document.getElementById('txtTermsTitleEn');
    var txtTermsTitleAr = document.getElementById('txtTermsTitleAr');

    if (txtTermsTitleEn.value.trim() === "") {
        val = false;
        txtTermsTitleEn.style.background = "#fff9b3";
    }
    else {
        txtTermsTitleEn.style.background = "#ffffff";
    }

    if (txtTermsTitleAr.value.trim() === "") {
        val = false;
        txtTermsTitleAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtTermsTitleAr.value.trim())) {
            txtTermsTitleAr.style.background = "#ffffff";
        } else {
            val = false;
            txtTermsTitleAr.style.background = "#fff9b3";
        }
    }

    var txtTermsDescEn = document.getElementById('txtTermsDescEn');
    var txtTermsDescAr = document.getElementById('txtTermsDescAr');

    if (txtTermsDescEn.value.trim() === "") {
        val = false;
        txtTermsDescEn.style.background = "#fff9b3";
    }
    else {
        txtTermsDescEn.style.background = "#ffffff";
    }

    if (txtTermsDescAr.value.trim() === "") {
        val = false;
        txtTermsDescAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtTermsTitleAr.value.trim())) {
            txtTermsDescAr.style.background = "#ffffff";
        } else {
            val = false;
            txtTermsDescAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();
        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtTermsTitleEn.value.trim());
        fdata.append('name_ar', txtTermsTitleAr.value.trim());
        fdata.append('answer_en', txtTermsDescEn.value.trim());
        fdata.append('answer_ar', txtTermsDescAr.value.trim());
        fdata.append('auth_token', "");

        $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/add_terms_of_use_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllTermsList();
                $('#lnkTermsList').click();
                ClearAddTermsData();
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

function ClearAddTermsData() {
    var txtTermsTitleEn = document.getElementById('txtTermsTitleEn');
    var txtTermsTitleAr = document.getElementById('txtTermsTitleAr');
    var txtTermsDescEn = document.getElementById('txtTermsDescEn');
    var txtTermsDescAr = document.getElementById('txtTermsDescAr');

    txtTermsTitleEn.value = '';
    txtTermsTitleAr.value = '';
    txtTermsDescEn.value = '';
    txtTermsDescAr.value = '';
}

function EditTerms(index) {
    let item = termsList[index];
    ShowEditTerms(item.Id, item.TitleEn, item.TitleAr, item.DescriptionEn.trim(), item.DescriptionAr.trim());
}

function ShowEditTerms(id, en, ar, descEn, descAr) {
    $('#lnkEditTerms').click();

    var txtEditTermsTitleEn = document.getElementById('txtEditTermsTitleEn');
    var txtEditTermsTitleAr = document.getElementById('txtEditTermsTitleAr');
    var txtEditTermsDescEn = document.getElementById('txtEditTermsDescEn');
    var txtEditTermsDescAr = document.getElementById('txtEditTermsDescAr');

    txtEditTermsTitleEn.value = en;
    txtEditTermsTitleAr.value = ar;
    txtEditTermsDescEn.value = descEn;
    txtEditTermsDescAr.value = descAr;

    $('.EditTermsInfo').attr('onclick', "EditTermsInfoById(" + id + ");");

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300);
}

function EditTermsInfoById(id) {
    let val = true;
    var txtEditTermsTitleEn = document.getElementById('txtEditTermsTitleEn');
    var txtEditTermsTitleAr = document.getElementById('txtEditTermsTitleAr');

    if (txtEditTermsTitleEn.value.trim() === "") {
        val = false;
        txtEditTermsTitleEn.style.background = "#fff9b3";
    }
    else {
        txtEditTermsTitleEn.style.background = "#ffffff";
    }

    if (txtEditTermsTitleAr.value.trim() === "") {
        val = false;
        txtEditTermsTitleAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtEditTermsTitleAr.value.trim())) {
            txtEditTermsTitleAr.style.background = "#ffffff";
        } else {
            val = false;
            txtEditTermsTitleAr.style.background = "#fff9b3";
        }
    }

    var txtEditTermsDescEn = document.getElementById('txtEditTermsDescEn');
    var txtEditTermsDescAr = document.getElementById('txtEditTermsDescAr');

    if (txtEditTermsDescEn.value.trim() === "") {
        val = false;
        txtEditTermsDescEn.style.background = "#fff9b3";
    }
    else {
        txtEditTermsDescEn.style.background = "#ffffff";
    }

    if (txtEditTermsDescAr.value.trim() === "") {
        val = false;
        txtEditTermsDescAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtEditTermsTitleAr.value.trim())) {
            txtEditTermsDescAr.style.background = "#ffffff";
        } else {
            val = false;
            txtEditTermsDescAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();
        fdata.append('id', id);
        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtEditTermsTitleEn.value.trim());
        fdata.append('name_ar', txtEditTermsTitleAr.value.trim());
        fdata.append('answer_en', txtEditTermsDescEn.value.trim());
        fdata.append('answer_ar', txtEditTermsDescAr.value.trim());
        fdata.append('auth_token', "");

        $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/edit_terms_of_use_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllTermsList();
                $('#lnkTermsList').click();
                ClearEditTermsData();
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

function ClearEditTermsData() {
    var txtEditTermsTitleEn = document.getElementById('txtEditTermsTitleEn');
    var txtEditTermsTitleAr = document.getElementById('txtEditTermsTitleAr');
    var txtEditTermsDescEn = document.getElementById('txtEditTermsDescEn');
    var txtEditTermsDescAr = document.getElementById('txtEditTermsDescAr');

    txtEditTermsTitleEn.value = '';
    txtEditTermsTitleAr.value = '';
    txtEditTermsDescEn.value = '';
    txtEditTermsDescAr.value = '';
}

function DeleteTerms(id) {
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
            url: '/api/main.asmx/delete_terms_of_use',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllTermsList();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');
            }
        });
    });
}


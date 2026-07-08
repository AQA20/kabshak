let contactAddressesList = [];
GetAllAddressesList();

function GetAllAddressesList() {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    var fdata = new FormData();
    fdata.append('auth_token', "");

    $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/all_contact_us_addresses',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillAddresses(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function FillAddresses(data) {
    contactAddressesList = data;
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

            items.push(`<tr class="RemoveRecord_${item.Id}">
                            <td class="product-name">
                                <div class="product-cat">
                                    <ins class="new-price">Id: ${item.Id}</ins>
                                </div>
                                <div class="product-cat" style="color: #593930;">
                                    <ins class="new-price">Title (EN): ${item.TitleEn}</ins>
                                </div>
                                <div class="product-cat" style="color: #777;">
                                    <ins class="new-price">Title (AR): ${item.TitleAr}</ins>
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
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" onClick="EditContactAddress(${index});">Edit</button>
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" style="padding-left: 20px; padding-right: 20px;" onClick="ChangeAddressStatus(this,'active${classRandom}',${item.Id},${item.IsActive})">${item.IsActive ? 'Deactivate' : 'Activate'}</button>
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

function ChangeAddressStatus(btn, classname, id, active) {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    $('.' + classname.replace('active', 'alert')).addClass('d-none');
    $('.' + classname.replace('active', 'alert')).removeClass('d-flex');

    if (active) {
        btn.textContent = "Activate";
        btn.setAttribute("onclick", "ChangeAddressStatus(this,'" + classname + "'," + id + ", false);");
        $('.' + classname).html('In Active');
        $('.' + classname).addClass('text-danger');
    }
    else {
        btn.textContent = "Deactivate";
        btn.setAttribute("onclick", "ChangeAddressStatus(this,'" + classname + "'," + id + ", true);");
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
        url: '/api/main.asmx/chnage_contact_us_address_activation_status',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            $('.' + classname.replace('active', 'alert')).removeClass('d-none');
            $('.' + classname.replace('active', 'alert')).addClass('d-flex');
            $('.alert' + classname.replace('active', '') + ' p').html('The item has been ' + (active ? 'deactivated.' : 'activated.'));
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

function SaveAddressInfo() {
    var val = true;

    var txtAddressTitleEn = document.getElementById('txtAddressTitleEn');
    var txtAddressTitleAr = document.getElementById('txtAddressTitleAr');
    var txtAddressDescEn = document.getElementById('txtAddressDescEn');
    var txtAddressDescAr = document.getElementById('txtAddressDescAr');

    if (txtAddressTitleEn.value.trim() === "") {
        val = false;
        txtAddressTitleEn.style.background = "#fff9b3";
    } else {
        txtAddressTitleEn.style.background = "#ffffff";
    }

    if (txtAddressTitleAr.value.trim() === "") {
        val = false;
        txtAddressTitleAr.style.background = "#fff9b3";
    } else {
        txtAddressTitleAr.style.background = "#ffffff";
    }

    if (txtAddressDescEn.value.trim() === "") {
        val = false;
        txtAddressDescEn.style.background = "#fff9b3";
    } else {
        txtAddressDescEn.style.background = "#ffffff";
    }

    if (txtAddressDescAr.value.trim() === "") {
        val = false;
        txtAddressDescAr.style.background = "#fff9b3";
    } else {
        txtAddressDescAr.style.background = "#ffffff";
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();
        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtAddressTitleEn.value.trim());
        fdata.append('name_ar', txtAddressTitleAr.value.trim());
        fdata.append('answer_en', txtAddressDescEn.value.trim());
        fdata.append('answer_ar', txtAddressDescAr.value.trim());
        fdata.append('auth_token', "");

        $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/add_contact_us_address_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllAddressesList();
                $('#lnkAddressesList').click();
                ClearAddAddressData();
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

function ClearAddAddressData() {
    document.getElementById('txtAddressTitleEn').value = '';
    document.getElementById('txtAddressTitleAr').value = '';
    document.getElementById('txtAddressDescEn').value = '';
    document.getElementById('txtAddressDescAr').value = '';
}

function EditContactAddress(index) {
    let item = contactAddressesList[index];
    EditAddressInfo(item.Id, item.TitleEn, item.TitleAr, item.DescriptionEn ? item.DescriptionEn.trim() : "", item.DescriptionAr ? item.DescriptionAr.trim() : "");
}

function EditAddressInfo(id, en, ar, DescEn, DescAr) {
    $('#lnkEditAddress').click();

    var txtEditAddressTitleEn = document.getElementById('txtEditAddressTitleEn');
    var txtEditAddressTitleAr = document.getElementById('txtEditAddressTitleAr');
    var txtEditAddressDescEn = document.getElementById('txtEditAddressDescEn');
    var txtEditAddressDescAr = document.getElementById('txtEditAddressDescAr');

    txtEditAddressTitleEn.value = en;
    txtEditAddressTitleAr.value = ar;
    txtEditAddressDescEn.value = DescEn;
    txtEditAddressDescAr.value = DescAr;

    $('.EditAddressInfo').attr('onclick', "EditAddressInfoById(" + id + ");");

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300);
}

function EditAddressInfoById(id) {
    let val = true;
    var txtEditAddressTitleEn = document.getElementById('txtEditAddressTitleEn');
    var txtEditAddressTitleAr = document.getElementById('txtEditAddressTitleAr');
    var txtEditAddressDescEn = document.getElementById('txtEditAddressDescEn');
    var txtEditAddressDescAr = document.getElementById('txtEditAddressDescAr');

    if (txtEditAddressTitleEn.value.trim() === "") {
        val = false;
        txtEditAddressTitleEn.style.background = "#fff9b3";
    } else {
        txtEditAddressTitleEn.style.background = "#ffffff";
    }

    if (txtEditAddressTitleAr.value.trim() === "") {
        val = false;
        txtEditAddressTitleAr.style.background = "#fff9b3";
    } else {
        txtEditAddressTitleAr.style.background = "#ffffff";
    }

    if (txtEditAddressDescEn.value.trim() === "") {
        val = false;
        txtEditAddressDescEn.style.background = "#fff9b3";
    } else {
        txtEditAddressDescEn.style.background = "#ffffff";
    }

    if (txtEditAddressDescAr.value.trim() === "") {
        val = false;
        txtEditAddressDescAr.style.background = "#fff9b3";
    } else {
        txtEditAddressDescAr.style.background = "#ffffff";
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();
        fdata.append('id', id);
        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtEditAddressTitleEn.value.trim());
        fdata.append('name_ar', txtEditAddressTitleAr.value.trim());
        fdata.append('answer_en', txtEditAddressDescEn.value.trim());
        fdata.append('answer_ar', txtEditAddressDescAr.value.trim());
        fdata.append('auth_token', "");

        $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/edit_contact_us_address_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllAddressesList();
                $('#lnkAddressesList').click();
                ClearEditAddressData();
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

function ClearEditAddressData() {
    document.getElementById('txtEditAddressTitleEn').value = '';
    document.getElementById('txtEditAddressTitleAr').value = '';
    document.getElementById('txtEditAddressDescEn').value = '';
    document.getElementById('txtEditAddressDescAr').value = '';
}

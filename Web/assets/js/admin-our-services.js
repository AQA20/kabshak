let servicesList = [];
GetAllServicesList();

function GetAllServicesList() {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    var fdata = new FormData();
    fdata.append('auth_token', "");

    $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/all_our_services',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillServices(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function FillServices(data) {
    servicesList = data;
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
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" onClick="EditService(${index});">Edit</button>
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" style="padding-left: 10px; padding-right: 10px;" onClick="ChangeServiceStatus(this,'active${classRandom}',${item.Id},${item.IsActive})">${item.IsActive ? 'Deactivate' : 'Activate'}</button>
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0 text-danger" style="border-color: #cc0001;" onClick="DeleteService(${item.Id});">Delete</button>
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

function ChangeServiceStatus(btn, classname, id, active) {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    $('.' + classname.replace('active', 'alert')).addClass('d-none');
    $('.' + classname.replace('active', 'alert')).removeClass('d-flex');

    if (active) {
        btn.textContent = "Activate";
        btn.setAttribute("onclick", "ChangeServiceStatus(this,'" + classname + "'," + id + ", false);");
        $('.' + classname).html('In Active');
        $('.' + classname).addClass('text-danger');
    }
    else {
        btn.textContent = "Deactivate";
        btn.setAttribute("onclick", "ChangeServiceStatus(this,'" + classname + "'," + id + ", true);");
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
        url: '/api/main.asmx/chnage_our_service_activation_status',
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

function SaveServiceInfo() {
    var val = true;

    var txtServiceTitleEn = document.getElementById('txtServiceTitleEn');
    var txtServiceTitleAr = document.getElementById('txtServiceTitleAr');
    var txtServiceDescEn = document.getElementById('txtServiceDescEn');
    var txtServiceDescAr = document.getElementById('txtServiceDescAr');

    if (txtServiceTitleEn.value.trim() === "") {
        val = false;
        txtServiceTitleEn.style.background = "#fff9b3";
    } else {
        txtServiceTitleEn.style.background = "#ffffff";
    }

    if (txtServiceTitleAr.value.trim() === "") {
        val = false;
        txtServiceTitleAr.style.background = "#fff9b3";
    } else {
        txtServiceTitleAr.style.background = "#ffffff";
    }

    if (txtServiceDescEn.value.trim() === "") {
        val = false;
        txtServiceDescEn.style.background = "#fff9b3";
    } else {
        txtServiceDescEn.style.background = "#ffffff";
    }

    if (txtServiceDescAr.value.trim() === "") {
        val = false;
        txtServiceDescAr.style.background = "#fff9b3";
    } else {
        txtServiceDescAr.style.background = "#ffffff";
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();
        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtServiceTitleEn.value.trim());
        fdata.append('name_ar', txtServiceTitleAr.value.trim());
        fdata.append('answer_en', txtServiceDescEn.value.trim());
        fdata.append('answer_ar', txtServiceDescAr.value.trim());
        fdata.append('auth_token', "");

        $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/add_our_service_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllServicesList();
                $('#lnkServicesList').click();
                ClearAddServiceData();
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

function ClearAddServiceData() {
    document.getElementById('txtServiceTitleEn').value = '';
    document.getElementById('txtServiceTitleAr').value = '';
    document.getElementById('txtServiceDescEn').value = '';
    document.getElementById('txtServiceDescAr').value = '';
}

function EditService(index) {
    let item = servicesList[index];
    ShowEditServiceForm(item.Id, item.TitleEn, item.TitleAr, item.DescriptionEn ? item.DescriptionEn.trim() : "", item.DescriptionAr ? item.DescriptionAr.trim() : "");
}

function ShowEditServiceForm(id, en, ar, DescEn, DescAr) {
    $('#lnkEditService').click();

    var txtEditServiceTitleEn = document.getElementById('txtEditServiceTitleEn');
    var txtEditServiceTitleAr = document.getElementById('txtEditServiceTitleAr');
    var txtEditServiceDescEn = document.getElementById('txtEditServiceDescEn');
    var txtEditServiceDescAr = document.getElementById('txtEditServiceDescAr');

    txtEditServiceTitleEn.value = en;
    txtEditServiceTitleAr.value = ar;
    txtEditServiceDescEn.value = DescEn;
    txtEditServiceDescAr.value = DescAr;

    $('.EditServiceInfo').attr('onclick', "EditServiceInfoById(" + id + ");");

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300);
}

function EditServiceInfoById(id) {
    let val = true;
    var txtEditServiceTitleEn = document.getElementById('txtEditServiceTitleEn');
    var txtEditServiceTitleAr = document.getElementById('txtEditServiceTitleAr');
    var txtEditServiceDescEn = document.getElementById('txtEditServiceDescEn');
    var txtEditServiceDescAr = document.getElementById('txtEditServiceDescAr');

    if (txtEditServiceTitleEn.value.trim() === "") {
        val = false;
        txtEditServiceTitleEn.style.background = "#fff9b3";
    } else {
        txtEditServiceTitleEn.style.background = "#ffffff";
    }

    if (txtEditServiceTitleAr.value.trim() === "") {
        val = false;
        txtEditServiceTitleAr.style.background = "#fff9b3";
    } else {
        txtEditServiceTitleAr.style.background = "#ffffff";
    }

    if (txtEditServiceDescEn.value.trim() === "") {
        val = false;
        txtEditServiceDescEn.style.background = "#fff9b3";
    } else {
        txtEditServiceDescEn.style.background = "#ffffff";
    }

    if (txtEditServiceDescAr.value.trim() === "") {
        val = false;
        txtEditServiceDescAr.style.background = "#fff9b3";
    } else {
        txtEditServiceDescAr.style.background = "#ffffff";
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();
        fdata.append('id', id);
        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtEditServiceTitleEn.value.trim());
        fdata.append('name_ar', txtEditServiceTitleAr.value.trim());
        fdata.append('answer_en', txtEditServiceDescEn.value.trim());
        fdata.append('answer_ar', txtEditServiceDescAr.value.trim());
        fdata.append('auth_token', "");

        $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/edit_our_service_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllServicesList();
                $('#lnkServicesList').click();
                ClearEditServiceData();
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

function ClearEditServiceData() {
    document.getElementById('txtEditServiceTitleEn').value = '';
    document.getElementById('txtEditServiceTitleAr').value = '';
    document.getElementById('txtEditServiceDescEn').value = '';
    document.getElementById('txtEditServiceDescAr').value = '';
}

function DeleteService(id) {
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
            url: '/api/main.asmx/delete_our_service',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllServicesList();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');
            }
        });
    });
}

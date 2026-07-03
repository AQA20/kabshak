GetAllActionsList();

function GetAllActionsList() {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    var fdata = new FormData();

    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/statuses',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillActions(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function FillActions(data) {
    var Actions = data;
    $('.productsList').html(' ');
    if (Actions.length > 0) {
        let index = 0;
        let items = [];

        for (index; index < Actions.length; index++) {
            let item = Actions[index];

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
                                <div class="product-cat" style="color: #F29811;">
                                    <ins class="new-price">Name: ${item.NameEn}</ins>
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
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" onClick="EditActionInfo(${item.Id},'${item.NameEn}','${item.NameAr}');">Edit</button>
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" style=" padding-left: 20px;padding-right: 20px;" onClick="ChangeActionStatus(this,'active${classRandom}',${item.Id},${item.IsActive})">${item.IsActive ? 'Dectivate' : 'Activate'}</button>
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
        $('.result').html('<div style="font-weight: 500;color: #F29811;padding: 5px;font-size: 20px;padding-bottom: 350px;"><span class="w-icon-search-plus" style="padding-right: 5px;padding-left: 5px;"></span>No result found!</div>');
    }
    setTimeout(
        function () {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }, 1000);
}

function ChangeActionStatus(btn, classname, id, active) {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    $('.' + classname.replace('active', 'alert')).addClass('d-none');
    $('.' + classname.replace('active', 'alert')).removeClass('d-flex');

    if (active) {
        btn.textContent = "Activate";
        btn.setAttribute("onclick", "ChangeActionStatus(this,'" + classname + "'," + id + ", false);");
        $('.' + classname).html('In Active')
        $('.' + classname).addClass('text-danger');
    }
    else {
        btn.textContent = "Deactivate";
        btn.setAttribute("onclick", "ChangeActionStatus(this,'" + classname + "'," + id + ", true);");
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
        url: '/api/main.asmx/chnage_status_activation_status',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            $('.' + classname.replace('active', 'alert')).removeClass('d-none');
            $('.' + classname.replace('active', 'alert')).addClass('d-flex');
            $('.alert' + classname.replace('active', '') + ' p').html('The sub category has been ' + (active ? 'deactivated.' : 'activated.'));
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

function SaveActionInfo() {
    var val = true;

    var txtActionNameEn = document.getElementById('txtActionNameEn');
    var txtActionNameAr = document.getElementById('txtActionNameAr');

    if (txtActionNameEn.value.trim() === "") {
        val = false;
        txtActionNameEn.style.background = "#fff9b3";
    }
    else {
        txtActionNameEn.style.background = "#ffffff";
    }

    if (txtActionNameAr.value.trim() === "") {
        val = false;
        txtActionNameAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtActionNameAr.value.trim())) {
            txtActionNameAr.style.background = "#ffffff";
        } else {
            val = false;
            txtActionNameAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();

        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtActionNameEn.value.trim());
        fdata.append('name_ar', txtActionNameAr.value.trim());

        fdata.append('auth_token', "");  $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/add_status_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllActionsList();
                $('#lnkCategoriesList').click();
                ClearAddActionData();
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

function ClearAddActionData() {
    var txtActionNameEn = document.getElementById('txtActionNameEn');
    var txtActionNameAr = document.getElementById('txtActionNameAr');

    txtActionNameEn.value = '';
    txtActionNameAr.value = '';
}


function EditActionInfo(id, en, ar) {
    $('#lnkEditCategory').click();

    var txtEditActionNameEn = document.getElementById('txtEditActionNameEn');
    var txtEditActionNameAr = document.getElementById('txtEditActionNameAr');

    txtEditActionNameEn.value = en.trim();
    txtEditActionNameAr.value = ar.trim();

    $('.EditActionInfo').attr('onclick', "EditActionInfoById(" + id + ");");

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

function EditActionInfoById(id) {
    var val = true;

    var txtActionNameEn = document.getElementById('txtEditActionNameEn');
    var txtActionNameAr = document.getElementById('txtEditActionNameAr');

    if (txtActionNameEn.value.trim() === "") {
        val = false;
        txtActionNameEn.style.background = "#fff9b3";
    }
    else {
        txtActionNameEn.style.background = "#ffffff";
    }

    if (txtActionNameAr.value.trim() === "") {
        val = false;
        txtActionNameAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtActionNameAr.value.trim())) {
            txtActionNameAr.style.background = "#ffffff";
        } else {
            val = false;
            txtActionNameAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();

        fdata.append('id', id);
        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtActionNameEn.value.trim());
        fdata.append('name_ar', txtActionNameAr.value.trim());


        fdata.append('auth_token', "");  $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/edit_status_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllActionsList();
                $('#lnkCategoriesList').click();
                ClearEditActionData();
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

function ClearEditActionData() {
    var txtActionNameEn = document.getElementById('txtEditActionNameEn');
    var txtActionNameAr = document.getElementById('txtEditActionNameAr');

    txtActionNameEn.value = '';
    txtActionNameAr.value = '';
}

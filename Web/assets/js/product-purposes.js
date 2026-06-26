GetAllProductPurposesList();

function GetAllProductPurposesList() {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    var fdata = new FormData();

    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/productpurposes',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillProductPurposes(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function FillProductPurposes(data) {
    var ProductPurposes = data;
    $('.productsList').html(' ');
    if (ProductPurposes.length > 0) {
        let index = 0;
        let items = [];

        for (index; index < ProductPurposes.length; index++) {
            let item = ProductPurposes[index];

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
                                <div class="product-cat" style="color: #05D7A0;">
                                    <ins class="new-price">Name: ${item.NameEn}</ins>
                                </div>
                            </td>
                            <td class="product-price">
                                <ins class="new-price active${classRandom} ${item.IsActive ? '' : 'text-danger'}">${item.IsActive ? 'Is Active' : 'In Active'}</ins>
                            </td>
                            <td class="product-stock-status">
                                <span class="wishlist-in-stock">${_date}</span>
                            </td>
                            <td class="wishlist-ProductPurpose">
                                <div class="d-lg-flex">
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" onClick="EditProductPurposeInfo(${item.Id},'${item.NameEn}','${item.NameAr}');">Edit</button>
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" style=" padding-left: 20px;padding-right: 20px;" onClick="ChangeProductPurposeStatus(this,'active${classRandom}',${item.Id},${item.IsActive})">${item.IsActive ? 'Dectivate' : 'Activate'}</button>
                                    </div>
                                <div class="alert alert-icon alert-success alert-bg alert-inline show-code-ProductPurpose mt-2 d-none alert${classRandom}">
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
                                                    <th class="wishlist-ProductPurpose">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody class="productsList">
                                            </tbody>
                                        </table>`);

        $('.productsList').prepend(items);
    }
    else {
        $('.result').html('<div style="font-weight: 500;color: #05D7A0;padding: 5px;font-size: 20px;padding-bottom: 350px;"><span class="w-icon-search-plus" style="padding-right: 5px;padding-left: 5px;"></span>No result found!</div>');
    }
    setTimeout(
        function () {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }, 1000);
}

function ChangeProductPurposeStatus(btn, classname, id, active) {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    $('.' + classname.replace('active', 'alert')).addClass('d-none');
    $('.' + classname.replace('active', 'alert')).removeClass('d-flex');

    if (active) {
        btn.textContent = "Activate";
        btn.setAttribute("onclick", "ChangeProductPurposeStatus(this,'" + classname + "'," + id + ", false);");
        $('.' + classname).html('In Active')
        $('.' + classname).addClass('text-danger');
    }
    else {
        btn.textContent = "Deactivate";
        btn.setAttribute("onclick", "ChangeProductPurposeStatus(this,'" + classname + "'," + id + ", true);");
        $('.' + classname).removeClass('text-danger');
        $('.' + classname).html('Is Active');
    }

    var fdata = new FormData();

    fdata.append('id', id.toString());
    fdata.append('user_token', userId.trim());
    fdata.append('status', (!active).toString());

    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/chnage_status_activation_productpurposes',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            $('.' + classname.replace('active', 'alert')).removeClass('d-none');
            $('.' + classname.replace('active', 'alert')).addClass('d-flex');
            $('.alert' + classname.replace('active', '') + ' p').html('The product purpose has been ' + (active ? 'deactivated.' : 'activated.'));
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

function SaveProductPurposeInfo() {
    var val = true;

    var txtProductPurposeNameEn = document.getElementById('txtProductPurposeNameEn');
    var txtProductPurposeNameAr = document.getElementById('txtProductPurposeNameAr');

    if (txtProductPurposeNameEn.value.trim() === "") {
        val = false;
        txtProductPurposeNameEn.style.background = "#fff9b3";
    }
    else {
        txtProductPurposeNameEn.style.background = "#ffffff";
    }

    if (txtProductPurposeNameAr.value.trim() === "") {
        val = false;
        txtProductPurposeNameAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtProductPurposeNameAr.value.trim())) {
            txtProductPurposeNameAr.style.background = "#ffffff";
        } else {
            val = false;
            txtProductPurposeNameAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();

        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtProductPurposeNameEn.value.trim());
        fdata.append('name_ar', txtProductPurposeNameAr.value.trim());

        fdata.append('auth_token', ""); $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/add_productpurposes_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllProductPurposesList();
                $('#lnkCategoriesList').click();
                ClearAddProductPurposeData();
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

function ClearAddProductPurposeData() {
    var txtProductPurposeNameEn = document.getElementById('txtProductPurposeNameEn');
    var txtProductPurposeNameAr = document.getElementById('txtProductPurposeNameAr');

    txtProductPurposeNameEn.value = '';
    txtProductPurposeNameAr.value = '';
}


function EditProductPurposeInfo(id, en, ar) {
    $('#lnkEditCategory').click();

    var txtEditProductPurposeNameEn = document.getElementById('txtEditProductPurposeNameEn');
    var txtEditProductPurposeNameAr = document.getElementById('txtEditProductPurposeNameAr');

    txtEditProductPurposeNameEn.value = en.trim();
    txtEditProductPurposeNameAr.value = ar.trim();

    $('.EditProductPurposeInfo').attr('onclick', "EditProductPurposeInfoById(" + id + ");");

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

function EditProductPurposeInfoById(id) {
    var val = true;

    var txtProductPurposeNameEn = document.getElementById('txtEditProductPurposeNameEn');
    var txtProductPurposeNameAr = document.getElementById('txtEditProductPurposeNameAr');

    if (txtProductPurposeNameEn.value.trim() === "") {
        val = false;
        txtProductPurposeNameEn.style.background = "#fff9b3";
    }
    else {
        txtProductPurposeNameEn.style.background = "#ffffff";
    }

    if (txtProductPurposeNameAr.value.trim() === "") {
        val = false;
        txtProductPurposeNameAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtProductPurposeNameAr.value.trim())) {
            txtProductPurposeNameAr.style.background = "#ffffff";
        } else {
            val = false;
            txtProductPurposeNameAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();

        fdata.append('id', id);
        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtProductPurposeNameEn.value.trim());
        fdata.append('name_ar', txtProductPurposeNameAr.value.trim());


        fdata.append('auth_token', ""); $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/edit_productpurposes_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllProductPurposesList();
                $('#lnkCategoriesList').click();
                ClearEditProductPurposeData();
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

function ClearEditProductPurposeData() {
    var txtProductPurposeNameEn = document.getElementById('txtEditProductPurposeNameEn');
    var txtProductPurposeNameAr = document.getElementById('txtEditProductPurposeNameAr');

    txtProductPurposeNameEn.value = '';
    txtProductPurposeNameAr.value = '';
}

BindCountiries();
GetAllSlaughterhousesList();

function BindCountiries() {
    var fdata = new FormData();
    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/countries',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillCountriesList(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {


        }
    });
}

function FillCountriesList(data) {
    if (data.length > 0) {
        var countries = data;
        let index = 0;
        let items = [];
        for (index; index < countries.length; index++) {
            let item = countries[index];
            items.push(`<option value="${item.CountryId}">${IsArabic ? item.CountryNameAr : item.CountryNameEn}</option>`);
        }

        $('[name="country"]').html(items);
    }
}

function SaveSlaughterhouseInfo() {
    var val = true;

    var txtSlaughterhouseNameEn = document.getElementById('txtSlaughterhouseNameEn');
    var txtSlaughterhouseNameAr = document.getElementById('txtSlaughterhouseNameAr');

    if (txtSlaughterhouseNameEn.value.trim() === "") {
        val = false;
        txtSlaughterhouseNameEn.style.background = "#fff9b3";
    }
    else {
        txtSlaughterhouseNameEn.style.background = "#ffffff";
    }

    if (txtSlaughterhouseNameAr.value.trim() === "") {
        val = false;
        txtSlaughterhouseNameAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtSlaughterhouseNameAr.value.trim())) {
            txtSlaughterhouseNameAr.style.background = "#ffffff";
        } else {
            val = false;
            txtSlaughterhouseNameAr.style.background = "#fff9b3";
        }
    }

    var txtSlaughterhouseDescriptionEn = document.getElementById('txtSlaughterhouseDescriptionEn');
    var txtSlaughterhouseDescriptionAr = document.getElementById('txtSlaughterhouseDescriptionAr');

    if (txtSlaughterhouseDescriptionEn.value.trim() === "") {
        val = false;
        txtSlaughterhouseDescriptionEn.style.background = "#fff9b3";
    }
    else {
        txtSlaughterhouseDescriptionEn.style.background = "#ffffff";
    }

    if (txtSlaughterhouseDescriptionAr.value.trim() === "") {
        val = false;
        txtSlaughterhouseDescriptionAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtSlaughterhouseNameAr.value.trim())) {
            txtSlaughterhouseDescriptionAr.style.background = "#ffffff";
        } else {
            val = false;
            txtSlaughterhouseDescriptionAr.style.background = "#fff9b3";
        }
    }

    var txtAddressDetailsEn = document.getElementById('txtAddressDetailsEn');
    var txtAddressDetailsAr = document.getElementById('txtAddressDetailsAr');

    if (txtAddressDetailsEn.value.trim() === "") {
        val = false;
        txtAddressDetailsEn.style.background = "#fff9b3";
    }
    else {
        txtAddressDetailsEn.style.background = "#ffffff";
    }

    if (txtAddressDetailsAr.value.trim() === "") {
        val = false;
        txtAddressDetailsAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtAddressDetailsAr.value.trim())) {
            txtAddressDetailsAr.style.background = "#ffffff";
        } else {
            val = false;
            txtAddressDetailsAr.style.background = "#fff9b3";
        }
    }

    var email = document.getElementById('txtEmail');

    if (email.value.trim() === "") {
        val = false;
        email.style.background = "#fff9b3";
    }
    else {
        if (!ValidateEmail(email.value.trim())) {
            val = false;
            email.style.background = "#fff9b3";
        }
        else {
            email.style.background = "#ffffff";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');
        var countryid = $('[name="country"]').find(":selected").val();

        var fdata = new FormData();
        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtSlaughterhouseNameEn.value.trim());
        fdata.append('name_ar', txtSlaughterhouseNameAr.value.trim());
        fdata.append('description_en', txtSlaughterhouseDescriptionEn.value.trim());
        fdata.append('description_ar', txtSlaughterhouseDescriptionAr.value.trim());
        fdata.append('countryid', countryid);
        fdata.append('email', email.value.trim());
        fdata.append('address_en', txtAddressDetailsEn.value.trim());
        fdata.append('address_ar', txtAddressDetailsAr.value.trim());

        fdata.append('auth_token', "");  $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/add_slaughterhouse_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllSlaughterhousesList();
                $('#lnkCategoriesList').click();
                ClearAddSlaughterhouseDataData();
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

function GetAllSlaughterhousesList() {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    var fdata = new FormData();

    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/all_slaughterhouses',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillSlaughterhouses(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function FillSlaughterhouses(data) {
    $('.productsList').html(' ');
    if (data.length > 0) {
        let index = 0;
        let items = [];

        for (index; index < data.length; index++) {
            let item = data[index];

            let classRandom = (Math.random() + 1).toString(36).substring(7);
            var _date = new Date(item.Date.toString());
            var dd = String(_date.getDate()).padStart(2, '0');
            var mm = String(_date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = _date.getFullYear();
            _date = dd + '/' + mm + '/' + yyyy;

            items.push(`<tr class="RemoveRecord_14">
                            <td class="product-name">
                                <div class="product-cat" style="color: #593930;">
                                    <ins class="new-price">${item.NameEn}</ins>
                                </div>
                            </td>
                            <td class="product-price">
                                        <span class="wishlist-in-stock">${item.CountryName}</span>
                            </td>
                            <td class="product-price">
                                <ins class="new-price active${classRandom} ${item.IsActive ? '' : 'text-danger'}">${item.IsActive ? 'Is Active' : 'In Active'}</ins>
                            </td>
                            <td class="product-stock-status">
                                <span class="wishlist-in-stock">${_date}</span>
                            </td>
                            <td class="wishlist-action">
                                <div class="d-lg-flex justify-content-between">
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" onClick="EditSlaughterhouseInfo(${item.Id},${item.CountryId},'${item.NameEn}','${item.NameAr}','${item.DescriptionEn.trim()}','${item.DescriptionAr.trim()}','${item.Email.trim()}','${item.AddressEn.trim()}','${item.AddressAr.trim()}');">Edit</button>
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" style=" padding-left: 20px;padding-right: 20px;" onClick="ChangeSlaughterhouseStatus(this,'active${classRandom}',${item.Id},${item.IsActive})">${item.IsActive ? 'Dectivate' : 'Activate'}</button>
                                </div>
                                <div class="d-lg-flex justify-content-between">
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mt-2 mb-lg-0" style="width:100%;" onClick="GenerateLoginAuthentication(${item.Id},'login${classRandom}');">Login Authentication</button>
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
                                                    <th class="product-price product-country" style="text-align: unset;"><span>Country</span></th>
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

function ClearAddSlaughterhouseDataData() {
    BindCountiries();

    var txtSlaughterhouseNameEn = document.getElementById('txtSlaughterhouseNameEn');
    var txtSlaughterhouseNameAr = document.getElementById('txtSlaughterhouseNameAr');
    var txtSlaughterhouseDescriptionEn = document.getElementById('txtSlaughterhouseDescriptionEn');
    var txtSlaughterhouseDescriptionAr = document.getElementById('txtSlaughterhouseDescriptionAr');
    var txtAddressDetailsEn = document.getElementById('txtAddressDetailsEn');
    var txtAddressDetailsAr = document.getElementById('txtAddressDetailsAr');
    var txtEmail = document.getElementById('txtEmail');
    txtSlaughterhouseNameEn.value = '';
    txtSlaughterhouseNameAr.value = '';
    txtSlaughterhouseDescriptionEn.value = '';
    txtSlaughterhouseDescriptionAr.value = '';
    txtEmail.value = '';
    txtAddressDetailsAr.value = '';
    txtAddressDetailsEn.value = '';
}

function EditSlaughterhouseInfo(id, countryid, en, ar, DescEn, DescAr, email, addressEn, addressAr) {
    $('#lnkEditCategory').click();

    var txtEditSlaughterhouseNameEn = document.getElementById('txtEditSlaughterhouseNameEn');
    var txtEditSlaughterhouseNameAr = document.getElementById('txtEditSlaughterhouseNameAr');
    var txtEditSlaughterhouseDescriptionEn = document.getElementById('txtEditSlaughterhouseDescriptionEn');
    var txtEditSlaughterhouseDescriptionAr = document.getElementById('txtEditSlaughterhouseDescriptionAr');

    txtEditSlaughterhouseNameEn.value = en;
    txtEditSlaughterhouseNameAr.value = ar;
    txtEditSlaughterhouseDescriptionEn.value = DescEn;
    txtEditSlaughterhouseDescriptionAr.value = DescAr;


    var txtEditAddressDetailsEn = document.getElementById('txtEditAddressDetailsEn');
    var txtEditAddressDetailsAr = document.getElementById('txtEditAddressDetailsAr');
    var txtEmail = document.getElementById('txtEditEmail');
    txtEditAddressDetailsEn.value = addressEn;
    txtEditAddressDetailsAr.value = addressAr;
    txtEmail.value = email;

    $('.EditSlaughterhouseInfo').attr('onclick', "EditSlaughterhouseInfoById(" + id + ");");

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

function EditSlaughterhouseInfoById(id) {

    let val = true;
    var txtSlaughterhouseNameEn = document.getElementById('txtEditSlaughterhouseNameEn');
    var txtSlaughterhouseNameAr = document.getElementById('txtEditSlaughterhouseNameAr');

    if (txtSlaughterhouseNameEn.value.trim() === "") {
        val = false;
        txtSlaughterhouseNameEn.style.background = "#fff9b3";
    }
    else {
        txtSlaughterhouseNameEn.style.background = "#ffffff";
    }

    if (txtSlaughterhouseNameAr.value.trim() === "") {
        val = false;
        txtSlaughterhouseNameAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtSlaughterhouseNameAr.value.trim())) {
            txtSlaughterhouseNameAr.style.background = "#ffffff";
        } else {
            val = false;
            txtSlaughterhouseNameAr.style.background = "#fff9b3";
        }
    }

    var txtSlaughterhouseDescriptionEn = document.getElementById('txtEditSlaughterhouseDescriptionEn');
    var txtSlaughterhouseDescriptionAr = document.getElementById('txtEditSlaughterhouseDescriptionAr');

    if (txtSlaughterhouseDescriptionEn.value.trim() === "") {
        val = false;
        txtSlaughterhouseDescriptionEn.style.background = "#fff9b3";
    }
    else {
        txtSlaughterhouseDescriptionEn.style.background = "#ffffff";
    }

    if (txtSlaughterhouseDescriptionAr.value.trim() === "") {
        val = false;
        txtSlaughterhouseDescriptionAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtSlaughterhouseNameAr.value.trim())) {
            txtSlaughterhouseDescriptionAr.style.background = "#ffffff";
        } else {
            val = false;
            txtSlaughterhouseDescriptionAr.style.background = "#fff9b3";
        }
    }


    var txtEditAddressDetailsEn = document.getElementById('txtEditAddressDetailsEn');
    var txtEditAddressDetailsAr = document.getElementById('txtEditAddressDetailsAr');

    if (txtEditAddressDetailsEn.value.trim() === "") {
        val = false;
        txtEditAddressDetailsEn.style.background = "#fff9b3";
    }
    else {
        txtEditAddressDetailsEn.style.background = "#ffffff";
    }

    if (txtEditAddressDetailsAr.value.trim() === "") {
        val = false;
        txtEditAddressDetailsAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtEditAddressDetailsAr.value.trim())) {
            txtEditAddressDetailsAr.style.background = "#ffffff";
        } else {
            val = false;
            txtEditAddressDetailsAr.style.background = "#fff9b3";
        }
    }

    var email = document.getElementById('txtEditEmail');

    if (email.value.trim() === "") {
        val = false;
        email.style.background = "#fff9b3";
    }
    else {
        if (!ValidateEmail(email.value.trim())) {
            val = false;
            email.style.background = "#fff9b3";
        }
        else {
            email.style.background = "#ffffff";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();

        fdata.append('id', id);
        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtSlaughterhouseNameEn.value.trim());
        fdata.append('name_ar', txtSlaughterhouseNameAr.value.trim());
        fdata.append('Description_en', txtSlaughterhouseDescriptionEn.value.trim());
        fdata.append('Description_ar', txtSlaughterhouseDescriptionAr.value.trim());
        fdata.append('email', email.value.trim());
        fdata.append('address_en', txtEditAddressDetailsEn.value.trim());
        fdata.append('address_ar', txtEditAddressDetailsAr.value.trim());
        fdata.append('auth_token', "");  $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/edit_slaughterhouse_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllSlaughterhousesList();
                $('#lnkCategoriesList').click();
                ClearEditSlaughterhouseData();
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

function ClearEditSlaughterhouseData() {
    var txtSlaughterhouseNameEn = document.getElementById('txtEditSlaughterhouseNameEn');
    var txtSlaughterhouseNameAr = document.getElementById('txtEditSlaughterhouseNameAr');
    var txtSlaughterhouseDescriptionEn = document.getElementById('txtEditSlaughterhouseDescriptionEn');
    var txtSlaughterhouseDescriptionAr = document.getElementById('txtEditSlaughterhouseDescriptionAr');
    var txtAddressDetailsEn = document.getElementById('txtEditAddressDetailsEn');
    var txtAddressDetailsAr = document.getElementById('txtEditAddressDetailsAr');
    var txtEmail = document.getElementById('txtEditEmail');
    txtEmail.value = '';
    txtAddressDetailsAr.value = '';
    txtAddressDetailsEn.value = '';
    txtSlaughterhouseNameEn.value = '';
    txtSlaughterhouseNameAr.value = '';
    txtSlaughterhouseDescriptionEn.value = '';
    txtSlaughterhouseDescriptionAr.value = '';
}

function ChangeSlaughterhouseStatus(btn, classname, id, active) {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    $('.' + classname.replace('active', 'alert')).addClass('d-none');
    $('.' + classname.replace('active', 'alert')).removeClass('d-flex');

    if (active) {
        btn.textContent = "Activate";
        btn.setAttribute("onclick", "ChangeSlaughterhouseStatus(this,'" + classname + "'," + id + ", false);");
        $('.' + classname).html('In Active')
        $('.' + classname).addClass('text-danger');
    }
    else {
        btn.textContent = "Deactivate";
        btn.setAttribute("onclick", "ChangeSlaughterhouseStatus(this,'" + classname + "'," + id + ", true);");
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
        url: '/api/main.asmx/chnage_slaughterhouse_activation_status',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            $('.' + classname.replace('active', 'alert')).removeClass('d-none');
            $('.' + classname.replace('active', 'alert')).addClass('d-flex');
            $('.alert' + classname.replace('active', '') + ' p').html('The Slaughterhouse has been ' + (active ? 'deactivated.' : 'activated.'));
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

function GenerateLoginAuthentication(id, classname) {

    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    var fdata = new FormData();

    fdata.append('id', id.toString());
    fdata.append('user_token', userId.trim());

    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/generate_login_slaughterhouse_authentication',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            return_login_authentication(data, classname);
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

function return_login_authentication(data, classname) {
    if (data.length > 0) {
        $('.' + classname.replace('login', 'alert')).removeClass('d-none');
        $('.' + classname.replace('login', 'alert')).addClass('d-flex');
        $('.alert' + classname.replace('login', '') + ' p').html('Username:<br/>' + data[0] + '<br/>Password: ' + data[1]);
    }
}
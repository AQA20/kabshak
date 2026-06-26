const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

let CountryId = params.id
let CountryName = params.name
if (typeof CountryId == 'undefined' || CountryId == null || CountryId == '') {
    window.location = "/Home";
}

if (typeof CountryName !== 'undefined' && CountryName !== null && CountryName !== '') {

    $('.icon-box-title').html('Cities (' + CountryName + ')');
    $('.breadcrumb-name').html('Cities (' + CountryName + ')');
}


GetAllCitiesList();

function GetAllCitiesList() {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    var fdata = new FormData();
    fdata.append('country_id', CountryId);
    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/all_cities_by_id',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillCities(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function FillCities(data) {
    var Cities = JSON.parse(data);
    $('.productsList').html(' ');
    if (Cities.length > 0) {
        let index = 0;
        let items = [];

        for (index; index < Cities.length; index++) {
            let item = Cities[index];

            let classRandom = (Math.random() + 1).toString(36).substring(7);

            var _date = new Date(item.CreatedOnDate.toString());
            var dd = String(_date.getDate()).padStart(2, '0');
            var mm = String(_date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = _date.getFullYear();
            _date = dd + '/' + mm + '/' + yyyy;

            items.push(`<tr class="RemoveRecord_14">
                            <td class="product-name">
                                <div class="product-cat">
                                    <ins class="new-price">Id: ${item.CityId}</ins>
                                </div>
                                <div class="product-cat" style="color: #05D7A0;">
                                    <ins class="new-price">Name: ${item.CityNameEn}</ins>
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
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" onClick="EditCityInfo(${item.CityId},'${item.CityNameEn}','${item.CityNameAr}');">Edit</button>
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" style=" padding-left: 20px;padding-right: 20px;" onClick="ChangeCityStatus(this,'active${classRandom}',${item.CityId},${item.IsActive})">${item.IsActive ? 'Dectivate' : 'Activate'}</button>
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
        $('.result').html('<div style="font-weight: 500;color: #05D7A0;padding: 5px;font-size: 20px;padding-bottom: 350px;"><span class="w-icon-search-plus" style="padding-right: 5px;padding-left: 5px;"></span>No result found!</div>');
    }
    setTimeout(
        function () {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }, 1000);
}

function ChangeCityStatus(btn, classname, id, active) {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    $('.' + classname.replace('active', 'alert')).addClass('d-none');
    $('.' + classname.replace('active', 'alert')).removeClass('d-flex');

    if (active) {
        btn.textContent = "Activate";
        btn.setAttribute("onclick", "ChangeCityStatus(this,'" + classname + "'," + id + ", false);");
        $('.' + classname).html('In Active')
        $('.' + classname).addClass('text-danger');
    }
    else {
        btn.textContent = "Deactivate";
        btn.setAttribute("onclick", "ChangeCityStatus(this,'" + classname + "'," + id + ", true);");
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
        url: '/api/main.asmx/chnage_city_activation_status',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            $('.' + classname.replace('active', 'alert')).removeClass('d-none');
            $('.' + classname.replace('active', 'alert')).addClass('d-flex');
            $('.alert' + classname.replace('active', '') + ' p').html('The city has been ' + (active ? 'deactivated.' : 'activated.'));
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

function SaveCityInfo() {
    var val = true;

    var txtCityNameEn = document.getElementById('txtCityNameEn');
    var txtCityNameAr = document.getElementById('txtCityNameAr');

    if (txtCityNameEn.value.trim() === "") {
        val = false;
        txtCityNameEn.style.background = "#fff9b3";
    }
    else {
        txtCityNameEn.style.background = "#ffffff";
    }

    if (txtCityNameAr.value.trim() === "") {
        val = false;
        txtCityNameAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtCityNameAr.value.trim())) {
            txtCityNameAr.style.background = "#ffffff";
        } else {
            val = false;
            txtCityNameAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();

        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtCityNameEn.value.trim());
        fdata.append('name_ar', txtCityNameAr.value.trim());
        fdata.append('country_id', CountryId);

        fdata.append('auth_token', "");  $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/add_city_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllCitiesList();
                $('#lnkCategoriesList').click();
                ClearAddCityData();
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

function ClearAddCityData() {
    var txtCityNameEn = document.getElementById('txtCityNameEn');
    var txtCityNameAr = document.getElementById('txtCityNameAr');

    txtCityNameEn.value = '';
    txtCityNameAr.value = '';
}


function EditCityInfo(id, en, ar) {
    $('#lnkEditCategory').click();

    var txtEditCityNameEn = document.getElementById('txtEditCityNameEn');
    var txtEditCityNameAr = document.getElementById('txtEditCityNameAr');

    txtEditCityNameEn.value = en.trim();
    txtEditCityNameAr.value = ar.trim();

    $('.EditCityInfo').attr('onclick', "EditCityInfoById(" + id + ");");

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

function EditCityInfoById(id) {
    var val = true;

    var txtCityNameEn = document.getElementById('txtEditCityNameEn');
    var txtCityNameAr = document.getElementById('txtEditCityNameAr');

    if (txtCityNameEn.value.trim() === "") {
        val = false;
        txtCityNameEn.style.background = "#fff9b3";
    }
    else {
        txtCityNameEn.style.background = "#ffffff";
    }

    if (txtCityNameAr.value.trim() === "") {
        val = false;
        txtCityNameAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtCityNameAr.value.trim())) {
            txtCityNameAr.style.background = "#ffffff";
        } else {
            val = false;
            txtCityNameAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();

        fdata.append('id', id);
        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtCityNameEn.value.trim());
        fdata.append('name_ar', txtCityNameAr.value.trim());


        fdata.append('auth_token', "");  $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/edit_city_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllCitiesList();
                $('#lnkCategoriesList').click();
                ClearEditCityData();
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

function ClearEditCityData() {
    var txtCityNameEn = document.getElementById('txtEditCityNameEn');
    var txtCityNameAr = document.getElementById('txtEditCityNameAr');

    txtCityNameEn.value = '';
    txtCityNameAr.value = '';
}

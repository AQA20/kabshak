window.currnetNavClicked = 1
GetAllCountriesList();

function GetAllCountriesList() {
    let allParams = $('#search-filters-items :input').serialize();
    allParams = JSON.parse('{"' + decodeURI(allParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');

    var fdata = new FormData();
    fdata.append('txt', (allParams.searchtxt ? decodeURIComponent(allParams.searchtxt) : "-1").toString());
    fdata.append('active', (allParams.active ? decodeURIComponent(allParams.active) : "-1").toString());
    fdata.append('inactive', (allParams.inactive ? decodeURIComponent(allParams.inactive) : "-1").toString());
    fdata.append('start', (allParams.start ? decodeURIComponent(allParams.start) : "1").toString());
    fdata.append('end', (allParams.end ? decodeURIComponent(allParams.end) : "20").toString());

    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/all_countries',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillCountries(data, allParams.end, allParams.start);;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function FillCountries(data, end, start) {
    var Countries = data;
    $('.productsList').html(' ');
    if (Countries.length > 0) {
        let index = 0;
        let items = [];

        for (index; index < Countries.length; index++) {
            let item = Countries[index];

            let classRandom = (Math.random() + 1).toString(36).substring(7);

            var _date = new Date(item.CreatedOnDate.toString());
            var dd = String(_date.getDate()).padStart(2, '0');
            var mm = String(_date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = _date.getFullYear();
            _date = dd + '/' + mm + '/' + yyyy;

            items.push(`<tr class="RemoveRecord_14">
                            <td class="product-name">
                                <div class="product-cat">
                                    <ins class="new-price">Id: ${item.CountryId}</ins>
                                </div>
                                <div class="product-cat" style="color: #593930;">
                                    <ins class="new-price">Name: ${item.CountryNameEn}</ins>
                                </div>
                            </td>
                            <td class="product-price">
                                <ins class="new-price active${classRandom} ${item.IsActive ? '' : 'text-danger'}">${item.IsActive ? 'Is Active' : 'In Active'}</ins>
                            </td>
                            <td class="product-stock-status">
                                <span class="wishlist-in-stock">${_date}</span>
                            </td>
                            <td class="wishlist-Country">
                                <div class="d-lg-flex">
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" onClick="EditCountryInfo(${item.CountryId},'${item.CountryNameEn}','${item.CountryNameAr}');">Edit</button>
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" style=" padding-left: 20px;padding-right: 20px;" onClick="ChangeCountriestatus(this,'active${classRandom}',${item.CountryId},${item.IsActive})">${item.IsActive ? 'Dectivate' : 'Activate'}</button>
                                <a href="/admin/cities?id=${item.CountryId}&name=${item.CountryNameEn}" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0">Cities</a>
 </div>
                                <div class="alert alert-icon alert-success alert-bg alert-inline show-code-Country mt-2 d-none alert${classRandom}">
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
                                                    <th class="wishlist-Country">Countries</th>
                                                </tr>
                                            </thead>
                                            <tbody class="productsList">
                                            </tbody>
                                        </table>`);

        $('.productsList').prepend(items);
        BindPaginationBar(Countries[0].Records, end, start)
    }
    else {
        window.currnetNavClicked = 1
        $('[name="start"]').val(1);
        $('[name="end"]').val(20);
        $('.result').html('<div style="font-weight: 500;color: #593930;padding: 5px;font-size: 20px;padding-bottom: 350px;"><span class="w-icon-search-plus" style="padding-right: 5px;padding-left: 5px;"></span>No result found!</div>');
        $('.pagination').html(' ');
        $('.showing-info').html(' ');
        $('body , html').animate({
            scrollTop: $('.page-wrapper').offset().top
        }, 300)
    }
    setTimeout(
        function () {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }, 1000);
}

function ChangeCountriestatus(btn, classname, id, active) {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    $('.' + classname.replace('active', 'alert')).addClass('d-none');
    $('.' + classname.replace('active', 'alert')).removeClass('d-flex');

    if (active) {
        btn.textContent = "Activate";
        btn.setAttribute("onclick", "ChangeCountriestatus(this,'" + classname + "'," + id + ", false);");
        $('.' + classname).html('In Active')
        $('.' + classname).addClass('text-danger');
    }
    else {
        btn.textContent = "Deactivate";
        btn.setAttribute("onclick", "ChangeCountriestatus(this,'" + classname + "'," + id + ", true);");
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
        url: '/api/main.asmx/chnage_country_activation_status',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            $('.' + classname.replace('active', 'alert')).removeClass('d-none');
            $('.' + classname.replace('active', 'alert')).addClass('d-flex');
            $('.alert' + classname.replace('active', '') + ' p').html('The country has been ' + (active ? 'deactivated.' : 'activated.'));
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

function SaveCountryInfo() {
    var val = true;

    var txtCountryNameEn = document.getElementById('txtCountryNameEn');
    var txtCountryNameAr = document.getElementById('txtCountryNameAr');

    if (txtCountryNameEn.value.trim() === "") {
        val = false;
        txtCountryNameEn.style.background = "#fff9b3";
    }
    else {
        txtCountryNameEn.style.background = "#ffffff";
    }

    if (txtCountryNameAr.value.trim() === "") {
        val = false;
        txtCountryNameAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtCountryNameAr.value.trim())) {
            txtCountryNameAr.style.background = "#ffffff";
        } else {
            val = false;
            txtCountryNameAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();

        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtCountryNameEn.value.trim());
        fdata.append('name_ar', txtCountryNameAr.value.trim());

        fdata.append('auth_token', "");  $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/add_countries_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                CleanLocationsPageFilters();
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

function ClearAddCountryData() {
    var txtCountryNameEn = document.getElementById('txtCountryNameEn');
    var txtCountryNameAr = document.getElementById('txtCountryNameAr');

    txtCountryNameEn.value = '';
    txtCountryNameAr.value = '';
}


function EditCountryInfo(id, en, ar) {
    $('#lnkEditCategory').click();

    var txtEditCountryNameEn = document.getElementById('txtEditCountryNameEn');
    var txtEditCountryNameAr = document.getElementById('txtEditCountryNameAr');

    txtEditCountryNameEn.value = en.trim();
    txtEditCountryNameAr.value = ar.trim();

    $('.EditCountryInfo').attr('onclick', "EditCountryInfoById(" + id + ");");

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

function EditCountryInfoById(id) {
    var val = true;

    var txtCountryNameEn = document.getElementById('txtEditCountryNameEn');
    var txtCountryNameAr = document.getElementById('txtEditCountryNameAr');

    if (txtCountryNameEn.value.trim() === "") {
        val = false;
        txtCountryNameEn.style.background = "#fff9b3";
    }
    else {
        txtCountryNameEn.style.background = "#ffffff";
    }

    if (txtCountryNameAr.value.trim() === "") {
        val = false;
        txtCountryNameAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtCountryNameAr.value.trim())) {
            txtCountryNameAr.style.background = "#ffffff";
        } else {
            val = false;
            txtCountryNameAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();

        fdata.append('id', id);
        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtCountryNameEn.value.trim());
        fdata.append('name_ar', txtCountryNameAr.value.trim());


        fdata.append('auth_token', "");  $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/edit_country_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllCountriesList();
                $('#lnkCategoriesList').click();
                ClearEditCountryData();
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

function ClearEditCountryData() {
    var txtCountryNameEn = document.getElementById('txtEditCountryNameEn');
    var txtCountryNameAr = document.getElementById('txtEditCountryNameAr');

    txtCountryNameEn.value = '';
    txtCountryNameAr.value = '';
}

function SearchCountriesByText() {
    window.currnetNavClicked = 1
    $('[name="searchtxt"]').val($('#userTextSearch').val());
    $('[name="start"]').val(1);
    $('[name="end"]').val(20);
    GetAllCountriesList();
    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

$(document).on('click', '.active-checkbox input', (e) => {
    if (e.target.checked) {
        $('[name="active"]').val('1');
    } else {
        $('[name="active"]').val('-1');
    }
    $('[name="start"]').val(1);
    $('[name="end"]').val(20);
    GetAllCountriesList();
    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
})

$(document).on('click', '.inactive-checkbox input', (e) => {
    if (e.target.checked) {
        $('[name="inactive"]').val('1');
    } else {
        $('[name="inactive"]').val('-1');
    }
    $('[name="start"]').val(1);
    $('[name="end"]').val(20);
    GetAllCountriesList();
    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
})

function CleanLocationsPageFilters() {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');
    window.location = "/admin/locations";
}


function BindPaginationBar(records, end, start) {
    if (start > 120) {
        window.currnetNavClicked = Math.ceil(start / 20);
        window.currnetNavClicked = Math.ceil(window.currnetNavClicked / 6);
    }
    else {
        window.currnetNavClicked = 1;
    }

    let clickedValue = window.currnetNavClicked;
    let endValue = end;

    let numberOfNav = parseInt(records)
    let counter = 6 * clickedValue;

    let navindex = (clickedValue - 1) * (counter / clickedValue);
    let elementsCounter = 1;
    let items = [];
    let navItems = [];
    for (navindex; navindex <= counter; navindex++) {
        let setStarValue = navindex * ((20 * clickedValue) / clickedValue) + 1;
        let setEndValue = (setStarValue - 1) + ((20 * clickedValue) / clickedValue);
        if (navindex < counter && navindex < numberOfNav / 20) {
            navItems.push(`
                            <li class="page-item ${endValue == setEndValue ? 'active' : ''}" id="${navindex}">
                                <a class="page-link " href="#" onclick="getNext(${setStarValue},${setEndValue},'a')" >${navindex + ((counter / 6) / clickedValue)}</a>
                            </li>
                        `)
            elementsCounter++
        }

        if (navindex == counter && navindex < numberOfNav / 20) {
            navItems.push(`
                            <li class="next">
                                <a  href="#" onclick="getNext(${setStarValue},${setEndValue},true)" aria-label="Next">
                                    ${IsArabic ? 'التالي' : 'Next'}<i class="${IsArabic ? 'w-icon-long-arrow-left' : 'w-icon-long-arrow-right'}"></i>
                                </a>
                            </li>
                        `)
        }
        if (navindex + 1 > counter && clickedValue != 1 && numberOfNav / 20 >= 2) {
            navItems.unshift(`
                <li class="prev">
                    <a href="#" onclick="getNext(${start - 20},${end - 20},false)" aria-label="previous">
                        <i class="${IsArabic ? 'w-icon-long-arrow-right' : 'w-icon-long-arrow-left'}"></i>${IsArabic ? 'السابق' : 'Prev'}
                    </a>
                </li>
                `)
        }
    }

    $('.pagination').html(navItems);
    $('.showing-info').html('Showing<span>' + start + '-' + ((records > end) ? end : records) + ' of ' + records + '</span>Countries');
}

let getNext = (start, end, check) => {
    if ($('[name="end"]').val() != end) {
        $('[name="start"]').val(start);
        $('[name="end"]').val(end);
        if (check == true) {
            window.currnetNavClicked++
        }
        if (check == false) {
            window.currnetNavClicked--
        }
        GetAllCountriesList();
        $('body , html').animate({
            scrollTop: $('.page-wrapper').offset().top
        }, 300)
    }
}
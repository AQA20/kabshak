let urlSearchQuery = location.search;
let urlParams = new URLSearchParams(urlSearchQuery);

$('#FilterCurrency').html(currency.toLocaleUpperCase());

window.currnetNavClicked = 1
GetStatusesList();
BindCharitiesList();
BindSlaughterhousesList();
GetBatchesList();

function GetBatchesList() {
    let allParams = $('#search-filters-items :input').serialize();
    allParams = JSON.parse('{"' + decodeURI(allParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');

    var fdata = new FormData();
    fdata.append('statuses', (allParams.statuses ? decodeURIComponent(allParams.statuses) : "-1").toString());
    fdata.append('searchBatchId', (allParams.searchBatchId ? decodeURIComponent(allParams.searchBatchId) : "-1").toString());
    fdata.append('searchOrderId', (allParams.searchOrderId ? decodeURIComponent(allParams.searchOrderId) : "-1").toString());
    fdata.append('searchSlaughterhouseId', (allParams.searchSlaughterhouseId ? decodeURIComponent(allParams.searchSlaughterhouseId) : "-1").toString());
    fdata.append('searchCharityId', (allParams.searchCharityId ? decodeURIComponent(allParams.searchCharityId) : "-1").toString());
    fdata.append('searchDate', (allParams.searchDate ? decodeURIComponent(allParams.searchDate) : "-1").toString());
    fdata.append('start', (allParams.start ? decodeURIComponent(allParams.start) : "1").toString());
    fdata.append('end', (allParams.end ? decodeURIComponent(allParams.end) : "50").toString());

    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/get_admin_batches_list',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillBatches(data, allParams.end, allParams.start);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');


        }
    });
}

function FillBatches(data, end, start) {
    if (data.length > 0) {
        $('.excel-option').removeClass('d-none');
        let index = 0;
        let items = [];
        for (index; index < data.length; index++) {
            let item = data[index];

            var _date = new Date(item.CreatedOnDate.toString());
            var dd = String(_date.getDate()).padStart(2, '0');
            var mm = String(_date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = _date.getFullYear();
            _date = dd + '/' + mm + '/' + yyyy;
            items.push(`<tr class="RemoveRecord_14">
                           <td class="product-stock-status">
                                <ins class="product-stock-status" style="text-decoration: none;">#${item.Id}<br><span style="border: solid 1px;padding: 5px;border-radius: 3px;color: #7f7e7e;">${item.BatchType == 2 ? 'Donation' : 'Shipping'}</span></ins>
                            </td>
                            <td class="product-stock-status">
                                <ins class="product-stock-status">${item.StatusNameEn}</ins>
                            </td>
                            <td class="product-stock-status">
                                <ins class="product-stock-status">${item.SlaughterhouseName}</ins>
                            </td>
                            <td class="product-stock-status">
                                <ins class="product-stock-status">${item.CharityName}</ins>
                            </td>
                            <td class="product-stock-status">
                                <span class="wishlist-in-stock">${_date}</span>
                            </td>
                            <td class="product-stock-status" style="text-align: center;">
                                <span class="wishlist-in-stock">
                                    ${item.Quantity}
                                </span>
                            </td>
                            <td class="wishlist-action">
                                <div class="d-lg-flex justify-content-end">
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" style="width: 100%;" onclick="ViewBatchDetails(${item.Id});">View Batch</button>
                                 </div>
                            </td>
                        </tr>`);
        }

        $('.result').html(` <table class="shop-table wishlist-table">
                            <thead >
                                <tr>
                                    <th class="product-name"><span>Batch #</span></th>
                                    <th class="product-price" style="text-align: unset;"><span>Status</span></th>
                                    <th class="product-stock-status" style="text-align: unset;"><span>Slaughterhouse</span></th>
                                    <th class="product-stock-status" style="text-align: unset;"><span>Charity</span></th>
                                    <th class="product-stock-status" style="text-align: unset;"><span>Date</span></th>
                                    <th class="product-stock-status" style="text-align: unset;"><span>Quantity</span></th>
                                    <th class="wishlist-action"></th>
                                </tr>
                            </thead >
                            <tbody class="productsList">
                            </tbody>
                            </table>`)
        $('.productsList').html(items);
        BindPaginationBar(data[0].Records, end, start)
    }
    else {
        window.currnetNavClicked = 1
        $('[name="start"]').val(1);
        $('[name="end"]').val(50);
        $('.pagination').html(' ');
        $('.showing-info').html(' ');
        $('.excel-option').addClass('d-none');
        $('.result').html('<div style="font-weight: 500;color: #05D7A0;padding: 5px;font-size: 20px;padding-bottom: 350px;"><span class="w-icon-search-plus" style="padding-right: 5px;padding-left: 5px;"></span>No result found!</div>');
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

function GetStatusesList() {
    var fdata = new FormData();
    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/batchs_statuses',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillStatuses(data);
        }
    });
}

function BindCharitiesList() {
    var fdata = new FormData();
    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/all_charities',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillCharitiesList(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {


        }
    });
}

function BindSlaughterhousesList() {
    var fdata = new FormData();
    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/all_slaughterhouses',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillSlaughterhousesList(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {


        }
    });
}

function FillSlaughterhousesList(data) {
    if (data.length > 0) {
        let index = 0;
        let items = [];
        items.push(`<option value="-1">${IsArabic ? 'حدد..' : 'Select..'}</option >`);
        for (index; index < data.length; index++) {
            let item = data[index];
            if (item.IsActive.toString().toLowerCase().trim() !== 'false')
                items.push(`<option value="${item.Id}">${IsArabic ? item.CountryNameAr + '/' + item.NameAr : item.CountryName + '/' + item.NameEn}</option >`);
        }

        $('[name="slaughterhouse"]').html(items);
    }
}

function FillCharitiesList(data) {
    if (data.length > 0) {
        let index = 0;
        let items = [];
        items.push(`<option value="-1">${IsArabic ? 'حدد..' : 'Select..'}</option >`);
        for (index; index < data.length; index++) {
            let item = data[index];
            if (item.IsActive.toString().toLowerCase().trim() !== 'false')
                items.push(`<option value="${item.Id}">${IsArabic ? item.CountryNameAr + '/' + item.NameAr : item.CountryName + '/' + item.NameEn}</option >`);
        }

        $('[name="charities"]').html(items);
    }
}

function FillStatuses(data) {
    if (data.length > 0) {
        let allParams = $('#search-filters-items :input').serialize();
        allParams = JSON.parse('{"' + decodeURI(allParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');

        let index = 0;
        let items = [];
        let _valid = false;
        var array = decodeURI(allParams.brands).split("%2C");

        for (index; index < data.length; index++) {
            let item = data[index];

            for (i = 0; i < array.length; i++) {
                if (item.Id == array[i]) {
                    _valid = true;
                    break;
                }
            }

            if (!_valid) {
                items.push(`<li class="status-checkbox" style="padding: 1rem 0 1rem 0.2rem;"><input type="checkbox" class="custom-checkbox" value="${item.Id}">
                            <label for="remember">${IsArabic ? item.NameAr : item.NameEn}</label></li>`);
            }
            else {
                items.push(`<li class="status-checkbox" style="padding: 1rem 0 1rem 0.2rem;"><input type="checkbox" class="custom-checkbox" value="${item.Id}" checked="true">
                            <label for="remember">${IsArabic ? item.NameAr : item.NameEn}</label></li>`);
            }

            _valid = false;
        }

        $('.statuses').prepend(items);
    }
}

function CleanAll() {
    window.location.href = "/admin/batches.aspx";
}

function BindPaginationBar(records, end, start) {
    if (start > 300) {
        window.currnetNavClicked = Math.ceil(start / 50);
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
        let setStarValue = navindex * ((50 * clickedValue) / clickedValue) + 1;
        let setEndValue = (setStarValue - 1) + ((50 * clickedValue) / clickedValue);
        if (navindex < counter && navindex < numberOfNav / 50) {
            navItems.push(`
                            <li class="page-item ${endValue == setEndValue ? 'active' : ''}" id="${navindex}">
                                <a class="page-link " href="#" onclick="getNext(${setStarValue},${setEndValue},'a')" >${navindex + ((counter / 6) / clickedValue)}</a>
                            </li>
                        `)
            elementsCounter++
        }

        if (navindex == counter && navindex < numberOfNav / 50) {
            navItems.push(`
                            <li class="next">
                                <a  href="#" onclick="getNext(${setStarValue},${setEndValue},true)" aria-label="Next">
                                    ${IsArabic ? 'التالي' : 'Next'}<i class="${IsArabic ? 'w-icon-long-arrow-left' : 'w-icon-long-arrow-right'}"></i>
                                </a>
                            </li>
                        `)
        }

        if (navindex + 1 > counter && clickedValue != 1 && numberOfNav / 50 >= 2) {
            let prevStartVal = (navindex - (elementsCounter < 6 ? 6 + 6 - elementsCounter : elementsCounter)) * ((50 * clickedValue) / clickedValue) + 1;
            let prevEndVal = (prevStartVal - 1) + ((50 * clickedValue) / clickedValue);
            navItems.unshift(`
                <li class="prev">
                    <a href="#" onclick="getNext(${prevStartVal},${prevEndVal},false)" aria-label="previous">
                        <i class="${IsArabic ? 'w-icon-long-arrow-right' : 'w-icon-long-arrow-left'}"></i>${IsArabic ? 'السابق' : 'Prev'}
                    </a>
                </li>
                `)
        }
    }

    $('.pagination').html(navItems);
    $('.showing-info').html('Showing<span>' + start + '-' + ((records > end) ? end : records) + ' of ' + records + '</span>Batches');
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
        GetBatchesList();
        $('body , html').animate({
            scrollTop: $('.page-wrapper').offset().top
        }, 300)
    }
}

let allStatuses = [];
string_Statuses = $('[name="' + "statuses" + '"]').val();
if (string_Statuses != "" && string_Statuses != "-1") {
    var str_array = string_Statuses.split(',');
    for (var i = 0; i < str_array.length; i++) {
        allStatuses.push(str_array[i].toString())
    }
}

$(document).on('click', '.status-checkbox input', (e) => {
    if (e.target.checked) {
        allStatuses.push(e.target.defaultValue)
    } else {
        let index = allStatuses.indexOf(e.target.defaultValue);
        if (index > -1) {
            allStatuses.splice(index, 1);
        }
    }
    let value = allStatuses.join();
    $('[name="statuses"]').val(value);
    $('[name="start"]').val(1);
    $('[name="end"]').val(50);
    GetBatchesList();
})

function SearchByBatchId() {
    window.currnetNavClicked = 1
    $('[name="searchBatchId"]').val($('#txtBatchId').val().trim() == '' ? '-1' : $('#txtBatchId').val());
    $('[name="start"]').val(1);
    $('[name="end"]').val(50);
    GetBatchesList();
    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

function SearchByOrderId() {
    window.currnetNavClicked = 1
    $('[name="searchOrderId"]').val($('#txtOrderId').val().trim() == '' ? '-1' : $('#txtOrderId').val());
    $('[name="start"]').val(1);
    $('[name="end"]').val(50);
    GetBatchesList();
    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

function SearchByDate() {
    if (moment($('#txtDate').val().trim(), "DD/MM/YYYY", true).isValid()) {
        window.currnetNavClicked = 1
        $('[name="searchDate"]').val($('#txtDate').val().trim() == '' ? '-1' : $('#txtDate').val());
        $('[name="start"]').val(1);
        $('[name="end"]').val(50);
        GetBatchesList();
        $('body , html').animate({
            scrollTop: $('.page-wrapper').offset().top
        }, 300)
        $('#txtDate').css("background-color", "unset");
    }
    else {
        $('#txtDate').css("background-color", "#fff9b3");
    }
}

function DDMMYYYY(value, event) {
    let newValue = value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
    const dayOrMonth = (index) => index % 2 === 1 && index < 4;
    if (!event.data) {
        return value;
    }
    return newValue.split('').map((v, i) => dayOrMonth(i) ? v + '/' : v).join('');;
}

$('select.slaughterhouse-items').on('change', (e) => {
    window.currnetNavClicked = 1
    $('[name="searchSlaughterhouseId"]').val($(e.target).val());
    $('[name="start"]').val(1);
    $('[name="end"]').val(50);
    GetBatchesList();
    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
})

$('select.charities-items').on('change', (e) => {
    window.currnetNavClicked = 1
    $('[name="searchCharityId"]').val($(e.target).val());
    $('[name="start"]').val(1);
    $('[name="end"]').val(50);
    GetBatchesList();
    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
})


function ViewBatchDetails(Id) {
    window.open(
        '/admin/batch/view.aspx?Id=' + Id.toString(),
        '_blank'
    );
}


function ExportBatchesDataAsExcelSheet() {
    let allParams = $('#search-filters-items :input').serialize();
    allParams = JSON.parse('{"' + decodeURI(allParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');

    var fdata = new FormData();
    fdata.append('statuses', (allParams.statuses ? decodeURIComponent(allParams.statuses) : "-1").toString());
    fdata.append('searchBatchId', (allParams.searchBatchId ? decodeURIComponent(allParams.searchBatchId) : "-1").toString());
    fdata.append('searchOrderId', (allParams.searchOrderId ? decodeURIComponent(allParams.searchOrderId) : "-1").toString());
    fdata.append('searchSlaughterhouseId', (allParams.searchSlaughterhouseId ? decodeURIComponent(allParams.searchSlaughterhouseId) : "-1").toString());
    fdata.append('searchCharityId', (allParams.searchCharityId ? decodeURIComponent(allParams.searchCharityId) : "-1").toString());
    fdata.append('searchDate', (allParams.searchDate ? decodeURIComponent(allParams.searchDate) : "-1").toString());
    fdata.append('start', "1");
    fdata.append('end', "1000000");

    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');
    fdata.append('auth_token', "");
    $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/export_admin_batches_list',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (url) {
            if (url.trim() != '') {
                document.getElementById('my_iframe').src = url;
                AdminMessagePopup('The excel file has been downloaded.');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

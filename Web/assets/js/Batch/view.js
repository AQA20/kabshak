const querystring = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

window.currnetNavClicked = 1

let batch_id = querystring.Id;

if (batch_id.trim() == "") {
    window.location = "/admin/batches";
}
else {
    BindBatchInfo();
    BindCharitiesList();
}

function BindBatchInfo() {
    
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    var fdata = new FormData();

    fdata.append('statuses', "-1");
    fdata.append('searchBatchId', batch_id.toString());
    fdata.append('searchOrderId', "-1");
    fdata.append('searchSlaughterhouseId', "-1");
    fdata.append('searchCharityId', "-1");
    fdata.append('searchDate', "-1");
    fdata.append('start', 1);
    fdata.append('end', 1);

    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/get_admin_batches_list',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillBatchPageData(data);
            Bind_WF_Actions(data[0].StatusId);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function FillBatchPageData(data) {
    if (data.length > 0) {
        var item = data[0];

        if (item == null) {
            window.location = "/admin/batches"
        }

        $('.batchid').html(item.Id + " / " + (item.BatchType == 2 ? 'Donation' : 'Shipping'));
        $('.status').html(item.StatusNameEn);
        $('.Slaughterhouse').html(item.SlaughterhouseName);
        $('.Charity').html(item.CharityName);
        var _date = new Date(item.CreatedOnDate.toString());
        var dd = String(_date.getDate()).padStart(2, '0');
        var mm = String(_date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = _date.getFullYear();
        _date = dd + '/' + mm + '/' + yyyy;
        $('.datetime').html(_date);
        $('.Quantity').html(item.Quantity);
        if (item.QR.trim() != "")
            $('.QR').attr("src", item.QR);
        else
            $('.QR-code').html('');
        FillBatchTransaction();
        FillPatchProducts();
    }
    else {
        document.getElementById("divloader").classList.add('d-none');
        document.getElementById("divloader").classList.remove('d-flex');
    }
}

function FillBatchTransaction() {
    let allParams = $('#search-filters-items :input').serialize();
    allParams = JSON.parse('{"' + decodeURI(allParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');

    var fdata = new FormData();
    fdata.append('searchBatchId', batch_id.toString());
    fdata.append('start', (allParams.start ? decodeURIComponent(allParams.start) : "1").toString());
    fdata.append('end', (allParams.end ? decodeURIComponent(allParams.end) : "10").toString());

    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/get_admin_batch_items',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillBatchItems(data, allParams.end, allParams.start);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');


        }
    });
}

function ExportItemsDataAsExcelSheet() {
    let allParams = $('#search-filters-items :input').serialize();
    allParams = JSON.parse('{"' + decodeURI(allParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');

    var fdata = new FormData();
    fdata.append('searchBatchId', batch_id.toString());
    fdata.append('start', "1");
    fdata.append('end', "1000000");

    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');
    fdata.append('auth_token', "");
    $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/export_admin_batch_items',
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

function ExportQRcodes() {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');
    window.open("/admin/batch/donwload-qr-codes.aspx?batchid=" + batch_id.toString(), "_blank");

    AdminMessagePopup('The QR codes have been downloaded.');
}
function FillPatchProducts() {
    var fdata = new FormData();
    fdata.append('batchid', batch_id.toString());

    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/get_batch_transaction_details',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillBatchActions(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');


        }
    });
}

function FillBatchActions(datalist) {
    data = JSON.parse(datalist);
    if (data.length > 0) {
        let index = 0;
        let items = [];
        for (index; index < data.length; index++) {
            let item = data[index];
            var _date = new Date(item.CreatedOnDate.toString());
            var dd = String(_date.getDate()).padStart(2, '0');
            var mm = String(_date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = _date.getFullYear();
            _date = dd + '/' + mm + '/' + yyyy;

            items.push(`<tr><td  style="direction: ltr;text-align: left;">
                                    <a href="#" onclick="voidclick(); return false">${item.Email}</a><br>
                                   <a href="#" onclick="voidclick(); return false">${_date}</a>
                                </td>
                                <td style="display: flex;align-items: center;justify-content: end;">${(item.URL != null && item.URL.trim() != "") ? "<a href='" + item.URL + "' target='_blank' style='font-size: 30px;margin: 5px;'><i class='w-icon-download'></i></a >" : ""}${item.StatuseName}</td>
                            </tr>`);
        }

        $('.Transaction-Items').html(items);
    }
    else {
        $('.order-Tracking').html(' ');
    }
}
function FillBatchItems(data, end, start) {
    if (data.length > 0) {
        let index = 0;
        let items = [];
        for (index; index < data.length; index++) {
            let item = data[index];
            items.push(`<tr class="RemoveRecord_14">
                            <td class="product-stock-status">
                                <ins class="product-stock-status">#${item.Id}</ins>
                            </td>
                           <td class="product-stock-status">
                                <ins class="product-stock-status">#${item.OrderId}</ins>
                            </td>
                            <td class="product-stock-status">
                                <ins class="wishlist-in-stock">${item.Shareholder}</ins>
                            </td>
                            <td class="product-stock-status">
                                <span class="product-stock-status">${item.ProductName}</span>
                            </td>
                            <td class="product-stock-status">
                                <span class="product-stock-status">${item.PurposeName}</span>
                            </td>
                            <td class="product-stock-status">
                                <span class="wishlist-in-stock">${item.IsSlaughtered}</span>
                            </td>
                            <td class="product-stock-status">
                                <span class="wishlist-in-stock">${item.IsRecorded}</span><br/>${(item.URL != null && item.URL.trim() != "") ? "<a href='" + item.URL + "' target='_blank' style='font-size: 30px;'><i class='w-icon-movie'></i></a >" : ""}
                            </td>
                            <td class="product-stock-status">
                                <span class="wishlist-in-stock">${item.IsDistributed}</span>
                            </td>
                        </tr>`);
        }

        $('.result').html(` <table class="shop-table wishlist-table">
                            <thead >
                                <tr>
                                    <th class="product-stock-status" style="text-align: unset;"><span>Item #</span></th>
                                    <th class="product-stock-status"  style="text-align: unset;"><span>Order #</span></th>
                                    <th class="product-stock-status" style="text-align: unset;"><span>Shareholder</span></th>
                                    <th class="product-stock-status" style="text-align: unset;"><span>Product</span></th>
                                    <th class="product-stock-status" style="text-align: unset;"><span>Purpose</span></th>
                                    <th class="product-stock-status" style="text-align: unset;"><span>Slaughtered</span></th>
                                    <th class="product-stock-status" style="text-align: unset;"><span>Recorded</span></th>
                                    <th class="product-stock-status" style="text-align: unset;"><span>Distributed</span></th>
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
        $('[name="end"]').val(10);
        $('.pagination').html(' ');
        $('.showing-info').html(' ');
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

    function GetStatusesList() {
        var fdata = new FormData();
        fdata.append('auth_token', "");  $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/statuses',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                FillStatuses(data);
            }
        });
    }
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

function BindPaginationBar(records, end, start) {
    if (start > 60) {
        window.currnetNavClicked = Math.ceil(start / 10);
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
        let setStarValue = navindex * ((10 * clickedValue) / clickedValue) + 1;
        let setEndValue = (setStarValue - 1) + ((10 * clickedValue) / clickedValue);
        if (navindex < counter && navindex < numberOfNav / 10) {
            navItems.push(`
                            <li class="page-item ${endValue == setEndValue ? 'active' : ''}" id="${navindex}">
                                <a class="page-link " href="#" onclick="getNext(${setStarValue},${setEndValue},'a')" >${navindex + ((counter / 6) / clickedValue)}</a>
                            </li>
                        `)
            elementsCounter++
        }

        if (navindex == counter && navindex < numberOfNav / 10) {
            navItems.push(`
                            <li class="next">
                                <a  href="#" onclick="getNext(${setStarValue},${setEndValue},true)" aria-label="Next">
                                    ${IsArabic ? 'التالي' : 'Next'}<i class="${IsArabic ? 'w-icon-long-arrow-left' : 'w-icon-long-arrow-right'}"></i>
                                </a>
                            </li>
                        `)
        }

        if (navindex + 1 > counter && clickedValue != 1 && numberOfNav / 10 >= 2) {
            let prevStartVal = (navindex - (elementsCounter < 6 ? 6 + 6 - elementsCounter : elementsCounter)) * ((10 * clickedValue) / clickedValue) + 1;
            let prevEndVal = (prevStartVal - 1) + ((10 * clickedValue) / clickedValue);
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

    if (IsArabic)
        $('.showing-info').html('عرض<span>' + start + '-' + ((records > end) ? end : records) + ' من ' + records + '</span>منتج');
    else
        $('.showing-info').html('Showing<span>' + start + '-' + ((records > end) ? end : records) + ' of ' + records + '</span>Products');
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
        BindBatchInfo();
        $('body , html').animate({
            scrollTop: $('.page-wrapper').offset().top
        }, 300)
    }
}

function Bind_WF_Actions(statusId) {
    if (statusId != 4 && statusId != 8 && statusId != 6 && statusId != 10) {
        $('.btns-workflow').remove();
    } else {
        if (statusId != 4) {
            $('.btn-Delivered').remove();
        }

        if (statusId != 8) {
            $('.btn-Assigned-to-Charity').remove();
        }

        if (statusId != 6 && statusId != 10) {
            $('.btn-Completed').remove();
        }

        if (statusId == 7) {
            $('.btns-workflow').remove();
        }
    }
}

function Batch_Assigned_to_Charity() {
    let val = true;
    var charityid = $('[name="charities"]').find(":selected").val();
    if (typeof charityid == "undefined" || charityid <= 0) {
        val = false;
        $('[name="charities"]')[0].style.background = "#fff9b3";
    } else {
        $('[name="charities"]')[0].style.background = "transparent";
    }

    if (val) {
        document.getElementById("divloader").style.background = "#ffffff";
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');
        var fdata = new FormData();
        fdata.append('batchid', batch_id.toString());
        fdata.append('CharityId', charityid.toString());
        fdata.append('user_token', (userId ? decodeURIComponent(userId) : "-1").toString());
        fdata.append('auth_token', "");  $.ajax({
            cache: false,
            data: fdata,
            url: '/api/products.asmx/assigned_to_charity',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {

                location.reload();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');
            }
        });
    }
}

function Batch_Delivered() {
    document.getElementById("divloader").style.background = "#ffffff";
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');
    var fdata = new FormData();
    fdata.append('batchid', batch_id.toString());
    fdata.append('user_token', (userId ? decodeURIComponent(userId) : "-1").toString());
    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/batch_delivered',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {

            location.reload();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function Batch_Completed() {
    document.getElementById("divloader").style.background = "#ffffff";
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');
    var fdata = new FormData();
    fdata.append('batchid', batch_id.toString());
    fdata.append('user_token', (userId ? decodeURIComponent(userId) : "-1").toString());
    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/batch_completed',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {

            location.reload();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}
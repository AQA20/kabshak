GetAllCodesList();

function GetAllCodesList() {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    var fdata = new FormData();
    fdata.append('auth_token', "");
    $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/promocodes',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillCodes(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function FillCodes(data) {
    var promocodes = data;
    $('.productsList').html(' ');
    if (promocodes.length > 0) {
        let index = 0;
        let items = [];

        for (index; index < promocodes.length; index++) {
            let item = promocodes[index];

            let classRandom = (Math.random() + 1).toString(36).substring(7);

            var _createddate = new Date(item.CreatedOnDate.toString());
            var createddd = String(_createddate.getDate()).padStart(2, '0');
            var createdmm = String(_createddate.getMonth() + 1).padStart(2, '0'); //January is 0!
            var createdyyyy = _createddate.getFullYear();
            _createddate = createddd + '/' + createdmm + '/' + createdyyyy;

            var _date = new Date(item.StartDate.toString());
            var dd = String(_date.getDate()).padStart(2, '0');
            var mm = String(_date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = _date.getFullYear();
            _date = dd + '/' + mm + '/' + yyyy;

            var _date2 = new Date(item.EndDate.toString());
            var dd2 = String(_date2.getDate()).padStart(2, '0');
            var mm2 = String(_date2.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy2 = _date2.getFullYear();
            _date2 = dd2 + '/' + mm2 + '/' + yyyy2;

            items.push(`<tr class="RemoveRecord_14">
                            <td class="product-name" style="min-width: 140px;">
                                <div class="product-cat" style="color: #c68d39;">
                                    <ins class="new-price">${item.Code}</ins>
                                </div>
                                <div class="product-cat" style="color: #c68d39;">
                                    <ins class="new-price">Created: ${_createddate}</ins>
                                </div>
                            </td>
                            <td class="product-price">
                                <ins class="new-price active${classRandom} ${item.IsActive ? '' : 'text-danger'}">${item.IsActive ? 'Is Active' : 'In Active'}</ins>
                            </td>
                            <td class="product-stock-status">
                                <span class="wishlist-in-stock">${_date}</span>
                            </td>
                            <td class="product-stock-status">
                                <span class="wishlist-in-stock">${_date2}</span>
                            </td>
                            <td class="product-stock-status">
                                <div class="product-cat" style="color: #c68d39;">
                                    <ins class="new-price">Discount: ${item.Discount} %</ins>
                                </div>
                                <div class="product-cat" style="color: #c68d39;">
                                    <ins class="new-price">Fix Value: ${item.FixValue} USD</ins>
                                </div>
                                <div class="product-cat" style="color: #c68d39;">
                                    <ins class="new-price">Min Invoice: ${item.MinInvoice} USD</ins>
                                </div>
                            </td>
                            <td class="wishlist-Hashtag">
                                <div class="d-lg-flex">
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" onClick="EditPromoCode(${item.Id},'${item.Code}','${item.StartDate}','${item.EndDate}','${item.Discount}','${item.FixValue}','${item.MinInvoice}');">Edit</button>
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" style=" padding-left: 20px;padding-right: 20px;" onClick="ChangeCodeStatus(this,'active${classRandom}',${item.Id},${item.IsActive})">${item.IsActive ? 'Dectivate' : 'Activate'}</button>
                                    </div>
                                <div class="alert alert-icon alert-success alert-bg alert-inline show-code-Hashtag mt-2 d-none alert${classRandom}">
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
                                                    <th class="product-stock-status" style="text-align: unset;"><span>Start Date</span></th>
                                                    <th class="product-stock-status" style="text-align: unset;"><span>End Date</span></th>
                                                    <th class="product-stock-status" style="text-align: unset;"><span>Details</span></th>
                                                    <th class="wishlist-Hashtag">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody class="productsList">
                                            </tbody>
                                        </table>`);

        $('.productsList').prepend(items);
    }
    else {
        $('.result').html('<div style="font-weight: 500;color: #c68d39;padding: 5px;font-size: 20px;padding-bottom: 350px;"><span class="w-icon-search-plus" style="padding-right: 5px;padding-left: 5px;"></span>No result found!</div>');
    }
    setTimeout(
        function () {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }, 1000);
}

function ChangeCodeStatus(btn, classname, id, active) {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    $('.' + classname.replace('active', 'alert')).addClass('d-none');
    $('.' + classname.replace('active', 'alert')).removeClass('d-flex');

    if (active) {
        btn.textContent = "Activate";
        btn.setAttribute("onclick", "ChangeCodeStatus(this,'" + classname + "'," + id + ", false);");
        $('.' + classname).html('In Active')
        $('.' + classname).addClass('text-danger');
    }
    else {
        btn.textContent = "Deactivate";
        btn.setAttribute("onclick", "ChangeCodeStatus(this,'" + classname + "'," + id + ", true);");
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
        url: '/api/main.asmx/chnage_code_activation_status',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            $('.' + classname.replace('active', 'alert')).removeClass('d-none');
            $('.' + classname.replace('active', 'alert')).addClass('d-flex');
            $('.alert' + classname.replace('active', '') + ' p').html('The promo code has been ' + (active ? 'deactivated.' : 'activated.'));
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

function SaveCodeInfo() {
    var val = true;

    var txtCode = document.getElementById('txtCode');

    if (txtCode.value.trim() === "") {
        val = false;
        txtCode.style.background = "#fff9b3";
    }
    else {
        txtCode.style.background = "#ffffff";
    }

    var txtStartDate = document.getElementById('txtStartDate');

    if (txtStartDate.value.trim() === "") {
        val = false;
        txtStartDate.style.background = "#fff9b3";
    }
    else {
        txtStartDate.style.background = "#ffffff";
    }

    var txtEndDate = document.getElementById('txtEndDate');

    if (txtEndDate.value.trim() === "") {
        val = false;
        txtEndDate.style.background = "#fff9b3";
    }
    else {
        txtEndDate.style.background = "#ffffff";
    }

    const _start = Date.parse(moment($('#txtStartDate').val().trim(), "DD/MM/YYYY", true))
    const _end = Date.parse(moment($('#txtEndDate').val().trim(), "DD/MM/YYYY", true))

    var _date = new Date(Date.now());
    var dd = String(_date.getDate()).padStart(2, '0');
    var mm = String(_date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = _date.getFullYear();
    _date = dd + '/' + mm + '/' + yyyy;
    const _now = Date.parse(moment(_date, "DD/MM/YYYY", true))

    if (moment($('#txtStartDate').val().trim(), "DD/MM/YYYY", true).isValid() && _start >= _now) {
        $('#txtStartDate').css("background-color", "unset");
    }
    else {
        val = false;
        $('#txtStartDate').css("background-color", "#fff9b3");
    }

    if (moment($('#txtEndDate').val().trim(), "DD/MM/YYYY", true).isValid() && _end >= _now) {
        $('#txtEndDate').css("background-color", "unset");

        if (_start > _end) {
            val = false;
            $('#txtEndDate').css("background-color", "#fff9b3");
            $('#txtStartDate').css("background-color", "#fff9b3");
        }
    }
    else {
        val = false;
        $('#txtEndDate').css("background-color", "#fff9b3");
    }

    var txtDiscount = document.getElementById('txtDiscount');
    var txtFixPrice = document.getElementById('txtFixPrice');
    var txtMinInvoice = document.getElementById('txtMinInvoice');

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();
        fdata.append('user_token', userId.trim());
        fdata.append('StartDate', txtStartDate.value.trim());
        fdata.append('EndDate', txtEndDate.value.trim());
        fdata.append('Code', txtCode.value.trim());
        fdata.append('Discount', txtDiscount.value.trim());
        fdata.append('FixPrice', txtFixPrice.value.trim());
        fdata.append('MinInvoice', txtMinInvoice.value.trim());
        fdata.append('auth_token', "");
        $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/add_code_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllCodesList();
                $('#lnkCategoriesList').click();
                ClearAddPromoCodeData();
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

function ClearAddPromoCodeData() {
    document.getElementById('txtCode').value = "";
    document.getElementById('txtStartDate').value = "";
    document.getElementById('txtEndDate').value = "";
    document.getElementById('txtDiscount').value = "0";
    document.getElementById('txtFixPrice').value = "0";
    document.getElementById('txtMinInvoice').value = "0";
}


function EditPromoCode(id, code, startdate, enddate, discount, fixvalue, mininvoice) {
    $('#lnkEditCategory').click();

    document.getElementById('txtEditCode').value = code;

    var _date = new Date(startdate.toString());
    var dd = String(_date.getDate()).padStart(2, '0');
    var mm = String(_date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = _date.getFullYear();
    _date = dd + '/' + mm + '/' + yyyy;

    document.getElementById('txtEditStartDate').value = _date;

    _date = new Date(enddate.toString());
    dd = String(_date.getDate()).padStart(2, '0');
    mm = String(_date.getMonth() + 1).padStart(2, '0'); //January is 0!
    yyyy = _date.getFullYear();
    _date = dd + '/' + mm + '/' + yyyy;

    document.getElementById('txtEditEndDate').value = _date;

    document.getElementById('txtEditDiscount').value = discount;
    document.getElementById('txtEditFixPrice').value = fixvalue;
    document.getElementById('txtEditMinInvoice').value = mininvoice;

    $('.EditPromoCode').attr('onclick', "EditPromoCodeById(" + id + ");");

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

function EditPromoCodeById(id) {
    var val = true;

    var txtCode = document.getElementById('txtEditCode');

    if (txtCode.value.trim() === "") {
        val = false;
        txtCode.style.background = "#fff9b3";
    }
    else {
        txtCode.style.background = "#ffffff";
    }

    var txtStartDate = document.getElementById('txtEditStartDate');

    if (txtStartDate.value.trim() === "") {
        val = false;
        txtStartDate.style.background = "#fff9b3";
    }
    else {
        txtStartDate.style.background = "#ffffff";
    }

    var txtEndDate = document.getElementById('txtEditEndDate');

    if (txtEndDate.value.trim() === "") {
        val = false;
        txtEndDate.style.background = "#fff9b3";
    }
    else {
        txtEndDate.style.background = "#ffffff";
    }

    const _start = Date.parse(moment($('#txtEditStartDate').val().trim(), "DD/MM/YYYY", true))
    const _end = Date.parse(moment($('#txtEditEndDate').val().trim(), "DD/MM/YYYY", true))

    var _date = new Date(Date.now());
    var dd = String(_date.getDate()).padStart(2, '0');
    var mm = String(_date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = _date.getFullYear();
    _date = dd + '/' + mm + '/' + yyyy;
    const _now = Date.parse(moment(_date, "DD/MM/YYYY", true))

    if (moment($('#txtEditStartDate').val().trim(), "DD/MM/YYYY", true).isValid() && _start >= _now) {
        $('#txtEditStartDate').css("background-color", "unset");
    }
    else {
        val = false;
        $('#txtEditStartDate').css("background-color", "#fff9b3");
    }

    if (moment($('#txtEditEndDate').val().trim(), "DD/MM/YYYY", true).isValid() && _end >= _now) {
        $('#txtEditEndDate').css("background-color", "unset");

        if (_start > _end) {
            val = false;
            $('#txtEditEndDate').css("background-color", "#fff9b3");
            $('#txtEditStartDate').css("background-color", "#fff9b3");
        }
    }
    else {
        val = false;
        $('#txtEditEndDate').css("background-color", "#fff9b3");
    }

    var txtDiscount = document.getElementById('txtEditDiscount');
    var txtFixPrice = document.getElementById('txtEditFixPrice');
    var txtMinInvoice = document.getElementById('txtEditMinInvoice');

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();

        fdata.append('id', id);
        fdata.append('user_token', userId.trim());
        fdata.append('StartDate', txtStartDate.value.trim());
        fdata.append('EndDate', txtEndDate.value.trim());
        fdata.append('Code', txtCode.value.trim());
        fdata.append('Discount', txtDiscount.value.trim());
        fdata.append('FixPrice', txtFixPrice.value.trim());
        fdata.append('MinInvoice', txtMinInvoice.value.trim());
        fdata.append('auth_token', "");

        $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/edit_code_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllCodesList();
                $('#lnkCategoriesList').click();
                ClearEditPromoCodeData();
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

function ClearEditPromoCodeData() {
    document.getElementById('txtEditCode').value = "";
    document.getElementById('txtEditStartDate').value = "";
    document.getElementById('txtEditEndDate').value = "";
    document.getElementById('txtEditDiscount').value = "0";
    document.getElementById('txtEditFixPrice').value = "0";
    document.getElementById('txtEditMinInvoice').value = "0";
}
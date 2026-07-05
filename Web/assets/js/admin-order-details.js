const querystring = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

order_id = querystring.Id;

if (order_id.trim() == "") {
    window.location = "/cart";
}
else {
    BindTransaction();
}

function BindTransaction() {
    trandata = getCookie("trandata");
    if (trandata.trim() != "") {
        
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');
        var fdata = new FormData();
        fdata.append('orderid', order_id);
        fdata.append('user_token', (userId ? decodeURIComponent(userId) : "-1").toString());
        fdata.append('trandata', trandata);

        fdata.append('auth_token', ""); $.ajax({
            cache: false,
            data: fdata,
            url: '/api/products.asmx/submit_order_transaction',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                BindOrderPage(order_id);
                setCookie('trandata', "", 1);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                BindOrderPage(order_id);
                setCookie('trandata', "", 1);
            }
        });
    }
    else {
        BindOrderPage(order_id);
    }
}

function BindOrderPage(id) {
    
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');
    var fdata = new FormData();
    fdata.append('orderid', order_id);
    fdata.append('user_token', (userId ? decodeURIComponent(userId) : "-1").toString());
    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/get_order_details',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillOrderPageData(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function FillOrderPageData(data) {
    if (data.length > 0) {
        var item = JSON.parse(data);

        if (item.Data == null) {
            if (IsArabic)
                window.location = "/ar"
            else
                window.location = "/home"
        }

        $('.orderId').html(item.Data.Id);
        if (IsArabic) {
            $('.status').html(item.Data.StatusNameAr);
            if (item.Data.StatusNameAr != "في انتظار الدفع") {
                $('.OrderNow').remove();
            }
            else {
                $('.btnOrderNow').attr("href", "/ar/payment-service?page=details&orderid=" + item.Data.Id + "&amount=" + item.Data.TotalPriceUsd.toFixed(2) + "&currency=usd");
            }
        }
        else {
            $('.status').html(item.Data.StatusNameEn);
            if (item.Data.StatusNameEn != "Waiting for payment") {
                $('.OrderNow').remove();
            }
            else {
                $('.btnOrderNow').attr("href", "/payment-service?page=details&orderid=" + item.Data.Id + "&amount=" + item.Data.TotalPriceUsd.toFixed(2) + "&currency=usd");
            }
        }

        var _date = new Date(item.Data.CreatedOnDate.toString());
        var dd = String(_date.getDate()).padStart(2, '0');
        var mm = String(_date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = _date.getFullYear();
        _date = dd + '/' + mm + '/' + yyyy;
        $('.datetime').html(_date);
        var total = (currency.toLocaleUpperCase() == "USD" ? (item.Data.TotalPriceUsd - (item.Data.CodeValue != null ? item.Data.CodeValue.toFixed(2) : 0)) : item.Data.TotalPriceKwd).toFixed(2);
        $('.total_price').html(total.toString() + " " + currency.toLocaleUpperCase());
        $('.Subtotal').html((currency.toLocaleUpperCase() == "USD" ? item.Data.TotalPriceUsd.toFixed(2) : item.Data.TotalPriceKwd.toFixed(2)) + " " + currency.toLocaleUpperCase());
        $('.PromoCode').html((item.Data.CodeValue != null ? item.Data.CodeValue.toFixed(2) : "0") + " " + currency.toLocaleUpperCase())
        let products = item.Products;
        if (products.length > 0) {
            let index = 0;
            let items = [];
            for (index; index < products.length; index++) {
                let product = products[index];
                items.push(`<tr><td  style="direction: ltr;text-align: ${IsArabic ? 'right' : 'left'};">
                                    <a href="#" onclick="voidclick(); return false">${IsArabic ? product.NameAr : product.NameEn}</a>&nbsp;<strong>x ${product.Quantity}</strong><br>
                                   1 X  <a href="#" onclick="voidclick(); return false">${(currency.toLocaleUpperCase() == "USD" ? product.Usd : product.Kwd) + " " + currency.toLocaleUpperCase()}</a>
                                </td>
                                <td>${(currency.toLocaleUpperCase() == "USD" ? (product.Usd * product.Quantity).toFixed(2) : (product.Kwd * product.Quantity).toFixed(2)) + " " + currency.toLocaleUpperCase()}</td>
                            </tr>`);
            }

            $('.Order-Items').html(items);
        }

        $('.billing-address-table .name').html(item.Data.FirstName + ' ' + item.Data.LastName);
        $('.billing-address-table .mobile').html(item.Data.Mobile);
        $('.billing-address-table .email').html(item.Data.Email);
        $('.billing-address-table .billing-country').html(IsArabic ? item.BillingAddress.CountryNameAr : item.BillingAddress.CountryNameEn);
        $('.billing-address-table .billing-city').html(IsArabic ? item.BillingAddress.CityNameAr : item.BillingAddress.CityNameEn);
        $(".billing-address-table .billing-town").html(item.Data.BillingTown);
        $(".billing-address-table .billing-block").html(item.Data.BillingBlock);
        $(".billing-address-table .billing-street").html(item.Data.BillingStreet);
        $(".billing-address-table .billing-house").html(item.Data.BillingHouseNo);
        $(".billing-address-table .billing-Apartment").html(item.Data.BillingApartmentNo);
        if (item.Data.ShippingNumber != null) {
            $('.shipping-address-table .shipping-country').html(IsArabic ? item.ShippingAddress.CountryNameAr : item.ShippingAddress.CountryNameEn);
            $('.shipping-address-table .shipping-city').html(IsArabic ? item.ShippingAddress.CityNameAr : item.ShippingAddress.CityNameEn);
            $(".shipping-address-table .shipping-town").html(item.Data.ShippingTown);
            $(".shipping-address-table .shipping-block").html(item.Data.ShippingBlock);
            $(".shipping-address-table .shipping-street").html(item.Data.ShippingStreet);
            $(".shipping-address-table .shipping-house").html(item.Data.ShippingHouseNo);
            $(".shipping-address-table .shipping-Apartment").html(item.Data.ShippingApartmentNo);
            $(".shipping-address-table .shipping-phone").html(item.Data.ShippingNumber == 0 ? ' ' : item.Data.ShippingNumber);
        }
        else {
            if (IsArabic) {
                $('.shipping-address-table').html('<tbody><tr><th>ملاحظات الطلب:</th><td class="notes"></td></tr></tbody >');
            }
            else {
                $('.shipping-address-table').html('<tbody><tr><th>Order Notes:</th><td class="notes"></td></tr></tbody >');
            }
        }

        $('.shipping-address-table .notes').html(item.Data.Notes);
        BindRequestTracking(item.Tracks);
        BindRequestTransactions(item.Transactions);
        BindRequestPersons(item.Persons);

        setTimeout(
            function () {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');
            }, 1000);
    }
    else {
        document.getElementById("divloader").classList.add('d-none');
        document.getElementById("divloader").classList.remove('d-flex');
    }
}

function BindRequestTracking(data) {
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
                                <td style="display: flex;align-items: center;justify-content: end;">${(item.URL != null && item.URL.trim() != "") ? "<a href='" + item.URL + "' target='_blank' style='font-size: 30px;margin: 5px;'><i class='w-icon-download'></i></a >" : ""}${IsArabic ? item.StatuseNameAr : item.StatuseName}</td >
                            </tr>`);
        }

        items.push(`<tr><td style="direction: ltr;text-align: left;">
                           <p class="text-dark" style="font-weight: 600;margin: unset;">New Action:</p>
                            <div class="select-box" style="width: 250px;">
                                <select id="ddlNewTransaction" name="Transaction" class="form-control form-control-md items TransactionClass" style="max-width: unset;" onchange="functionToTriggerClick(this.value)">
                                   
                                </select>
                            </div>
                                <div class="InvoiceImage">
                                </div>
                                <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4" onclick="SaveNewTransaction();">Submit</button>
                        </td>
                        <td>
                        </td>
                    </tr>`);

        $('.Transaction-Items').html(items);
        BindTransactionListData();
    }
    else {
        $('.order-Tracking').html(' ');
    }
}

function BindRequestTransactions(data) {
    if (data.length > 0) {
        let index = 0;
        let items = [];
        for (index; index < data.length; index++) {
            let item = data[index];

            items.push(`<tr>
                            <td>${item.Result}</td>
                            <td>${item.Ref}</td>
                            <td>${item.Date}</td>
                            <td>${item.Amount}</td>
                        </tr>`);
        }

        $('.TransactionsList').html(items);
    }
    else {
        $('.TransactionSection').html(' ');
    }
}

function BindTransactionListData() {
    var fdata = new FormData();

    fdata.append('auth_token', ""); $.ajax({
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
    $('.TransactionClass').html(' ');
    if (Actions.length > 0) {
        let index = 0;
        let items = [];

        for (index; index < Actions.length; index++) {
            let item = Actions[index];
            items.push(`<option value="${item.Id}" ${index == 0 ? 'selected' : ''}>${item.NameEn}</option>`);
        }

        $('.TransactionClass').prepend(items);
    }
    setTimeout(
        function () {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }, 1000);
}

function SaveNewTransaction() {
    var _action = $('[name="Transaction"]').find(":selected").val();
    order_id
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');
    var fdata = new FormData();
    fdata.append('orderid', order_id);
    fdata.append('action', _action);
    var img = $('#upImage');
    if (img[0] != undefined)
        fdata.append('file', img[0].files[0]);
    else
        fdata.append('file', '');

    fdata.append('user_token', (userId ? decodeURIComponent(userId) : "-1").toString());
    fdata.append('auth_token', "");
    $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/admin_change_order_status',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            window.location.href = window.location;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function BindRequestPersons(data) {
    if (data.length > 0) {
        let index = 0;
        let items = [];
        let shipping_items = [];
        for (index; index < data.length; index++) {
            let item = data[index];
            if (item.CharityId != -1) {
                items.push(`<tr><td  style="direction: ltr;text-align: ${IsArabic ? 'right' : 'left'};">
                                    <a href="#" onclick="voidclick(); return false">${IsArabic ? item.NameAr : item.NameEn}</a>&nbsp;<strong>x ${item.Quantity}</strong></a></br>
                                    <a href="#" onclick="voidclick(); return false"><strong>${IsArabic ? item.CountryNameAr + "/" + item.CharityNameAr : item.CountryNameEn + "/" + item.CharityNameEn}</strong></a></br>
                                    <a href="#" onclick="voidclick(); return false"><strong style="background: #593930;color: #ffffff;padding: 3px;border-radius: 3px;">${IsArabic ? item.PurposeNameAr : item.PurposeName}</strong></a>
                                </td>
                                <td>${item.FullName}<br/><span style="font-size: 9px;color: #593930;">${item.AddressDetails}</span></td>
                            </tr>`);
            }
            else {
                shipping_items.push(`<tr><td  style="direction: ltr;text-align: ${IsArabic ? 'right' : 'left'};">
                                    <a href="#" onclick="voidclick(); return false">${IsArabic ? item.NameAr : item.NameEn}</a>&nbsp;<strong>x ${item.Quantity}</strong></a></br>
                                    <a href="#" onclick="voidclick(); return false"><strong style="font-weight: 100;font-size: 12px;">${IsArabic ? item.ShippingAddressAr : item.ShippingAddressEn}</strong></a></br>
                                    <a href="#" onclick="voidclick(); return false"><strong style="font-weight: 100;font-size: 12px;">${item.ContactNumber}</strong></a><br>
                                    <a href="#" onclick="voidclick(); return false"><strong style="font-weight: 100;font-size: 12px;">${IsArabic ? 'الملاحظات: ' + item.CuttingNotes : 'Notes: ' + item.CuttingNotes}</strong></a>
                                </td>
                                <td>${item.FullName}<br/>
                                    <a href="#" onclick="voidclick(); return false"><strong style="background: #593930;color: #ffffff;padding: 3px;border-radius: 3px;">${IsArabic ? item.PurposeNameAr : item.PurposeName}</strong></a></td>
                            </tr>`);
            }
        }

        if (items.length > 0)
            $('.Person-Items').html(items);
        else
            $('.order-Persons').html(' ');

        if (shipping_items.length > 0)
            $('.Person-shipping-Items').html(shipping_items);
        else
            $('.order-shipping-Persons').html(' ');
    }
    else {
        $('.order-Persons').html(' ');
        $('.order-shipping-Persons').html(' ');
    }
}

function functionToTriggerClick(id) {
    if (id == '1008' || id == '1009') {
        $('.InvoiceImage').html(`<div class="icon-box-content d-flex" style="margin-top: 15px;">
                <input type = "file" class="form-control-file" id = "upImage" style = "padding: 7px; width: 100%; border-radius: 0.25rem;" />
            </div>`);
    }
    else {
        $('.InvoiceImage').html(' ');
    }
}

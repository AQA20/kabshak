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

        var promovalue = item.Data.CodeValue != null ? (item.Data.CodeValue * rate_value).toFixed(2) : '0';

        $('.orderId').html(item.Data.Id);
        if (IsArabic) {
            $('.status').html(item.Data.StatusNameAr);
            if (item.Data.StatusNameAr != "في انتظار الدفع") {
                $('.OrderNow').remove();
            }
            else {
                $('.btnOrderNow').attr("href", "/ar/payment-service?page=details&orderid=" + item.Data.Id + "&amount=" + item.Data.TotalPriceUsd.toFixed(2) + "&currency=usd");

                if (rate_code == 'JOD') {
                    $('.btnOrderNow').attr("href", "/ar/payment-service?orderid=" + item.Data.Id + "&amount=" + (item.Data.TotalPriceUsd * rate_value).toFixed(2) + "&page=ordercomplete&promovalue=" + promovalue);
                }
            }
        }
        else {
            $('.status').html(item.Data.StatusNameEn);
            if (item.Data.StatusNameEn != "Waiting for payment") {
                $('.OrderNow').remove();
            }
            else {
                $('.btnOrderNow').attr("href", "/payment-service?page=details&orderid=" + item.Data.Id + "&amount=" + item.Data.TotalPriceUsd.toFixed(2) + "&currency=usd");
                if (rate_code == 'JOD') {
                    $('.btnOrderNow').attr("href", "/payment-service?orderid=" + item.Data.Id + "&amount=" + (item.Data.TotalPriceUsd * rate_value).toFixed(2) + "&page=ordercomplete&promovalue=" + promovalue);
                }
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

        if (item.Data.StatusNameEn == "Waiting for payment") {
            total = ((item.Data.TotalPriceUsd - (item.Data.CodeValue != null ? item.Data.CodeValue : 0)) * rate_value).toFixed(2);
            $('.total_price').html(total.toString() + " " + rate_code);
            $('.Subtotal').html((item.Data.TotalPriceUsd * rate_value).toFixed(2) + " " + rate_code);
            $('.PromoCode').html((item.Data.CodeValue != null ? (item.Data.CodeValue * rate_value).toFixed(2) : "0") + " " + rate_code)
            products = item.Products;
        }

        if (products.length > 0) {
            let index = 0;
            let items = [];
            for (index; index < products.length; index++) {
                let product = products[index];
                if (item.Data.StatusNameEn == "Waiting for payment") {
                    items.push(`<tr><td  style="direction: ltr;text-align: ${IsArabic ? 'right' : 'left'};">
                                    <a href="#" onclick="voidclick(); return false">${IsArabic ? product.NameAr : product.NameEn}</a>&nbsp;<strong>x ${product.Quantity}</strong><br>
                                   1 X  <a href="#" onclick="voidclick(); return false">${(product.Usd * rate_value).toFixed(2) + " " + rate_code}</a>
                                </td>
                                <td>${((product.Usd * rate_value) * product.Quantity).toFixed(2) + " " + rate_code}</td>
                            </tr>`);
                }
                else {
                    items.push(`<tr><td  style="direction: ltr;text-align: ${IsArabic ? 'right' : 'left'};">
                                    <a href="#" onclick="voidclick(); return false">${IsArabic ? product.NameAr : product.NameEn}</a>&nbsp;<strong>x ${product.Quantity}</strong><br>
                                   1 X  <a href="#" onclick="voidclick(); return false">${(currency.toLocaleUpperCase() == "USD" ? product.Usd : product.Kwd) + " " + currency.toLocaleUpperCase()}</a>
                                </td>
                                <td>${(currency.toLocaleUpperCase() == "USD" ? (product.Usd * product.Quantity).toFixed(2) : (product.Kwd * product.Quantity).toFixed(2)) + " " + currency.toLocaleUpperCase()}</td>
                            </tr>`);
                }
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
            items.push(`<tr><td  style="direction: ltr;text-align: ${IsArabic ? 'right' : 'left'};">
                                    <a href="#" onclick="voidclick(); return false">${item.Email}</a><br>
                                   <a href="#" onclick="voidclick(); return false">${_date}</a>
                                </td>
                                <td style="display: flex;justify-content: end;align-items: center;">${(item.URL != null && item.URL.trim() != "") ? "<a href='" + item.URL + "' target='_blank' style='font-size: 30px;margin: 5px;'><i class='w-icon-download'></i></a >" : ""}${IsArabic ? item.StatuseNameAr : item.StatuseName} </td>
                            </tr>`);
        }

        $('.Transaction-Items').html(items);
    }
    else {
        $('.order-Tracking').html(' ');
    }
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
                                    <a href="#" onclick="voidclick(); return false"><strong style="background: #05D7A0;color: #ffffff;padding: 3px;border-radius: 3px;">${IsArabic ? item.PurposeNameAr : item.PurposeName}</strong></a>
                                </td>
                                <td>${item.FullName}<br/><span style="font-size: 9px;color: #05D7A0;">${item.AddressDetails}</span></td>
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
                                    <a href="#" onclick="voidclick(); return false"><strong style="background: #05D7A0;color: #ffffff;padding: 3px;border-radius: 3px;">${IsArabic ? item.PurposeNameAr : item.PurposeName}</strong></a></td>
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

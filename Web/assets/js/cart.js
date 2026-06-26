ViewLoaderCart();
BindProductPurposesList();
BindProductCharitiesList();
BindShippingCities(107);
CheckSouldOutProducts();

let Purposes = ''
let Charities = ''
let Cities = ''

function BindShippingCities(countryId) {
    var fdata = new FormData();
    fdata.append('countryid', (countryId ? decodeURIComponent(countryId) : "-1").toString());
    fdata.append('auth_token', "");
    $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/cities',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            Cities = data;
            BindPage();
        },
        error: function (xhr, ajaxOptions, thrownError) {


        }
    });
}

function BindProductPurposesList() {
    var fdata = new FormData();
    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/productpurposes',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            Purposes = data;
            BindPage();
        },
        error: function (xhr, ajaxOptions, thrownError) {


        }
    });
}

function BindProductCharitiesList() {
    var fdata = new FormData();
    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/all_charities',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            Charities = data;
            BindPage();
        },
        error: function (xhr, ajaxOptions, thrownError) {


        }
    });
}

function BindPage() {
    if (Purposes != '' && Charities != '' && Cities != '') {
        FillCartPageItems();
    }
}

function FillCartPageItems() {
    let cart_tems = getCookie('Shareholders');
    if (cart_tems != '') {
        let cart_json = cart_tems.split('|');
        let data = [];
        for (i = 0; i < cart_json.length; i++) {
            data.push(JSON.parse(cart_json[i]))
        }

        let index = 0;
        let items = [];
        let total = 0;

        for (index; index < data.length; index++) {
            let item = data[index];

            const Purpos = Purposes.find((x) => x.Id == item.PurposeId);
            const Charity = Charities.find((x) => x.Id == item.CharityId);
            const City = Cities.find((x) => x.CityId == item.ShippingCityid);

            var fdata = new FormData();
            fdata.append('user_token', (userId ? decodeURIComponent(userId) : "-1").toString());
            fdata.append('token', (item.productToken ? decodeURIComponent(item.productToken) : "-1").toString());
            fdata.append('auth_token', "");
            $.ajax({
                cache: false,
                data: fdata,
                url: '/api/products.asmx/get_product_details',
                type: 'post',
                processData: false,
                contentType: false,
                success: function (product) {
                    if (product.Amount > 0) {
                        let price = product.Usd
                        if (product.Discount > 0) {
                            price = product.Usd - (product.Usd * product.Discount / 100)
                        }

                        total = parseFloat(total) + parseFloat((item.Quantity * (price * rate_value)).toFixed(2));
                    }

                    let productURL = (IsArabic ? '/ar/' : '/') + "shop/product/" + FixProductName(product.NameEn.trim().toLowerCase()) + "/" + product.Token;

                    let price = product.Usd
                    if (product.Discount > 0) {
                        price = product.Usd - (product.Usd * product.Discount / 100)
                    }
                    items.push(`<tr class="${product.Token}">
                        <td class="product-thumbnail">
                            <div class="p-relative">
                                <a href="#" onclick="voidclick(); return false">
                                    <figure>
                                        <img src="${item.productImage}" alt="product"
                                            width="300" height="338"  style="border: solid 1px #eee;">
                                    </figure>
                                </a>
                                <button type="button" class="btn btn-close" onclick="RemoveItemFromTheList(${index - 1},'${item.productToken}',${item.Quantity})">
                                    <i
                                        class="fas fa-times"></i>
                                </button>
                            </div>
                        </td>
                        <td class="product-name">
                            <a href="#">${IsArabic ? product.NameAr : product.NameEn}
                            </a>
                            <br/>
                            <span style="
                                ${item.Donation ? "background: #05D7A0;" : "background: #2196F3;"}
                                color: #ffffff;
                                padding: 3px;
                                border-radius: 3px;
                                font-size: 10px;
                            "> ${item.Donation ? IsArabic ? "منتج للتبرع" : "Donation Product" : IsArabic ? "منتج للشحن" : "Shipping Product"}</span >
                                <span style="
                                background: #607D8B;
                                color: #ffffff;
                                padding: 3px;
                                border-radius: 3px;
                                font-size: 10px;
                            "> ${IsArabic ? Purpos.NameAr : Purpos.NameEn}</span >
                            <p style='font-size: 12px; margin-bottom : 0px'>${IsArabic ? '<i class="w-icon-check-solid"></i> عن الاسم:' : '<i class="w-icon-check-solid"></i> For the name:'} ${item.Shareholder}</p>
                            ${item.CharityId > 0 ? `<p style ='font-size: 12px; margin-bottom : 0px'>${IsArabic ? '<i class="w-icon-check-solid"></i> المؤسسة الخيرية:' : '<i class="w-icon-check-solid"></i> Charity:'} ${IsArabic ? Charity.NameAr : Charity.NameEn}</p>` : ``}
                            ${item.ShippingCityid > 0 ? `<p style ='font-size: 12px; margin-bottom : 0px'>${IsArabic ? '<i class="w-icon-check-solid"></i> عنوان الشحن:' : '<i class="w-icon-check-solid"></i> Shippin address:'} ${IsArabic ? City.CityNameAr + ' | ' + item.ShippingTown + ' | house# ' + item.ShippingHouse + ',' + item.ShippingApartment + ' | ' + item.ShippingStreet : City.CityNameEn + ' | ' + item.ShippingTown + ' | house# ' + item.ShippingHouse + ',' + item.ShippingApartment + ' | ' + item.ShippingStreet}</p>` : ``}
                            ${item.ShippingCityid > 0 ? `<p style ='font-size: 12px; margin-bottom : 0px'>${IsArabic ? '<i class="w-icon-check-solid"></i> رقم التواصل:' : '<i class="w-icon-check-solid"></i> Contact #:'} ${item.ShippingNumber}</p>` : ``}
                            ${item.cuttingNotes !== undefined && item.cuttingNotes.trim() != '' ? `<p style ='font-size: 12px; margin-bottom : 0px'>${IsArabic ? '<i class="w-icon-check-solid"></i> ملاحظات:' : '<i class="w-icon-check-solid"></i> Notes:'} ${item.cuttingNotes}</p>` : ``}
                        </td>
                        ${IsArabic ? `<td class="product-price" style="display: table-cell;"><span class="amount"> ${rate_code} ${product.Amount > 0 ? (price * rate_value).toFixed(2) : 0} X ${item.Quantity} </span></td>` : `<td class="product - price" style="display: table - cell; "><span class="amount">${item.Quantity} X ${product.Amount > 0 ? (price * rate_value).toFixed(2) : 0} ${rate_code}</span></td>`}
                        <td class="product-subtotal">
                            <span class="amount">${product.Amount > 0 ? (item.Quantity * (price * rate_value)).toFixed(2) : "Out Of Stock"} ${product.Amount > 0 ? rate_code : ""}</span>
                        </td>
                    </tr>`);

                    if (items.length == data.length) {
                        $(".productlist").html(items);
                        $(".cart-subtotal span").html(total.toFixed(2) + " " + rate_code);
                        $(".order-total span").html(total.toFixed(2) + " " + rate_code);

                        document.getElementById("divloader").classList.add('d-none');
                        document.getElementById("divloader").classList.remove('d-flex');
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    document.getElementById("divloader").classList.add('d-none');
                    document.getElementById("divloader").classList.remove('d-flex');
                }
            });
        }
    }
    else {
        document.getElementById("divloader").classList.add('d-none');
        document.getElementById("divloader").classList.remove('d-flex');
        $(".cart-subtotal span").html("0");
        $(".order-total span").html("0");
        $(".productlist").html('<tr><td colspan="5" style="text-align: center;font-size: 17px;font-weight: 600;color: #05D7A0;">' + (IsArabic ? 'لم يتم العثور على نتائج!' : 'No Result Found!') + '</tr></td>');
    }
}

function RemoveItemPageCart(Token, value) {
    let total = 0;
    let index = 0;
    let cookie_cart_items = getCookie("cookie_cart_items");
    let items = cookie_cart_items.split(',');
    cookie_cart_items = "";

    for (index; index < items.length; index++) {
        let product = items[index];
        let item = product.split('|');

        if (item.Amount > 0) {
            total = parseFloat(total) + parseFloat((item.Count * (item.Usd * rate_value)).toFixed(2));
        }

        if (item[0] != Token) {
            if (cookie_cart_items !== "")
                cookie_cart_items = cookie_cart_items + "," + product;
            else {
                cookie_cart_items = product;

                if (value > 0) {
                    let total = parseFloat($('.cart-subtotal span').html());
                    total = total - value;
                    $(".cart-subtotal span").html(total.toFixed(2) + " " + currency.toLocaleUpperCase());
                    $(".order-total span").html(total.toFixed(2) + " " + currency.toLocaleUpperCase());
                    $('.price').html(total.toFixed(2));
                }
            }
        }
    }

    $("." + Token).remove();

    setCookie('cookie_cart_items', cookie_cart_items, 7);

    if (cookie_cart_items !== "") {
        let items = cookie_cart_items.split(',');
        let length = 0;
        let index = 0;
        for (index; index < items.length; index++) {
            let product = items[index];
            let item = product.split('|');
            length = length + parseInt(item[1]);
        }
        $('.cart-count').html(length);
    }
    else {
        $('.cart-count').html("0");
        $(".products").html(`<div class="cart-action" style="padding-top: 2.1rem;">No product added to the cart!</div>`);
        $(".cart-subtotal span").html("0");
        $(".order-total span").html("0");
        $(".productlist").html('<tr><td colspan="5" style="text-align: center;font-size: 17px;font-weight: 600;color: #05D7A0;">' + (IsArabic ? 'لم يتم العثور على نتائج!' : 'No Result Found!') + '</tr></td>');
    }
}

function clearCart() {
    setCookie('cookie_cart_items', "", 7);
    setCookie('Shareholders', "", 7);
    cookie_cart_items = "";
    FillCartPageItems()
    $('.cart-count').html("0");
    $(".products").html(`<div class="cart-action" style="padding-top: 2.1rem;">No product added to the cart!</div>`);

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

function Increase(Id) {
    let value = parseInt($('#' + Id).html());
    value = value + 1;
    $('#' + Id).html(value);
    updateCart();
}

function Decrease(Id) {
    let value = parseInt($('#' + Id).html());
    value = value - 1;
    if (value > 0)
        $('#' + Id).html(value);
    else
        $('#' + Id).html(1);
    updateCart();
}


function updateCart() {
    let list = $(".product-quantity .quantity");
    let index = 0;
    let cook = "";
    if (list.length > 0) {
        for (index; index < list.length; index++) {
            let item = list[index].id.replace("quantity", "") + "|" + list[index].innerHTML;
            if (cook == "")
                cook = item
            else
                cook = cook + "," + item;
        }
        setCookie('cookie_cart_items', cook, 7);

        cookie_cart_items = getCookie("cookie_cart_items");

        BindCartPage(cookie_cart_items, true);

        if (cookie_cart_items !== "") {
            let length = 0;
            let index = 0;
            let items = cookie_cart_items.split(',');
            for (index; index < items.length; index++) {
                let product = items[index];
                let item = product.split('|');
                length = length + parseInt(item[1]);
            }
            $('.cart-count').html(length);
            CalculateCartPrices(cookie_cart_items);
        }
    }
}


function ViewLoaderCart() {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');
}

function RemoveItemFromTheList(i, token, quantity) {
    let index = 0;
    let cart_tems = getCookie('Shareholders');
    if (cart_tems != '') {
        let cart_json = cart_tems.split('|');
        let data = [];
        for (index = 0; index < cart_json.length; index++) {
            data.push(JSON.parse(cart_json[index]))
        }

        data.splice(i, 1);

        setCookie('Shareholders', "", 7);
        setCookie('cookie_cart_items', "", 7);

        for (index = 0; index < data.length; index++) {

            var product = data[index];
            const Item = {
                Donation: product.Donation,
                PurposeId: product.PurposeId,
                CharityId: product.CharityId,
                productToken: product.productToken,
                productName: product.productName,
                productImage: product.productImage,
                Quantity: product.Quantity,
                Shareholder: product.Shareholder,
                ShippingCityid: product.ShippingCityid,
                ShippingTown: product.ShippingTown,
                ShippingHouse: product.ShippingHouse,
                ShippingStreet: product.ShippingStreet,
                ShippingApartment: product.ShippingApartment,
                ShippingNumber: product.ShippingNumber,
            }

            add_shareholders_value(Item);
            AddToCart(product.productToken, product.Quantity)
        }

        let cookie_cart_items = getCookie("cookie_cart_items");

        if (cookie_cart_items !== "") {
            let length = 0;
            let index = 0;
            let items = cookie_cart_items.split(',');
            for (index; index < items.length; index++) {
                let product = items[index];
                let item = product.split('|');
                length = length + parseInt(item[1]);
            }
            $('.cart-count').html(length);
            CalculateCartPrices(cookie_cart_items);
        }
        else {
            $('.cart-count').html("0");
            $(".products").html(`<div class="cart-action" style="padding-top: 2.1rem;">${IsArabic ? 'لا يوجد منتج مضاف للسلة' : 'No product added to the cart!'}</div>`);
        }

        ViewLoaderCart();
        FillCartPageItems();
    }
}

function add_shareholders_value(json) {
    let cookieValue = '';
    let expire = '';
    let period = '';

    let Shareholders = getCookie("Shareholders");

    if (Shareholders == '') {
        cookieValue = 'Shareholders' + '=' + JSON.stringify(json) + ';';
    }
    else {
        cookieValue = 'Shareholders' + '=' + Shareholders + '|' + JSON.stringify(json) + ';';
    }
    cookieValue += 'path=/ ;';
    period = 7;
    expire = new Date();
    expire.setTime(expire.getTime() + 1000 * 3600 * 24 * period);
    expire.toUTCString();
    cookieValue += 'expires=' + expire + ';';
    document.cookie = cookieValue;
}
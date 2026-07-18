const Shareholders = [];
const Shipping_Shareholders = [];
const ProductList = [];
const ShippingProductList = [];
let donation_quantities = 0;
let shipping_quantities = 0;
let billingCityId = "-1";
let subtotalvalue = 0;
let Oldsubtotalvalue = 0;
let _promocodevalue = 0;
let _totalBeforeApplayPromoCode = 0;

BindProductPurposesList();
BindProductCharitiesList();
BindShippingCities(107);
CheckSouldOutProducts();

let Purposes = ''
let Charities = ''
let Cities = ''

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
                    if (item.Donation == 0) {
                        const Item_product = {
                            PurposeId: item.PurposeId,
                            PurposeName: Purpos ? (IsArabic ? Purpos.NameAr : Purpos.NameEn) : '',
                            productToken: item.productToken,
                            productName: IsArabic ? product.NameAr : product.NameEn,
                            Quantity: item.Quantity,
                            ShippingName: item.Shareholder,
                            ShippingNumber: item.ShippingNumber,
                            ShippingCityid: item.ShippingCityid,
                            ShippingCityText: City ? (IsArabic ? City.CityNameAr : City.CityNameEn) : '',
                            ShippingTown: item.ShippingTown,
                            ShippingBlock: '',
                            ShippingHouse: item.ShippingHouse,
                            ShippingStreet: item.ShippingStreet,
                            ShippingApartment: item.ShippingApartment,
                            cuttingNotes: item.cuttingNotes,
                        };

                        Shipping_Shareholders.push(Item_product);
                    }
                    else {
                        const Item_product = {
                            CharityId: item.CharityId,
                            CharityName: Charity ? (IsArabic ? Charity.NameAr : Charity.NameEn) : '',
                            PurposeId: item.PurposeId,
                            PurposeName: Purpos ? (IsArabic ? Purpos.NameAr : Purpos.NameEn) : '',
                            productToken: item.productToken,
                            productName: IsArabic ? product.NameAr : product.NameEn,
                            Quantity: item.Quantity,
                            Shareholder: item.Shareholder,
                            AddressDetails: '',
                        };

                        Shareholders.push(Item_product);
                    }

                    if (product.Amount > 0) {
                        let price = product.Usd;

                        if (product.Discount > 0) {
                            price = product.Usd - (product.Usd * product.Discount / 100)
                        }

                        total = parseFloat(total) + parseFloat((item.Quantity * (price * rate_value)).toFixed(2));
                    }

                    let productURL = (IsArabic ? '/ar/' : '/') + "shop/product/" + FixProductName(product.NameEn.trim().toLowerCase()) + "/" + product.Token;
                    let imgSrc = item.productImage;
                    if (imgSrc) {
                        if (!imgSrc.startsWith('/') && !imgSrc.startsWith('http')) {
                            imgSrc = '/' + imgSrc;
                        }
                    } else {
                        imgSrc = '/assets/images/defult_image.png';
                    }
                    items.push(`<tr class="${product.Token}">
                        <td class="product-thumbnail">
                            <div class="p-relative">
                                <a href="#" onclick="voidclick(); return false">
                                    <figure style="display: flex;justify-content: center;">
                                        <img src="${imgSrc}" alt="product"
                                            width="300" height="338"  style="border: solid 1px #eee;">
                                    </figure>
                                </a>
                            </div>
                        </td>
                        <td class="product-name">
                            <a href="#">${IsArabic ? product.NameAr : product.NameEn}
                            </a>
                            <br/>

                            <p style='font-size: 12px; margin-bottom : 0px'>${IsArabic ? '<i class="w-icon-check-solid"></i> عن الاسم:' : '<i class="w-icon-check-solid"></i> For the name:'} ${item.Shareholder}</p>
                            <p style='font-size: 12px; margin-bottom : 0px'>${IsArabic ? '<i class="w-icon-check-solid"></i> العدد:' : '<i class="w-icon-check-solid"></i> Quantity:'} ${item.Quantity}</p>
                            ${item.CharityId > 0 ? `<p style ='font-size: 12px; margin-bottom : 0px'>${IsArabic ? '<i class="w-icon-check-solid"></i> المؤسسة الخيرية:' : '<i class="w-icon-check-solid"></i> Charity:'} ${IsArabic ? Charity.NameAr : Charity.NameEn}</p>` : ``}
                            ${item.ShippingCityid > 0 ? `<p style ='font-size: 12px; margin-bottom : 0px'>${IsArabic ? '<i class="w-icon-check-solid"></i> عنوان الشحن:' : '<i class="w-icon-check-solid"></i> Shippin address:'} ${IsArabic ? City.CityNameAr + ' | ' + item.ShippingTown + ' | house# ' + item.ShippingHouse + ',' + item.ShippingApartment + ' | ' + item.ShippingStreet : City.CityNameEn + ' | ' + item.ShippingTown + ' | house# ' + item.ShippingHouse + ',' + item.ShippingApartment + ' | ' + item.ShippingStreet}</p>` : ``}
                            ${item.ShippingCityid > 0 ? `<p style ='font-size: 12px; margin-bottom : 0px'>${IsArabic ? '<i class="w-icon-check-solid"></i> رقم التواصل:' : '<i class="w-icon-check-solid"></i> Contact #:'} ${item.ShippingNumber}</p>` : ``}
                            ${item.cuttingNotes !== undefined && item.cuttingNotes.trim() != '' ? `<p style ='font-size: 12px; margin-bottom : 0px'>${IsArabic ? '<i class="w-icon-check-solid"></i> ملاحظات:' : '<i class="w-icon-check-solid"></i> Notes:'} ${item.cuttingNotes}</p>` : ``}
                        </td>
                        <td class="product-name" style="width: 160px;">
                            <span style="
                                ${item.Donation ? "background: #593930;" : "background: #2196F3;"}
                                color: #ffffff;
                                padding: 10px;
                                border-radius: 3px;
                                font-size: 10px;
                            "> ${item.Donation ? IsArabic ? "منتج للتبرع" : "Donation Product" : IsArabic ? "منتج للشحن" : "Shipping Product"}</span ></td>
                        <td class="product-subtotal">
                                <span style="
                                background: #607D8B;
                                color: #ffffff;
                                padding: 10px;
                                border-radius: 3px;
                                font-size: 10px;
                            "> ${IsArabic ? "الغرض: " + Purpos.NameAr : "Purpose: " + Purpos.NameEn}</span >                        </td>
                    </tr>`);

                    if (items.length == data.length) {
                        $(".productlist").html(items);
                        $(".cart-subtotal span").html(total.toFixed(2) + " " + rate_code);
                        $(".order-total span").html(total.toFixed(2) + " " + rate_code);

                        if (Shipping_Shareholders.length > 0) {
                            $('#checkout-shipping-section').removeClass('d-none');
                        } else {
                            $('#checkout-shipping-section').addClass('d-none');
                        }

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
        $(".productlist").html('<tr><td colspan="5" style="text-align: center;font-size: 17px;font-weight: 600;color: #593930;">' + (IsArabic ? 'لم يتم العثور على نتائج!' : 'No Result Found!') + '</tr></td>');
    }
}

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

if (userId !== "-1") {
    $('.login-toggle').remove();
    $('.login-content').remove();
    BindPageData();
}
else {
    BindBillingCountiries(74);
}

var input = document.querySelector("#phone");
window.intlTelInput(input, {
    hiddenInput: "full_phone",
    utilsScript: "/assets/vendor/intlTelInput/utils.js?1603274336113",
});
var iti = intlTelInput(input);
iti.setCountry("jo");


cookie_cart_items = getCookie("cookie_cart_items");

if (cookie_cart_items.trim() == "") {
    window.location = "/" + (IsArabic ? 'ar/' : '') + "cart";
}
else {
    BindCheckoutPage(cookie_cart_items);
}

function BindBillingCountiries(countryId) {
    var fdata = new FormData();
    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/countries',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillBillingCountriesList(data, countryId);
            BindBillingCities(countryId);
        },
        error: function (xhr, ajaxOptions, thrownError) {


        }
    });
}

function FillBillingCountriesList(data, countryId) {
    if (data.length > 0) {
        var countries = data;
        let index = 0;
        let items = [];
        for (index; index < countries.length; index++) {
            let item = countries[index];
            if (item.CountryId !== countryId)
                items.push(`<option value="${item.CountryId}">${IsArabic ? item.CountryNameAr : item.CountryNameEn}</option >`);
            else
                items.push(`<option value="${item.CountryId}" selected>${IsArabic ? item.CountryNameAr : item.CountryNameEn}</option>`);
        }

        $('#billingCountries').html(items);
    }
}

function BindBillingCities(countryId) {
    var fdata = new FormData();
    fdata.append('countryid', (countryId ? decodeURIComponent(countryId) : "-1").toString());

    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/cities',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillBillingCitiesList(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {


        }
    });
}

function FillBillingCitiesList(data) {
    if (data.length > 0) {
        var cities = data;
        let index = 0;
        let items = [];
        for (index; index < cities.length; index++) {
            let item = cities[index];
            if (item.CityId.toString() == billingCityId) {
                items.push(`<option value="${item.CityId}" selected>${IsArabic ? item.CityNameAr : item.CityNameEn}</option>`);
            }
            else {
                items.push(`<option value="${item.CityId}">${IsArabic ? item.CityNameAr : item.CityNameEn}</option>`);
            }
        }

        $('[name="billing-city"]').html(items);
    }
}

$('#billingCountries').on('change', (e) => {
    BindBillingCities($('#billingCountries').find(":selected").val());
});

function BindCheckoutPage(items) {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');
    var fdata = new FormData();
    fdata.append('cookie_cart_items', items);
    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/cookie_cart_items',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillCheckoutPageItems(data);
            FillProductsItems(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');


        }
    });
}

function FillCheckoutPageItems(data) {
    if (data.length > 0) {
        let index = 0;
        let items = [];
        let total = 0;
        let Oldtotal = 0;

        for (index; index < data.length; index++) {
            let item = data[index];

            if (item.Donation) {
                $('#tab3-1').removeClass('d-none');
            }
            else {
                $('#tab3-2').removeClass('d-none');
            }

            if (item.Amount > 0) {
                total = parseFloat(total) + parseFloat((item.Count * (item.Usd * rate_value)).toFixed(2));
                Oldtotal = parseFloat(Oldtotal) + parseFloat((item.Count * item.Usd).toFixed(2));
            }

            items.push(` <tr class="bb-no">
                                <td class="product-name" style=" max-width:200px;word-wrap:break-word;">${IsArabic ? item.NameAr : item.NameEn}<br/>
                             <span style="${item.Donation ? "background: #593930;" : "background: #2196F3;"}
                                color: #ffffff;
                                padding: 3px;
                                border-radius: 3px;
                                font-size: 10px;"> ${item.Donation ? IsArabic ? "منتج للتبرع" : "Donation Product" : IsArabic ? "منتج للشحن" : "Shipping Product"}</span>
                            </td >
                                <td class="product-total" style="direction: ltr;text-align: ${IsArabic ? 'left' : 'right'};"> <span class="product-quantity">${item.Amount > 0 ? item.Count : 0}</span> X ${item.Amount > 0 ? (item.Usd * rate_value).toFixed(2) : (IsArabic ? "نفذ من المخزون" : "Out Of Stock")} ${item.Amount > 0 ? rate_code : ""}</td >
                            </tr>`);
        }

        subtotalvalue = total.toFixed(2);
        Oldsubtotalvalue = Oldtotal.toFixed(2);

        items.push(`<tr class="cart-subtotal bb-no">
                        <td>
                            <b>${IsArabic ? 'المجموع الفرعي' : 'Subtotal'}</b>
                        </td>
                        <td>
                            <b>${total.toFixed(2).toString() + " " + rate_code}</b>
                        </td>
                    </tr>`);


        $('.CheckoutItems').html(items);

        $('.order-total span').html(total.toFixed(2) + " " + rate_code);
    }
}

function BindPageData() {
    var fdata = new FormData();
    fdata.append('user_token', (userId ? decodeURIComponent(userId) : "-1").toString());

    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/users.asmx/get_user_by_token',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillPageData(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {


        }
    });
}

function FillPageData(data) {
    var item = JSON.parse(data);

    $('[name="firstname"]').val(item.FirstName);
    $('[name="lastname"]').val(item.LastName);
    if (ValidateEmail(item.Email))
        $('[name="email"]').val(item.Email);
    else
        $('[name="email"]').val(item.AnotherEmail);

    if (item.Code != null && item.Code != "-1") {
        var Country = iti.countries;
        for (var i = 0; i < Country.length; i++) {
            if (Country[i].dialCode == item.Code) {
                iti.setCountry(Country[i].iso2);
                break;
            }
        }
    }

    if (item.Mobile != null && item.Mobile != "-1") {
        let mobileNo = item.Mobile.replace("00" + item.Code, "");
        mobileNo = mobileNo.replace(item.Code, "");
        $('#phone').val(mobileNo.toString());
    }

    let BillingAddress = item.BillingAddresses[0];

    if (typeof BillingAddress !== "undefined") {
        $('[name="billing-town"]').val(BillingAddress.Town);
        $('[name="billing-block"]').val(BillingAddress.Block);
        $('[name="billing-street"]').val(BillingAddress.Street);
        $('[name="billing-house"]').val(BillingAddress.HouseNo);
        $('[name="billing-Apartment"]').val(BillingAddress.ApartmentNo);
        $('[name="billing-paci"]').val(BillingAddress.PaciNo == 0 ? ' ' : BillingAddress.PaciNo);
        $("#billingCountries").val(BillingAddress.City.Country.CountryId.toString()).change();
        BindBillingCountiries(BillingAddress.City.Country.CountryId);
        billingCityId = BillingAddress.City.CityId.toString();
        BindBillingCities(BillingAddress.City.Country.CountryId);
    }
    else {
        BindBillingCountiries(74);
        BindBillingCities(74);
    }
}

function SubmitOrder() {
    let val = true;

    if (!ValidateShippingFields()) {
        val = false;
    }

    let firstname = $('[name="firstname"]')[0];
    let lastname = $('[name="lastname"]')[0];
    let email = $('[name="email"]')[0];

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

    if (firstname.value.trim() === "") {
        val = false;
        firstname.style.background = "#fff9b3";
    }
    else {
        firstname.style.background = "#ffffff";
    }

    if (lastname.value.trim() === "") {
        val = false;
        lastname.style.background = "#fff9b3";
    }
    else {
        lastname.style.background = "#ffffff";
    }

    var number = iti.getNumber().replace("+", "00");
    var code = iti.selectedCountryData.dialCode;

    if (iti.isValidNumber()) {
        val = true;
        document.getElementById('phone').style.background = "#ffffff";
        $('.divPhone').css("background", "#ffffff");
    }
    else {
        document.getElementById('phone').style.background = "#fff9b3";
        $('.divPhone').css("background", "#fff9b3");
        val = false;
    }

    var town = $('[name="billing-town"]')[0];
    var block = $('[name="billing-block"]')[0];
    var street = $('[name="billing-street"]')[0];
    var house = $('[name="billing-house"]')[0];
    var apartment = $('[name="billing-Apartment"]')[0];

    if (town.value.trim() === "") {
        val = false;
        town.style.background = "#fff9b3";
    }
    else {
        town.style.background = "#ffffff";
    }

    if (block.value.trim() === "") {
        val = false;
        block.style.background = "#fff9b3";
    }
    else {
        block.style.background = "#ffffff";
    }

    if (street.value.trim() === "") {
        val = false;
        street.style.background = "#fff9b3";
    }
    else {
        street.style.background = "#ffffff";
    }

    if (house.value.trim() === "") {
        val = false;
        house.style.background = "#fff9b3";
    }
    else {
        house.style.background = "#ffffff";
    }

    if (apartment.value.trim() === "") {
        val = false;
        apartment.style.background = "#fff9b3";
    }
    else {
        apartment.style.background = "#ffffff";
    }

    var cityid = $('[name="billing-city"]').find(":selected").val();

    if (typeof cityid == "undefined") {
        val = false;
        $('[name="billing-city"]')[0].style.background = "#fff9b3";
    } else {
        $('[name="billing-city"]')[0].style.background = "#ffffff";
    }

    var OrderNotes = $('[name="order-notes"]')[0].value;

    if (val) {
        document.getElementById("divloader").style.background = "#ffffff";
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();
        fdata.append('usertoken', (userId ? decodeURIComponent(userId) : "-1").toString());
        fdata.append('items', cookie_cart_items);
        fdata.append('firstname', firstname.value.trim());
        fdata.append('lastname', lastname.value.trim());
        fdata.append('email', email.value.trim());
        fdata.append('number', number.trim());
        fdata.append('town', town.value.trim());
        fdata.append('block', block.value.trim());
        fdata.append('street', street.value.trim());
        fdata.append('house', house.value.trim());
        fdata.append('apartment', apartment.value.trim());
        fdata.append('cityid', cityid);
        fdata.append('ordernotes', OrderNotes);
        fdata.append('shareholders', JSON.stringify(Shareholders));
        fdata.append('shippingshareholders', JSON.stringify(Shipping_Shareholders));
        fdata.append('auth_token', "");
        fdata.append('promo_code', document.getElementById('txtPromoCode').value.trim());
        fdata.append('code_value', _promocodevalue / rate_value);
        $.ajax({
            cache: false,
            data: fdata,
            url: '/api/products.asmx/submit_order',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.trim() != "Registered Email") {
                    setCookie('cookie_cart_items', "", 7);
                    setCookie('Shareholders', "", 7);
                    window.location = "/" + (IsArabic ? 'ar/' : '') + "payment-service?orderid=" + data.trim() + ((rate_code == "JOD") ? "&amount=" + $('.order-total span').html().trim().replace('JOD', '') : '') + "&page=checkout";
                }
                else {
                    if (IsArabic)
                        $('.alert-success P').html("عنوان البريد الإلكتروني مسجل بالفعل في النظام ، لذا يجب عليك تسجيل الدخول باستخدام هذا البريد الإلكتروني ، إذا لم يكن لديك كلمة المرور ، فانتقل إلى علامة التبويب تسجيل الدخول وانقر فوق إعادة تعيين كلمة المرور.");
                    else
                        $('.alert-success P').html("The email address is already registered in the system, so you must log in with this email, if you do not have the password, go to the Login tab and click Reset password.");
                    $('.alert-success').removeClass("d-none");
                    $('body , html').animate({
                        scrollTop: $('.login-toggle').offset().top
                    }, 300);
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
    else {
        $('body , html').animate({
            scrollTop: $('.billing-title').offset().top
        }, 300)
    }
}

function FillProductsWithShareholderItems(data, shareholder, shipping_shareholders) {
    if (data.length > 0) {
        let index = 0;
        let items = [];
        let total = 0;
        let Oldtotal = 0;

        for (index; index < data.length; index++) {
            let item = data[index];

            let shareholderquantity = 0;
            let shareholders_index = 0;
            if (item.Donation) {
                for (shareholders_index; shareholders_index < shareholder.length; shareholders_index++) {
                    let shareholders_item = shareholder[shareholders_index];

                    if (IsArabic) {
                        if (item.NameAr.trim() == shareholders_item.productName.trim()) {
                            shareholderquantity = shareholderquantity + parseInt(shareholders_item.Quantity)
                        }
                    }
                    else {
                        if (item.NameEn.trim() == shareholders_item.productName.trim()) {
                            shareholderquantity = shareholderquantity + parseInt(shareholders_item.Quantity)
                        }
                    }
                }
            }
            else {
                for (shareholders_index; shareholders_index < shipping_shareholders.length; shareholders_index++) {
                    let shareholders_item = shipping_shareholders[shareholders_index];
                    if (IsArabic) {
                        if (item.NameAr.trim() == shareholders_item.productName.trim()) {
                            shareholderquantity = shareholderquantity + parseInt(shareholders_item.Quantity)
                        }
                    }
                    else {
                        if (item.NameEn.trim() == shareholders_item.productName.trim()) {
                            shareholderquantity = shareholderquantity + parseInt(shareholders_item.Quantity)
                        }
                    }
                }
            }

            if (item.Donation) {
                $('#tab3-1').removeClass('d-none');
            }
            else {
                $('#tab3-2').removeClass('d-none');
            }

            if (item.Amount > 0) {
                total = parseFloat(total) + parseFloat((item.Count * (item.Usd * rate_value)).toFixed(2));
                Oldtotal = parseFloat(Oldtotal) + parseFloat((item.Count * item.Usd).toFixed(2));
            }

            items.push(` <tr class="bb-no">
                                <td class="product-name" style=" max-width:200px;word-wrap:break-word;${item.Count == shareholderquantity ? 'border-bottom: solid 4px #FFC107;padding-bottom: 4px;' : ''}"><i class="w-icon-check ${item.Count == shareholderquantity ? '' : 'd-none'}" style="color:#FFC107;"></i>${IsArabic ? item.NameAr : item.NameEn}<br/>
                             <span style="${item.Donation ? "background: #593930;" : "background: #2196F3;"}
                                color: #ffffff;
                                padding: 3px;
                                border-radius: 3px;
                                font-size: 10px;"> ${item.Donation ? IsArabic ? "منتج للتبرع" : "Donation Product" : IsArabic ? "منتج للشحن" : "Shipping Product"}</span>
                            </td >
                                <td class="product-total" style="direction: ltr;text-align: ${IsArabic ? 'left' : 'right'};"> <span class="product-quantity">${item.Amount > 0 ? item.Count : 0}</span> X ${item.Amount > 0 ? (item.Usd * rate_value).toFixed(2) : (IsArabic ? "نفذ من المخزون" : "Out Of Stock")} ${item.Amount > 0 ? rate_code : ""}</td >
                            </tr>`);
        }

        subtotalvalue = total.toFixed(2);
        Oldsubtotalvalue = Oldtotal.toFixed(2);

        items.push(`<tr class="cart-subtotal bb-no">
                        <td>
                            <b>${IsArabic ? 'المجموع الفرعي' : 'Subtotal'}</b>
                        </td>
                        <td>
                            <b>${total.toFixed(2).toString() + " " + rate_code}</b>
                        </td>
                    </tr>`);


        $('.CheckoutItems').html(items);
    }
}

function FillProductsItems(data) {
    if (data.length > 0) {
        let index = 0;
        let items = [];
        let shippingitems = [];
        items.push(`<option value="-1">${IsArabic ? 'حدد..' : 'Select..'}</option >`);
        shippingitems.push(`<option value="-1">${IsArabic ? 'حدد..' : 'Select..'}</option >`);
        for (index; index < data.length; index++) {
            let item = data[index];
            if (item.Donation) {
                items.push(`<option value="${item.Token}">${IsArabic ? item.NameAr : item.NameEn}</option >`);
                ProductList.push(item);
                donation_quantities = donation_quantities + item.Count;
            }
            else {
                ShippingProductList.push(item);
                shipping_quantities = shipping_quantities + item.Count;
                shippingitems.push(`<option value="${item.Token}">${IsArabic ? item.NameAr : item.NameEn}</option >`);
            }
        }

        $('[name="products"]').html(items);
        $('[name="shippingproducts"]').html(shippingitems);
    }
}


function ApplyPromoCode() {
    let val = true;
    let code = document.getElementById('txtPromoCode');

    if (code.value.trim() == '') {
        val = false;
        code.style.background = "#fff9b3";
    }
    else {
        code.style.background = "#ffffff";
    }

    if (val) {
        var fdata = new FormData();
        fdata.append('code', code.value.trim());
        fdata.append('auth_token', "");
        $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/get_code_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                ApplayPromoCode(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');
            }
        });
    }

}

function ApplayPromoCode(data) {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');
    let val = true;
    $('.promo-code').addClass('d-none');
    $('.promo-code').css({ "margin-bottom": "unset", "text-align": "start", "color": "red" });
    let value = 0;
    if (data.length > 0) {
        let item = data[0];

        const start = Date.parse(item.StartDate);
        const end = Date.parse(item.EndDate);
        const day = Date.now();

        if (!(start <= day && end >= day) || !item.IsActive) {
            val = false;
            $('.promo-code').removeClass('d-none');
            if (!IsArabic)
                $('.promo-code').html('The promotional code has expired or has not taken effect. Please contact the administrator!')
            else
                $('.promo-code').html('انتهت صلاحية الرمز الترويجي أو لم يتم تفعيله. الرجاء الاتصال بالمسؤول!')
        } else if ((item.MinInvoice * rate_value) > subtotalvalue) {
            val = false;
            $('.promo-code').removeClass('d-none');
            if (!IsArabic)
                $('.promo-code').html('You must purchase a minimum of ' + (item.MinInvoice * rate_value).toFixed(2) + ' ' + rate_code + ' to get this promo code!')
            else
                $('.promo-code').html('يجب عليك شراء ما لا يقل عن ' + (item.MinInvoice * rate_value).toFixed(2) + ' ' + rate_code + ' للحصول على هذا الرمز الترويجي!')
        }

        if (val) {
            let Olddiscount_value = ((item.Discount * Oldsubtotalvalue) / 100).toFixed(2);
            let Oldfix_value = item.FixValue;

            if (Olddiscount_value > 0) {
                if (Olddiscount_value >= Oldfix_value) {
                    _promocodevalue = Oldfix_value;
                }
                else {
                    _promocodevalue = Olddiscount_value;
                }
            }
            else {
                _promocodevalue = Oldfix_value;
            }

            let discount_value = ((item.Discount * subtotalvalue) / 100).toFixed(2);
            let fix_value = item.FixValue * rate_value;

            if (discount_value > 0) {
                if (discount_value >= fix_value && fix_value != 0) {
                    value = fix_value;
                }
                else {
                    value = discount_value;
                }
            }
            else {
                value = fix_value;
            }

            _promocodevalue = value;

            $('.promo-code').css({ "margin-bottom": "unset", "text-align": "start", "color": "green" });

            if (item.Discount > 0 && (item.FixValue * rate_value) > 0) {
                $('.promo-code').removeClass('d-none');
                if (!IsArabic)
                    $('.promo-code').html('The code is active and you will get a discount of ' + item.Discount.toString() + '% and a maximum of ' + (item.FixValue * rate_value).toFixed(2) + ' ' + rate_code)
                else
                    $('.promo-code').html('الرمز نشط وستحصل على خصم ' + item.Discount.toString() + '٪ وبحد أقصى ' + (item.FixValue * rate_value).toFixed(2) + ' ' + rate_code)
            }

            if (item.Discount > 0 && (item.FixValue * rate_value) <= 0) {
                $('.promo-code').removeClass('d-none');
                if (!IsArabic)
                    $('.promo-code').html('The code is active and you will get a discount of ' + item.Discount.toString() + '%.')
                else
                    $('.promo-code').html('الرمز نشط وستحصل على خصم ' + item.Discount.toString() + '٪')
            }

            if (item.Discount <= 0 && (item.FixValue * rate_value) > 0) {
                $('.promo-code').removeClass('d-none');
                if (!IsArabic)
                    $('.promo-code').html('The code is active and you will get a discount of ' + (item.FixValue * rate_value).toFixed(2) + ' ' + rate_code)
                else
                    $('.promo-code').html('الرمز نشط وستحصل على خصم ' + (item.FixValue * rate_value).toFixed(2) + ' ' + rate_code)
            }
        }
    }
    else {
        val = false;
        $('.promo-code').removeClass('d-none');
        if (!IsArabic)
            $('.promo-code').html('The promo code does not exist!')
        else
            $('.promo-code').html('الرمز الترويجي غير موجود!')
    }

    AppluPromoCodeOnYourBill(value);
}

function AppluPromoCodeOnYourBill(value) {
    if (value == 0) {
        $('.order-promo-code-value span').html('0' + ' ' + rate_code);
        BindCheckoutPage(cookie_cart_items);
    }
    else {
        $('.order-promo-code-value span').html(parseFloat(value).toFixed(2) + ' ' + rate_code);

        if (_totalBeforeApplayPromoCode == 0) {
            _totalBeforeApplayPromoCode = parseFloat($('.order-total span').html().replace(rate_code, '').trim());
        }

        let total = _totalBeforeApplayPromoCode - value;

        $('.order-total span').html(total.toFixed(2) + ' ' + rate_code);
    }

    setTimeout(
        function () {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }, 1000);
}

function SubmitBankTransferOrder() {
    let val = true;

    if (!ValidateShippingFields()) {
        val = false;
    }

    let firstname = $('[name="firstname"]')[0];
    let lastname = $('[name="lastname"]')[0];
    let email = $('[name="email"]')[0];

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

    if (firstname.value.trim() === "") {
        val = false;
        firstname.style.background = "#fff9b3";
    }
    else {
        firstname.style.background = "#ffffff";
    }

    if (lastname.value.trim() === "") {
        val = false;
        lastname.style.background = "#fff9b3";
    }
    else {
        lastname.style.background = "#ffffff";
    }

    var number = iti.getNumber().replace("+", "00");
    var code = iti.selectedCountryData.dialCode;

    if (iti.isValidNumber()) {
        val = true;
        document.getElementById('phone').style.background = "#ffffff";
        $('.divPhone').css("background", "#ffffff");
    }
    else {
        document.getElementById('phone').style.background = "#fff9b3";
        $('.divPhone').css("background", "#fff9b3");
        val = false;
    }

    var town = $('[name="billing-town"]')[0];
    var block = $('[name="billing-block"]')[0];
    var street = $('[name="billing-street"]')[0];
    var house = $('[name="billing-house"]')[0];
    var apartment = $('[name="billing-Apartment"]')[0];

    if (town.value.trim() === "") {
        val = false;
        town.style.background = "#fff9b3";
    }
    else {
        town.style.background = "#ffffff";
    }

    if (block.value.trim() === "") {
        val = false;
        block.style.background = "#fff9b3";
    }
    else {
        block.style.background = "#ffffff";
    }

    if (street.value.trim() === "") {
        val = false;
        street.style.background = "#fff9b3";
    }
    else {
        street.style.background = "#ffffff";
    }

    if (house.value.trim() === "") {
        val = false;
        house.style.background = "#fff9b3";
    }
    else {
        house.style.background = "#ffffff";
    }

    if (apartment.value.trim() === "") {
        val = false;
        apartment.style.background = "#fff9b3";
    }
    else {
        apartment.style.background = "#ffffff";
    }

    var cityid = $('[name="billing-city"]').find(":selected").val();

    if (typeof cityid == "undefined") {
        val = false;
        $('[name="billing-city"]')[0].style.background = "#fff9b3";
    } else {
        $('[name="billing-city"]')[0].style.background = "#ffffff";
    }

    var OrderNotes = $('[name="order-notes"]')[0].value;


    if (val) {
        document.getElementById("divloader").style.background = "#ffffff";
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();
        fdata.append('usertoken', (userId ? decodeURIComponent(userId) : "-1").toString());
        fdata.append('items', cookie_cart_items);
        fdata.append('firstname', firstname.value.trim());
        fdata.append('lastname', lastname.value.trim());
        fdata.append('email', email.value.trim());
        fdata.append('number', number.trim()); 
        fdata.append('town', town.value.trim());
        fdata.append('block', block.value.trim());
        fdata.append('street', street.value.trim());
        fdata.append('house', house.value.trim());
        fdata.append('apartment', apartment.value.trim());
        fdata.append('cityid', cityid);
        fdata.append('ordernotes', OrderNotes);
        fdata.append('shareholders', JSON.stringify(Shareholders));
        fdata.append('shippingshareholders', JSON.stringify(Shipping_Shareholders));
        fdata.append('auth_token', "");
        fdata.append('promo_code', document.getElementById('txtPromoCode').value.trim());
        fdata.append('code_value', _promocodevalue / rate_value);
        $.ajax({
            cache: false,
            data: fdata,
            url: '/api/products.asmx/submit_bank_transfer_order',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                setCookie('cookie_cart_items', "", 7);
                setCookie('Shareholders', "", 7);
                window.location = "/" + (IsArabic ? 'ar/' : '') + "order-complete";
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');
            }
        });
    }
    else {
        $('body , html').animate({
            scrollTop: $('.billing-title').offset().top
        }, 300)
    }
}

function BindShippingShareholderData(data) {
    if (data.length > 0) {
        let index = 0;
        let items = [];
        for (index; index < data.length; index++) {
            let item = data[index];
            items.push(`<tr><td>${item.Quantity} X ${item.productName}</td><td>${item.ShippingName}</td><td>${item.ShippingCityText}</br><span style="font-size: 10px;color: #593930;">${item.ShippingTown}, ${item.ShippingBlock}, ${item.ShippingHouse}, ${item.ShippingApartment}, ${item.ShippingStreet}.</br>${item.ShippingNumber}</span></td><td style="text-align: center;">${item.PurposeName}</td></tr>`);
        }
        $('.shippingShareholdersList').html(items);
        $('.shipping-order-shareholders').removeClass("d-none");
    }
}

$(document).on('change', '#same-as-billing', function() {
    let isChecked = $(this).is(':checked');
    let $fields = $('#shipping-address-fields').find('input, select');
    if (isChecked) {
        $fields.prop('readonly', true);
        $fields.css('background-color', '#f4f4f4');
        
        // Visually copy values
        $('[name="shipping-town"]').val($('[name="billing-town"]').val());
        $('[name="shipping-street"]').val($('[name="billing-street"]').val());
        $('[name="shipping-house"]').val($('[name="billing-house"]').val());
        $('[name="shipping-Apartment"]').val($('[name="billing-Apartment"]').val());
    } else {
        $fields.prop('readonly', false);
        $fields.css('background-color', '#ffffff');
    }
});

var shipping_input = document.querySelector("#contact_phone");
var iti2 = null;
if (shipping_input) {
    window.intlTelInput(shipping_input, {
        initialCountry: "jo",
        utilsScript: "/assets/vendor/intlTelInput/utils.js?1603274336113",
    });
    iti2 = window.intlTelInputGlobals.getInstance(shipping_input);
}

function isValidJordanNumber(num) {
    if (num.indexOf('0') !== 0) {
        num = '0' + num
    }
    if (num.length == 10) {
        var key = num.substring(0, 3)
        if (key != '079' && key != '077' && key != '078') {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
}

function ValidateShippingFields() {
    let isValid = true;
    if (Shipping_Shareholders.length > 0) {
        let isSameAsBilling = $('#same-as-billing').is(':checked');
        
        let sh_cityid = -1, sh_town = "", sh_street = "", sh_house = "", sh_apartment = "";
        let sh_phone = "", sh_notes = "";

        let phoneInput = document.querySelector("#contact_phone");
        if (phoneInput) {
            sh_phone = phoneInput.value.trim();
        }
        let notesInput = $('[name="product-cutting-notes"]')[0];
        if (notesInput) {
            sh_notes = notesInput.value.trim();
        }

        if (isSameAsBilling) {
            let citySel = $('[name="billing-city"]').find(":selected").val();
            sh_cityid = typeof citySel == "undefined" ? -1 : citySel;
            let t = $('[name="billing-town"]')[0]; if(t) { sh_town = t.value.trim(); $('[name="shipping-town"]').val(sh_town); }
            let s = $('[name="billing-street"]')[0]; if(s) { sh_street = s.value.trim(); $('[name="shipping-street"]').val(sh_street); }
            let h = $('[name="billing-house"]')[0]; if(h) { sh_house = h.value.trim(); $('[name="shipping-house"]').val(sh_house); }
            let a = $('[name="billing-Apartment"]')[0]; if(a) { sh_apartment = a.value.trim(); $('[name="shipping-Apartment"]').val(sh_apartment); }
        } else {
            let s_city = $('[name="shipping-city"]');
            let s_town = $('[name="shipping-town"]')[0];
            let s_street = $('[name="shipping-street"]')[0];
            let s_house = $('[name="shipping-house"]')[0];
            let s_apart = $('[name="shipping-Apartment"]')[0];

            if (typeof s_city.find(":selected").val() == "undefined" || s_city.find(":selected").val() == "-1") {
                isValid = false;
                s_city[0].style.background = "#fff9b3";
            } else {
                s_city[0].style.background = "#ffffff";
                sh_cityid = s_city.find(":selected").val();
            }

            if (s_town && s_town.value.trim() === "") { isValid = false; s_town.style.background = "#fff9b3"; }
            else if(s_town) { s_town.style.background = "#ffffff"; sh_town = s_town.value.trim(); }

            if (s_street && s_street.value.trim() === "") { isValid = false; s_street.style.background = "#fff9b3"; }
            else if(s_street) { s_street.style.background = "#ffffff"; sh_street = s_street.value.trim(); }

            if (s_house && s_house.value.trim() === "") { isValid = false; s_house.style.background = "#fff9b3"; }
            else if(s_house) { s_house.style.background = "#ffffff"; sh_house = s_house.value.trim(); }

            if (s_apart && s_apart.value.trim() === "") { isValid = false; s_apart.style.background = "#fff9b3"; }
            else if(s_apart) { s_apart.style.background = "#ffffff"; sh_apartment = s_apart.value.trim(); }
        }

        if (sh_phone !== "") {
            var code = iti2 && iti2.selectedCountryData ? iti2.selectedCountryData.dialCode : '962';
            if (isValidJordanNumber(sh_phone.replaceAll(' ', '')) && code == '962') {
                document.getElementById('contact_phone').style.background = "#ffffff";
                $('.divPhone2').css("background", "#ffffff");
            } else {
                document.getElementById('contact_phone').style.background = "#fff9b3";
                $('.divPhone2').css("background", "#fff9b3");
                isValid = false;
            }
        } else {
            document.getElementById('contact_phone').style.background = "#fff9b3";
            $('.divPhone2').css("background", "#fff9b3");
            isValid = false;
        }

        if (isValid) {
            for (let i = 0; i < Shipping_Shareholders.length; i++) {
                Shipping_Shareholders[i].ShippingCityid = sh_cityid;
                Shipping_Shareholders[i].ShippingTown = sh_town;
                Shipping_Shareholders[i].ShippingStreet = sh_street;
                Shipping_Shareholders[i].ShippingHouse = sh_house;
                Shipping_Shareholders[i].ShippingApartment = sh_apartment;
                Shipping_Shareholders[i].ShippingNumber = sh_phone;
                Shipping_Shareholders[i].cuttingNotes = sh_notes;
            }
        }
    }
    return isValid;
}

$(document).ready(function() {
    $('#same-as-billing').trigger('change');
});
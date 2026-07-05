let billingCityId = "-1";
let shippingCityId = "-1";

var input = document.querySelector("#phone");
window.intlTelInput(input, {
    hiddenInput: "full_phone",
    utilsScript: "/assets/vendor/intlTelInput/utils.js?1603274336113",
});
var iti = intlTelInput(input);
iti.setCountry("jo");

BindCountiries();
BindPageData();

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
            BindUserOrders();
        },
        error: function (xhr, ajaxOptions, thrownError) {

        }
    });
}

function FillPageData(data) {
    var item = JSON.parse(data);

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
        $('#phone').val(item.Mobile.toString());
    }

    let BillingAddress = item.BillingAddresses[0];

    if (typeof BillingAddress !== "undefined") {
        $(".billing-town").html(BillingAddress.Town);
        $('[name="billing-town"]').val(BillingAddress.Town);
        $(".billing-block").html(BillingAddress.Block);
        $('[name="billing-block"]').val(BillingAddress.Block);
        $(".billing-street").html(BillingAddress.Street);
        $('[name="billing-street"]').val(BillingAddress.Street);
        $(".billing-house").html(BillingAddress.HouseNo);
        $('[name="billing-house"]').val(BillingAddress.HouseNo);
        $(".billing-Apartment").html(BillingAddress.ApartmentNo);
        $('[name="billing-Apartment"]').val(BillingAddress.ApartmentNo);
        $(".billing-paci").html(BillingAddress.PaciNo == 0 ? ' ' : BillingAddress.PaciNo);
        $('[name="billing-paci"]').val(BillingAddress.PaciNo == 0 ? ' ' : BillingAddress.PaciNo);
        $(".billing-city").html(IsArabic ? BillingAddress.City.CityNameAr : BillingAddress.City.CityNameEn);
        $(".billing-country").html(IsArabic ? BillingAddress.City.Country.CountryNameAr : BillingAddress.City.Country.CountryNameEn);
        $("#billingCountries").val(BillingAddress.City.Country.CountryId.toString()).change();
        billingCityId = BillingAddress.City.CityId.toString();
        BindBillingCities();
    }

    let ShippingAddress = item.ShippingAddresses[0];

    if (typeof ShippingAddress !== "undefined") {
        $(".shipping-town").html(ShippingAddress.Town);
        $('[name="shipping-town"]').val(ShippingAddress.Town);
        $(".shipping-block").html(ShippingAddress.Block);
        $('[name="shipping-block"]').val(ShippingAddress.Block);
        $(".shipping-street").html(ShippingAddress.Street);
        $('[name="shipping-street"]').val(ShippingAddress.Street);
        $(".shipping-house").html(ShippingAddress.HouseNo);
        $('[name="shipping-house"]').val(ShippingAddress.HouseNo);
        $(".shipping-Apartment").html(ShippingAddress.ApartmentNo);
        $('[name="shipping-Apartment"]').val(ShippingAddress.ApartmentNo);
        $(".shipping-paci").html(ShippingAddress.PaciNo == 0 ? ' ' : ShippingAddress.PaciNo);
        $('[name="shipping-paci"]').val(ShippingAddress.PaciNo == 0 ? ' ' : ShippingAddress.PaciNo);
        $(".shipping-city").html(IsArabic ? ShippingAddress.City.CityNameAr : ShippingAddress.City.CityNameEn);
        $(".shipping-country").html(IsArabic ? ShippingAddress.City.Country.CountryNameAr : ShippingAddress.City.Country.CountryNameEn);
        $("#shipingCountries").val(ShippingAddress.City.Country.CountryId.toString()).change();
        shippingCityId = ShippingAddress.City.CityId.toString()
        BindShipingCities();
    }
}

function SaveUserInfo() {
    var val = true;
    let firstname = $("#ContentPlaceHolder1_firstname")[0];
    let lastname = $("#ContentPlaceHolder1_lastname")[0];
    let email = $("#ContentPlaceHolder1_email_1")[0];

    if (email.value.trim() === "") {
        val = false;
        email.style.background = "#fff9b3";
    }
    else {
        if (!ValidateEmail(email.value.trim())) {
            val = false;
            email.style.background = "#fff9b3";
            document.getElementById('lblLoginError').innerText = "Incorrect email format!";
            document.getElementById("divLoginError").classList.add('d-flex');
            document.getElementById("divLoginError").classList.remove('d-none');
        }
        else {
            email.style.background = "#ffffff";
            document.getElementById("divLoginError").classList.remove('d-flex');
            document.getElementById("divLoginError").classList.add('d-none');
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

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');
        var fdata = new FormData();
        fdata.append('firstname', firstname.value.trim());
        fdata.append('lastname', lastname.value.trim());
        fdata.append('email', email.value.trim());
        fdata.append('number', number.trim());
        fdata.append('code', code.trim());
        fdata.append('auth_token', ""); $.ajax({
            cache: false,
            data: fdata,
            url: '/api/users.asmx/changeinfo',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                setTimeout(
                    function () {
                        document.getElementById("divloader").classList.add('d-none');
                        document.getElementById("divloader").classList.remove('d-flex');
                    }, 1000);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');

            }
        });
    }
}

function ChangePassword() {
    let val = true;
    let curP = $("#cur-password")[0];
    let newP = $("#new-password")[0];
    let confP = $("#conf-password")[0];

    if (curP.value.trim() === "") {
        val = false;
        curP.style.background = "#fff9b3";
    }
    else {
        curP.style.background = "#ffffff";
    }

    if (newP.value.trim() === "") {
        val = false;
        newP.style.background = "#fff9b3";
    }
    else {
        newP.style.background = "#ffffff";
    }

    if (confP.value.trim() === "") {
        val = false;
        confP.style.background = "#fff9b3";
    }
    else {
        confP.style.background = "#ffffff";
    }

    if (val) {

        document.getElementById("password_strength").innerHTML = "";
        document.getElementById("password_strength2").innerHTML = "";

        if (newP.value.length < 8) {
            document.getElementById("password_strength").innerHTML = "**Password length must be atleast 8 characters";
            val = false;
        }

        if (val && newP.value.length > 15) {
            document.getElementById("password_strength").innerHTML = "**Password length must not exceed 15 characters!";
            val = false;
        }

        if (val && !containsAnyLetter(newP.value)) {
            document.getElementById("password_strength").innerHTML = "**Password does NOT contain a letter!";
            val = false;
        }

        if (val && !containsNumber(newP.value)) {
            document.getElementById("password_strength").innerHTML = "**Password does NOT contain one number!";
            val = false;
        }

        if (val && !containsSpecialChars(newP.value)) {
            document.getElementById("password_strength").innerHTML = "**Password does NOT contain one spical character!";
            val = false;
        }

        if (val && newP.value != confP.value) {
            document.getElementById("password_strength").innerHTML = "**The confirm password does not match!";
            val = false;
        }

        if (!val) {
            password_strength.style.color = "red";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');
        var fdata = new FormData();
        fdata.append('curpassword', curP.value.trim());
        fdata.append('newpassword', newP.value.trim());
        fdata.append('auth_token', ""); $.ajax({
            cache: false,
            data: fdata,
            url: '/api/users.asmx/changepassword',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                if (data != "") {
                    document.getElementById("password_strength2").innerHTML = data.toString();
                    document.getElementById("password_strength2").style.color = "red";
                }
                curP.value = newP.value = confP.value = "";
                setTimeout(
                    function () {
                        document.getElementById("divloader").classList.add('d-none');
                        document.getElementById("divloader").classList.remove('d-flex');
                    }, 1000);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');


            }
        });
    }
}

function containsAnyLetter(str) {
    return /[a-zA-Z]/.test(str);
}

function containsNumber(str) {
    return /\d/.test(str);
}

function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
}

function CheckPasswordStrength(password) {
    var password_strength = document.getElementById("password_strength");

    if (password.length == 0) {
        password_strength.innerHTML = "";
        return;
    }

    var regex = new Array();
    regex.push("[A-Z]");
    regex.push("[a-z]");
    regex.push("[0-9]");
    regex.push("[$@$!%*#?&]");

    var passed = 0;
    for (var i = 0; i < regex.length; i++) {
        if (new RegExp(regex[i]).test(password)) {
            passed++;
        }
    }
    if (passed > 2 && password.length > 8) {
        passed++;
    }
    var color = "";
    var strength = "";
    switch (passed) {
        case 0:
        case 1:
            strength = "Weak";
            color = "red";
            break;
        case 2:
            strength = "Good";
            color = "darkorange";
            break;
        case 3:
        case 4:
            strength = "Strong";
            color = "green";
            break;
        case 5:
            strength = "Very Strong";
            color = "darkgreen";
            break;
    }
    password_strength.innerHTML = strength;
    password_strength.style.color = color;
}

function BindCountiries() {
    var fdata = new FormData();
    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/countries',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillCountriesList(data);
            BindBillingCities();
            BindShipingCities();
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
            if (item.CountryNameEn.toLowerCase().trim() !== 'jordan')
                items.push(`<option value="${item.CountryId}">${IsArabic ? item.CountryNameAr : item.CountryNameEn}</option>`);
            else
                items.push(`<option value="${item.CountryId}" selected>${IsArabic ? item.CountryNameAr : item.CountryNameEn}</option>`);
        }

        $('[name="country"]').html(items);
    }
}

function BindBillingCities() {
    var fdata = new FormData();
    var countryId = $('#billingCountries').find(":selected").val();
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

function BindShipingCities() {
    var fdata = new FormData();
    var countryId = $('#shipingCountries').find(":selected").val();
    fdata.append('countryid', (countryId ? decodeURIComponent(countryId) : "-1").toString());

    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/cities',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillShipingCitiesList(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {


        }
    });
}

function FillShipingCitiesList(data) {
    if (data.length > 0) {
        var cities = data;
        let index = 0;
        let items = [];
        for (index; index < cities.length; index++) {
            let item = cities[index];
            if (item.CityId.toString() == shippingCityId) {
                items.push(`<option value="${item.CityId}" selected>${IsArabic ? item.CityNameAr : item.CityNameEn}</option>`);
            }
            else {
                items.push(`<option value="${item.CityId}">${IsArabic ? item.CityNameAr : item.CityNameEn}</option>`);
            }
        }
        $('[name="shiping-city"]').html(items);
    }
}

$('#billingCountries').on('change', (e) => {
    BindBillingCities();
});

$('#shipingCountries').on('change', (e) => {
    BindShipingCities();
});

function SaveBillingAddress() {
    var val = true;
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

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');
        var fdata = new FormData();
        fdata.append('town', town.value.trim());
        fdata.append('block', block.value.trim());
        fdata.append('street', street.value.trim());
        fdata.append('house', house.value.trim());
        fdata.append('apartment', apartment.value.trim());
        fdata.append('paci', "0");
        fdata.append('cityid', cityid);
        fdata.append('auth_token', ""); $.ajax({
            cache: false,
            data: fdata,
            url: '/api/users.asmx/billingaddress',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                BindPageData();
                setTimeout(
                    function () {
                        document.getElementById("divloader").classList.add('d-none');
                        document.getElementById("divloader").classList.remove('d-flex');
                        $('[href="#account-addresses"]').click();
                    }, 1000);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');


            }
        });
    }
}

function SaveShippingAddress() {
    var val = true;
    var town = $('[name="shipping-town"]')[0];
    var block = $('[name="shipping-block"]')[0];
    var street = $('[name="shipping-street"]')[0];
    var house = $('[name="shipping-house"]')[0];
    var apartment = $('[name="shipping-Apartment"]')[0];

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

    var cityid = $('[name="shiping-city"]').find(":selected").val();

    if (typeof cityid == "undefined") {
        val = false;
        $('[name="shiping-city"]')[0].style.background = "#fff9b3";
    } else {
        $('[name="shiping-city"]')[0].style.background = "#ffffff";
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');
        var fdata = new FormData();
        var fdata = new FormData();
        fdata.append('town', town.value.trim());
        fdata.append('block', block.value.trim());
        fdata.append('street', street.value.trim());
        fdata.append('house', house.value.trim());
        fdata.append('apartment', apartment.value.trim());
        paci = $('[name="shipping-paci"]')[0];
        fdata.append('paci', paci.value.trim() !== "" ? paci.value.trim() : 0);
        fdata.append('cityid', cityid);
        fdata.append('auth_token', ""); $.ajax({
            cache: false,
            data: fdata,
            url: '/api/users.asmx/shippingaddress',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                BindPageData();
                setTimeout(
                    function () {
                        document.getElementById("divloader").classList.add('d-none');
                        document.getElementById("divloader").classList.remove('d-flex');
                        $('[href="#account-addresses"]').click();
                    }, 1000);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');


            }
        });
    }
}

function BindUserOrders() {
    var fdata = new FormData();
    fdata.append('user_token', (userId ? decodeURIComponent(userId) : "-1").toString());

    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/get_orders_list',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillOrdersList(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {


        }
    });
}

function FillOrdersList(data) {
    if (data.length > 0) {
        var orders = JSON.parse(data);
        let index = 0;
        let items = [];
        for (index; index < orders.length; index++) {
            let order = orders[index];
            var _date = new Date(order.CreatedOnDate.toString());
            var dd = String(_date.getDate()).padStart(2, '0');
            var mm = String(_date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = _date.getFullYear();
            _date = dd + '/' + mm + '/' + yyyy;

            var total = (currency.toLocaleUpperCase() == "USD" ? order.TotalPriceUsd + order.ShiipingPriceUsd : order.TotalPriceKwd + order.ShippingPriceKwd).toFixed(2);

            items.push(`<tr>
                            <td class="order-id">#${order.Id}</td>
                            <td class="order-date">${_date}</td>
                            <td class="order-status">${IsArabic ? order.StatusNameAr : order.StatusNameEn}</td>
                            <td class="order-total">
                                <span class="order-price">${total.toString() + " " + currency.toLocaleUpperCase()}<br/>
                                <p style="font-weight: 600;color: #4f9f57;">${order.StatusNameEn == 'Waiting for payment' ? rate_code == 'JOD' ? (total * rate_value).toFixed(2) + " " + rate_code : '' : ''}</p>
                                </span>
                            </td>
                            <td class="order-action">
                                <div class="d-flex">
                                   <a href="${IsArabic ? '/ar/' : '/'}order.aspx?Id=${order.Id}" target="_blank" class="btn btn-outline btn-default btn-block btn-sm btn-rounded">${IsArabic ? 'عرض' : 'View'}</a>
                                </div>
                            </td>
                        </tr>`);
        }

        $('.Order-Items').html(items);
        if (IsArabic)
            $('.nooforders').html(`<p class="showing-info mb-2 mb-sm-0">وجد <span>${orders.length.toString()}</span> طلبات</p>`);
        else
            $('.nooforders').html(`<p class="showing-info mb-2 mb-sm-0">Found <span>${orders.length.toString()}</span> Orders</p>`);

        if (orders.length <= 0) {
            $('.account-orders-table').html(`<tbody class="productlist"><tr><td colspan="5" style="text-align: center;font-size: 17px;font-weight: 600;color: #593930;">${IsArabic ? "لم يتم العثور على نتائج!" : "No Result Found!"} </td></tr></tbody>`);
        }
    }
}

function Reorder(order_id) {
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
            if (data.length > 0) {
                var item = JSON.parse(data);

                let products = item.Products;
                if (products.length > 0) {
                    let index = 0;
                    let items = [];
                    let cookie_cart_items = "";

                    for (index; index < products.length; index++) {
                        let product = products[index];

                        if (cookie_cart_items == "") {
                            cookie_cart_items = product.product_token + "|" + product.Quantity;
                            $('.cart-count').html(product.Quantity);
                        }
                        else {
                            cookie_cart_items = cookie_cart_items + "," + product.product_token + "|" + product.Quantity;

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
                    }
                    setCookie('cookie_cart_items', cookie_cart_items, 7);
                    CalculateCartPrices(cookie_cart_items);
                    window.location = (IsArabic) ? "/ar/cart" : "/cart";
                }
                else {
                    document.getElementById("divloader").classList.add('d-none');
                    document.getElementById("divloader").classList.remove('d-flex');
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}
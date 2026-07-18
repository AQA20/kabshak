let rate_code = getCookie("rate_code");
let rate_value = 1;

if (rate_code == null || rate_code == '' || rate_code == 'undefined') {
    rate_code = 'JOD';
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');
    var requestURL = 'https://api.ipgeolocation.io/ipgeo?apiKey=7affed0ad13a4aeaa681e13e9c88c04b';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        try {
            var response = request.response;
            if (response == null)
                GetExchangePriceRate('JOD');
            else {
                if (response.currency.code.toLocaleUpperCase() == "JOD")
                    GetExchangePriceRate("JOD");
                else if (response.currency.code.toLocaleUpperCase() == "SAR")
                    GetExchangePriceRate("SAR");
                else if (response.currency.code.toLocaleUpperCase() == "AED")
                    GetExchangePriceRate("AED");
                else if (response.currency.code.toLocaleUpperCase() == "QAR")
                    GetExchangePriceRate("QAR");
                else if (response.currency.code.toLocaleUpperCase() == "BHD")
                    GetExchangePriceRate("BHD");
                else if (response.currency.code.toLocaleUpperCase() == "OMR")
                    GetExchangePriceRate("OMR");
                else if (response.currency.code.toLocaleUpperCase() == "KWD")
                    GetExchangePriceRate("KWD");
                else
                    GetExchangePriceRate('JOD');
                setCookie("country_name", response.country_name.toLocaleLowerCase(), 2);
            }
        }
        catch (err) {
            GetExchangePriceRate('JOD');
        }
    };
}
else {
    rate_value = getCookie("rate_value");

    if (rate_value == null || rate_value == '' || rate_value == 'undefined') {
        GetExchangePriceRate(rate_code);
    }
}


function GetExchangePriceRate(code) {
    // 1 JOD = 1.41 USD, therefore 1 USD = 0.71 JOD
    var defaultRate = (code.toUpperCase() === 'JOD') ? 0.71 : 1;
    
    if (code.toUpperCase() === 'USD') {
        setCookie("rate_code", code, 2);
        setCookie("rate_value", 1, 2);
        window.location.reload();
        return;
    }


    // Use a free API to get the latest exchange rate
    fetch('https://open.er-api.com/v6/latest/USD')
        .then(response => response.json())
        .then(data => {
            var rate = defaultRate;
            if (data && data.rates && data.rates[code.toUpperCase()]) {
                rate = data.rates[code.toUpperCase()];
            }
            setCookie("rate_code", code, 2);
            setCookie("rate_value", rate, 2);
            window.location.reload();
        })
        .catch(error => {
            console.error('Error fetching exchange rate:', error);
            setCookie("rate_code", code, 2);
            setCookie("rate_value", defaultRate, 2);
            window.location.reload();
        });
}


$('.new-currency span').html(rate_code.trim());
$('.new-currency img').attr("src", "/assets/images/flags/" + rate_code.toLocaleLowerCase().substring(0, 2) + ".svg");


let language = getCookie("language");
let IsArabic = (language == "ar" ? true : false);

if (!IsArabic && window.location.href.includes('/ar')) {
    setCookie("language", "ar", 30);
    language = "ar";
    IsArabic = true;
    window.location = window.location.href;
}

if (IsArabic && !window.location.href.includes('/ar')) {
    setCookie("language", "en", 30);
    language = "en";
    IsArabic = false;
    window.location = window.location.href;
}

if (language.trim() == "") {
    $("html").attr("lang", "en");
    $("html").attr("dir", "ltr");
    language == 'en';
    ChangeCurrentLanguage('en', '/assets/images/flags/en.gif');
}
else {
    if (language.trim() == 'en') {
        $("html").attr("lang", "en");
        $("html").attr("dir", "ltr");
        ChangeCurrentLanguage('en', '/assets/images/flags/en.gif');
    }
    else {
        $("html").attr("lang", "ar");
        $("html").attr("dir", "rtl");
        ChangeCurrentLanguage('ar', '/assets/images/flags/ar.gif');
    }
}


let currency = getCookie("currency");
let userId = getCookie("UserToken");

if (userId.trim() == "") {
    userId = "-1";
}

if (currency == "") {
    currency = "usd";
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

$('#WhatsappButton').floatingWhatsApp(
    IsArabic ?
        {
            phone: '962798959933',
            popupMessage: 'تواصل معنا مباشرة عبر الواتساب للطلب من موقع كبشك.',
            message: "أريد تقديم طلب ",
            showPopup: true,
            headerTitle: 'أهلا وسهلا!',
            headerColor: '#25d366',
            buttonImage: '<img src="/assets/images/whatsapp.svg" alt="whatsapp" />'
        }
        :
        {
            phone: '962798959933',
            popupMessage: 'Contact us directly through WhatsApp to order from our Kabshak website.',
            message: "I'd like to order ",
            showPopup: true,
            headerTitle: 'Welcome!',
            headerColor: '#25d366',
            buttonImage: '<img src="/assets/images/whatsapp.svg" alt="whatsapp" />'
        }

);

BindCategoriesList();

let urlSearchQueryMaster = location.search;
let urlParamsMaster = new URLSearchParams(urlSearchQueryMaster);

urlParamsMaster.forEach(function (value, key) {
    if (key == "txt" && value != "-1") {
        $('#search_header').val(value);
    }

    if (key == "categoryId") {
        $('#categorySelectedId').val(value);
    }
});

function SubscribeByEmail() {
    email = document.getElementById('txtSubscribeEmail');
    lbl = document.getElementById('lblSubscribeEmail');

    lbl.innerText = "";
    var val = true;
    if (email.value.trim() === "") {
        val = false;
        lbl.innerText = IsArabic ? "حقل البريد الإلكتروني مطلوب!" : "The email field is required!";
    }
    if (val && !ValidateEmail(email.value.trim())) {
        val = false;
        lbl.innerText = IsArabic ? "صيغة البريد إلكتروني غير صحيحة!" : "Incorrect email format!";
    }
    if (val) {
        var fdata = new FormData();
        fdata.append('email', email.value);
        fdata.append('auth_token', ""); $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/subscribe_email',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                email.value = "";
                lbl.innerText = IsArabic ? "تم تسجيل بريدك الإلكتروني بنجاح." : "Your email has been successfully subscribed.";
            }
        });
    }
}

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}

// Create cookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Delete cookie
function deleteCookie(cname) {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=;" + expires + ";path=/";
}

// Read cookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function Fade_In() {
    $('#cookieNotice').hide().delay(3000).fadeIn(1000);
}

function BindCategoriesList() {
    var fdata = new FormData();
    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/categories',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            BindHeaderCategories(data);
        }
    });
}

function ChangeCurrentCurrency(txt) {
    var fdata = new FormData();
    fdata.append('currency', txt);
    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/change_currency',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            window.location.reload();
        }
    });
}

function BindHeaderCategories(data) {
    if (data.length > 0) {
        let index = 0;
        let items = [];
        let items2 = [];
        let items3 = [];
        let items4 = [];
        items.push(`<option value="-1">${IsArabic ? 'جميع الاقسام' : 'All Categories'}</option>`);
        items2.push(`<h6 class="category-name">${IsArabic ? 'الاقسام:' : 'Categories:'}</h6>`);
        for (index; index < data.length; index++) {
            let item = data[index];
            items.push(`<option value="${item.Id}" ${(item.Id == $('#categorySelectedId').val() ? "selected" : "")}>${IsArabic ? item.NameAr : item.NameEn}</option>`);
            items2.push(`<a href="${IsArabic ? '/ar/shop.aspx?categoryId=' + item.Id : '/shop.aspx?categoryId=' + item.Id}">${IsArabic ? item.NameAr : item.NameEn}</a>`);
            items3.push(`<li><a href="${IsArabic ? '/ar/shop.aspx?categoryId=' + item.Id : '/shop.aspx?categoryId=' + item.Id}"><i class="w-icon-angle-right"></i>${IsArabic ? item.NameAr : item.NameEn}</a></li>`);
            if (index < 11) {
                if (!item.IsHasSubCategory) {
                    items4.push(`<li><a href="${IsArabic ? '/ar/shop.aspx?categoryId=' + item.Id : '/shop.aspx?categoryId=' + item.Id}">
                                <i class="w-icon-star"></i>${IsArabic ? item.NameAr : item.NameEn}
                            </a>
                        </li>`);
                }
                else {
                    let SubCategoriesString = "";
                    let SubCategoriesList = [];
                    let SubCategories = item.SubCategoryies;

                    for (i = 0; i < SubCategories.length; i++) {
                        if (SubCategories[i].IsActive == true)
                            SubCategoriesList.push(` <li><a href="${IsArabic ? '/ar/shop.aspx?categories=' + SubCategories[i].CategoryId + '&subcategories=' + SubCategories[i].Id : '/shop.aspx?categories=' + SubCategories[i].CategoryId + '&subcategories=' + SubCategories[i].Id}">${IsArabic ? SubCategories[i].NameAr : SubCategories[i].NameEn}</a ></li>`);
                    }

                    SubCategoriesString = SubCategoriesList.join('');

                    items4.push(`<li class="has-submenu">
                                <a href="${IsArabic ? '/ar/shop.aspx?categoryId=' + item.Id : '/shop.aspx?categoryId=' + item.Id}">
                                    <i class="w-icon-star"></i>${IsArabic ? item.NameAr : item.NameEn}
                                </a>
                                <ul class="megamenu">
                                    <li>
                                        <h4 class="menu-title">${IsArabic ? item.NameAr : item.NameEn}</h4>
                                        <hr class="divider">
                                        <ul>
                                            ${SubCategoriesString}
                                        </ul>
                                    </li>
                                    <li>
                                        <div class="banner-fixed menu-banner menu-banner2">
                                            <figure>
                                                <img src="assets/images/banner-1.jpg" alt="Menu Banner" width="235" height="347">
                                            </figure>
                                        </div>
                                    </li>
                                </ul>
                            </li>`)
                }
            }
        }
        $('#category').prepend(items);
        $('.Footercategories').prepend(items2);
        $('.mobile-menu-Custom').prepend(items3);
        $('.category-menu').prepend(items4);
    }
}

function SearchByHeaderBox() {
    var txt = $("#search_header").val();
    var category = $('#category').find(":selected").val();
    if (txt.trim() != "" || category != "-1")
        window.location.href = IsArabic ? "/ar/shop.aspx?categoryId=" + category + "&txt=" + ((txt.trim() == "") ? "-1" : txt.trim()) : "/shop.aspx?categoryId=" + category + "&txt=" + ((txt.trim() == "") ? "-1" : txt.trim());
    else
        window.location.href = IsArabic ? "/ar/shop.aspx" : "/shop.aspx";
}

function OpenWishlist() {
    if (userId == "-1") {
        Login();
    }
    else {
        window.location.href = IsArabic ? "/ar/wishlist.aspx" : "/wishlist.aspx";
    }
}

function Login() {
    var edit = document.querySelector(".login");
    edit.addEventListener("click", function () { console.log("clicked") });
    edit.click();
}

function AddWishlist(e, token) {
    if (userId == "-1") {
        Login();
        setTimeout(function () { e.setAttribute("class", "btn-product-icon btn-wishlist w-icon-heart"); }, 1000);
    }
    else {
        var fdata = new FormData();
        fdata.append('product_token', token);
        fdata.append('user_token', userId);
        fdata.append('auth_token', ""); $.ajax({
            cache: false,
            data: fdata,
            url: '/api/products.asmx/add_to_wishlist',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                console.log("Add this product to wishlist");
            },
            error: function (xhr, ajaxOptions, thrownError) {


            }
        });
    }
}

$('.btn-number').click(function (e) {
    e.preventDefault();

    fieldName = $(this).attr('data-field');
    type = $(this).attr('data-type');
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if (type == 'minus') {

            if (currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            }
            if (parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if (type == 'plus') {

            if (currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if (parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function () {
    $(this).data('oldValue', $(this).val());
});

$('.input-number').change(function () {

    minValue = parseInt($(this).attr('min'));
    maxValue = parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());

    name = $(this).attr('name');
    if (valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if (valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }
});

$(".input-number").keydown(function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
        (e.keyCode == 65 && e.ctrlKey === true) ||
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

function AddToCart(product_token, no_items) {
    let cookie_cart_items = getCookie("cookie_cart_items");

    if (cookie_cart_items == "") {
        cookie_cart_items = product_token + "|" + no_items;
        $('.cart-count').html(no_items);
    }
    else {
        cookie_cart_items = cookie_cart_items + "," + product_token + "|" + no_items;
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

    setCookie('cookie_cart_items', cookie_cart_items, 7);

    CalculateCartPrices(cookie_cart_items);
}

function AddToCartFromShop(elem, token, quantity) {
    let $product = $(elem).closest('.product');
    let name = $product.find('.product-name a').text().trim() || $product.find('.product-title a').text().trim() || $product.find('.product-title').text().trim() || '';
    let image = $product.find('.product-media img').attr('src') || $product.find('.product-image:first-child img').attr('src') || '';
    let categoryName = $product.find('.product-cat a').text().trim() || $product.find('.product-cat').text().trim() || '';
    
    let isDonation = (categoryName.toLowerCase().indexOf('donation') > -1 || categoryName.indexOf('تبرع') > -1) ? 1 : 0;
    
    if (image) {
        if (!image.startsWith('/') && !image.startsWith('http')) {
            image = '/' + image;
        }
    } else {
        image = '/assets/images/defult_image.png';
    }
    
    const Item = {
        Donation: isDonation,
        PurposeId: 6,
        CharityId: -1,
        productToken: token,
        productName: name,
        productImage: image,
        Quantity: quantity,
        Shareholder: '',
        ShippingCityid: -1,
        ShippingTown: '',
        ShippingHouse: 0,
        ShippingStreet: '',
        ShippingApartment: 0,
        ShippingNumber: '',
        cuttingNotes: ''
    };
    
    console.log("AddToCartFromShop details:", { name: name, image: image, categoryName: categoryName, isDonation: isDonation, Item: Item });
    
    add_shareholders_value(Item);
    AddToCart(token, quantity);
}

function add_shareholders_value(json) {
    let cookieValue = '';
    let expire = '';
    let period = 7;

    let Shareholders = getCookie("Shareholders");

    if (Shareholders == '') {
        cookieValue = 'Shareholders' + '=' + encodeURIComponent(JSON.stringify(json)) + ';';
    }
    else {
        cookieValue = 'Shareholders' + '=' + encodeURIComponent(Shareholders + '|' + JSON.stringify(json)) + ';';
    }
    cookieValue += 'path=/;';
    expire = new Date();
    expire.setTime(expire.getTime() + 1000 * 3600 * 24 * period);
    cookieValue += 'expires=' + expire.toUTCString() + ';';
    document.cookie = cookieValue;
}

function CalculateCartPrices(items) {
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
            FillCartItems(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {


        }
    });
}

function FillCartItems(data) {
    if (data.length > 0) {
        let index = 0;
        let items = [];
        let total = 0;
        for (index; index < data.length; index++) {
            let item = data[index];

            if (item.Amount > 0) {
                total = parseFloat(total) + parseFloat((item.Count * (item.Usd * rate_value)).toFixed(2));
            }

            items.push(`<div class="product product-cart ${item.Token}" style="padding-bottom: 5px !important;border: unset;">
                            <div class="product-detail" style="padding-right: 15px;">
                                <a href="#" onclick="voidclick(); return false" class="product-name">${IsArabic ? item.NameAr : item.NameEn}</a>
                                <div class="price-box" style="display: flex; align-items: center; justify-content: space-between; width: 100%; margin-top: 5px; margin-bottom: 5px;">
                                    <div class="premium-qty-container d-flex align-items-center" style="max-width: 100px; background: #ffffff; border: 1px solid #eaebec; border-radius: 50px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); overflow: hidden; transition: all 0.3s ease;">
                                        <button type="button" class="premium-qty-btn" onclick="ChangeMiniCartQuantity('${item.Token}', ${item.Amount > 0 ? item.Count - 1 : 0})" style="background: transparent; border: none; padding: 4px 8px; cursor: pointer; color: #888; font-size: 11px; transition: all 0.2s ease; outline: none;" onmouseover="this.style.color='#000'; this.style.background='#f8f9fa'" onmouseout="this.style.color='#888'; this.style.background='transparent'"><i class="w-icon-minus"></i></button>
                                        <input class="premium-qty-input form-control" type="number" min="1" max="100000" value="${item.Amount > 0 ? item.Count : 0}" onchange="ChangeMiniCartQuantity('${item.Token}', parseInt(this.value))" onkeydown="if(event.key === 'Enter'){event.preventDefault(); this.blur(); return false;}" style="border: none; text-align: center; padding: 4px 0; width: 100%; -moz-appearance: textfield; box-shadow: none; font-weight: 700; color: #222; font-size: 13px; background: transparent; outline: none; height: auto;">
                                        <button type="button" class="premium-qty-btn" onclick="ChangeMiniCartQuantity('${item.Token}', ${item.Amount > 0 ? item.Count + 1 : 0})" style="background: transparent; border: none; padding: 4px 8px; cursor: pointer; color: #888; font-size: 11px; transition: all 0.2s ease; outline: none;" onmouseover="this.style.color='#000'; this.style.background='#f8f9fa'" onmouseout="this.style.color='#888'; this.style.background='transparent'"><i class="w-icon-plus"></i></button>
                                    </div>
                                    <span class="product-price" style="color: #999;">X ${item.Amount > 0 ? Math.ceil(item.Usd * rate_value) : 0} ${rate_code}</span>
                                </div>
                                <div class="price-box">
                                    <span  class="product-price" style="background: #f5f5f5;padding-left: 5px;padding-right: 5px;border-radius: 3px;">${item.Amount > 0 ? (item.Count * (item.Usd * rate_value)).toFixed(2) : "Out Of Stock"} ${item.Amount > 0 ? rate_code : ""}</span>
                                </div>
                            </div>
                            <figure class="product-media" style="position: relative;">
                                <a href="#" onclick="voidclick(); return false">
                                    <img src="/${item.Url}" alt="product" height="84" width="94" style="border: solid 1px #eee;">
                                   <span style="font-size: 9px;"> ${item.Donation ? IsArabic ? "منتج للتبرع" : "Donation Product" : IsArabic ? "منتج للشحن" : "Shipping Product"}</span >
                                </a>
                                <button class="btn btn-link btn-close" onclick="RemoveItemCart('${item.Token}', ${item.Amount > 0 ? (item.Count * (item.Usd * rate_value)) : 0});" aria-label="button" style="position: absolute; top: -5px; right: -5px; background: #fff; border-radius: 50%; padding: 2px; border: 1px solid #ccc; width: 20px; height: 20px; display: flex; justify-content: center; align-items: center; font-size: 10px; color: #333; z-index: 10;"><i class="fas fa-times"></i></button>
                            </figure>
                        </div>`);
        }

        if (items.length > 0) {
            items.push(`<div class="cart-total" style="border-top: solid 1px #dddddd;border-bottom: solid 1px #dddddd;">
                                    <label>${IsArabic ? 'المجموع الفرعي' : 'Subtotal'}:</label>
                                    <div>
                                        <span class="price">${total.toFixed(2)}</span> ${rate_code}
                                    </div>
                                </div>
                                <div class="cart-action" style="Padding-bottom:150px;">
                                    <a href="/${IsArabic ? 'ar/' : ''}cart.aspx" class="btn btn-dark btn-outline btn-rounded">${IsArabic ? 'مشاهدة عربة التسوق' : 'View Cart'}</a>
                                    <a href="/${IsArabic ? 'ar/' : ''}checkout.aspx" class="btn btn-primary  btn-rounded">${IsArabic ? 'الدفع' : 'Checkout'}</a>
                                </div>`);
        }

        $(".products").html(items);

        if (window.location.href.indexOf("/cart") > -1) {
            let grandTotal = 0;
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                if (item.Amount > 0) {
                    let row = $("[class~='" + item.Token + "']");
                    if (row.length > 0) {
                        row.find(".premium-qty-input").val(item.Count);
                        let subtotal = (item.Count * (item.Usd * rate_value)).toFixed(2);
                        row.find(".product-subtotal .amount").html(subtotal + " " + rate_code);
                        grandTotal += parseFloat(subtotal);
                    }
                }
            }
            $(".cart-subtotal span").html(grandTotal.toFixed(2) + " " + rate_code);
            $(".order-total span").html(grandTotal.toFixed(2) + " " + rate_code);
        } else if (window.location.href.indexOf("/checkout") > -1) {
            let checkoutItems = [];
            let checkoutTotal = 0;
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                if (item.Amount > 0) {
                    checkoutTotal = parseFloat(checkoutTotal) + parseFloat((item.Count * (item.Usd * rate_value)).toFixed(2));
                }
                checkoutItems.push(` <tr class="bb-no">
                    <td class="product-name" style=" max-width:200px;word-wrap:break-word;">${IsArabic ? item.NameAr : item.NameEn}<br/>
                        <span style="${item.Donation ? 'background: #593930;' : 'background: #2196F3;'} color: #ffffff; padding: 3px; border-radius: 3px; font-size: 10px;"> ${item.Donation ? IsArabic ? 'منتج للتبرع' : 'Donation Product' : IsArabic ? 'منتج للشحن' : 'Shipping Product'}</span>
                    </td >
                    <td class="product-total" style="direction: ltr;text-align: ${IsArabic ? 'left' : 'right'};"> <span class="product-quantity">${item.Amount > 0 ? item.Count : 0}</span> X ${item.Amount > 0 ? (item.Usd * rate_value).toFixed(2) : (IsArabic ? 'نفذ من المخزون' : 'Out Of Stock')} ${item.Amount > 0 ? rate_code : ""}</td >
                </tr>`);
            }
            checkoutItems.push(`<tr class="cart-subtotal bb-no">
                <td><b>${IsArabic ? 'المجموع الفرعي' : 'Subtotal'}</b></td>
                <td><b>${checkoutTotal.toFixed(2).toString() + " " + rate_code}</b></td>
            </tr>`);
            $('.CheckoutItems').html(checkoutItems);
            $('.order-total span').html(checkoutTotal.toFixed(2) + " " + rate_code);
        }
    }
}

function RemoveItemCart(Token, value) {
    let cookie_cart_items = getCookie("cookie_cart_items");
    let items = cookie_cart_items.split(',');
    let new_cookie = [];

    for (let index = 0; index < items.length; index++) {
        let product = items[index];
        if (product.trim() === "") continue;
        let item = product.split('|');

        if (item[0] != Token) {
            new_cookie.push(item[0] + "|" + item[1]);
        }
    }

    let new_cookie_str = new_cookie.join(',');
    setCookie('cookie_cart_items', new_cookie_str, 7);

    // Sync Shareholders cookie
    let shareholders = getCookie('Shareholders');
    if (shareholders != '') {
        let cart_json = shareholders.split('|');
        let data = [];
        for (let i = 0; i < cart_json.length; i++) {
            if (cart_json[i].trim() === "") continue;
            try {
                let parsed = JSON.parse(cart_json[i]);
                if (parsed.productToken != Token) {
                    data.push(parsed);
                }
            } catch (e) {
                console.error("Error parsing cart JSON:", e);
            }
        }
        let newCookieVal = data.map(x => JSON.stringify(x)).join('|');
        setCookie('Shareholders', newCookieVal, 7);
    }

    if (new_cookie.length > 0) {
        let length = 0;
        for (let index = 0; index < new_cookie.length; index++) {
            length += parseInt(new_cookie[index].split('|')[1]);
        }
        $('.cart-count').html(length);
        CalculateCartPrices(new_cookie_str);
    } else {
        $('.cart-count').html("0");
        $(".products").html(`<div class="cart-action" style="padding-top: 2.1rem;">${IsArabic ? 'لا يوجد منتج مضاف للسلة' : 'No product added to the cart!'}</div>`);
        $(".cart-subtotal span").html("0 " + rate_code);
        $(".order-total span").html("0 " + rate_code);
        $(".productlist").html('<tr><td colspan="5" style="text-align: center;font-size: 17px;font-weight: 600;color: #593930;">' + (IsArabic ? 'لم يتم العثور على نتائج!' : 'No Result Found!') + '</tr></td>');
        $('.CheckoutItems').html(`<tr><td colspan="2" style="text-align: center;">${IsArabic ? 'لم يتم العثور على نتائج!' : 'No Result Found!'}</td></tr>`);
    }

    let row = $("[class~='" + Token + "']");
    if (row.length > 0) {
        row.remove();
    }

    if (window.location.href.trim().includes("/shop/product/") || window.location.href.trim().includes("/ar/shop/product/")) {
        GetProductSubCategories();
    }
}

function ChangeCurrentLanguage(lang, src) {
    $('.language span').html(lang.toLocaleUpperCase().trim() == 'EN' ? 'عربي' : 'English');
    $('.language img').attr("src", src);

    $('.dropdown-lang .language').attr("onclick", 'ChangeCurrentLanguage("' + (lang.toLocaleUpperCase().trim() == 'EN' ? 'ar' : 'en') + '","")');

    if (lang.toLocaleUpperCase().trim() == 'EN') {
        $('.dropdown-lang .language').attr("style", 'font-size: 14px;    margin-bottom: 4px;');
        $('.header-top').attr("style", 'padding: 5px !important;');
    }

    let CurrentLanguage = getCookie("language");
    setCookie("language", lang, 30);

    let Url = window.location.pathname + window.location.search;
    const IsArabic_2 = Url.substring(0, 3).toLocaleLowerCase() == "/ar" ? true : false;

    if (lang == 'ar' && !IsArabic_2) {

        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');
        window.location = "/" + 'ar' + (Url == '/home' ? '' : Url);
    }

    if (lang == 'en' && IsArabic_2) {

        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');
        window.location = "" + (Url == '/ar' ? '/home' : Url.replace('/ar', ''));
    }

    if (lang == 'ar') {
        var theme = document.getElementsByTagName('link');
        for (let i = 0; i < theme.length; i++) {
            var hrefVal = theme[i].getAttribute('href');
            if (hrefVal && hrefVal.indexOf('/assets/css/style.min.css') !== -1) {
                theme[i].setAttribute('href', '/assets/css/style-rtl.min.css?v=4.0');
            }
        }

        var theme = document.getElementsByTagName('a');
        for (let i = 0; i < theme.length; i++) {
            let rawHref = theme[i].getAttribute('href');
            if (rawHref !== null) {
                let isAlreadyArabic = rawHref.trim() === '/ar' || rawHref.trim() === '/ar/' || rawHref.trim().startsWith('/ar/') || rawHref.trim().startsWith('ar/');
                if (!isAlreadyArabic
                    && !theme[i].href.trim().includes('void(0)')
                    && !theme[i].href.trim().includes('#')
                    && !theme[i].href.trim().includes('00965')
                    && !theme[i].href.trim().includes('login.html')
                    && !theme[i].href.trim().includes('whatsapp')
                    && !theme[i].href.trim().includes('logout')
                    && !theme[i].href.trim().includes('admin')
                    && !theme[i].href.trim().includes('@')) {
                    theme[i].setAttribute('href', '/ar/' + rawHref.replace('/', ''));
                }
            }

            if (theme[i].href.trim().includes('home')) {
                theme[i].setAttribute('href', '/ar');
            }

            if (theme[i].href.trim().includes('login.html')) {
                theme[i].setAttribute('href', theme[i].href.trim().replace('login', 'arlogin'));
            }
        }
    }
}

if (IsArabic) {
    document.getElementsByName('SubscribeEmail')[0].placeholder = 'عنوان بريدك  الإلكتروني';
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function voidclick() {
    return false;
}

function FixProductName(name) {
    name = name.replace("[", '-');
    name = name.replace("*", '-');
    name = name.replace("'", '-');
    name = name.replace('"', '-');
    name = name.replace(",", '-');
    name = name.replace("_", '-');
    name = name.replace("&", '-');
    name = name.replace("#", '-');
    name = name.replace("@", '-');
    name = name.replace(".", '-');
    name = name.replace("]", '-');
    name = name.replace(/\s/g, '-')
    name = name.replace('---', '-');
    name = name.replace('--', '-');

    return name;
}

function RemoveFromCart(product_token, no_items) {
    let cookie_cart_items = getCookie("cookie_cart_items");
    let items = cookie_cart_items.split(',');
    let updated = false;
    if (cookie_cart_items != "") {
        cookie_cart_items = '';
        let length = 0;
        let index = 0;
        for (index; index < items.length; index++) {
            let product = items[index];
            let item = product.split('|');
            if (item[0] == product_token && updated == false) {
                if (parseInt($('.cart-count').html()) > 0) {
                    length = parseInt($('.cart-count').html()) - 1;
                    if ((parseInt(item[1]) - 1) > 0) {
                        cookie_cart_items = cookie_cart_items + item[0] + '|' + (parseInt(item[1]) > 0 ? (parseInt(item[1]) - 1).toString() : '0') + ','
                    }
                    updated = true;
                }
            }
            else {
                cookie_cart_items = cookie_cart_items + item[0] + '|' + item[1] + ','
            }
        }
        cookie_cart_items = cookie_cart_items.substring(0, cookie_cart_items.length - 1);
        $('.cart-count').html(length);
    }
    setCookie('cookie_cart_items', cookie_cart_items, 7);
    CalculateCartPrices(cookie_cart_items);
}

function FixPrice(price) {
    if (Number.isInteger(price)) {
        return price + '.000';
    }

    if (price.toString().indexOf(".") != -1) {
        let value = price.toString().substring(price.toString().indexOf(".") + 1, price.toString().length);

        if (value.length == 1) {
            value = price.toString().substring(0, price.toString().indexOf(".") + 1) + value + "00";
        }

        if (value.length == 2) {
            if (value.toString().substring(1, 2) <= 5) {
                if (value.toString().substring(1, 2) != 0)
                    value = price.toString().substring(0, price.toString().indexOf(".") + 1) + value.toString().substring(0, 1) + "50";
                else
                    value = price.toString().substring(0, price.toString().indexOf(".") + 1) + value.substring(0, 1).toString() + "00";
            }
            else {
                value = price.toString().substring(0, price.toString().indexOf(".") + 1) + (parseInt(value.substring(0, 1)) + 1).toString() + "00";
            }
        }

        return value;
    }

    return price;
}

function CheckSouldOutProducts() {
    var fdata = new FormData();
    fdata.append('auth_token', "");
    $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/check_sold_out',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            if (data == 'true') {
                $('.soldoutalert').removeClass('d-none');
                $('.btn-rounded').remove();
            }
            else {
                $('.soldoutalert').html(' ');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {


        }
    });
}

function ChangeMiniCartQuantity(Token, newQuantity) {
    if (newQuantity < 1) return;
    let cookie_cart_items = getCookie("cookie_cart_items");
    let items = cookie_cart_items.split(',');
    let new_cookie = [];
    let found = false;
    for (let index = 0; index < items.length; index++) {
        let product = items[index];
        if (product.trim() === "") continue;
        let item = product.split('|');
        if (item[0] == Token) {
            item[1] = newQuantity;
            found = true;
        }
        new_cookie.push(item[0] + "|" + item[1]);
    }
    if (found) {
        // Sync Shareholders cookie
        let shareholders = getCookie('Shareholders');
        if (shareholders != '') {
            let cart_json = shareholders.split('|');
            let data = [];
            for (let i = 0; i < cart_json.length; i++) {
                if (cart_json[i].trim() === "") continue;
                try {
                    let parsed = JSON.parse(cart_json[i]);
                    if (parsed.productToken == Token) {
                        parsed.Quantity = newQuantity;
                    }
                    data.push(parsed);
                } catch (e) {
                    console.error("Error parsing cart JSON:", e);
                }
            }
            let newCookieVal = data.map(x => JSON.stringify(x)).join('|');
            setCookie('Shareholders', newCookieVal, 7);
        }

        setCookie('cookie_cart_items', new_cookie.join(','), 7);
        CalculateCartPrices(new_cookie.join(','));
    }
}
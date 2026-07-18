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

        let items = new Array(data.length);
        let total = 0;

        for (let index = 0; index < data.length; index++) {
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
                    let imgSrc = item.productImage;
                    if (imgSrc) {
                        if (!imgSrc.startsWith('/') && !imgSrc.startsWith('http')) {
                            imgSrc = '/' + imgSrc;
                        }
                    } else {
                        imgSrc = '/assets/images/defult_image.png';
                    }
                    items[index] = `<tr class="${product.Token}">
                        <td class="product-thumbnail">
                            <div class="p-relative">
                                <a href="#" onclick="voidclick(); return false">
                                    <figure>
                                        <img src="${imgSrc}" alt="product"
                                            width="300" height="338"  style="border: solid 1px #eee;">
                                    </figure>
                                </a>
                                <button type="button" class="btn btn-close" onclick="RemoveItemFromTheList(${index},'${item.productToken}',${item.Quantity})">
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
                                ${item.Donation ? "background: #593930;" : "background: #2196F3;"}
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
                            "> ${Purpos ? (IsArabic ? Purpos.NameAr : Purpos.NameEn) : ''}</span >
                            <p style='font-size: 12px; margin-bottom : 0px'>${IsArabic ? '<i class="w-icon-check-solid"></i> عن الاسم:' : '<i class="w-icon-check-solid"></i> For the name:'} ${item.Shareholder}</p>
                            ${item.CharityId > 0 && Charity ? `<p style ='font-size: 12px; margin-bottom : 0px'>${IsArabic ? '<i class="w-icon-check-solid"></i> المؤسسة الخيرية:' : '<i class="w-icon-check-solid"></i> Charity:'} ${IsArabic ? Charity.NameAr : Charity.NameEn}</p>` : ``}
                            ${item.ShippingCityid > 0 && City ? `<p style ='font-size: 12px; margin-bottom : 0px'>${IsArabic ? '<i class="w-icon-check-solid"></i> عنوان الشحن:' : '<i class="w-icon-check-solid"></i> Shippin address:'} ${IsArabic ? City.CityNameAr + ' | ' + item.ShippingTown + ' | house# ' + item.ShippingHouse + ',' + item.ShippingApartment + ' | ' + item.ShippingStreet : City.CityNameEn + ' | ' + item.ShippingTown + ' | house# ' + item.ShippingHouse + ',' + item.ShippingApartment + ' | ' + item.ShippingStreet}</p>` : ``}
                            ${item.ShippingCityid > 0 && City ? `<p style ='font-size: 12px; margin-bottom : 0px'>${IsArabic ? '<i class="w-icon-check-solid"></i> رقم التواصل:' : '<i class="w-icon-check-solid"></i> Contact #:'} ${item.ShippingNumber}</p>` : ``}
                            ${item.cuttingNotes !== undefined && item.cuttingNotes.trim() != '' ? `<p style ='font-size: 12px; margin-bottom : 0px'>${IsArabic ? '<i class="w-icon-check-solid"></i> ملاحظات:' : '<i class="w-icon-check-solid"></i> Notes:'} ${item.cuttingNotes}</p>` : ``}
                        </td>
                        <td class="product-quantity" style="display: table-cell; vertical-align: middle;">
                            <div class="premium-qty-container d-flex align-items-center mb-2" style="max-width: 140px; background: #ffffff; border: 1px solid #eaebec; border-radius: 50px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); margin: 0 auto; overflow: hidden; transition: all 0.3s ease;">
                                <button type="button" class="premium-qty-btn" onclick="ChangeItemQuantity(${index}, '${item.productToken}', parseInt(document.getElementById('quantity_${index}').value) - 1, ${price * rate_value}, '${rate_code}')" style="background: transparent; border: none; padding: 10px 16px; cursor: pointer; color: #888; font-size: 13px; transition: all 0.2s ease; outline: none;" onmouseover="this.style.color='#000'; this.style.background='#f8f9fa'" onmouseout="this.style.color='#888'; this.style.background='transparent'"><i class="w-icon-minus"></i></button>
                                
                                <input id="quantity_${index}" class="premium-qty-input form-control" type="number" min="1" max="100000" value="${item.Quantity}" onchange="ChangeItemQuantity(${index}, '${item.productToken}', parseInt(this.value), ${price * rate_value}, '${rate_code}')" onkeydown="if(event.key === 'Enter'){event.preventDefault(); this.blur(); return false;}" style="border: none; text-align: center; padding: 10px 0; width: 100%; -moz-appearance: textfield; box-shadow: none; font-weight: 700; color: #222; font-size: 16px; background: transparent; outline: none;">
                                
                                <button type="button" class="premium-qty-btn" onclick="ChangeItemQuantity(${index}, '${item.productToken}', parseInt(document.getElementById('quantity_${index}').value) + 1, ${price * rate_value}, '${rate_code}')" style="background: transparent; border: none; padding: 10px 16px; cursor: pointer; color: #888; font-size: 13px; transition: all 0.2s ease; outline: none;" onmouseover="this.style.color='#000'; this.style.background='#f8f9fa'" onmouseout="this.style.color='#888'; this.style.background='transparent'"><i class="w-icon-plus"></i></button>
                            </div>
                            <div class="price-per-unit text-center">
                                ${IsArabic ? `<span class="amount" style="font-size: 13px; color: #777; font-weight: 500;"> ${rate_code} ${product.Amount > 0 ? (price * rate_value).toFixed(2) : 0} </span>` : `<span class="amount" style="font-size: 13px; color: #777; font-weight: 500;"> ${product.Amount > 0 ? (price * rate_value).toFixed(2) : 0} ${rate_code} </span>`}
                            </div>
                        </td>
                        <td class="product-subtotal">
                            <span id="subtotal_${index}" class="amount">${product.Amount > 0 ? (item.Quantity * (price * rate_value)).toFixed(2) : "Out Of Stock"} ${product.Amount > 0 ? rate_code : ""}</span>
                        </td>
                    </tr>`;

                    let loadedCount = 0;
                    for (let j = 0; j < items.length; j++) {
                        if (items[j] !== undefined) loadedCount++;
                    }

                    if (loadedCount == data.length) {
                        if ($('#premium-qty-style').length === 0) {
                            let styleBlock = `<style id="premium-qty-style">
                                .premium-qty-input::-webkit-outer-spin-button,
                                .premium-qty-input::-webkit-inner-spin-button {
                                    -webkit-appearance: none;
                                    margin: 0;
                                }
                                .premium-qty-container:hover {
                                    border-color: #d1d5db !important;
                                    box-shadow: 0 4px 15px rgba(0,0,0,0.08) !important;
                                }
                                .premium-qty-btn:active {
                                    transform: scale(0.92);
                                }
                            </style>`;
                            $('head').append(styleBlock);
                        }
                        
                        $(".productlist").html(items.join(''));
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
        $(".productlist").html('<tr><td colspan="5" style="text-align: center;font-size: 17px;font-weight: 600;color: #593930;">' + (IsArabic ? 'لم يتم العثور على نتائج!' : 'No Result Found!') + '</tr></td>');
    }
}

function RemoveItemPageCart(Token, value) {
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

    $("." + Token).remove();

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
        $(".cart-subtotal span").html("0 " + currency.toLocaleUpperCase());
        $(".order-total span").html("0 " + currency.toLocaleUpperCase());
        $(".productlist").html('<tr><td colspan="5" style="text-align: center;font-size: 17px;font-weight: 600;color: #593930;">' + (IsArabic ? 'لم يتم العثور على نتائج!' : 'No Result Found!') + '</tr></td>');
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

function ChangeItemQuantity(i, token, newQuantity, unitPrice, rateCode) {
    newQuantity = parseInt(newQuantity);
    if (newQuantity < 1) return;
    
    // Update input field visually
    let input = document.getElementById('quantity_' + i);
    if (input) {
        input.value = newQuantity;
    }
    
    // Update subtotal visually
    let subtotalSpan = document.getElementById('subtotal_' + i);
    if (subtotalSpan) {
        subtotalSpan.innerHTML = (newQuantity * unitPrice).toFixed(2) + " " + rateCode;
    }
    
    // Update Shareholders cookie
    let cart_tems = getCookie('Shareholders');
    if (cart_tems != '') {
        let cart_json = cart_tems.split('|');
        let data = [];
        for (let index = 0; index < cart_json.length; index++) {
            data.push(JSON.parse(cart_json[index]));
        }

        if (data[i]) {
            data[i].Quantity = newQuantity;
        }

        let newCookieVal = data.map(x => JSON.stringify(x)).join('|');
        setCookie('Shareholders', newCookieVal, 7);
        
        // Sum quantities per token for cookie_cart_items
        let tokenQtys = {};
        for(let j = 0; j < data.length; j++){
            if(!tokenQtys[data[j].productToken]) tokenQtys[data[j].productToken] = 0;
            tokenQtys[data[j].productToken] += parseInt(data[j].Quantity);
        }
        
        let new_cookie_cart_items = [];
        for(let t in tokenQtys) {
            new_cookie_cart_items.push(t + "|" + tokenQtys[t]);
        }
        let cookie_cart_str = new_cookie_cart_items.join(",");
        setCookie('cookie_cart_items', cookie_cart_str, 7);
        
        // Update top cart dropdown count
        let length = 0;
        for(let t in tokenQtys) {
            length += tokenQtys[t];
        }
        $('.cart-count').html(length);
        
        // Calculate dropdown prices
        CalculateCartPrices(cookie_cart_str);
    }
    
    // Re-calculate page total
    let total = 0;
    let subtotals = document.querySelectorAll('[id^="subtotal_"]');
    for(let j = 0; j < subtotals.length; j++){
        let text = subtotals[j].innerText;
        let val = parseFloat(text.split(' ')[0]);
        if(!isNaN(val)) total += val;
    }
    $(".cart-subtotal span").html(total.toFixed(2) + " " + rateCode);
    $(".order-total span").html(total.toFixed(2) + " " + rateCode);
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
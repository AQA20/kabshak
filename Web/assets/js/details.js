
let billingCityId = "1834";
let IsDonation = false;
let mainImg = '#';
let productUrl = window.location.pathname;
const productUrlArray = productUrl.split("/");
let ProductToken = "-1";
if (productUrlArray.length > 0)
    ProductToken = productUrlArray[productUrlArray.length - 1].toString();

if (getCookie("NavigationURL") != "") {
    $('#BreadcrumbCustom').html(`<a href="/${getCookie("NavigationURL")}">${getCookie("NavigationURL").toLocaleLowerCase().includes("wishlist") ? (IsArabic ? "المفضلة" : "Wishlist") : (IsArabic ? "المتجر" : "Shop")}</a>`);
}
else {
    $('#BreadcrumbCustom').remove();
}

var input = document.querySelector("#contact_phone");
window.intlTelInput(input, {
    onlyCountries: ["jo"],
    utilsScript: "/assets/vendor/intlTelInput/utils.js",
});
var iti = intlTelInput(input);
iti.setCountry("jo");

BindProductDetails();
/*BindProductsLists();*/
GetProductSubCategories();
GetAdminProductDetails();
BindCharitiesList();
BindProductPurposesList();
BindShippingCountiries(107);


function BindShippingCountiries(countryId) {
    var fdata = new FormData();
    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/countries',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillShippingCountriesList(data, countryId);
            BindShippingCities(countryId);
        },
        error: function (xhr, ajaxOptions, thrownError) {


        }
    });
}

function FillShippingCountriesList(data, countryId) {
    if (data.length > 0) {
        var countries = data;
        let index = 0;
        let items = [];
        for (index; index < countries.length; index++) {
            let item = countries[index];
            if (item.CountryId == countryId)
                items.push(`<option value="${item.CountryId}" selected>${IsArabic ? item.CountryNameAr : item.CountryNameEn}</option>`);
        }

        $('#shipingCountries').html(items);
    }
}


function BindShippingCities(countryId) {
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
            FillShippingCitiesList(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {


        }
    });
}

function FillShippingCitiesList(data) {
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

        $('[name="shiping-city"]').html(items);
    }
}

function GetAdminProductDetails() {

    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    var fdata = new FormData();
    fdata.append('token', (ProductToken ? decodeURIComponent(ProductToken) : "-1").toString());
    fdata.append('auth_token', "");
    $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/get_admin_product_details',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            let product = JSON.parse(data);

            if (product.IsNewArrival) {
                IsDonation = true;
                let url = IsArabic ? "ar/donate-shop?newarrival=1" : "donate-shop?newarrival=1";
                let name = IsArabic ? "متجر التبرعات" : "Donate Shop";
                $('#BreadcrumbCustom').removeClass('d-none');
                $('#BreadcrumbCustom').html('<a href="/' + url + '">' + name + '</a>')

                url = IsArabic ? "/ar/cart" : "/cart";
                name = IsArabic ? "عرض سلة التسوق" : "View Cart";

                $('.cart-action-button1').attr('href', url);
                $('.cart-action-button1').html(name);

                url = IsArabic ? "/ar/checkout" : "/checkout";
                name = IsArabic ? "الدفع" : "Checkout";

                $('.cart-action-button2').attr('href', url);
                $('.cart-action-button2').html(name);

            }
            else {
                let url = IsArabic ? "ar/shipping-shop?newarrival=2" : "shipping-shop?newarrival=2";
                let name = IsArabic ? "متجر التوصيل" : "Shipping Shop";
                $('#BreadcrumbCustom').removeClass('d-none');
                $('#BreadcrumbCustom').html('<a href="/' + url + '">' + name + '</a>')
                url = IsArabic ? "/ar/cart" : "/cart";
                name = IsArabic ? "عرض سلة التسوق" : "View Cart";

                $('.cart-action-button1').attr('href', url);
                $('.cart-action-button1').html(name);

                url = IsArabic ? "/ar/checkout" : "/checkout";
                name = IsArabic ? "الدفع" : "Checkout";

                $('.cart-action-button2').attr('href', url);
                $('.cart-action-button2').html(name);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}
function BindProductDetails() {
    document.getElementById("divloader").style.background = '#ffffff';
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');
    var fdata = new FormData();
    fdata.append('user_token', (userId ? decodeURIComponent(userId) : "-1").toString());
    fdata.append('token', (ProductToken ? decodeURIComponent(ProductToken) : "-1").toString());
    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/get_product_details',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.toString() == "{}") {
                window.location.href = "/home";
            } else {
                BindProductImages();
                FillProductDetailsData(data);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');


        }
    });
}

function BindProductImages() {
    var fdata = new FormData();
    fdata.append('token', (ProductToken ? decodeURIComponent(ProductToken) : "-1").toString());
    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/get_product_images',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillProductImagesData(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');


        }
    });
}

function FillProductDetailsData(data) {
    var item = data;
    $("#lblBreadcrumbPage").html(IsArabic ? item.NameAr : item.NameEn);
    $(".product-title").html(IsArabic ? item.NameAr : item.NameEn);

    if (item.DescriptionEn != null && item.DescriptionEn.trim() != '') {
        $(".product-description").html(IsArabic ? item.DescriptionAr.trim().replaceAll('contenteditable', 'nonn') : item.DescriptionEn.trim().replaceAll('contenteditable', 'nonn'));
    }

    if (item.SpecificationEn != null && item.SpecificationEn.trim() != '') {
        $("#product-tab-specification").html(IsArabic ? item.SpecificationAr.trim() : item.SpecificationEn.trim());
    }
    if (item.SKU != null && item.SKU.trim() != "")
        $(".product-sku span").html(item.SKU);
    else
        $(".product-sku").remove();
    let netPriceUsd = item.Discount > 0 ? (item.Usd - (item.Usd * item.Discount / 100)) : item.Usd
    $(".new-price").html(Math.ceil((netPriceUsd * rate_value).toFixed(2)) + " " + rate_code);
    if (item.Discount > 0)
        $(".banner-price-info span").html(item.Discount);
    else
        $(".sale-tag").remove();
    $(".Brief").html(IsArabic ? item.BriefAr : item.BriefEn);
    $(".product-category").html((IsArabic ? item.CategoryNameAr : item.CategoryNameEn) + (item.SubCategoryNameEn != null && item.SubCategoryNameEn.trim() != '' && item.SubCategoryNameEn.trim().toLowerCase() != 'null' && item.SubCategoryNameEn.trim().toLowerCase() != 'undefined' ? ', ' + (IsArabic ? item.SubCategoryNameAr : item.SubCategoryNameEn) : ''));
    $(".product-link-wrapper").html(``);

    if (item.Colors != null && item.Colors.trim() != '') {
        let colors = item.Colors.split(",");
        let index = 0;
        let items = [];
        for (index; index < colors.length; index++) {
            let item2 = colors[index];
            items.push(`<p class="color mb-0" style="background-color: ${item2}"></p>`);
        }

        $(".product-color-swatch .product-variations").html(items);
    }
    else {
        $(".product-color-swatch").remove();
    }

    if (item.SizesEn != null && item.SizesEn.trim() != '') {
        let SizesEn = (IsArabic ? item.SizesAr.split(",") : item.SizesEn.split(","));
        let index = 0;
        let items = [];
        for (index; index < SizesEn.length; index++) {
            let item2 = SizesEn[index];
            items.push(`<p class="size mr-1">${item2}</p>`);
        }

        $(".product-size-swatch .product-variations").html(items);
    }
    else {
        $(".product-size-swatch").remove();
    }

    if (item.Amount <= 0) {
        $(".sticky-content-wrapper button").addClass('disabled');
        $(".product-qty-form").addClass('d-none');
        $(".btn-cart span").html(IsArabic ? 'نفذ من المخزون' : 'OUT OF STOCK');
    }
    else {
        $('.btn-primary').attr("onclick", "AddToCartWithNoOfItems('" + item.Token + "');");
    }

    if (item.BrandNameEn != null && item.BrandNameEn.trim() != '') {
        $(".vendor-name").html(`<a href="#" onclick="voidclick(); return false">${IsArabic ? item.BrandNameAr.trim() : item.BrandNameEn.trim()}</a>`);
    }

    if (item.BrandUrl != null && item.BrandUrl.trim() != '') {
        $(".vendor-banner-image").html(`<img src="/${item.BrandUrl.trim()}" alt="Vendor Banner" width="610" height="295">`);
    }
    else {
        $('.vendor-banner-image-dev').remove();
    }

    if (item.BrandDescriptionEn != null && item.BrandDescriptionEn.trim() != '') {
        $(".vendor-info").html(IsArabic ? item.BrandDescriptionAr.trim().replaceAll('contenteditable', 'nonn') : item.BrandDescriptionEn.trim().replaceAll('contenteditable', 'nonn'));
    }


}

function FillReviewData(data) {
    var item = data;

    $(".rating-reviews").html(`(${item.ReviewCounts.toString()} Reviews)`);
    $(".ratings-value").html(`<span class="text-dark font-weight-bold">${item.RecommendedPerc.toString()}</span>${IsArabic ? 'موصى به' : 'Recommended'}<span class="count">(${item.RecommendedCounts.toString()} of ${item.ReviewCounts.toString()})</span>`);
    $(".avg-mark").html(item.ReviewAvg.toString());
    $(".ratings-full").html(`<span class="ratings" style="width:${item.ReviewAvg * 20}%"></span><span class="tooltiptext tooltip-top"></span>`);

    let Scors = [];

    Scors.push(`<div class="ratings-container">
                    <div class="ratings-full">
                        <span class="ratings" style="width: 100%;"></span>
                        <span class="tooltiptext tooltip-top"></span>
                    </div>
                    <div class="progress-bar progress-bar-sm ">
                        <span style="width: ${item.Score5Perc};"></span>
                    </div>
                    <div class="progress-value">
                        <mark>${item.Score5Perc}</mark>
                    </div>
                </div>`);
    Scors.push(`<div class="ratings-container">
                    <div class="ratings-full">
                        <span class="ratings" style="width: 80%;"></span>
                        <span class="tooltiptext tooltip-top"></span>
                    </div>
                    <div class="progress-bar progress-bar-sm ">
                        <span style="width: ${item.Score4Perc};"></span>
                    </div>
                    <div class="progress-value">
                        <mark>${item.Score4Perc}</mark>
                    </div>
                </div>`);
    Scors.push(`<div class="ratings-container">
                    <div class="ratings-full">
                        <span class="ratings" style="width: 60%;"></span>
                        <span class="tooltiptext tooltip-top"></span>
                    </div>
                    <div class="progress-bar progress-bar-sm ">
                        <span style="width: ${item.Score3Perc};"></span>
                    </div>
                    <div class="progress-value">
                        <mark>${item.Score3Perc}</mark>
                    </div>
                </div>`);
    Scors.push(`<div class="ratings-container">
                    <div class="ratings-full">
                        <span class="ratings" style="width: 40%;"></span>
                        <span class="tooltiptext tooltip-top"></span>
                    </div>
                    <div class="progress-bar progress-bar-sm ">
                        <span style="width: ${item.Score2Perc};"></span>
                    </div>
                    <div class="progress-value">
                        <mark>${item.Score2Perc}</mark>
                    </div>
                </div>`);
    Scors.push(`<div class="ratings-container">
                    <div class="ratings-full">
                        <span class="ratings" style="width: 20%;"></span>
                        <span class="tooltiptext tooltip-top"></span>
                    </div>
                    <div class="progress-bar progress-bar-sm ">
                        <span style="width: ${item.Score1Perc};"></span>
                    </div>
                    <div class="progress-value">
                        <mark>${item.Score1Perc}</mark>
                    </div>
                </div>`);

    $(".ratings-list").html(Scors);

    setTimeout(
        function () {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }, 1000);
}

function FillProductImagesData(_data) {
    if (_data.length <= 0 || _data == '[]') {
        $('.product-gallery').remove();
        $('.product-data-custom').attr('class', 'col-md-12 mb-4 mb-md-12');
    }
    else {
        var data = _data;
        let index = 0;
        let items = [];
        for (index; index < data.length; index++) {
            let item = data[index];
            let imgUrl = item.Url;
            if (imgUrl && !imgUrl.includes('/assets/') && !imgUrl.includes('assets/')) {
                imgUrl = 'assets/images/products/' + imgUrl;
            }
            items.push(`<div class="swiper-slide">
                            <figure class="product-image product-image-custom">
                                <img src="/${imgUrl}"
                                    data-zoom-image="/${imgUrl}"
                                    width="68.5px">
                            </figure>
                        </div>`);
            if (index == 0) {
                mainImg = "/" + imgUrl;
            }
        }

        if (items.length > 0) {
            $('.product-gallery-sticky .swiper-container .swiper-wrapper').html(items);
        }
    }
}

function RateProduct() {
    var selected = $(".rating-stars .active")[0]

    if (selected != undefined) {
        var score = selected.innerText;
        var review = $(".review-form-wrapper #review");
        var name = $(".review-form-wrapper #author");
        var email = $(".review-form-wrapper #email_1");

        var fdata = new FormData();
        fdata.append('score', (score ? score : "1").toString());
        fdata.append('review', (review.val() ? review.val() : "").toString());
        fdata.append('name', (name.val() ? name.val() : "").toString());
        fdata.append('email', (email.val() ? email.val() : "").toString());
        fdata.append('token', (ProductToken ? decodeURIComponent(ProductToken) : "-1").toString());
        fdata.append('auth_token', ""); $.ajax({
            cache: false,
            data: fdata,
            url: '/api/products.asmx/submit_rating',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                document.getElementById("divloader").style.background = "#ffffff";
                document.getElementById("divloader").classList.add('d-flex');
                document.getElementById("divloader").classList.remove('d-none');
                var fdata = new FormData();
                fdata.append('user_token', (userId ? decodeURIComponent(userId) : "-1").toString());
                fdata.append('token', (ProductToken ? decodeURIComponent(ProductToken) : "-1").toString());
                fdata.append('auth_token', ""); $.ajax({
                    cache: false,
                    data: fdata,
                    url: '/api/products.asmx/get_product_details',
                    type: 'post',
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        if (data.toString() == "{}") {
                            window.location.href = "/home";
                        } else {
                            FillReviewData(data)
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        document.getElementById("divloader").classList.add('d-none');
                        document.getElementById("divloader").classList.remove('d-flex');


                    }
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {


            }
        });

        $(".alert-rating").addClass("d-none");
        review.val('');
        name.val('');
        email.val('');
    }
    else {
        $(".alert-rating").removeClass("d-none");
    }
}

function BindProductsLists() {
    var fdata = new FormData();
    fdata.append('user_token', (userId ? decodeURIComponent(userId) : "-1").toString());
    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/get_homepagelists',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillProductsLists(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {


        }
    });
}


function FillProductsLists(data) {
    if (data.length > 0) {
        index = 0;
        let items = [];
        let items2 = [];
        let items3 = [];

        for (index; index < data.length; index++) {
            let item = data[index];
            let productURL = "/" + (IsArabic ? "ar/" : "") + "shop/product/" + FixProductName(item.NameEn.trim().toLowerCase()) + "/" + item.Token;
            if (index >= 18 && index < 21) {
                items.push(`<div class="product product-widget">
                                <figure class="product-media">
                                    <a href="${productURL}">
                                        <img src="/${item.Url}" alt="Product" width="100" height="113">
                                    </a>
                                </figure>
                                <div class="product-details">
                                    <h4 class="product-name">
                                        <a href="${productURL}">${IsArabic ? item.NameAr : item.NameEn}</a>
                                    </h4>
                                    <div class="product-price">${Math.ceil((item.Usd * rate_value).toFixed(2))} ${rate_code}
                                               </div>
                                </div>
                            </div>`);
            }

            if (index >= 21 && index < 24) {
                items2.push(`<div class="product product-widget">
                                <figure class="product-media">
                                    <a href="${productURL}">
                                        <img src="/${item.Url}" alt="Product" width="100" height="113">
                                    </a>
                                </figure>
                                <div class="product-details">
                                   <h4 class="product-name">
                                        <a href="${productURL}">${IsArabic ? item.NameAr : item.NameEn}</a>
                                    </h4>
                                      <div class="product-price">${Math.ceil((item.Usd * rate_value).toFixed(2))} ${rate_code}
                                               </div>
                                </div>
                            </div>`);
            }

            if (index == 0) {
                items3.push(`<div class="swiper-slide product swiper-slide-active" role="group" aria-label="1 / 3" style="width: 296.667px; ${IsArabic ? 'margin-left: 20px;' : 'margin-right: 20px;'}">
                                            <figure class="product-media">
                                                <a href="#" onclick="voidclick(); return false">
                                                    <img src="/${item.Url}" alt="Product" width="300" height="338"  class="product-media-custom">
                                                </a>
                                                <div class="product-action-vertical">
                                                    <a href="#" onclick="AddToCartFromShop(this, '${item.Token}',1);" class="btn-product-icon btn-cart w-icon-cart ${(item.Amount <= 0) ? 'd-none' : ''}" title="Add to cart"></a>
                                                    <a href="${productURL}" class="btn-product-icon w-icon-dots-circle" title="details" style="font-size: 1.7em;"></a>
                                                </div>
                                                <div class="product-action">
                                                    <a href="${productURL}" class="btn-product btn-quickview" title="Quick View">${IsArabic ? 'نظرة سريعة' : 'Quick View'}</a>
                                                </div>
                                            </figure>
                                            <div class="product-details">
                                                <div class="product-cat"><a href="#" onclick="voidclick(); return false">${IsArabic ? item.CategoryNameAr : item.CategoryNameEn}${((sub) => sub && sub.toString().trim().toLowerCase() !== 'null' && sub.toString().trim().toLowerCase() !== 'undefined' && sub.toString().trim() !== '' ? ', ' + sub : '')(IsArabic ? item.SubCategoryNameAr : item.SubCategoryNameEn)}</a>
                                                </div>
                                                <h4 class="product-name"><a href="#" onclick="voidclick(); return false">${IsArabic ? item.NameAr : item.NameEn}</a>
                                                </h4>
                                                <div class="product-pa-wrapper">
                                                     <div class="product-price">${Math.ceil((item.Usd * rate_value).toFixed(2))} ${rate_code}
                                               </div>
                                                </div>
                                            </div>
                                        </div>`);
            }

            if (index == 1) {
                items3.push(`   <div class="swiper-slide product swiper-slide-next" role="group" aria-label="2 / 3" style="width: 296.667px; ${IsArabic ? 'margin-left: 20px;' : 'margin-right: 20px;'}">
                                            <figure class="product-media">
                                                <a href="#" onclick="voidclick(); return false">
                                                    <img src="/${item.Url}" alt="Product" width="300" height="338"  class="product-media-custom">
                                                </a>
                                                   <div class="product-action-vertical">
                                                        <a href="#" onclick="AddToCartFromShop(this, '${item.Token}',1);" class="btn-product-icon btn-cart w-icon-cart ${(item.Amount <= 0) ? 'd-none' : ''}" title="Add to cart"></a>
                                                        <a href="${productURL}" class="btn-product-icon w-icon-dots-circle" title="details" style="font-size: 1.7em;"></a>
                                                    </div>
                                                <div class="product-action">
                                                    <a href="${productURL}" class="btn-product btn-quickview" title="Quick View">${IsArabic ? 'نظرة سريعة' : 'Quick View'}</a>
                                                </div>
                                            </figure>
                                            <div class="product-details">
                                                <div class="product-cat"><a href="#" onclick="voidclick(); return false"">${IsArabic ? item.CategoryNameAr : item.CategoryNameEn}${((sub) => sub && sub.toString().trim().toLowerCase() !== 'null' && sub.toString().trim().toLowerCase() !== 'undefined' && sub.toString().trim() !== '' ? ', ' + sub : '')(IsArabic ? item.SubCategoryNameAr : item.SubCategoryNameEn)}</a>
                                                </div>
                                                <h4 class="product-name"><a href="#" onclick="voidclick(); return false">${IsArabic ? item.NameAr : item.NameEn}</a></h4>
                                                <div class="product-pa-wrapper">
                                                    <div class="product-price">
                                                        <ins class="new-price">${Math.ceil((item.Usd * rate_value).toFixed(2))} ${rate_code}</ins>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`);
            }

            if (index == 2 || index == 3) {
                items3.push(` <div class="swiper-slide product" role="group" aria-label="3 / 3" style="width: 296.667px; ${IsArabic ? 'margin-left: 20px;' : 'margin-right: 20px;'}">
                                            <figure class="product-media">
                                                <a href="#" onclick="voidclick(); return false">
                                                    <img src="/${item.Url}" alt="Product" width="300" height="338"  class="product-media-custom">
                                                </a>
                                                 <div class="product-action-vertical">
                                                    <a href="#" onclick="AddToCartFromShop(this, '${item.Token}',1);" class="btn-product-icon btn-cart w-icon-cart ${(item.Amount <= 0) ? 'd-none' : ''}" title="Add to cart"></a>
                                                    <a href="${productURL}" class="btn-product-icon w-icon-dots-circle" title="details" style="font-size: 1.7em;"></a>
                                                </div>
                                                <div class="product-action">
                                                    <a href="${productURL}" class="btn-product btn-quickview" title="Quick View">${IsArabic ? 'نظرة سريعة' : 'Quick View'}</a>
                                                </div>
                                            </figure>
                                            <div class="product-details">
                                                <div class="product-cat"><a href="#" onclick="voidclick(); return false">${IsArabic ? item.CategoryNameAr : item.CategoryNameEn}${((sub) => sub && sub.toString().trim().toLowerCase() !== 'null' && sub.toString().trim().toLowerCase() !== 'undefined' && sub.toString().trim() !== '' ? ', ' + sub : '')(IsArabic ? item.SubCategoryNameAr : item.SubCategoryNameEn)}</a></div>
                                                <h4 class="product-name"><a href="#" onclick="voidclick(); return false">${IsArabic ? item.NameAr : item.NameEn}</a></h4>
                                                <div class="product-pa-wrapper">
                                                    <div class="product-price">
                                                        <ins class="new-price">${Math.ceil((item.Usd * rate_value).toFixed(2))} ${rate_code}</ins>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`);
            }
        }
        $('#swiper-wrapper-d3b106fe2cfeb6c61 .swiper-slide-active').html(items);
        $('#swiper-wrapper-d3b106fe2cfeb6c61 .swiper-slide-next').html(items2);
        $('#swiper-wrapper-fd288ecf110989425').html(items3);
    }
}

function AddToCartWithNoOfItems(token) {
    //AddToCart(token, $('.input-number').val());
}

function GetProductSubCategories() {
    var fdata = new FormData();
    fdata.append('main_token', (ProductToken ? decodeURIComponent(ProductToken) : "-1").toString());
    fdata.append('auth_token', "");
    $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/get_product_sub_categories',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillProductSubCategories(data);
        }
    });
}


function FillProductSubCategories(data) {
    $('.list-of-sub-categories').html(' ');
    if (data.length > 0) {
        let index = 0;
        let items = [];

        for (index; index < data.length; index++) {
            let item = data[index];
            if (item.IsActive) {
                let netPriceUsd = item.Discount > 0 ? (item.Price - (item.Price * item.Discount / 100)) : item.Price

                items.push(`<style>
                                    .white-store-text, .white-store-text * { color: white !important; }
                                    h4.store-title a.white-store-link { color: white !important; }
                                    h4.store-title a.white-store-link:hover { color: white !important; }
                                    .white-store-text .ql-editor { padding: 0 !important; margin: 0 !important; word-break: break-word; }
                                </style>
                                <div class="store-wrap mb-4">
                                    <div class="store store-grid">
                                        <div class="store-header">
                                            <figure class="store-banner" style="background: #593930; min-height: 185px;">
                                            </figure>
                                        </div>
                                        <!-- End of Store Header -->
                                        <div class="store-content white-store-text" style="min-height: 150px;">
                                            <h4 class="store-title mb-2">
                                                <a href="#" class="white-store-link">${IsArabic ? item.NameAr : item.NameEn}</a>
                                            </h4>
                                            <h5 class="sub-title font-weight-bold mb-1">${Math.ceil((netPriceUsd * rate_value).toFixed(2)) + " " + rate_code}</h5>
                                            <div class="store-address store-address-${item.Token}" style="padding-${IsArabic ? 'left' : 'right'}: 25px; margin-bottom: 20px; display: block; box-sizing: border-box; max-width: 100%; overflow: hidden;">
                                               ${IsArabic ? item.DescriptionAr.replaceAll('contenteditable', 'nonn') : item.DescriptionEn.replaceAll('contenteditable', 'nonn')}
                                            </div>
                                        </div>
                                        <!-- End of Store Content -->
                                        <div class="store-footer">
                                            <a href="javascript:void(0)" onclick="manageprdouctcart('${item.Token}','${IsArabic ? item.NameAr : item.NameEn}','${Math.ceil((netPriceUsd * rate_value).toFixed(2)) + ' ' + rate_code}');" class="btn btn-dark btn-link btn-underline btn-icon-right btn-visit"><i class="w-icon-cart"></i>${IsArabic ? ' أضف الى عربة التسوق' : ' Add to Cart'}</a>
                                        </div>
                                        <!-- End of Store Footer -->
                                    </div>
                                    <!-- End of Store -->
                                </div>`);
            }
        }

        $('.list-of-sub-categories').prepend(items);
        BindCartPage(getCookie("cookie_cart_items"));

        //FillReviewData(data);

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

function manageprdouctcart(token, name, price) {
    $('.collapse').html(name);
    $('.fill-sub-price').html(price);
    var classvalue = '.store-address-' + token;
    $('.sub-description').html($(classvalue).html());
    $('.product-qty-form').html(`
                                <div class="input-group">
                                    <input Id="quantity${token}" class="quantity form-control" type="number" min="0" max="10000000">
                                    <button class="quantity-plus w-icon-plus"></button>
                                    <button class="quantity-minus w-icon-minus"></button>
                                </div>
                                    `);


    if (IsDonation) {
        $('.btn-save-shareholder').attr('onclick', 'SaveShareholderInfo("' + token + '");')
    }
    else {
        $('.btn-save-shareholder').attr('onclick', 'SaveShippingShareholderInfo("' + token + '");');
        $(".charity-donation").remove();
        $('.Shipping-Address-AddToCart').removeClass('d-none');
    }

    $('.btn-quickview').click();
}

function Increase(Id) {
    let value = parseInt($('#' + Id).html());
    value = value + 1;
    $('#' + Id).html(value);
    /*   AddToCart(Id.toString().replace('quantity', ''), 1);*/
}

function Decrease(Id) {
    let value = parseInt($('#' + Id).html());
    //if (value > 0) {
    //    RemoveFromCart(Id.toString().replace('quantity', ''), 1);
    //}
    value = value - 1;
    if (value > 0)
        $('#' + Id).html(value);
    else
        $('#' + Id).html(0);
}

function BindCartPage(cookie_cart_items) {
    if (cookie_cart_items !== "") {
        var items = cookie_cart_items.split(',');
        let index = 0;
        for (index; index < items.length; index++) {
            var item = items[index].split('|');
            $('#quantity' + item[0]).html(parseInt($('#quantity' + item[0]).html()) + parseInt(item[1]));
        }
    }
}

function BindCharitiesList() {
    var fdata = new FormData();
    fdata.append('auth_token', ""); $.ajax({
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
            FillProductPurposesList(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {


        }
    });
}

function FillProductPurposesList(data) {
    if (data.length > 0) {
        let index = 0;
        let items = [];
        items.push(`<option value="-1">${IsArabic ? 'حدد..' : 'Select..'}</option >`);
        for (index; index < data.length; index++) {
            let item = data[index];
            if (item.IsActive.toString().toLowerCase().trim() !== 'false')
                items.push(`<option value="${item.Id}">${IsArabic ? item.NameAr : item.NameEn}</option >`);
        }

        $('[name="purposes"]').html(items);
    }
}


function SaveShareholderInfo(token) {
    var val = true;

    var charityId = $('[name="charities"]').find(":selected").val();
    if (typeof charityId == "undefined" || charityId == '-1') {
        val = false;
        $('[name="charities"]')[0].style.background = "#fff9b3";
    } else {
        $('[name="charities"]')[0].style.background = "#ffffff";
    }

    var purposeId = $('[name="purposes"]').find(":selected").val();
    if (typeof purposeId == "undefined" || purposeId == '-1') {
        val = false;
        $('[name="purposes"]')[0].style.background = "#fff9b3";
    } else {
        $('[name="purposes"]')[0].style.background = "#ffffff";
    }

    var Shareholder = $('[name="Shareholder"]')[0];
    if (typeof Shareholder == "undefined" || Shareholder.value.trim() == '') {
        val = false;
        Shareholder.style.background = "#fff9b3";
    }
    else {
        Shareholder.style.background = "#ffffff";
    }

    let qunt = $('#quantity' + token)[0].value;
    if (qunt == '0') {
        val = false;
        $('.product-qty-form .input-group')[0].style.background = "#fff9b3";
    }
    else {
        $('.product-qty-form .input-group')[0].style.background = "#ffffff";
    }

    if (val) {
        let name = $('.product-single-swiper .product-title').html() + ' - ' + $('.collapse').html();
        let imageElement = $('.product-single-swiper img')[0];
        let image = imageElement ? imageElement.src : '';
        const Item = {
            Donation: 1,
            PurposeId: purposeId,
            CharityId: charityId,
            productToken: token,
            productName: name,
            productImage: image,
            Quantity: qunt,
            Shareholder: Shareholder.value.trim(),
            ShippingCityid: -1,
            ShippingTown: '',
            ShippingHouse: 0,
            ShippingStreet: '',
            ShippingApartment: 0,
            ShippingNumber: '',
            cuttingNotes: '',
        };

        add_shareholders_value(Item);

        Shareholder.value = "";
        $('[name="charities"]').val('-1');
        $('[name="purposes"]').val('-1');
        AddToCart(token, parseInt(qunt));
        $('.mfp-close').click();
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

function SaveShippingShareholderInfo(token) {
    var val = true;

    var purposeId = $('[name="purposes"]').find(":selected").val();
    if (typeof purposeId == "undefined" || purposeId == '-1') {
        val = false;
        $('[name="purposes"]')[0].style.background = "#fff9b3";
    } else {
        $('[name="purposes"]')[0].style.background = "#ffffff";
    }

    var Shareholder = $('[name="Shareholder"]')[0];
    if (typeof Shareholder == "undefined" || Shareholder.value.trim() == '') {
        val = false;
        Shareholder.style.background = "#fff9b3";
    }
    else {
        Shareholder.style.background = "#ffffff";
    }

    let qunt = $('#quantity' + token)[0].value;
    if (qunt == '0') {
        val = false;
        $('.product-qty-form .input-group')[0].style.background = "#fff9b3";
    }
    else {
        $('.product-qty-form .input-group')[0].style.background = "#ffffff";
    }

    var shippingtown = $('[name="shipping-town"]')[0];
    var shippingstreet = $('[name="shipping-street"]')[0];
    var shippinghouse = $('[name="shipping-house"]')[0];
    var shippingapartment = $('[name="shipping-Apartment"]')[0];
    var _cuttingNotes = $('[name="product-cutting-notes"]')[0].value.trim();

    if (shippingtown.value.trim() === "") {
        val = false;
        shippingtown.style.background = "#fff9b3";
    }
    else {
        shippingtown.style.background = "#ffffff";
    }

    if (shippingstreet.value.trim() === "") {
        val = false;
        shippingstreet.style.background = "#fff9b3";
    }
    else {
        shippingstreet.style.background = "#ffffff";
    }

    if (shippinghouse.value.trim() === "") {
        val = false;
        shippinghouse.style.background = "#fff9b3";
    }
    else {
        shippinghouse.style.background = "#ffffff";
    }

    if (shippingapartment.value.trim() === "") {
        val = false;
        shippingapartment.style.background = "#fff9b3";
    }
    else {
        shippingapartment.style.background = "#ffffff";
    }

    var shippingcityid = $('[name="shiping-city"]').find(":selected").val();
    var shippingcitytext = $('[name="shiping-city"]').find(":selected").text();

    if (typeof shippingcityid == "undefined") {
        val = false;
        $('[name="shiping-city"]')[0].style.background = "#fff9b3";
    } else {
        $('[name="shiping-city"]')[0].style.background = "#ffffff";
    }

    var input = document.querySelector("#contact_phone");
    var shippingnumber = input.value.trim();
    var code = iti.selectedCountryData.dialCode;
    if (isValidNumber(shippingnumber.replaceAll(' ', '')) && code == '962') {
        document.getElementById('contact_phone').style.background = "#ffffff";
        $('.divPhone2').css("background", "#ffffff");
    }
    else {
        document.getElementById('contact_phone').style.background = "#fff9b3";
        $('.divPhone2').css("background", "#fff9b3");
        val = false;
    }

    if (val) {
        let name = $('.product-single-swiper .product-title').html() + ' - ' + $('.collapse').html();
        let imageElement = $('.product-single-swiper img')[0];
        let image = imageElement ? imageElement.src : '';
        const Item = {
            Donation: 0,
            PurposeId: purposeId,
            CharityId: -1,
            productToken: token,
            productName: name,
            productImage: image,
            Quantity: qunt,
            Shareholder: Shareholder.value.trim(),
            ShippingCityid: shippingcityid,
            ShippingTown: shippingtown.value.trim(),
            ShippingHouse: shippinghouse.value.trim(),
            ShippingStreet: shippingstreet.value.trim(),
            ShippingApartment: shippingapartment.value.trim(),
            ShippingNumber: shippingnumber,
            cuttingNotes: _cuttingNotes,
        }

        add_shareholders_value(Item);

        Shareholder.value = "";
        $('[name="purposes"]').val('-1');
        AddToCart(token, parseInt(qunt));
        $('.mfp-close').click();
    }
}

function isValidNumber(num) {
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
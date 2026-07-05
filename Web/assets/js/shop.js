let urlSearchQuery = location.search;
let urlParams = new URLSearchParams(urlSearchQuery);
let urlHasQueryString = Array.from(urlParams).length > 0;
urlParams.forEach(function (value, key) {
    if (key == "brands" && value != "-1") {
        $('[name="' + "brands" + '"]').val(value);
    }

    if (key == "categories" && value != "-1") {
        $('[name="' + "categories" + '"]').val(value);
    }

    if (key == "subcategories" && value != "-1") {
        $('[name="' + "subcategories" + '"]').val(value);
    }

    if (key == "min_price" && value != "-1") {
        $('[name="' + "min" + '"]').val(value);
        $('[name="' + "min_price" + '"]').val(value);
    }

    if (key == "max_price" && value != "-1") {
        $('[name="' + "max" + '"]').val(value);
        $('[name="' + "max_price" + '"]').val(value);
    }

    if (key == "start" && value != "-1") {
        $('[name="' + "start" + '"]').val(value)
    }

    if (key == "end" && value != "-1") {
        $('[name="' + "end" + '"]').val(value)
    }

    if (key == "sort" && value != "-1") {
        $('[name="' + "sort" + '"]').val(value);
        $(".selectpickersort").val(value);
    }

    if (key == "categoryId") {
        $('[name="' + "categories" + '"]').val(value);
    }

    if (key == "txt") {
        if (value.trim() == "")
            $('[name="' + "searchtxt" + '"]').val("-1");
        else
            $('[name="' + "searchtxt" + '"]').val(value);
    }

    if (key == "newarrival" && value != "-1") {
        $('[name="' + "newarrival" + '"]').val(value);
        $('#cbNewArrival').prop('checked', true);
    }

    if (key == "onsale" && value != "-1") {
        $('[name="' + "onsale" + '"]').val(value);
        $('#cbOnSale').prop('checked', true);
    }
});
$('#FilterCurrency').html(currency.toLocaleUpperCase());

window.currnetNavClicked = 1
GetBrandsList();
GetCategoriesList();
GetProductsList();

function GetProductsList() {
    let allParams = $('#search-filters-items :input').serialize();
    allParams = JSON.parse('{"' + decodeURI(allParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');

    let apiURL = "shop?";

    if (allParams.brands != "" && allParams.brands != "0" && allParams.brands != "-1") {
        apiURL = apiURL + "&brands=" + (allParams.brands ? allParams.brands : "-1").toString();
        apiURL = apiURL.replace("?&", "?");
        history.pushState({}, null, apiURL);
    }

    if (allParams.categories != "" && allParams.categories != "0" && allParams.categories != "-1") {
        apiURL = apiURL + "&categories=" + (allParams.categories ? allParams.categories : "-1").toString();
        apiURL = apiURL.replace("?&", "?");
        history.pushState({}, null, apiURL);
    }

    if (allParams.subcategories != "" && allParams.subcategories != "0" && allParams.subcategories != "-1") {
        apiURL = apiURL + "&subcategories=" + (allParams.subcategories ? allParams.subcategories : "-1").toString();
        apiURL = apiURL.replace("?&", "?");
        history.pushState({}, null, apiURL);
    }

    if (allParams.min != "" && allParams.min != "0" && allParams.min != "-1") {
        apiURL = apiURL + "&min_price=" + (allParams.min ? allParams.min : "-1").toString();
        apiURL = apiURL.replace("?&", "?");
        history.pushState({}, null, apiURL);
    }

    if (allParams.max != "" && allParams.max != "0" && allParams.max != "-1") {
        apiURL = apiURL + "&max_price=" + (allParams.max ? allParams.max : "-1").toString();
        apiURL = apiURL.replace("?&", "?");
        history.pushState({}, null, apiURL);
    }

    if (allParams.max != "" && allParams.max != "0" && allParams.max != "-1") {
        apiURL = apiURL + "&max_price=" + (allParams.max ? allParams.max : "-1").toString();
        apiURL = apiURL.replace("?&", "?");
        history.pushState({}, null, apiURL);
    }

    if (allParams.max != "" && allParams.max != "0" && allParams.max != "-1") {
        apiURL = apiURL + "&max_price=" + (allParams.max ? allParams.max : "-1").toString();
        apiURL = apiURL.replace("?&", "?");
        history.pushState({}, null, apiURL);
    }

    if (!(allParams.sort == "-1" && (location.href == "/shop" || location.href == "/ar/shop"))) {
        apiURL = apiURL + "&sort=" + (allParams.sort ? allParams.sort : "-1").toString();
        apiURL = apiURL.replace("?&", "?");
        history.pushState({}, null, apiURL);
    }

    if (!(allParams.start == "1" && (location.href == "/shop" || location.href == "/ar/shop"))) {
        apiURL = apiURL + "&start=" + (allParams.start ? allParams.start : "-1").toString();
        apiURL = apiURL.replace("?&", "?");
        history.pushState({}, null, apiURL);
    }

    if (!(allParams.end == "50" && (location.href == "/shop" || location.href == "/ar/shop"))) {
        apiURL = apiURL + "&end=" + (allParams.end ? allParams.end : "-1").toString();
        apiURL = apiURL.replace("?&", "?");
        history.pushState({}, null, apiURL);
    }

    if (allParams.searchtxt != "" && allParams.searchtxt != "-1") {
        apiURL = apiURL + "&txt=" + (allParams.searchtxt ? allParams.searchtxt : "-1").toString();
        apiURL = apiURL.replace("?&", "?");
        history.pushState({}, null, apiURL);
    }

    if (allParams.newarrival != "" && allParams.newarrival != "0" && allParams.newarrival != "-1") {
        apiURL = apiURL + "&newarrival=" + (allParams.newarrival ? allParams.newarrival : "-1").toString();
        apiURL = apiURL.replace("?&", "?");
        history.pushState({}, null, apiURL);
    }

    if (allParams.onsale != "" && allParams.onsale != "0" && allParams.onsale != "-1") {
        apiURL = apiURL + "&onsale=" + (allParams.onsale ? allParams.onsale : "-1").toString();
        apiURL = apiURL.replace("?&", "?");
        history.pushState({}, null, apiURL);
    }

    setCookie('NavigationURL', (IsArabic ? "ar/" : "") + apiURL, 30);

    var fdata = new FormData();
    fdata.append('brands', (allParams.brands ? decodeURIComponent(allParams.brands) : "-1").toString());
    fdata.append('min', (allParams.min ? decodeURIComponent(allParams.min) : "-1").toString());
    fdata.append('max', (allParams.max ? decodeURIComponent(allParams.max) : "-1").toString());
    fdata.append('categories', (allParams.categories ? decodeURIComponent(allParams.categories) : "-1").toString());
    fdata.append('start', (allParams.start ? decodeURIComponent(allParams.start) : "1").toString());
    fdata.append('end', (allParams.end ? decodeURIComponent(allParams.end) : "50").toString());
    fdata.append('sort', (allParams.sort ? decodeURIComponent(allParams.sort) : "-1").toString());
    fdata.append('currency', currency.toLocaleUpperCase());
    fdata.append('txt', (allParams.searchtxt ? decodeURIComponent(allParams.searchtxt) : "-1").toString());
    fdata.append('subcategories', (allParams.subcategories ? decodeURIComponent(allParams.subcategories) : "-1").toString());
    fdata.append('usertoken', (userId ? decodeURIComponent(userId) : "-1").toString());
    fdata.append('newarrival', (allParams.newarrival ? allParams.newarrival : "-1").toString());
    fdata.append('onsale', (allParams.onsale ? allParams.onsale : "-1").toString());
    fdata.append('country', rate_code ? rate_code : "usd");

    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/get_products_list',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillProducts(data, allParams.end, allParams.start);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
           
            
        }
    });
}

function FillProducts(data, end, start) {
    if (data.length > 0) {
        let index = 0;
        let items = [];
        for (index; index < data.length; index++) {
            let item = data[index];
            let imgUrl = item.ImageUrl;
            if (imgUrl && !imgUrl.includes('/assets/') && !imgUrl.includes('assets/')) {
                imgUrl = 'assets/images/products/' + imgUrl;
            }
            let productURL = (IsArabic ? "/ar/" : "/") + "shop/product/" + FixProductName(item.NameEn.trim().toLowerCase()) + "/" + item.Token;

            items.push(`<div class="product product-list" style="border-bottom: solid 1px #eee;margin-bottom: 20px;">
                                    <figure class="product-media">
                                        <div class="${item.Discount <= 0 ? "d-none" : "product-label-group"}">
                                        <label class="product-label label-discount">${item.Discount}% ${IsArabic ? "خصم" : "OFF"}</label>
                                        </div>
                                        <a href="${productURL}">
                                            <img src="/${imgUrl}" alt="Product" width="330" height="338" style="height: 265px;">
                                        </a>
                                        <div class="product-action-vertical">
                                            <a href="${productURL}" class="btn-product-icon btn-quickview w-icon-search" title="Quick View"></a>
                                        </div>
                                    </figure>
                                    <div class="product-details" style="width:100%;min-height: 265px;">
                                        <div class="product-cat">
                                            <a href="#" onclick="voidclick(); return false" style="padding: 10px;background: #FF9800;color: #ffffff;border-radius: 5px;    font-weight: 600;">${IsArabic ? item.CategoryNameAr : item.CategoryNameEn}${((sub) => sub && sub.toString().trim().toLowerCase() !== 'null' && sub.toString().trim().toLowerCase() !== 'undefined' && sub.toString().trim() !== '' ? ', ' + sub : '')(IsArabic ? item.SubCategoryNameAr : item.SubCategoryNameEn)}</a>
                                        </div>
                                        <h4 class="product-name">
                                            <a href="${productURL}">${IsArabic ? item.NameAr : item.NameEn}</a>
                                        </h4>
                                        <div class="ratings-container">
                                            <a href="#" onclick="voidclick(); return false" class="rating-reviews">${IsArabic ? item.BrandNameAr : item.BrandNameEn}</a>
                                        </div>
                                        <div class="product-price"> ${(item.Usd * rate_value).toFixed(2)} ${rate_code}</div>
                                        <div class="ratings-container">
                                            <p style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3; line-clamp: 3;-webkit-box-orient: vertical;">${IsArabic ? item.BriefAr : item.BriefEn}</p>
                                        </div>
                                        <div class="product-action" style="position: absolute;">
                                             <a href="#" onclick="AddToCartFromShop(this, '${item.Token}', 1);"  class="btn-product btn-cart ${(item.Amount <= 0) ? "disabled" : ""}" title="Add to Cart"><i class="w-icon-cart"></i>${(item.Amount > 0) ? (IsArabic ? "أضف إلى عربة التسوق" : "Add To Cart") : (IsArabic ? "نفذ المخزون" : "OUT OF STOCK")} </a>
                                        </div>
                                    </div>
                                </div>`);
        }
        $('.list').html(items);
        $('.list-Noresult').html(' ');
        BindPaginationBar(data[0].Records, end, start)
    }
    else {
        window.currnetNavClicked = 1
        $('[name="start"]').val(1);
        $('[name="end"]').val(50);
        $('.pagination').html(' ');
        $('.showing-info').html(' ');
        if (IsArabic)
            $('.list-Noresult').html('<div style="font-weight: 500;color: #593930;padding: 5px;font-size: 20px;"><span class="w-icon-search-plus" style="padding-right: 5px;padding-left: 5px;"></span>لم يتم العثور على نتائج!</div>');
        else
            $('.list-Noresult').html('<div style="font-weight: 500;color: #593930;padding: 5px;font-size: 20px;"><span class="w-icon-search-plus" style="padding-right: 5px;padding-left: 5px;"></span>No result found!</div>');
        $('.list').html(' ');
        $('body , html').animate({
            scrollTop: $('.page-wrapper').offset().top
        }, 300)
    }

    setTimeout(
        function () {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }, 1000);
}

function GetBrandsList() {
    var fdata = new FormData();
    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/brands',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillBrands(data);
        }
    });
}

function GetCategoriesList() {
    var fdata = new FormData();
    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/categories',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillCategories(data);
        }
    });
}

function FillBrands(data) {
    if (data.length > 0) {
        let allParams = $('#search-filters-items :input').serialize();
        allParams = JSON.parse('{"' + decodeURI(allParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');

        let index = 0;
        let items = [];
        let _valid = false;
        var array = decodeURI(allParams.brands).split("%2C");

        for (index; index < data.length; index++) {
            let item = data[index];

            for (i = 0; i < array.length; i++) {
                if (item.Id == array[i]) {
                    _valid = true;
                    break;
                }
            }

            if (!_valid) {
                items.push(`<li class="brand-checkbox" style="padding: 1rem 0 1rem 0.2rem;"><input type="checkbox" class="custom-checkbox" value="${item.Id}">
                            <label for="remember">${IsArabic ? item.NameAr : item.NameEn}</label></li>`);
            }
            else {
                items.push(`<li class="brand-checkbox" style="padding: 1rem 0 1rem 0.2rem;"><input type="checkbox" class="custom-checkbox" value="${item.Id}" checked="true">
                            <label for="remember">${IsArabic ? item.NameAr : item.NameEn}</label></li>`);
            }

            _valid = false;
        }

        $('.brands').prepend(items);
    }
}

function FillCategories(data) {
    if (data.length > 0) {
        let allParams = $('#search-filters-items :input').serialize();
        allParams = JSON.parse('{"' + decodeURI(allParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');

        let index = 0;
        let items = [];

        let _valid = false;
        var array = decodeURI(allParams.categories).split("%2C");

        for (index; index < data.length; index++) {
            let item = data[index];

            for (i = 0; i < array.length; i++) {
                if (item.Id == array[i]) {
                    _valid = true;
                    break;
                }
            }

            let SubCategoriesString = "";
            let SubCategoriesList = [];
            let SubCategories = item.SubCategoryies;
            if (SubCategories.length > 0) {
                let _validItem = false;
                var subarray = decodeURI(allParams.subcategories).split("%2C");
                for (i = 0; i < SubCategories.length; i++) {
                    for (i2 = 0; i2 < subarray.length; i2++) {
                        if (SubCategories[i].Id == subarray[i2]) {
                            _validItem = true;
                            break;
                        }
                    }

                    if (SubCategories[i].IsActive == true) {
                        if (!_validItem) {
                            SubCategoriesList.push(`<div style="margin-bottom: 10px;"><input id="subCatId${SubCategories[i].Id}" type="checkbox" class="custom-checkbox SubCateegoryId${SubCategories[i].CategoryId}" onclick="CheckedSubGategory(${SubCategories[i].Id});" value="${SubCategories[i].Id}">
                                            <label for="subCatId${SubCategories[i].Id}">${IsArabic ? SubCategories[i].NameAr : SubCategories[i].NameEn}</label></div>`);
                        }
                        else {
                            SubCategoriesList.push(`<div style="margin-bottom: 10px;"><input id="subCatId${SubCategories[i].Id}" type="checkbox" class="custom-checkbox SubCateegoryId${SubCategories[i].CategoryId}" onclick="CheckedSubGategory(${SubCategories[i].Id});" value="${SubCategories[i].Id}" checked="true">
                                            <label for="subCatId${SubCategories[i].Id}">${IsArabic ? SubCategories[i].NameAr : SubCategories[i].NameEn}</label></div>`);
                        }
                    }

                    _validItem = false;
                }
                SubCategoriesString = SubCategoriesList.join('');
            }

            if (!_valid) {
                items.push(`
                            <div class="accordion accordion-bg accordion-gutter-md accordion-border show-code-action">
                                <div class="card">
                                    <div class="card-header">
                                        <a id="cbCategory${item.Id}" href="${item.IsHasSubCategory ? "#collapse" : "#"}" class="${item.IsHasSubCategory ? "expand" : ""}" onclick="CheckedGategory(${item.Id});" style="background: transparent;font-size: 14px;font-weight: 100;padding: 1rem 0 1rem 0.2rem;">${IsArabic ? item.NameAr : item.NameEn}</a>
                                    </div>
                                    <div class="card-body collapsed" id="collapse" style="display: none;border:unset;">
                                        ${SubCategoriesString}
                                    </div>
                                </div>
                            </div>
                `);
            }
            else {
                items.push(`
                            <div class="accordion accordion-bg accordion-gutter-md accordion-border show-code-action">
                                <div class="card">
                                    <div class="card-header active">
                                        <a id="cbCategory${item.Id}" href="${item.IsHasSubCategory ? "#collapse" : "#"}" class="${item.IsHasSubCategory ? "expand" : ""}" onclick="CheckedGategory(${item.Id});" style="background: transparent;font-size: 14px;font-weight: 100;padding: 1rem 0 1rem 0.2rem;">${IsArabic ? item.NameAr : item.NameEn}</a>
                                    </div>
                                    <div class="card-body expanded" id="collapse" style="${item.IsHasSubCategory ? "display: block;border:unset;" : "display: none;border:unset;"}">
                                        ${SubCategoriesString}
                                    </div>
                                </div>
                            </div>
                        `);
            }

            _valid = false;
        }

        $('.categories').prepend(items);
    }
}

function CleanAll() {
    if (IsArabic)
        window.location.href = "/ar/shop.aspx";
    else
        window.location.href = "/shop.aspx";
}

function SearchByPrice() {
    var min = $("input[name=min_price]").val();
    var max = $("input[name=max_price]").val();
    $('[name="min"]').val(min);
    $('[name="max"]').val(max);
    $('[name="start"]').val(1);
    $('[name="end"]').val(50);
    GetProductsList();
}

function BindPaginationBar(records, end, start) {
    if (start > 300) {
        window.currnetNavClicked = Math.ceil(start / 50);
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
        let setStarValue = navindex * ((50 * clickedValue) / clickedValue) + 1;
        let setEndValue = (setStarValue - 1) + ((50 * clickedValue) / clickedValue);
        if (navindex < counter && navindex < numberOfNav / 50) {
            navItems.push(`
                            <li class="page-item ${endValue == setEndValue ? 'active' : ''}" id="${navindex}">
                                <a class="page-link " href="#" onclick="getNext(${setStarValue},${setEndValue},'a')" >${navindex + ((counter / 6) / clickedValue)}</a>
                            </li>
                        `)
            elementsCounter++
        }

        if (navindex == counter && navindex < numberOfNav / 50) {
            navItems.push(`
                            <li class="next">
                                <a  href="#" onclick="getNext(${setStarValue},${setEndValue},true)" aria-label="Next">
                                    ${IsArabic ? 'التالي' : 'Next'}<i class="${IsArabic ? 'w-icon-long-arrow-left' : 'w-icon-long-arrow-right'}"></i>
                                </a>
                            </li>
                        `)
        }

        if (navindex + 1 > counter && clickedValue != 1 && numberOfNav / 50 >= 2) {
            let prevStartVal = (navindex - (elementsCounter < 6 ? 6 + 6 - elementsCounter : elementsCounter)) * ((50 * clickedValue) / clickedValue) + 1;
            let prevEndVal = (prevStartVal - 1) + ((50 * clickedValue) / clickedValue);
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
        GetProductsList();
        $('body , html').animate({
            scrollTop: $('.page-wrapper').offset().top
        }, 300)
    }
}

let allBrands = [];
string_brands = $('[name="' + "brands" + '"]').val();
if (string_brands != "" && string_brands != "-1") {
    var str_array = string_brands.split(',');
    for (var i = 0; i < str_array.length; i++) {
        allBrands.push(str_array[i].toString())
    }
}

let allCategories = [];
string_categories = $('[name="' + "categories" + '"]').val();
if (string_categories != "" && string_categories != "-1") {
    var str_array = string_categories.split(',');
    for (var i = 0; i < str_array.length; i++) {
        allCategories.push(str_array[i].toString())
    }
}

let allSubCategories = [];
string_subcategories = $('[name="' + "subcategories" + '"]').val();
if (string_subcategories != "" && string_subcategories != "-1") {
    var str_array = string_subcategories.split(',');
    for (var i = 0; i < str_array.length; i++) {
        allSubCategories.push(str_array[i].toString())
    }
}

$('select.selectpickersort').on('change', (e) => {
    $('[name="sort"]').val($(e.target).val());
    $('[name="start"]').val(1);
    $('[name="end"]').val(50);
    GetProductsList();
})

$(document).on('click', '.brand-checkbox input', (e) => {
    if (e.target.checked) {
        allBrands.push(e.target.defaultValue)
    } else {
        let index = allBrands.indexOf(e.target.defaultValue);
        if (index > -1) {
            allBrands.splice(index, 1);
        }
    }
    let value = allBrands.join();
    $('[name="brands"]').val(value);
    $('[name="start"]').val(1);
    $('[name="end"]').val(50);
    GetProductsList();
})

function CheckedSubGategory(id) {
    let index = -1;
    for (let i = 0; i < allSubCategories.length; i++) {
        if (allSubCategories[i] == id) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        allSubCategories.splice(index, 1);
    }
    else {
        allSubCategories.push(id);
    }

    let value = allSubCategories.join();
    $('[name="subcategories"]').val(value);
    $('[name="start"]').val(1);
    $('[name="end"]').val(50);
    GetProductsList();
}

function CheckedGategory(id) {
    let index = -1;

    for (let i = 0; i < allCategories.length; i++) {
        if (allCategories[i] == id) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        allCategories.splice(index, 1);
        var Inputs_subCategories = document.getElementsByClassName("SubCateegoryId" + id.toString());
        for (let i = 0; i < Inputs_subCategories.length; i++) {
            let item = Inputs_subCategories[i];
            RemoveSubGategory(item.value);
        }
        for (var checkbox of Inputs_subCategories) {
            checkbox.checked = false;
        }
    }
    else {
        allCategories.push(id);
    }

    let value = allCategories.join();
    $('[name="categories"]').val(value);
    $('[name="start"]').val(1);
    $('[name="end"]').val(50);
    GetProductsList();
}

function RemoveSubGategory(id) {
    let index = -1;
    for (let i = 0; i < allSubCategories.length; i++) {
        if (allSubCategories[i] == id) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        allSubCategories.splice(index, 1);
    }
    let value = allSubCategories.join();
    $('[name="subcategories"]').val(value);
}

$(document).on('click', '.newarrival-checkbox input', (e) => {
    if (e.target.checked) {
        $('[name="newarrival"]').val('1');
    } else {
        $('[name="newarrival"]').val('-1');
    }
    $('[name="start"]').val(1);
    $('[name="end"]').val(50);
    GetProductsList();
})

$(document).on('click', '.onsale-checkbox input', (e) => {
    if (e.target.checked) {
        $('[name="onsale"]').val('1');
    } else {
        $('[name="onsale"]').val('-1');
    }
    $('[name="start"]').val(1);
    $('[name="end"]').val(50);
    GetProductsList();
})



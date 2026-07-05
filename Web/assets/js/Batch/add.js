window.currnetNavClicked = 1
BindCharitiesList();
GetBrandsList();
GetCategoriesList();
GetProductsList();
BindSlaughterhousesList();

function GetProductsList() {
    let allParams = $('#search-filters-items :input').serialize();
    allParams = JSON.parse('{"' + decodeURI(allParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');

    var fdata = new FormData();
    fdata.append('brands', (allParams.brands ? decodeURIComponent(allParams.brands) : "-1").toString());
    fdata.append('charityid', (allParams.charityid ? decodeURIComponent(allParams.charityid) : "-1").toString());
    fdata.append('categories', (allParams.categories ? decodeURIComponent(allParams.categories) : "-1").toString());
    fdata.append('start', (allParams.start ? decodeURIComponent(allParams.start) : "1").toString());
    fdata.append('end', (allParams.end ? decodeURIComponent(allParams.end) : "20").toString());
    fdata.append('subcategories', (allParams.subcategories ? decodeURIComponent(allParams.subcategories) : "-1").toString());
    fdata.append('usertoken', (userId ? decodeURIComponent(userId) : "-1").toString());
    if ((allParams.delivery == "-1" && allParams.donate == "-1") || (allParams.delivery == "1" && allParams.donate == "1"))
        fdata.append('delivery', "-1");
    if (allParams.delivery != "-1" && allParams.donate == "-1")
        fdata.append('delivery', "1");
    if (allParams.delivery == "-1" && allParams.donate != "-1")
        fdata.append('delivery', "2");

    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/get_admin_batch_products_list',
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

            items.push(`<tr class="RemoveRecord_14">
                           <td class="product-stock-status">
                                <ins class="product-stock-status">#${item.OrderId}</ins>
                            </td>
                            <td class="product-stock-status">
                                <ins class="product-stock-status">${item.ShareholderName}</ins>
                            </td>
                            <td class="product-stock-status">
                                <span class="wishlist-in-stock">${item.ProductName}<br><span style="border: solid 1px;padding: 5px;border-radius: 3px;color: #7f7e7e;">${item.IsNewArrival == true ? 'Donation' : 'Shipping'}</span></span>
                            </td>
<td class="product-stock-status">
                                <span class="wishlist-in-stock">${item.PurposeName}</span>
                            </td>
<td class="product-stock-status" style="text-align: center;">
                                <span class="wishlist-in-stock">
                                    ${item.Quantity}
                                </span>
                            </td>
                            <td class="wishlist-action">
                                <div class="d-lg-flex justify-content-end">
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" style="width: 100%;" onclick="ViewOrderDetails(${item.OrderId});">View Order</button>
                                 </div>
                            </td>
                        </tr>`);
        }

        $('.result').html(` <table class="shop-table wishlist-table">
                            <thead >
                                <tr>
                                    <th class="product-name"><span>Order #</span></th>
                                    <th class="product-price" style="text-align: unset;"><span>Name</span></th>
                                    <th class="product-stock-status" style="text-align: unset;"><span>Product</span></th>
                                    <th class="product-stock-status" style="text-align: unset;"><span>Purposes</span></th>
                                    <th class="product-stock-status" style="text-align: center;"><span class="d-flex">Quantities (<p class="quant">${data[0].Quantities}</p>)</span></th>
                                    <th class="wishlist-action"></th>
                                </tr>
                            </thead >
                            <tbody class="productsList">
                            </tbody>
                            </table>`)
        $('.productsList').html(items);
        $('.generate-batch').removeClass('d-none');
        BindPaginationBar(data[0].Records, end, start)
    }
    else {
        window.currnetNavClicked = 1
        $('[name="start"]').val(1);
        $('[name="end"]').val(20);
        $('.pagination').html(' ');
        $('.showing-info').html(' ');
        $('.generate-batch').addClass('d-none');
        $('.result').html('<div style="font-weight: 500;color: #593930;padding: 5px;font-size: 20px;padding-bottom: 350px;"><span class="w-icon-search-plus" style="padding-right: 5px;padding-left: 5px;"></span>No result found!</div>');
        $('body , html').animate({
            scrollTop: $('.page-wrapper').offset().top
        }, 300)
    }

    $('[id="txtQuantity"]')[0].value = "";
    $('[id="txtQuantity"]')[0].style.background = "transparent";
    $('[name="slaughterhouse"]').val(-1);
    $('[name="slaughterhouse"]')[0].style.background = "transparent";

    setTimeout(
        function () {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }, 1000);
}

function BindPaginationBar(records, end, start) {
    if (start > 120) {
        window.currnetNavClicked = Math.ceil(start / 20);
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
        let setStarValue = navindex * ((20 * clickedValue) / clickedValue) + 1;
        let setEndValue = (setStarValue - 1) + ((20 * clickedValue) / clickedValue);
        if (navindex < counter && navindex < numberOfNav / 20) {
            navItems.push(`
                            <li class="page-item ${endValue == setEndValue ? 'active' : ''}" id="${navindex}">
                                <a class="page-link " href="#" onclick="getNext(${setStarValue},${setEndValue},'a')" >${navindex + ((counter / 6) / clickedValue)}</a>
                            </li>
                        `)
            elementsCounter++
        }

        if (navindex == counter && navindex < numberOfNav / 20) {
            navItems.push(`
                            <li class="next">
                                <a  href="#" onclick="getNext(${setStarValue},${setEndValue},true)" aria-label="Next">
                                    ${IsArabic ? 'التالي' : 'Next'}<i class="${IsArabic ? 'w-icon-long-arrow-left' : 'w-icon-long-arrow-right'}"></i>
                                </a>
                            </li>
                        `)
        }

        if (navindex + 1 > counter && clickedValue != 1 && numberOfNav / 20 >= 2) {
            let prevStartVal = (navindex - (elementsCounter < 6 ? 6 + 6 - elementsCounter : elementsCounter)) * ((20 * clickedValue) / clickedValue) + 1;
            let prevEndVal = (prevStartVal - 1) + ((20 * clickedValue) / clickedValue);
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

function BindSlaughterhousesList() {
    var fdata = new FormData();
    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/all_slaughterhouses',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillSlaughterhousesList(data);
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
function FillSlaughterhousesList(data) {
    if (data.length > 0) {
        let index = 0;
        let items = [];
        items.push(`<option value="-1">${IsArabic ? 'حدد..' : 'Select Slaughterhouse..'}</option >`);
        for (index; index < data.length; index++) {
            let item = data[index];
            if (item.IsActive.toString().toLowerCase().trim() !== 'false')
                items.push(`<option value="${item.Id}">${IsArabic ? item.CountryNameAr + '/' + item.NameAr : item.CountryName + '/' + item.NameEn}</option >`);
        }

        $('[name="slaughterhouse"]').html(items);
    }
}
function GetCategoriesList() {
    var fdata = new FormData();
    fdata.append('auth_token', ""); $.ajax({
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


function GetBrandsList() {
    var fdata = new FormData();
    fdata.append('auth_token', ""); $.ajax({
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

function CleanAll() {
    document.getElementById("divloader").style.background = "#ffffff";
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');
    window.location.href = "/admin/batch/add.aspx";
}

$('select.charities-items').on('change', (e) => {
    $('[name="charityid"]').val($(e.target).val());
    $('[name="start"]').val(1);
    $('[name="end"]').val(20);
    GetProductsList();
})

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

let allBrands = [];
string_brands = $('[name="' + "brands" + '"]').val();
if (string_brands != "" && string_brands != "-1") {
    var str_array = string_brands.split(',');
    for (var i = 0; i < str_array.length; i++) {
        allBrands.push(str_array[i].toString())
    }
}

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
    $('[name="end"]').val(20);
    GetProductsList();
})

$(document).on('click', '.delivery-orders input', (e) => {
    if (e.target.checked) {
        $('[name="delivery"]').val("1");
        $('.widget-search-form-charities').addClass('d-none');
    } else {
        $('[name="delivery"]').val("-1");
        $('.widget-search-form-charities').removeClass('d-none');
    }
    $('[name="start"]').val(1);
    $('[name="end"]').val(20);

    $('[name="charities"]').val("-1");
    $('[name="charityid"]').val("-1");

    GetProductsList();
})

$(document).on('click', '.donate-orders input', (e) => {
    if (e.target.checked) {
        $('[name="donate"]').val("1");
    } else {
        $('[name="donate"]').val("-1");
    }
    $('[name="start"]').val(1);
    $('[name="end"]').val(20);
    GetProductsList();
})

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
    $('[name="end"]').val(20);
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
    $('[name="end"]').val(20);
    GetProductsList();
}

function ViewOrderDetails(Id) {
    window.open(
        '/admin/order.aspx?Id=' + Id.toString(),
        '_blank'
    );
}

function GenerateBatch() {
    let val = true;
    let Quantity = $('[id="txtQuantity"]')[0];
    let totalQuantity = $('.quant').html();
    if (Quantity.value.trim() === "" || Quantity.value <= 0 || !isInt(Quantity.value) || (Quantity.value > parseInt(totalQuantity))) {
        val = false;
        Quantity.style.background = "#fff9b3";
    }
    else {
        Quantity.style.background = "transparent";
    }
    var slaughterhouseId = $('[name="slaughterhouse"]').find(":selected").val();
    if (typeof slaughterhouseId == "undefined" || slaughterhouseId <= 0) {
        val = false;
        $('[name="slaughterhouse"]')[0].style.background = "#fff9b3";
    } else {
        $('[name="slaughterhouse"]')[0].style.background = "transparent";
    }

    let delivery = $('[name="delivery"]')[0];
    let donate = $('[name="donate"]')[0];

    if ((delivery.value == "-1" && donate.value == "-1") || (delivery.value == "1" && donate.value == "1")) {
        val = false;
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');
        AdminMessagePopup('You must specify the type of orders that you will include in this batch because the workflow is different between orders that will be shipped or that you will donate.');

    }

    if (val) {
        let allParams = $('#search-filters-items :input').serialize();
        allParams = JSON.parse('{"' + decodeURI(allParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');

        var fdata = new FormData();
        fdata.append('brands', (allParams.brands ? decodeURIComponent(allParams.brands) : "-1").toString());
        fdata.append('charityid', (allParams.charityid ? decodeURIComponent(allParams.charityid) : "-1").toString());
        fdata.append('categories', (allParams.categories ? decodeURIComponent(allParams.categories) : "-1").toString());
        fdata.append('subcategories', (allParams.subcategories ? decodeURIComponent(allParams.subcategories) : "-1").toString());
        fdata.append('usertoken', (userId ? decodeURIComponent(userId) : "-1").toString());
        fdata.append('slaughterhouseId', (slaughterhouseId ? decodeURIComponent(slaughterhouseId) : "-1").toString());
        fdata.append('quantity', (Quantity.value ? decodeURIComponent(Quantity.value) : "-1").toString());
        if ((allParams.delivery == "-1" && allParams.donate == "-1") || (allParams.delivery == "1" && allParams.donate == "1"))
            fdata.append('delivery', "-1");
        if (allParams.delivery != "-1" && allParams.donate == "-1")
            fdata.append('delivery', "1");
        if (allParams.delivery == "-1" && allParams.donate != "-1")
            fdata.append('delivery', "2");

        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        fdata.append('auth_token', ""); $.ajax({
            cache: false,
            data: fdata,
            url: '/api/products.asmx/generate_new_batch',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                if (data != "") {
                    $('[id="txtQuantity"]')[0].style.background = "#fff9b3";
                    AdminMessagePopup('You cannot complete the process because there is a quantity for the last item that will be distributed to more than one batch, and this is not allowed, so the quantity must be modified to this number, which is ' + data);
                }
                else {
                    window.location.href = "/admin/batches";
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');
            }
        });
    }
}

function isInt(value) {
    return !isNaN(value) && (function (x) { return (x | 0) === x; })(parseFloat(value))
}
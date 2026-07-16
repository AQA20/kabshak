const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
let token = params.token
let name = params.name
if (typeof token == 'undefined' || token == null || token == '') {
    window.location = "/Home";
}

if (typeof name !== 'undefined' && name !== null && name !== '') {
    $('.breadcrumb-name').html(name);
}

var subcategorydetails = new Quill('#subcategorydetailsEn', {
    theme: 'snow'
});

var subcategorydetails2 = new Quill('#subcategorydetailsAr', {
    theme: 'snow'
});

$("#subcategorydetailsAr p").addClass("ql-align-right ql-direction-rtl");

var Editsubcategorydetails = new Quill('#EditsubcategorydetailsEn', {
    theme: 'snow'
});

var Editsubcategorydetails2 = new Quill('#EditsubcategorydetailsAr', {
    theme: 'snow'
});

$("#EditsubcategorydetailsAr p").addClass("ql-align-right ql-direction-rtl");

var Editquill = new Quill('#EditeditorEn', {
    theme: 'snow'
});

var Editquill2 = new Quill('#EditeditorAr', {
    theme: 'snow'
});

$("#EditeditorAr p").addClass("ql-align-right ql-direction-rtl");

var Specificationquill = new Quill('#SpecificationEn', {
    theme: 'snow'
});

var Specificationquill2 = new Quill('#SpecificationAr', {
    theme: 'snow'
});

$("#SpecificationAr p").addClass("ql-align-right ql-direction-rtl");

CategoriesList();
GetProductDetails();
GetProductSubCategories();

function GetColorsList(colors_string) {
    var fdata = new FormData();
    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/active_colors',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillColors(data, colors_string);
        }
    });
}

function FillColors(data, colors_string) {
    $('#choices-multiple-remove-button').html(' ');

    if (data.length > 0) {
        if (colors_string == '') {
            let index = 0;
            let items = [];
            for (index; index < data.length; index++) {
                let item = data[index];
                items.push(`<option value="${item.Id}"><span style="background: ${item.Code};margin-right: 5px;border: solid 1px #eee;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>${item.Code}</option>`);
            }
            $('#choices-multiple-remove-button').prepend(items);
        }
        else {
            const Selected_Array = colors_string.split(",");
            let index = 0;
            let items = [];
            for (index; index < data.length; index++) {
                let item = data[index];
                if (Selected_Array.includes(item.Id.toString()))
                    items.push(`<option value="${item.Id}" selected><span style="background: ${item.Code};margin-right: 5px;border: solid 1px #eee;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>${item.Code}</option>`);
                else
                    items.push(`<option value="${item.Id}"><span style="background: ${item.Code};margin-right: 5px;border: solid 1px #eee;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>${item.Code}</option>`);
            }
            $('#choices-multiple-remove-button').prepend(items);
        }
    }

    var multipleCancelButton = new Choices('#choices-multiple-remove-button', {
        removeItemButton: true
    });
}

function GetSizesList(sizes_string) {
    var fdata = new FormData();
    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/active_sizes',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillSizes(data, sizes_string);
        }
    });
}

function FillSizes(data, sizes_string) {
    $('#choices-multiple-remove-button2').html(' ');

    if (data.length > 0) {
        if (sizes_string == '') {
            let index = 0;
            let items = [];
            for (index; index < data.length; index++) {
                let item = data[index];
                items.push(`<option value="${item.Id}">${item.NameEn}</option>`);
            }
            $('#choices-multiple-remove-button2').prepend(items);
        }
        else {
            const Selected_Array = sizes_string.split(",");
            let index = 0;
            let items = [];
            for (index; index < data.length; index++) {
                let item = data[index];
                if (Selected_Array.includes(item.Id.toString()))
                    items.push(`<option value="${item.Id}" selected>${item.NameEn}</option>`);
                else
                    items.push(`<option value="${item.Id}">${item.NameEn}</option>`);
            }
            $('#choices-multiple-remove-button2').prepend(items);
        }
    }

    var multipleCancelButton = new Choices('#choices-multiple-remove-button2', {
        removeItemButton: true
    });
}
function GetBrandsList(brandid) {
    var fdata = new FormData();
    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/brands',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillBrands(data, brandid);
        }
    });
}

function FillBrands(data, brandid) {
    if (data.length > 0) {
        let index = 0;
        let items = [];
        if (brandid > 0)
            items.push(`<option value="-1">Brand</option>`);
        else
            items.push(`<option value="-1" selected>Brand</option>`);
        for (index; index < data.length; index++) {
            let item = data[index];
            if (item.Id == brandid)
                items.push(`<option value="${item.Id}" selected>${item.NameEn}</option>`);
            else
                items.push(`<option value="${item.Id}">${item.NameEn}</option>`);
        }
        $('#Brands-list').prepend(items);
    }
}

function CategoriesList() {
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
        let index = 0;
        let items = [];
        items.push(`<option value="-1" selected>Category</option>`);
        for (index; index < data.length; index++) {
            let item = data[index];
            items.push(`<option value="${item.Id}">${item.NameEn}</option>`);
        }
        $('#category-list').prepend(items);
    }
}

$('select.subcategory').on('change', (e) => {
    SubCategoryList(parseInt($(e.target).val()));
})

function SubCategoryList(category_id) {
    var fdata = new FormData();
    fdata.append('category_id', (category_id).toString());
    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/sub_categories',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillSubCategories(data);
        }
    });
}

function FillSubCategories(data) {
    $('#sub-category-list').html(' ');
    $('#new-sub-category-list').html(' ');
    if (data.length > 0) {
        let index = 0;
        let items = [];
        items.push(`<option value="-1" selected>Sub Category</option>`);
        for (index; index < data.length; index++) {
            let item = data[index];
            items.push(`<option value="${item.Id}">${item.NameEn}</option>`);
        }

        $('#sub-category-list').prepend(items);
        $('#new-sub-category-list').prepend(items);
    }
    else {
        $('#sub-category-list').prepend(`<option value="-1" selected>Sub Category</option>`);
        $('#new-sub-category-list').prepend(`<option value="-1" selected>Sub Category</option>`);
    }
}

function GetProductDetails() {
    
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    var fdata = new FormData();
    fdata.append('token', token);
    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/get_admin_product_details',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillProductDetails(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function FillProductDetails(data) {
    if (data.length > 0) {
        let product = JSON.parse(data);
        document.getElementById('txtProductNameEn').value = product.NameEn.trim();
        document.getElementById('txtProductNameAr').value = product.NameAr.trim();
        $("#category-list").val(product.CategoryId.toString());
        BindProductSubCategory(product.CategoryId, product.SubCategoryId);
        GetBrandsList(product.BrandId);
        if (product.IsNewArrival)
            $("#IsNewArrival").prop("checked", true);
        if (product.Details.length > 0) {
            document.getElementById('txtProductBriefEn').value = product.Details[0].BriefEn.trim();
            document.getElementById('txtProductBriefAr').value = product.Details[0].BriefAr.trim();
            document.getElementById('txtSKU').value = (product.Details[0].SKU == null) ? '' : product.Details[0].SKU.trim();
            if (product.Details[0].DescriptionEn != null && product.Details[0].DescriptionEn.trim() != '') {
                let initialContent = Editquill.clipboard.convert(product.Details[0].DescriptionEn);
                Editquill.setContents(initialContent, 'silent');
            }
            if (product.Details[0].DescriptionAr != null && product.Details[0].DescriptionAr.trim() != '') {
                let initialContent2 = Editquill2.clipboard.convert(product.Details[0].DescriptionAr);
                Editquill2.setContents(initialContent2, 'silent');

                $("#EditeditorAr p").addClass("ql-align-right ql-direction-rtl");
            }

            if (product.Details[0].SpecificationEn != null && product.Details[0].SpecificationEn.trim() != '') {
                let initialContent3 = Editquill.clipboard.convert(product.Details[0].SpecificationEn);
                Specificationquill.setContents(initialContent3, 'silent');
            }
            if (product.Details[0].SpecificationAr != null && product.Details[0].SpecificationAr.trim() != '') {
                let initialContent4 = Editquill2.clipboard.convert(product.Details[0].SpecificationAr);
                Specificationquill2.setContents(initialContent4, 'silent');

                $("#SpecificationAr p").addClass("ql-align-right ql-direction-rtl");
            }

            if (product.Details[0].Colors != null && product.Details[0].Colors.trim() != '') {
                GetColorsList(product.Details[0].Colors.trim());
            }
            else
                GetColorsList('');

            if (product.Details[0].Sizes != null && product.Details[0].Sizes.trim() != '') {
                GetSizesList(product.Details[0].Sizes.trim());
            }
            else
                GetSizesList('');

            if (product.Details[0].countries != null && product.Details[0].countries.trim() != '') {
                GetCountriesList(product.Details[0].countries.trim());
            }
            else
                GetCountriesList('');
        }

        if (product.Images.length > 0) {
            BindProductImages(product.Images);
        }

        if (product.Prices[0] != null && product.Prices[0].Id > 0) {
            document.getElementById('txtUsd').value = product.Prices[0].Usd.toString().trim();
            document.getElementById('txtKwd').value = product.Prices[0].Kwd.toString().trim();
        }

        if (product.Stocks[0] != null && product.Stocks[0].Id > 0) {
            document.getElementById('txtStock').value = product.Stocks[0].Amount.toString().trim();
        }

        if (product.Discount != null && product.Discount > 0) {
            document.getElementById('txtDiscount').value = product.Discount.toString().trim();
        }

        GetOrders();
    }
    else {
        window.location = "/admin/products";
    }

    setTimeout(
        function () {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }, 1000);
}

function GetCountriesList(_string) {
    var fdata = new FormData();
    fdata.append('auth_token', "");
    $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/countries',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillCountries(data, _string);
        }
    });
}

function FillCountries(data, _string) {
    $('#choices-multiple-remove-button3').html(' ');

    if (data.length > 0) {
        if (_string == '') {
            let index = 0;
            let items = [];
            for (index; index < data.length; index++) {
                let item = data[index];
                if (item.IsActive)
                    items.push(`<option value="${item.CountryNameEn.toLowerCase()}">${item.CountryNameEn}</option>`);
            }
            $('#choices-multiple-remove-button3').prepend(items);
        }
        else {
            const Selected_Array = _string.split(",");
            let index = 0;
            let items = [];
            for (index; index < data.length; index++) {
                let item = data[index];
                if (item.IsActive) {
                    if (Selected_Array.includes(item.CountryNameEn.toLowerCase()))
                        items.push(`<option value="${item.CountryNameEn.toLowerCase()}" selected>${item.CountryNameEn}</option>`);
                    else
                        items.push(`<option value="${item.CountryNameEn.toLowerCase()}">${item.CountryNameEn}</option>`);
                }
            }
            $('#choices-multiple-remove-button3').prepend(items);
        }
    }

    var multipleCancelButton = new Choices('#choices-multiple-remove-button3', {
        removeItemButton: true,
        shouldSort: false
    });
}

function SaveProductCountries() {
    document.getElementById("divloader").style.background = "#ffffff";
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    const countries = $("#choices-multiple-remove-button3 option:selected").map(function () { return this.value.toLocaleUpperCase() }).get().join(",");

    var fdata = new FormData();

    fdata.append('token', token.trim());
    fdata.append('user_token', userId.trim());
    fdata.append('countries', countries.trim());
    fdata.append('auth_token', "");

    $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/save_product_countries',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            AdminMessagePopup('The product countries have been updated.');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });

}

function BindProductImages(Images) {
    if (Images != null && Images.length > 0) {
        let index = 0;
        let items = [];
        for (index; index < Images.length; index++) {
            let item = Images[index];
            items.push(`<div class="swiper-slide  mt-2 delete${item.Id}" role="group" style="width: 200px; height: 200px !important; margin-right: 20px;">
                            <figure class="product-image product-media" style="position: relative; overflow: hidden; cursor: pointer;">
                                <img src="/${item.Url}" data-zoom-image="/${item.Url}" alt="Product" style="height: 200px;">
                                <a href="#" class="product-gallery-btn product-image-full"><i class="w-icon-zoom"></i></a>
                                <div class="product-action-vertical">
                                    <a href="#" onclick="DeleteProductImage(${item.Id})" class="btn-product-icon  w-icon-times-solid" title="Delete Image" style="margin-bottom: unset;"></a>
                                    <a href="#" onclick="MakAsMain(${item.Id})" class="btn-product-icon  w-icon-reviews" title="Main Image" style="margin-bottom: unset;margin-top: 3px;"></a>
                                </div>
                            </figure>
                        </div>`);
        }
        $('.product-gallery').prepend(items);
    }
    else {
        $('.product-gallery').html('<div style="font-weight: 500;color: #593930;padding: 5px;font-size: 20px;"><span class="w-icon-search-plus" style="padding-right: 5px;padding-left: 5px;"></span>No result found!</div>');
    }
}

function BindProductSubCategory(categoryId, SubcategoryId) {
    var fdata = new FormData();
    fdata.append('category_id', (categoryId).toString());
    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/sub_categories',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            BindSubCategories(data, SubcategoryId);
        }
    });
}

function BindEditProductSubCategory(categoryId, SubcategoryId) {
    var fdata = new FormData();
    fdata.append('category_id', (categoryId).toString());
    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/sub_categories',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            BindEditSubCategories(data, SubcategoryId);
        }
    });
}

function BindEditSubCategories(data, SubcategoryId) {
    $('#edit-sub-category-list').html(' ');
    if (data.length > 0) {
        let index = 0;
        let items = [];

        if (SubcategoryId <= 0)
            items.push(`<option value="-1" selected>Sub Category</option>`);
        else
            items.push(`<option value="-1">Sub Category</option>`);

        for (index; index < data.length; index++) {
            let item = data[index];
            if (item.Id == SubcategoryId)
                items.push(`<option value="${item.Id}" selected>${item.NameEn}</option>`);
            else
                items.push(`<option value="${item.Id}">${item.NameEn}</option>`);
        }

        $('#edit-sub-category-list').prepend(items);
    }
    else {
        $('#edit-sub-category-list').prepend(`<option value="-1" selected>Sub Category</option>`);
    }
}

function BindSubCategories(data, SubcategoryId) {
    $('#sub-category-list').html(' ');
    $('#new-sub-category-list').html(' ');
    if (data.length > 0) {
        let index = 0;
        let items = [];

        if (SubcategoryId <= 0)
            items.push(`<option value="-1" selected>Sub Category</option>`);
        else
            items.push(`<option value="-1">Sub Category</option>`);

        for (index; index < data.length; index++) {
            let item = data[index];
            if (item.Id == SubcategoryId)
                items.push(`<option value="${item.Id}" selected>${item.NameEn}</option>`);
            else
                items.push(`<option value="${item.Id}">${item.NameEn}</option>`);
        }

        $('#sub-category-list').prepend(items);
        $('#new-sub-category-list').prepend(items);
    }
    else {
        $('#sub-category-list').prepend(`<option value="-1" selected>Sub Category</option>`);
        $('#new-sub-category-list').prepend(`<option value="-1" selected>Sub Category</option>`);
    }
}


function SaveProductInfo() {
    var val = true;

    var txtProductNameEn = document.getElementById('txtProductNameEn');
    var txtProductNameAr = document.getElementById('txtProductNameAr');

    if (txtProductNameEn.value.trim() === "") {
        val = false;
        txtProductNameEn.style.background = "#fff9b3";
    }
    else {
        txtProductNameEn.style.background = "#ffffff";
    }

    if (txtProductNameAr.value.trim() === "") {
        val = false;
        txtProductNameAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtProductNameAr.value.trim())) {
            txtProductNameAr.style.background = "#ffffff";
        } else {
            val = false;
            txtProductNameAr.style.background = "#fff9b3";
        }
    }

    if ($('#category-list').find(":selected").val() == '-1') {
        val = false;
        $('#category-list').css("background-color", "#fff9b3");
    }
    else {
        $('#category-list').css("background-color", "#ffffff");
    }

    if ($('#Brands-list').find(":selected").val() == '-1') {
        val = false;
        $('#Brands-list').css("background-color", "#fff9b3");
    }
    else {
        $('#Brands-list').css("background-color", "#ffffff");
    }

    if (val) {
        document.getElementById("divloader").style.background = "#ffffff";
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();

        fdata.append('token', token.trim());
        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtProductNameEn.value.trim());
        fdata.append('name_ar', txtProductNameAr.value.trim());
        fdata.append('category', $('#category-list').find(":selected").val());
        fdata.append('sub_category', $('#sub-category-list').find(":selected").val());
        fdata.append('brand', $('#Brands-list').find(":selected").val());
        var IsNewArrival = $("#IsNewArrival")[0].checked;
        fdata.append('new_arrival', IsNewArrival ? 1 : 0);

        fdata.append('auth_token', ""); $.ajax({
            cache: false,
            data: fdata,
            url: '/api/products.asmx/edit_product_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                AdminMessagePopup('The product main info has been updated.');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');
            }
        });
    }

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

function SaveProductDetails() {
    var val = true;

    var txtProductBriefEn = document.getElementById('txtProductBriefEn');
    var txtProductBriefAr = document.getElementById('txtProductBriefAr');
    var txtSKU = document.getElementById('txtSKU');

    if (txtProductBriefEn.value.trim() === "") {
        val = false;
        txtProductBriefEn.style.background = "#fff9b3";
    }
    else {
        txtProductBriefEn.style.background = "#ffffff";
    }

    if (txtProductBriefAr.value.trim() === "") {
        val = false;
        txtProductBriefAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtProductBriefAr.value.trim())) {
            txtProductBriefAr.style.background = "#ffffff";
        } else {
            val = false;
            txtProductBriefAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").style.background = "#ffffff";
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var editor_content_en = Editquill.container.innerHTML
        var editor_content_ar = Editquill2.container.innerHTML
        var specification_content_en = Specificationquill.container.innerHTML
        var specification_content_ar = Specificationquill2.container.innerHTML

        var fdata = new FormData();

        fdata.append('token', token.trim());
        fdata.append('user_token', userId.trim());
        fdata.append('brief_en', txtProductBriefEn.value.trim());
        fdata.append('brief_ar', txtProductBriefAr.value.trim());
        fdata.append('sku', txtSKU.value.trim());
        fdata.append('description_en', editor_content_en.trim());
        fdata.append('description_ar', editor_content_ar.trim());
        fdata.append('specification_en', specification_content_en.trim());
        fdata.append('specification_ar', specification_content_ar.trim());
        fdata.append('auth_token', ""); $.ajax({
            cache: false,
            data: fdata,
            url: '/api/products.asmx/save_product_details',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                AdminMessagePopup('The product details info has been updated.');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');
            }
        });
    }

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

function SaveProductColors() {
    document.getElementById("divloader").style.background = "#ffffff";
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    const colors = $("#choices-multiple-remove-button option:selected").map(function () { return this.value }).get().join(",");
    const sizes = $("#choices-multiple-remove-button2 option:selected").map(function () { return this.value }).get().join(",");

    var fdata = new FormData();

    fdata.append('token', token.trim());
    fdata.append('user_token', userId.trim());
    fdata.append('colors', colors.trim());
    fdata.append('sizes', sizes.trim());

    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/save_product_colors_sizes',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            AdminMessagePopup('The product colors & sizes have been updated.');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });

}


function UploadProductImages() {
    var val = true;

    var img = $('#upImage');
    if (img[0].files.length <= 0) {
        val = false;
        $(".form-control-file").css("background-color", "#fff9b3");
    }

    if (val) {
        document.getElementById("divloader").style.background = "#ffffff";
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();
        fdata.append('user_token', userId.trim());
        fdata.append('token', token.trim());
        var image_name = getRndInteger(100000, 1000000);
        fdata.append('image_name', image_name);
        fdata.append('file', img[0].files[0]);

        fdata.append('auth_token', ""); $.ajax({
            cache: false,
            data: fdata,
            url: '/api/products.asmx/upload_product_img',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                $('.product-gallery').html(' ');
                BindProductImages(data);
                $("#lblUploadLogoError").addClass('d-none');
                $(".logoImg").addClass('d-none');
                $(".logoImg").attr("src", "#");
                AdminMessagePopup('The product image has been updated.');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');
            }
        });
    }

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

upImage.onchange = evt => {
    if (!upImage.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
        $(".logoImg").addClass('d-none');
        $(".logoImg").attr("src", "#");
        $("#lblUploadLogoError").removeClass('d-none');
        $('#upImage').val('');
    }
    else {
        const [file] = upImage.files
        if (file) {
            $("#lblUploadLogoError").addClass('d-none');
            $(".logoImg").removeClass('d-none');
            $(".logoImg").attr("src", URL.createObjectURL(file));
            $(".form-control-file").css("background-color", "#ffffff");
        }
    }
}

function DeleteProductImage(id) {
    $(".delete" + id.toString()).remove();

    var elementsArray = document.getElementsByClassName("swiper-slide");
    if (elementsArray == null || elementsArray.length <= 1) {
        $('.product-gallery').html('<div style="font-weight: 500;color: #593930;padding: 5px;font-size: 20px;"><span class="w-icon-search-plus" style="padding-right: 5px;padding-left: 5px;"></span>No result found!</div>');
    }

    var fdata = new FormData();
    fdata.append('user_token', userId.trim());
    fdata.append('token', token.trim());
    fdata.append('id', id);

    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/delete_product_img',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function MakAsMain(id) {
    document.getElementById("divloader").style.background = "#ffffff";
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    var fdata = new FormData();
    fdata.append('user_token', userId.trim());
    fdata.append('token', token.trim());
    fdata.append('id', id);

    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/make_main_product_img',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            AdminMessagePopup('This image has been made as the main product image.');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function SaveProductPrices() {
    var val = true;

    var txtUsd = document.getElementById('txtUsd');
    var txtKwd = document.getElementById('txtKwd');
    var txtDiscount = document.getElementById('txtDiscount');

    if (txtUsd.value.trim() === "") {
        val = false;
        txtUsd.style.background = "#fff9b3";
    }
    else {
        txtUsd.style.background = "#ffffff";
    }

    //if (txtKwd.value.trim() === "") {
    //    val = false;
    //    txtKwd.style.background = "#fff9b3";
    //}
    //else {
    //    txtKwd.style.background = "#ffffff";
    //}

    if (txtDiscount.value.trim() === "") {
        val = false;
        txtDiscount.style.background = "#fff9b3";
    }
    else {
        if (is_Int(Number(txtDiscount.value))) {
            txtDiscount.style.background = "#ffffff";
        }
        else {
            val = false;
            txtDiscount.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").style.background = "#ffffff";
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();

        fdata.append('token', token.trim());
        fdata.append('user_token', userId.trim());
        fdata.append('usd', txtUsd.value);
        fdata.append('kwd', "0");
        fdata.append('discount', txtDiscount.value);

        fdata.append('auth_token', ""); $.ajax({
            cache: false,
            data: fdata,
            url: '/api/products.asmx/save_product_prices_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                AdminMessagePopup('The product prices info have been updated.');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');
            }
        });
    }

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

function SaveProductStock() {
    var val = true;
    var txtStock = document.getElementById('txtStock');

    if (txtStock.value.trim() === "") {
        val = false;
        txtStock.style.background = "#fff9b3";
    }
    else {
        if (is_Int(Number(txtStock.value))) {
            txtStock.style.background = "#ffffff";
        }
        else {
            val = false;
            txtStock.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").style.background = "#ffffff";
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();

        fdata.append('token', token.trim());
        fdata.append('user_token', userId.trim());
        fdata.append('amount', txtStock.value);

        fdata.append('auth_token', ""); $.ajax({
            cache: false,
            data: fdata,
            url: '/api/products.asmx/save_product_stock_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                AdminMessagePopup('The product stock info has been updated.');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');
            }
        });
    }

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

function is_Int(num) {
    if (typeof num !== 'number')
        return false;

    return !isNaN(num) &&
        parseInt(Number(num)) == num &&
        !isNaN(parseInt(num, 10));
}

function GetOrders() {
    var fdata = new FormData();
    fdata.append('token', token.trim());

    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/get_product_orders_list',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillOrdersList(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
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
                                <span class="order-price">${total.toString() + " " + currency.toLocaleUpperCase()}</span>
                            </td>
                            <td class="order-action">
                                <a href="${IsArabic ? '/ar/' : '/'}order.aspx?Id=${order.Id}" target="_blank" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4">${IsArabic ? 'عرض' : 'View'}</a>
                            </td>
                        </tr>`);
        }

        $('.Order-Items').html(items);
        $('.nooforders').html(`<p class="showing-info mb-2 mb-sm-0">Found <span>${orders.length.toString()}</span> Orders</p>`);

        if (orders.length <= 0) {
            $('.account-orders-table').html('<tbody class="productlist"><tr><td colspan="5" style="text-align: center;font-size: 17px;font-weight: 600;color: #593930;">No Result Found! </td></tr></tbody>');
        }
    }
}

function EditProductSubCategories(token) {
    var val = true;

    var txtUsd = document.getElementById('txtEditSubCategoryUsd');
    var txtDiscount = document.getElementById('txtEditSubCategoryDiscount');
    var txtStock = document.getElementById('txtEditSubCategoryStock');

    if (txtUsd.value.trim() === "") {
        val = false;
        txtUsd.style.background = "#fff9b3";
    }
    else {
        txtUsd.style.background = "#ffffff";
    }

    if (txtDiscount.value.trim() === "") {
        val = false;
        txtDiscount.style.background = "#fff9b3";
    }
    else {
        if (is_Int(Number(txtDiscount.value))) {
            txtDiscount.style.background = "#ffffff";
        }
        else {
            val = false;
            txtDiscount.style.background = "#fff9b3";
        }
    }

    if (txtStock.value.trim() === "") {
        val = false;
        txtStock.style.background = "#fff9b3";
    }
    else {
        if (is_Int(Number(txtStock.value))) {
            txtStock.style.background = "#ffffff";
        }
        else {
            val = false;
            txtStock.style.background = "#fff9b3";
        }
    }

    if ($('#edit-sub-category-list').find(":selected").val() == '-1') {
        val = false;
        $('#edit-sub-category-list').css("background-color", "#fff9b3");
    }
    else {
        $('#edit-sub-category-list').css("background-color", "#ffffff");
    }

    var editor_content_en = Editsubcategorydetails.container.innerHTML
    var editor_content_ar = Editsubcategorydetails2.container.innerHTML

    if (val) {
        document.getElementById("divloader").style.background = "#ffffff";
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();

        fdata.append('token', token);
        fdata.append('user_token', userId.trim());
        fdata.append('auth_token', "");
        fdata.append('usd', txtUsd.value);
        fdata.append('discount', txtDiscount.value);
        fdata.append('amount', txtStock.value);
        fdata.append('sub_category', $('#edit-sub-category-list').find(":selected").val());
        fdata.append('sub_category_txt', $('#edit-sub-category-list').find(":selected").text());
        fdata.append('content_en', editor_content_en.trim());
        fdata.append('content_ar', editor_content_ar.trim());
        $.ajax({
            cache: false,
            data: fdata,
            url: '/api/products.asmx/edit_sub_category_products',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                $('.Product-Sub-Categories-Link').click();
                AdminMessagePopup('The sub category info has been updated.');
                GetProductSubCategories();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');
            }
        });
    }

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}
function SaveProductSubCategories() {
    var val = true;

    var txtUsd = document.getElementById('txtSubCategoryUsd');
    var txtDiscount = document.getElementById('txtSubCategoryDiscount');
    var txtStock = document.getElementById('txtSubCategoryStock');

    if (txtUsd.value.trim() === "") {
        val = false;
        txtUsd.style.background = "#fff9b3";
    }
    else {
        txtUsd.style.background = "#ffffff";
    }

    if (txtDiscount.value.trim() === "") {
        val = false;
        txtDiscount.style.background = "#fff9b3";
    }
    else {
        if (is_Int(Number(txtDiscount.value))) {
            txtDiscount.style.background = "#ffffff";
        }
        else {
            val = false;
            txtDiscount.style.background = "#fff9b3";
        }
    }

    if (txtStock.value.trim() === "") {
        val = false;
        txtStock.style.background = "#fff9b3";
    }
    else {
        if (is_Int(Number(txtStock.value))) {
            txtStock.style.background = "#ffffff";
        }
        else {
            val = false;
            txtStock.style.background = "#fff9b3";
        }
    }

    if ($('#new-sub-category-list').find(":selected").val() == '-1') {
        val = false;
        $('#new-sub-category-list').css("background-color", "#fff9b3");
    }
    else {
        $('#new-sub-category-list').css("background-color", "#ffffff");
    }

    var editor_content_en = subcategorydetails.container.innerHTML
    var editor_content_ar = subcategorydetails2.container.innerHTML

    if (val) {
        document.getElementById("divloader").style.background = "#ffffff";
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();

        fdata.append('main_token', token.trim());
        fdata.append('user_token', userId.trim());
        fdata.append('auth_token', "");
        fdata.append('usd', txtUsd.value);
        fdata.append('discount', txtDiscount.value);
        fdata.append('amount', txtStock.value);
        fdata.append('sub_category', $('#new-sub-category-list').find(":selected").val());
        fdata.append('sub_category_txt', $('#new-sub-category-list').find(":selected").text());
        fdata.append('content_en', editor_content_en.trim());
        fdata.append('content_ar', editor_content_ar.trim());
        $.ajax({
            cache: false,
            data: fdata,
            url: '/api/products.asmx/save_sub_category_products',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                AdminMessagePopup('The sub category info has been added.');
                GetProductSubCategories();
                ClearSubCategoryProductDetails();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');
            }
        });
    }

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

function ClearSubCategoryProductDetails() {
    var txtUsd = document.getElementById('txtSubCategoryUsd');
    var txtDiscount = document.getElementById('txtSubCategoryDiscount');
    var txtStock = document.getElementById('txtSubCategoryStock');

    txtUsd.value = '';
    txtDiscount.value = '0';
    txtStock.value = '';

    subcategorydetails.setContents([]);
    subcategorydetails2.setContents([]);

    $("#new-sub-category-list").val("-1").change();
}

function GetProductSubCategories() {
    var fdata = new FormData();
    fdata.append('main_token', token.trim());
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
    $('.sub_categories_list').html(' ');
    if (data.length > 0) {
        let index = 0;
        let items = [];

        for (index; index < data.length; index++) {
            let item = data[index];
            let classRandom = (Math.random() + 1).toString(36).substring(7);
            items.push(`<tr>
                            <td class="product-stock-status" style="min-width: 300px;">
                                <span class="wishlist-in-stock">${item.NameEn}</span>
                            </td>
                            <td class="product-stock-status">
                                <span class="">${item.Price} USD</span>
                            </td>
                            <td class="product-stock-status">
                                <span class="">${item.Discount}%</span>
                            </td>
                            <td class="product-stock-status">
                                <span class="">${item.Stock}</span>
                            </td>
                             <td class="product-price">
                                <ins class="new-price active${classRandom} ${item.IsActive ? '' : 'text-danger'}">${item.IsActive ? 'Is Active' : 'In Active'}</ins>
                            </td>
                            <td class="wishlist-action">
                                <div class="d-lg-flex justify-content-between">
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" style=" padding-left: 20px;padding-right: 20px;" onClick="EditSub_Category('${item.Token}')">Edit</button>
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" style=" padding-left: 20px;padding-right: 20px;" onClick="ChangeStatus(this,'active${classRandom}','${item.Token}',${item.IsActive})">${item.IsActive ? 'Dectivate' : 'Activate'}</button>
                                 </div>
                               <div class="alert alert-icon alert-success alert-bg alert-inline show-code-action mt-2 d-none alert${classRandom}">
                                   <p style="margin:unset;">alert message.</p>
                                </div>
                            </td>
                        </tr>`);
        }

        $('.sub_categories_list').html(` <table class="shop-table wishlist-table">
                                            <thead>
                                                <tr>
                                                    <th class="product-name"><span>Sub Category</span></th>
                                                    <th class="product-name"><span>Price</span></th>
                                                    <th class="product-name"><span>Discount</span></th>
                                                    <th class="product-name"><span>Stock</span></th>
                                                    <th class="product-name"><span>Status</span></th>
                                                    <th class="product-name"></th>
                                                </tr>
                                            <tbody class="List">
                                            </tbody>
                                        </table>`);

        $('.List').prepend(items);
    }
}


function ChangeStatus(btn, classname, token, active) {
    $('.' + classname.replace('active', 'alert')).addClass('d-none');
    $('.' + classname.replace('active', 'alert')).removeClass('d-flex');

    if (active) {
        btn.textContent = "Activate";
        btn.setAttribute("onclick", "ChangeStatus(this,'" + classname + "','" + token + "', false);");
        $('.' + classname).html('In Active')
        $('.' + classname).addClass('text-danger');
    }
    else {
        btn.textContent = "Deactivate";
        btn.setAttribute("onclick", "ChangeStatus(this,'" + classname + "','" + token + "', true);");
        $('.' + classname).removeClass('text-danger');
        $('.' + classname).html('Is Active');
    }

    var fdata = new FormData();

    fdata.append('token', token.toString());
    fdata.append('user_token', userId.trim());
    fdata.append('status', (!active).toString());

    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/chnage_product_activation_status',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            $('.' + classname.replace('active', 'alert')).removeClass('d-none');
            $('.' + classname.replace('active', 'alert')).addClass('d-flex');
            $('.alert' + classname.replace('active', '') + ' p').html('The product has been ' + (active ? 'deactivated.' : 'activated.'));
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function EditSub_Category(token) {
    
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    var fdata = new FormData();
    fdata.append('token', token);
    fdata.append('auth_token', ""); $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/get_admin_product_details',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.length > 0) {
                let product = JSON.parse(data);
                $('.edit-sub-category-by-token').attr('onclick', `EditProductSubCategories('${product.Token}');`)
                BindEditProductSubCategory(product.CategoryId, product.SubCategoryId);
                if (product.Details.length > 0) {
                    if (product.Details[0].DescriptionEn != null && product.Details[0].DescriptionEn.trim() != '') {
                        let initialContent = Editsubcategorydetails.clipboard.convert(product.Details[0].DescriptionEn);
                        Editsubcategorydetails.setContents(initialContent, 'silent');
                    }
                    if (product.Details[0].DescriptionAr != null && product.Details[0].DescriptionAr.trim() != '') {
                        let initialContent2 = Editsubcategorydetails2.clipboard.convert(product.Details[0].DescriptionAr);
                        Editsubcategorydetails2.setContents(initialContent2, 'silent');

                        $("#EditsubcategorydetailsAr p").addClass("ql-align-right ql-direction-rtl");
                    }
                }

                if (product.Prices[0] != null && product.Prices[0].Id > 0) {
                    document.getElementById('txtEditSubCategoryUsd').value = product.Prices[0].Usd.toString().trim();
                }

                if (product.Stocks[0] != null && product.Stocks[0].Id > 0) {
                    document.getElementById('txtEditSubCategoryStock').value = product.Stocks[0].Amount.toString().trim();
                }

                if (product.Discount != null && product.Discount > 0) {
                    document.getElementById('txtEditSubCategoryDiscount').value = product.Discount.toString().trim();
                }
            }

            $('.edit-subCategory').click();
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}
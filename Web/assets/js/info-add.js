$('.nav-item-custom').remove();
$('.tab-pane-custom').remove();

CategoriesList();
GetBrandsList();

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

function FillBrands(data) {
    if (data.length > 0) {
        let index = 0;
        let items = [];
        items.push(`<option value="-1" selected>Brand</option>`);
        for (index; index < data.length; index++) {
            let item = data[index];
            items.push(`<option value="${item.Id}">${item.NameEn}</option>`);
        }
        $('#Brands-list').prepend(items);
    }
}

function CategoriesList() {
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
    fdata.append('auth_token', "");  $.ajax({
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
    if (data.length > 0) {
        let index = 0;
        let items = [];
        items.push(`<option value="-1" selected>Sub Category</option>`);
        for (index; index < data.length; index++) {
            let item = data[index];
            items.push(`<option value="${item.Id}">${item.NameEn}</option>`);
        }

        $('#sub-category-list').prepend(items);
    }
    else {
        $('#sub-category-list').prepend(`<option value="-1" selected>Sub Category</option>`);
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
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();

        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtProductNameEn.value.trim());
        fdata.append('name_ar', txtProductNameAr.value.trim());
        fdata.append('category', $('#category-list').find(":selected").val());
        fdata.append('sub_category', $('#sub-category-list').find(":selected").val());
        fdata.append('brand', $('#Brands-list').find(":selected").val());
        var IsNewArrival = $("#IsNewArrival")[0].checked;
        fdata.append('new_arrival', IsNewArrival ? 1 : 0);

        fdata.append('auth_token', "");  $.ajax({
            cache: false,
            data: fdata,
            url: '/api/products.asmx/save_product_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                RedirectEditMode(data);
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

function RedirectEditMode(data) {
    window.location = "/admin/product/info.aspx?token=" + data.Token + "&name=" + data.NameEn.trim();
}
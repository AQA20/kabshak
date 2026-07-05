GetAllCategoriesList();

function GetAllCategoriesList() {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    var fdata = new FormData();
    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/all_categories',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillCategories(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function FillCategories(data) {
    var categories = JSON.parse(data);
    $('.productsList').html(' ');
    if (categories.length > 0) {
        let index = 0;
        let items = [];

        for (index; index < categories.length; index++) {
            let item = categories[index];

            let classRandom = (Math.random() + 1).toString(36).substring(7);

            var _date = new Date(item.CreatedOnDate.toString());
            var dd = String(_date.getDate()).padStart(2, '0');
            var mm = String(_date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = _date.getFullYear();
            _date = dd + '/' + mm + '/' + yyyy;

            items.push(`<tr class="RemoveRecord_14">
                            <td class="product-name">
                                <div class="product-cat">
                                    <ins class="new-price">Id: ${item.Id}</ins>
                                </div>
                                <div class="product-cat" style="color: #593930;">
                                    <ins class="new-price">Name: ${item.NameEn}</ins>
                                </div>
                            </td>
                            <td class="product-price">
                                <ins class="new-price active${classRandom} ${item.IsActive ? '' : 'text-danger'}">${item.IsActive ? 'Is Active' : 'In Active'}</ins>
                            </td>
                            <td class="product-stock-status">
                                <span class="wishlist-in-stock">${_date}</span>
                            </td>
                            <td class="wishlist-action">
                                <div class="d-lg-flex justify-content-between">
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" onClick="EditCategoryInfo(${item.Id},'${item.NameEn}','${item.NameAr}','${item.Url}');">Edit</button>
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" style=" padding-left: 20px;padding-right: 20px;" onClick="ChangeCategoryStatus(this,'active${classRandom}',${item.Id},${item.IsActive})">${item.IsActive ? 'Dectivate' : 'Activate'}</button>
                                       <a href="/admin/sub-categories?id=${item.Id}&name=${item.NameEn}" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0">Sub Categories</a>
                                    </div>
                                <div class="alert alert-icon alert-success alert-bg alert-inline show-code-action mt-2 d-none alert${classRandom}">
                                   <p style="margin:unset;">alert message.</p>
                                </div>
                            </td>
                        </tr>`);
        }

        $('.result').html(` <table class="shop-table wishlist-table">
                                            <thead>
                                                <tr>
                                                    <th class="product-name"><span>Item Info</span></th>
                                                    <th class="product-price" style="text-align: unset;"><span>Status</span></th>
                                                    <th class="product-stock-status" style="text-align: unset;"><span>Date</span></th>
                                                    <th class="wishlist-action">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody class="productsList">
                                            </tbody>
                                        </table>`);

        $('.productsList').prepend(items);
    }
    else {
        $('.result').html('<div style="font-weight: 500;color: #593930;padding: 5px;font-size: 20px;padding-bottom: 350px;"><span class="w-icon-search-plus" style="padding-right: 5px;padding-left: 5px;"></span>No result found!</div>');
    }
    setTimeout(
        function () {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }, 1000);
}

function ChangeCategoryStatus(btn, classname, id, active) {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    $('.' + classname.replace('active', 'alert')).addClass('d-none');
    $('.' + classname.replace('active', 'alert')).removeClass('d-flex');

    if (active) {
        btn.textContent = "Activate";
        btn.setAttribute("onclick", "ChangeCategoryStatus(this,'" + classname + "'," + id + ", false);");
        $('.' + classname).html('In Active')
        $('.' + classname).addClass('text-danger');
    }
    else {
        btn.textContent = "Deactivate";
        btn.setAttribute("onclick", "ChangeCategoryStatus(this,'" + classname + "'," + id + ", true);");
        $('.' + classname).removeClass('text-danger');
        $('.' + classname).html('Is Active');
    }

    var fdata = new FormData();

    fdata.append('id', id.toString());
    fdata.append('user_token', userId.trim());
    fdata.append('status', (!active).toString());

    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/chnage_category_activation_status',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            $('.' + classname.replace('active', 'alert')).removeClass('d-none');
            $('.' + classname.replace('active', 'alert')).addClass('d-flex');
            $('.alert' + classname.replace('active', '') + ' p').html('The category has been ' + (active ? 'deactivated.' : 'activated.'));
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });

    setTimeout(
        function () {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }, 1000);
}

function SaveCategoryInfo() {
    var val = true;

    var txtCategoryNameEn = document.getElementById('txtCategoryNameEn');
    var txtCategoryNameAr = document.getElementById('txtCategoryNameAr');

    if (txtCategoryNameEn.value.trim() === "") {
        val = false;
        txtCategoryNameEn.style.background = "#fff9b3";
    }
    else {
        txtCategoryNameEn.style.background = "#ffffff";
    }

    if (txtCategoryNameAr.value.trim() === "") {
        val = false;
        txtCategoryNameAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtCategoryNameAr.value.trim())) {
            txtCategoryNameAr.style.background = "#ffffff";
        } else {
            val = false;
            txtCategoryNameAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();

        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtCategoryNameEn.value.trim());
        fdata.append('name_ar', txtCategoryNameAr.value.trim());

        var image_name = getRndInteger(100000, 1000000);
        var img = $('#upImage');
        if (img[0].files.length > 0) {
            fdata.append('image_name', image_name);
            fdata.append('file', img[0].files[0]);
        }
        else {
            fdata.append('image_name', '');
            fdata.append('file', null);
        }

        fdata.append('auth_token', "");  $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/add_category_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllCategoriesList();
                $('#lnkCategoriesList').click();
                ClearAddCategoryData();
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

function ClearAddCategoryData() {
    var txtCategoryNameEn = document.getElementById('txtCategoryNameEn');
    var txtCategoryNameAr = document.getElementById('txtCategoryNameAr');

    txtCategoryNameEn.value = '';
    txtCategoryNameAr.value = '';

    $("#lblUploadLogoError").addClass('d-none');
    $(".logoImg").addClass('d-none');
    $(".logoImg").attr("src", "#");
    $('#upImage').val('');
}


function EditCategoryInfo(id, en, ar, Url) {
    $('#lnkEditCategory').click();

    var txtEditCategoryNameEn = document.getElementById('txtEditCategoryNameEn');
    var txtEditCategoryNameAr = document.getElementById('txtEditCategoryNameAr');

    txtEditCategoryNameEn.value = en.trim();
    txtEditCategoryNameAr.value = ar.trim();

    $('.EditCategoryInfo').attr('onclick', "EditCategoryInfoById(" + id + ");");

    if (Url != null && Url.trim() != '' && Url != "null") {
        $(".logoImg2").removeClass('d-none');
        $(".logoImg2").attr("src", "/" + Url);
    }

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

function EditCategoryInfoById(id) {
    var val = true;

    var txtCategoryNameEn = document.getElementById('txtEditCategoryNameEn');
    var txtCategoryNameAr = document.getElementById('txtEditCategoryNameAr');

    if (txtCategoryNameEn.value.trim() === "") {
        val = false;
        txtCategoryNameEn.style.background = "#fff9b3";
    }
    else {
        txtCategoryNameEn.style.background = "#ffffff";
    }

    if (txtCategoryNameAr.value.trim() === "") {
        val = false;
        txtCategoryNameAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtCategoryNameAr.value.trim())) {
            txtCategoryNameAr.style.background = "#ffffff";
        } else {
            val = false;
            txtCategoryNameAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();

        fdata.append('id', id);
        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtCategoryNameEn.value.trim());
        fdata.append('name_ar', txtCategoryNameAr.value.trim());

        var image_name = getRndInteger(100000, 1000000);
        var img = $('#upEditImage2');
        if (img[0].files.length > 0) {
            fdata.append('image_name', image_name);
            fdata.append('file', img[0].files[0]);
        }
        else {
            fdata.append('image_name', '');
            fdata.append('file', null);
        }


        fdata.append('auth_token', "");  $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/edit_category_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllCategoriesList();
                $('#lnkCategoriesList').click();
                ClearEditCategoryData();
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

function ClearEditCategoryData() {
    var txtCategoryNameEn = document.getElementById('txtEditCategoryNameEn');
    var txtCategoryNameAr = document.getElementById('txtEditCategoryNameAr');

    txtCategoryNameEn.value = '';
    txtCategoryNameAr.value = '';

    $("#lblUploadEditLogoError2").addClass('d-none');
    $(".logoImg2").addClass('d-none');
    $(".logoImg2").attr("src", "#");
    $('#upEditImage2').val('');

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
        }
    }
}

upEditImage2.onchange = evt => {
    if (!upEditImage2.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
        $(".logoImg2").addClass('d-none');
        $(".logoImg2").attr("src", "#");
        $("#lblUploadEditLogoError2").removeClass('d-none');
        $('#upEditImage2').val('');
    }
    else {
        const [file] = upEditImage2.files
        if (file) {
            $("#lblUploadEditLogoError2").addClass('d-none');
            $(".logoImg2").removeClass('d-none');
            $(".logoImg2").attr("src", URL.createObjectURL(file));
        }
    }
}

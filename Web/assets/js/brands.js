var quill = new Quill('#editorEn', {
    theme: 'snow'
});

var quill2 = new Quill('#editorAr', {
    theme: 'snow'
});

var Editquill = new Quill('#EditeditorEn', {
    theme: 'snow'
});

var Editquill2 = new Quill('#EditeditorAr', {
    theme: 'snow'
});

$("#editorAr p").addClass("ql-align-right ql-direction-rtl");

GetAllBrandsList();

function GetAllBrandsList() {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    var fdata = new FormData();
    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/all_brands',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillBrands(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function FillBrands(data) {
    $('.productsList').html(' ');
    if (data.length > 0) {
        let index = 0;
        let items = [];

        for (index; index < data.length; index++) {
            let item = data[index];

            let classRandom = (Math.random() + 1).toString(36).substring(7);

            var _date = new Date(item.CreatedOnDate.toString());
            var dd = String(_date.getDate()).padStart(2, '0');
            var mm = String(_date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = _date.getFullYear();
            _date = dd + '/' + mm + '/' + yyyy;

            items.push(`<tr class="RemoveRecord_14">
                            <td class="product-thumbnail">
                                <div class="p-relative">
                                    <a href="#" onclick="voidclick(); return false">
                                        <figure>
                                            <img src="/${item.Url.trim() == '' ? 'assets/images/logo.png' : item.Url}" alt="product" width="300" height="338" style="border: solid 1px #eee;">
                                        </figure>
                                    </a>
                                </div>
                            </td>
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
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" onClick="EditBrandInfo(${item.Id});">Edit</button>
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" style=" padding-left: 20px;padding-right: 20px;" onClick="ChangeBrandStatus(this,'active${classRandom}',${item.Id},${item.IsActive})">${item.IsActive ? 'Dectivate' : 'Activate'}</button>
                                </div>
                                <div class="alert alert-icon alert-success alert-bg alert-inline show-code-action mt-2 d-none alert${classRandom}">
                                   <p style="margin:unset;">alert message.</p>
                                </div>
                            </td>
                        </tr>`);
        }

        $('.result').html(`   <table class="shop-table wishlist-table">
                                            <thead>
                                                <tr>
                                                    <th class="product-name"><span>Item Info</span></th>
                                                    <th></th>
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

function ChangeBrandStatus(btn, classname, id, active) {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    $('.' + classname.replace('active', 'alert')).addClass('d-none');
    $('.' + classname.replace('active', 'alert')).removeClass('d-flex');

    if (active) {
        btn.textContent = "Activate";
        btn.setAttribute("onclick", "ChangeBrandStatus(this,'" + classname + "'," + id + ", false);");
        $('.' + classname).html('In Active')
        $('.' + classname).addClass('text-danger');
    }
    else {
        btn.textContent = "Deactivate";
        btn.setAttribute("onclick", "ChangeBrandStatus(this,'" + classname + "'," + id + ", true);");
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
        url: '/api/main.asmx/chnage_brand_activation_status',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            $('.' + classname.replace('active', 'alert')).removeClass('d-none');
            $('.' + classname.replace('active', 'alert')).addClass('d-flex');
            $('.alert' + classname.replace('active', '') + ' p').html('The brand has been ' + (active ? 'deactivated.' : 'activated.'));
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

function SaveBrandInfo() {
    var val = true;

    var txtBrandNameEn = document.getElementById('txtBrandNameEn');
    var txtBrandNameAr = document.getElementById('txtBrandNameAr');

    if (txtBrandNameEn.value.trim() === "") {
        val = false;
        txtBrandNameEn.style.background = "#fff9b3";
    }
    else {
        txtBrandNameEn.style.background = "#ffffff";
    }

    if (txtBrandNameAr.value.trim() === "") {
        val = false;
        txtBrandNameAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtBrandNameAr.value.trim())) {
            txtBrandNameAr.style.background = "#ffffff";
        } else {
            val = false;
            txtBrandNameAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var editor_content_en = quill.container.innerHTML
        var editor_content_ar = quill2.container.innerHTML


        var fdata = new FormData();

        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtBrandNameEn.value.trim());
        fdata.append('name_ar', txtBrandNameAr.value.trim());
        fdata.append('description_en', editor_content_en.trim());
        fdata.append('description_ar', editor_content_ar.trim());

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
            url: '/api/main.asmx/add_brand_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllBrandsList();
                $('#lnkBrandsList').click();
                ClearAddBrandData();
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

function ClearAddBrandData() {
    var txtBrandNameEn = document.getElementById('txtBrandNameEn');
    var txtBrandNameAr = document.getElementById('txtBrandNameAr');

    txtBrandNameEn.value = '';
    txtBrandNameAr.value = '';

    quill.setContents([{ insert: '\n' }]);
    quill2.setContents([{ insert: '\n' }]);

    $("#lblUploadLogoError").addClass('d-none');
    $(".logoImg").addClass('d-none');
    $(".logoImg").attr("src", "#");
    $('#upImage').val('');
}

function ClearEditBrandData() {
    var txtBrandNameEn = document.getElementById('txtEditBrandNameEn');
    var txtBrandNameAr = document.getElementById('txtEditBrandNameAr');

    txtBrandNameEn.value = '';
    txtBrandNameAr.value = '';

    Editquill.setContents([{ insert: '\n' }]);
    Editquill2.setContents([{ insert: '\n' }]);

    $("#lblUploadEditLogoError2").addClass('d-none');
    $(".logoImg2").addClass('d-none');
    $(".logoImg2").attr("src", "#");
    $('#upEditImage2').val('');

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
        }
    }
}

function EditBrandInfo(id) {
    $('#lnkEditBrand').click();

    var fdata = new FormData();
    fdata.append('id', id);

    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/get_brand',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FilllBrandInfo(data);
        }
    });

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

function FilllBrandInfo(data) {
    if (data.length > 0) {
        let index = 0;
        let item = [];
        for (index; index < data.length; index++) {
            item = data[index];
            break;
        }

        var txtBrandNameEn = document.getElementById('txtEditBrandNameEn');
        var txtBrandNameAr = document.getElementById('txtEditBrandNameAr');

        txtBrandNameEn.value = item.NameEn;
        txtBrandNameAr.value = item.NameAr;

        let initialContent = Editquill.clipboard.convert(item.DescriptionEn);
        Editquill.setContents(initialContent, 'silent');

        let initialContent2 = Editquill2.clipboard.convert(item.DescriptionAr);
        Editquill2.setContents(initialContent2, 'silent');

        $("#EditeditorAr p").addClass("ql-align-right ql-direction-rtl");

        if (item.Url != null && item.Url.trim() != '' && item.Url.trim() != "null") {
            $(".logoImg2").removeClass('d-none');
            $(".logoImg2").attr("src", "/" + item.Url);
        }

        $('.EditBrandInfo').attr('onclick', "EditBrandInfoById(" + item.Id + ");");
    }
    else {
        $('#lnkBrandsList').click();
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

function EditBrandInfoById(id) {
    var val = true;

    var txtBrandNameEn = document.getElementById('txtEditBrandNameEn');
    var txtBrandNameAr = document.getElementById('txtEditBrandNameAr');

    if (txtBrandNameEn.value.trim() === "") {
        val = false;
        txtBrandNameEn.style.background = "#fff9b3";
    }
    else {
        txtBrandNameEn.style.background = "#ffffff";
    }

    if (txtBrandNameAr.value.trim() === "") {
        val = false;
        txtBrandNameAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtBrandNameAr.value.trim())) {
            txtBrandNameAr.style.background = "#ffffff";
        } else {
            val = false;
            txtBrandNameAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var editor_content_en = Editquill.container.innerHTML
        var editor_content_ar = Editquill2.container.innerHTML


        var fdata = new FormData();

        fdata.append('id', id);
        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtBrandNameEn.value.trim());
        fdata.append('name_ar', txtBrandNameAr.value.trim());
        fdata.append('description_en', editor_content_en.trim());
        fdata.append('description_ar', editor_content_ar.trim());

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
            url: '/api/main.asmx/edit_brand_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllBrandsList();
                $('#lnkBrandsList').click();
                ClearEditBrandData();
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
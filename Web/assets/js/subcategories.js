const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
let CategoryId = params.id
let CategoryName = params.name
if (typeof CategoryId == 'undefined' || CategoryId == null || CategoryId == '') {
    window.location = "/Home";
}

if (typeof CategoryName !== 'undefined' && CategoryName !== null && CategoryName !== '') {

    $('.icon-box-title').html('Sub Categories (' + CategoryName + ')');
    $('.breadcrumb-name').html('Sub Categories (' + CategoryName + ')');
}

GetAllSubCategoriesList();

function GetAllSubCategoriesList() {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    var fdata = new FormData();
    fdata.append('category_id', CategoryId);
    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/main.asmx/all_sub_categories_by_id',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillSubCategories(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }
    });
}

function FillSubCategories(data) {
    var SubCategories = JSON.parse(data);
    $('.productsList').html(' ');
    if (SubCategories.length > 0) {
        let index = 0;
        let items = [];

        for (index; index < SubCategories.length; index++) {
            let item = SubCategories[index];

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
                                <div class="product-cat" style="color: #05D7A0;">
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
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" onClick="EditSubCategoryInfo(${item.Id},'${item.NameEn}','${item.NameAr}');">Edit</button>
                                    <button type="button" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0" style=" padding-left: 20px;padding-right: 20px;" onClick="ChangeSubCategoryStatus(this,'active${classRandom}',${item.Id},${item.IsActive})">${item.IsActive ? 'Dectivate' : 'Activate'}</button>
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
        $('.result').html('<div style="font-weight: 500;color: #05D7A0;padding: 5px;font-size: 20px;padding-bottom: 350px;"><span class="w-icon-search-plus" style="padding-right: 5px;padding-left: 5px;"></span>No result found!</div>');
    }
    setTimeout(
        function () {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }, 1000);
}

function ChangeSubCategoryStatus(btn, classname, id, active) {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');

    $('.' + classname.replace('active', 'alert')).addClass('d-none');
    $('.' + classname.replace('active', 'alert')).removeClass('d-flex');

    if (active) {
        btn.textContent = "Activate";
        btn.setAttribute("onclick", "ChangeSubCategoryStatus(this,'" + classname + "'," + id + ", false);");
        $('.' + classname).html('In Active')
        $('.' + classname).addClass('text-danger');
    }
    else {
        btn.textContent = "Deactivate";
        btn.setAttribute("onclick", "ChangeSubCategoryStatus(this,'" + classname + "'," + id + ", true);");
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
        url: '/api/main.asmx/chnage_sub_category_activation_status',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            $('.' + classname.replace('active', 'alert')).removeClass('d-none');
            $('.' + classname.replace('active', 'alert')).addClass('d-flex');
            $('.alert' + classname.replace('active', '') + ' p').html('The sub category has been ' + (active ? 'deactivated.' : 'activated.'));
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

function SaveSubCategoryInfo() {
    var val = true;

    var txtSubCategoryNameEn = document.getElementById('txtSubCategoryNameEn');
    var txtSubCategoryNameAr = document.getElementById('txtSubCategoryNameAr');

    if (txtSubCategoryNameEn.value.trim() === "") {
        val = false;
        txtSubCategoryNameEn.style.background = "#fff9b3";
    }
    else {
        txtSubCategoryNameEn.style.background = "#ffffff";
    }

    if (txtSubCategoryNameAr.value.trim() === "") {
        val = false;
        txtSubCategoryNameAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtSubCategoryNameAr.value.trim())) {
            txtSubCategoryNameAr.style.background = "#ffffff";
        } else {
            val = false;
            txtSubCategoryNameAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();

        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtSubCategoryNameEn.value.trim());
        fdata.append('name_ar', txtSubCategoryNameAr.value.trim());
        fdata.append('category_id', CategoryId);

        fdata.append('auth_token', "");  $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/add_sub_category_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllSubCategoriesList();
                $('#lnkCategoriesList').click();
                ClearAddSubCategoryData();
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

function ClearAddSubCategoryData() {
    var txtSubCategoryNameEn = document.getElementById('txtSubCategoryNameEn');
    var txtSubCategoryNameAr = document.getElementById('txtSubCategoryNameAr');

    txtSubCategoryNameEn.value = '';
    txtSubCategoryNameAr.value = '';
}


function EditSubCategoryInfo(id, en, ar) {
    $('#lnkEditCategory').click();

    var txtEditSubCategoryNameEn = document.getElementById('txtEditSubCategoryNameEn');
    var txtEditSubCategoryNameAr = document.getElementById('txtEditSubCategoryNameAr');

    txtEditSubCategoryNameEn.value = en.trim();
    txtEditSubCategoryNameAr.value = ar.trim();

    $('.EditSubCategoryInfo').attr('onclick', "EditSubCategoryInfoById(" + id + ");");

    $('body , html').animate({
        scrollTop: $('.page-wrapper').offset().top
    }, 300)
}

function EditSubCategoryInfoById(id) {
    var val = true;

    var txtSubCategoryNameEn = document.getElementById('txtEditSubCategoryNameEn');
    var txtSubCategoryNameAr = document.getElementById('txtEditSubCategoryNameAr');

    if (txtSubCategoryNameEn.value.trim() === "") {
        val = false;
        txtSubCategoryNameEn.style.background = "#fff9b3";
    }
    else {
        txtSubCategoryNameEn.style.background = "#ffffff";
    }

    if (txtSubCategoryNameAr.value.trim() === "") {
        val = false;
        txtSubCategoryNameAr.style.background = "#fff9b3";
    }
    else {
        var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
        if (isArabic.test(txtSubCategoryNameAr.value.trim())) {
            txtSubCategoryNameAr.style.background = "#ffffff";
        } else {
            val = false;
            txtSubCategoryNameAr.style.background = "#fff9b3";
        }
    }

    if (val) {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();

        fdata.append('id', id);
        fdata.append('user_token', userId.trim());
        fdata.append('name_en', txtSubCategoryNameEn.value.trim());
        fdata.append('name_ar', txtSubCategoryNameAr.value.trim());


        fdata.append('auth_token', "");  $.ajax({
            cache: false,
            data: fdata,
            url: '/api/main.asmx/edit_sub_category_info',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                GetAllSubCategoriesList();
                $('#lnkCategoriesList').click();
                ClearEditSubCategoryData();
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

function ClearEditSubCategoryData() {
    var txtSubCategoryNameEn = document.getElementById('txtEditSubCategoryNameEn');
    var txtSubCategoryNameAr = document.getElementById('txtEditSubCategoryNameAr');

    txtSubCategoryNameEn.value = '';
    txtSubCategoryNameAr.value = '';
}

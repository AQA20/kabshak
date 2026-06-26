setCookie('NavigationURL', (IsArabic ? "ar/wishlist.aspx" : "wishlist.aspx"), 30);

BindWishList();

function BindWishList() {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');
    var fdata = new FormData();
    fdata.append('user_token', (userId ? decodeURIComponent(userId) : "-1").toString());
    fdata.append('auth_token', "");  $.ajax({
        cache: false,
        data: fdata,
        url: '/api/products.asmx/get_wishlist',
        type: 'post',
        processData: false,
        contentType: false,
        success: function (data) {
            FillWishListData(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
           
            
        }
    });
}

function FillWishListData(data) {
    if (data.length > 0) {
        let index = 0;
        let items = [];
        for (index; index < data.length; index++) {
            let item = data[index];
            let productURL = (IsArabic ? '/ar/' : '/') + "shop/product/" + FixProductName(item.NameEn.trim().toLowerCase()) + "/" + item.Token;
            items.push(` <tr class="RemoveRecord_${index}">
                            <td class="product-thumbnail">
                                <div class="p-relative">
                                    <a href="#" onclick="voidclick(); return false">
                                        <figure>
                                            <img src="/${item.ImageUrl}" alt="product" width="300" height="338" style="border: solid 1px #eee;">
                                        </figure>
                                    </a>
                                    <button type="button" class="btn btn-close" onclick="return RemoveWishsItems(this,'${item.Token}','RemoveRecord_${index}');"><i class="fas fa-times"></i></button>
                                </div>
                            </td>
                            <td class="product-name">
                                <a href="${productURL}">${IsArabic ? item.NameAr : item.NameEn}
                                </a>
                                <div class="product-cat">
                                        <a href="#" onclick="voidclick(); return false">${IsArabic ? item.CategoryNameAr : item.CategoryNameEn}, ${IsArabic ? item.SubCategoryNameAr : item.SubCategoryNameEn}</a>
                                </div>
                                <div class="product-cat"  style="color: #05D7A0;">
                                        <a href="#" onclick="voidclick(); return false">${IsArabic ? item.BrandNameAr : item.BrandNameEn}</a>
                                </div>
                            </td>
                            <td class="product-price">
                                <ins class="new-price">${currency.toLocaleUpperCase() == "USD" ? item.Usd : item.Kwd} ${currency.toLocaleUpperCase()}</ins>
                            </td>
                            <td class="product-stock-status">
                                <span class="wishlist-in-stock">${(item.Amount <= 0) ? IsArabic ? 'نفد المخزون' : 'Out Stock' : IsArabic ? 'في المخزن' : 'In Stock'}</span >
                            </td>
                            <td class="wishlist-action">
                                <div class="d-lg-flex justify-content-center">
                                    <a href="${productURL}" class="btn btn-quickview btn-outline btn-default btn-rounded btn-sm mb-2 mb-lg-0">${IsArabic ? 'مشاهدة سريعة' : 'Quick View'}</a>
                                </div>
                            </td>
                        </tr>`);
        }
        $('.productsList').html(items);
        $('.Records').html(data.length.toString());
    }
    else {
        $('.wishlist-table').html('<div style="font-weight: 500;color: #05D7A0;padding: 5px;font-size: 20px;"><span class="w-icon-search-plus" style="padding-right: 5px;padding-left: 5px;"></span>No result found!</div>');
        $('.toolbox-pagination').html(' ');
    }

    setTimeout(
        function () {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }, 1000);
}

function RemoveWishsItems(e, token, classname) {
    if (userId != "-1") {
        document.getElementById("divloader").classList.add('d-flex');
        document.getElementById("divloader").classList.remove('d-none');

        var fdata = new FormData();
        fdata.append('product_token', token);
        fdata.append('user_token', userId);
        fdata.append('auth_token', "");  $.ajax({
            cache: false,
            data: fdata,
            url: '/api/products.asmx/add_to_wishlist',
            type: 'post',
            processData: false,
            contentType: false,
            success: function (data) {
                console.log("Add this product to wishlist");
                $('.' + classname).remove();
                var NoOfRecords = $('.Records').html();
                if ((parseInt(NoOfRecords) - 1) > 0)
                    $('.Records').html((parseInt(NoOfRecords) - 1).toString())
                else {
                    $('.wishlist-table').html('<div style="font-weight: 500;color: #05D7A0;padding: 5px;font-size: 20px;"><span class="w-icon-search-plus" style="padding-right: 5px;padding-left: 5px;"></span>No result found!</div>');
                    $('.toolbox-pagination').html(' ');
                }

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
}
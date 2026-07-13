
$(document).ready(function () {
    /* BindHomePageLists();*/
});

$('.product-wrapper-1').addClass('d-none');

CheckSouldOutProducts();

function BindHomePageLists() {
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
            FillHomePageListData(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {


        }
    });
}

function FillHomePageListData(data) {
    if (data.length > 0) {
        let index = 0;
        let items = [];
        for (index; index < data.length; index++) {
            let item = data[index];
            let productURL = (IsArabic ? "/ar/" : "/") + "shop/product/" + FixProductName(item.NameEn.trim().toLowerCase()) + "/" + item.Token;
            items.push(`
                        <div class="swiper-slide post text-center overlay-zoom">
                                <figure class="post-media br-sm">
                                    <div class="${item.Discount <= 0 ? "d-none" : "product-label-group"}">
                                        <label class="product-label label-discount">${item.Discount}% ${IsArabic ? "خصم" : "OFF"}</label>
                                        </div>
                                    <a href="${productURL}">
                                        <img src="${item.Url}" alt="Post"  style="background-color: #4b6e91;width=280px;height=180px" />
                                    </a>
                                </figure>
                                <div class="post-details">
                                    <div class="post-meta">
                                        ${IsArabic ? item.BrandNameAr : item.BrandNameEn}
                                    </div>
                                    <h4 class="post-title"><a href="${productURL}"">${IsArabic ? item.NameAr : item.NameEn}</a>
                                    </h4>
                                    <a href="${productURL}" class="btn btn-link btn-dark btn-underline">${Math.ceil(item.Usd * rate_value)} ${rate_code}</i></a>
                                </div>
                            </div>`);
        }

        $('.RecentlyAdded').html(items);
    }
}

function GoToShopPage() {
    document.getElementById("divloader").classList.add('d-flex');
    document.getElementById("divloader").classList.remove('d-none');
    window.location.href = IsArabic ? "/ar/shop" : "/shop";

    setTimeout(
        function () {
            document.getElementById("divloader").classList.add('d-none');
            document.getElementById("divloader").classList.remove('d-flex');
        }, 2000);
}
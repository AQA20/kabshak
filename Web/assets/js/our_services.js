document.getElementById("divloader").classList.add('d-flex');
document.getElementById("divloader").classList.remove('d-none');

var fdata = new FormData();
fdata.append('auth_token', "");
$.ajax({
    cache: false,
    data: fdata,
    url: '/api/main.asmx/our_service',
    type: 'post',
    processData: false,
    contentType: false,
    success: function (data) {
        let index = 0;
        let items = [];
        for (index; index < data.length; index++) {
            let item = data[index];
            items.push(`
                <div class="col-lg-6 mb-1">
                    <div class="tab tab-nav-boxed tab-nav-underline show-code-action">
                        <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" href="#tab-${item.Id}">${IsArabic ? item.TitleAr : item.TitleEn}</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="tab-${item.Id}">
                                <p>
                                    ${IsArabic ? item.DescriptionAr : item.DescriptionEn}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        }
        $('.services-list').html(items);

        setTimeout(
            function () {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');
            }, 1000);
    }
});

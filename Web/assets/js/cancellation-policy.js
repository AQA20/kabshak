document.getElementById("divloader").classList.add('d-flex');
document.getElementById("divloader").classList.remove('d-none');

var fdata = new FormData();
fdata.append('auth_token', "");
$.ajax({
    cache: false,
    data: fdata,
    url: '/api/main.asmx/cancellation_policy',
    type: 'post',
    processData: false,
    contentType: false,
    success: function (data) {
        let index = 0;
        let items = [];
        for (index; index < data.length; index++) {
            let item = data[index];
            items.push(`
                <div class="col-md-12 mb-8">
                        <div class="accordion accordion-bg accordion-gutter-md accordion-border">
                            <div class="card">
                                <div class="card-header">
                                    <a href="#collapse1-${item.Id}" class="collapse"> ${IsArabic ? item.TitleAr : item.TitleEn}</a>
                                </div>
                                <div id="collapse1-${item.Id}" class="card-body expanded" style="display: block;">
                                    <p class="mb-0">
                                        ${IsArabic ? item.DescriptionAr : item.DescriptionEn}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                `)
        }
        $('.cancellation-policy-section .items').html(items);

        setTimeout(
            function () {
                document.getElementById("divloader").classList.add('d-none');
                document.getElementById("divloader").classList.remove('d-flex');
            }, 1000);
    }
});

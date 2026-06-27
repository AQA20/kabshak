<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="ar.aspx.cs" Inherits="web.ar" %>

<asp:Content ID="Content3" ContentPlaceHolderID="headCss" runat="server">
    <link rel="stylesheet" type="text/css" href="/assets/vendor/animate/animate.min.css">
    <link rel="stylesheet" href="/assets/vendor/swiper/swiper-bundle.min.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/style-rtl.min.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/demo1-rtl.min.css">
    <style>
        .header-call {
            margin-left: 4.8rem !important;
            margin-right: 0 !important;
        }
        .header-call::after {
            left: -2.5rem !important;
            right: auto !important;
        }
        @media (min-width: 768px) {
            .category-banner {
                width: 50% !important;
            }
        }

        @media (max-width: 575px) {
            .category-banner-wrapper2 .banner-content {
                width: 65% !important;
                right: 15px !important;
                left: auto !important;
                text-align: right !important;
            }
            .category-banner-wrapper2 .banner-title {
                font-size: 2.15rem !important;
                line-height: 1.2 !important;
                margin-bottom: 4px !important;
            }
            .category-banner-wrapper2 .banner-price-info {
                font-size: 1.3rem !important;
                line-height: 1.3 !important;
                margin-bottom: 8px !important;
            }
            .category-banner-wrapper2 .banner-content .btn {
                padding: 9px 25px !important;
                font-size: 1.1rem !important;
                line-height: 1.2 !important;
            }
        }

        .category-banner-3cols .text-center .banner-title {
            margin-bottom: unset;
        }

        .footer-newsletter {
            max-width: unset;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main class="main">
        <div class="container-fluid mt-5">
            <div class="category-banner-wrapper2 row cols-md-2 appear-animate fadeIn appear-animation-visible" style="animation-duration: 1.2s;">
                <div class="banner banner-1 banner-fixed br-sm mb-4" style="padding: 1px;">
                    <figure class="banner-media br-sm">
                        <img src="/assets/images/donate-rtl.png" alt="Category Banner" width="880" height="300" style="background-color: #31343B;">
                    </figure>
                    <div class="banner-content y-50">
                        <h3 class="banner-title text-white ls-25" style="text-shadow: 2px 1px 1px #000000;">تبرع الأن</h3>
                        <h5 class="banner-price-info text-white font-weight-normal ls-25">للجمعيات
والأسر العفيفة والمحتاجة</h5>
                        <a href="donate-shop.aspx" class="btn btn-white btn-rounded btn-icon-right">تبرع الأن<i class="w-icon-long-arrow-right"></i>
                        </a>
                    </div>
                </div>
                <div class="banner banner-2 banner-fixed br-sm mb-4" style="padding: 1px;">
                    <figure class="banner-media br-sm">
                        <img src="/assets/images/ship-rtl.png" alt="Category Banner" width="880" height="300" style="background-color: #DEDEDE;">
                    </figure>
                    <div class="banner-content y-50">
                        <h3 class="banner-title text-white ls-25" style="text-shadow: 2px 1px 1px #000000;">خروفك لباب بيتك
                        </h3>
                        <h5 class="banner-price-info font-weight-normal ls-25">الشحن الى جميع مناطق المملكة</h5>
                        <a href="shipping-shop.aspx" class="btn btn-dark btn-rounded btn-icon-right">أطلب الأن<i class="w-icon-long-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="soldoutalert container d-none">
            <div class="row">
                <div class="col-md-12 mb-4">
                    <div class="alert-error alert-bg alert-button alert-block show-code-action">
                        <h4 class="alert-title">نفذ المخزون! </h4>
                        <p style="max-width: unset;">
                            نأمل أن تجدك هذه الرسالة في حالة جيدة. أردنا إبلاغك أن منتجاتنا قد نفذت حاليًا. ونحن نعتذر عن أي إزعاج قد يسببه هذا الأمر.
                                         <br>
                            نظرًا لشعبيتها الهائلة وارتفاع الطلب عليها ، فقد شهدنا زيادة غير متوقعة في المبيعات ، مما أدى إلى استنفاد مخزوننا الحالي. يعمل فريقنا بجد لإعادة تخزين المنتج في أسرع وقت ممكن ، ونتوقع توفره مرة أخرى في المستقبل القريب.
                        <br />
                            إذا كانت لديك أي أسئلة أو استفسارات أو كنت بحاجة إلى مزيد من المساعدة ، فيرجى عدم التردد في التواصل مع فريق دعم العملاء لدينا. نحن هنا للمساعدة وتقديم أي معلومات إضافية قد تحتاجها.
                             <br />
                            <br />
                            شكرا لتفهمك ودعمك المستمر.
                        </p>
                        <a href="/ar/contact-us" class="btn btn-error btn-rounded">اتصل بنا </a>
                        <button class="btn btn-link btn-close" aria-label="button">
                            <i class="close-icon"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mt-5">
            <div class="swiper-container swiper-theme icon-box-wrapper br-sm bg-white" style="border: solid 1px #eee;" data-swiper-options="{
                    'loop': true,
                    'spaceBetween': 10,
                    'autoplay': false,
                    'autoplayTimeout': 4000,
                    'slidesPerView': 1,
                    'breakpoints': {
                        '576': {
                            'slidesPerView': 2
                        },
                        '768': {
                            'slidesPerView': 2
                        },
                        '992': {
                            'slidesPerView': 3
                        },
                        '1200': {
                            'slidesPerView': 4
                        }
                    }
                    }">
                <div class="swiper-wrapper row cols-md-4 cols-sm-3 cols-1">
                    <div class="swiper-slide icon-box icon-box-side text-dark">
                        <span class="icon-box-icon icon-shipping">
                            <i class="w-icon-truck"></i>
                        </span>
                        <div class="icon-box-content">
                            <h4 class="icon-box-title font-weight-bolder">الشحن</h4>
                            <p class="text-default">التسليم السريع في الوقت المحدد</p>
                        </div>
                    </div>
                    <div class="swiper-slide icon-box icon-box-side text-dark">
                        <span class="icon-box-icon icon-payment">
                            <i class="w-icon-bag"></i>
                        </span>
                        <div class="icon-box-content">
                            <h4 class="icon-box-title font-weight-bolder">الدفع الآمن</h4>
                            <p class="text-default">نحن نضمن لك الدفع الامن</p>
                        </div>
                    </div>
                    <div class="swiper-slide icon-box icon-box-side text-dark icon-box-money">
                        <span class="icon-box-icon icon-money">
                            <i class="w-icon-money"></i>
                        </span>
                        <div class="icon-box-content">
                            <h4 class="icon-box-title font-weight-bolder">ضمان استعادة الاموال</h4>
                            <p class="text-default">
                                وذلك حسب الشروط والاحكام
                            </p>
                        </div>
                    </div>
                    <div class="swiper-slide icon-box icon-box-side text-dark icon-box-chat">
                        <span class="icon-box-icon icon-chat">
                            <i class="w-icon-chat"></i>
                        </span>
                        <p class="text-default">
                            يمكنك الاتصال بنا ومراسلتنا يوميا من
                                <br>
                            الساعة الثامنة صباحا وحتى الساعة<br>
                            التاسعة مساء 
                        </p>
                    </div>
                </div>
            </div>
            <!-- End of Icon Box Wrapper -->
        </div>
        <div class="container mt-8">
            <section class="mb-10">
                <h2 class="title title-center mb-5">خيارات كبشك</h2>
                <div class="swiper-container shadow-swiper swiper-theme show-code-action swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events" data-swiper-options="{
                            'slidesPerView': 1,
                            'spaceBetween': 20,
                            'breakpoints': {
                                '576': {
                                    'slidesPerView': 2
                                },
                                '992': {
                                    'slidesPerView': 3
                                }
                            }
                        }">
                    <div class="swiper-wrapper row cols-lg-3 cols-sm-2 cols-1">
                        <div class="swiper-slide testimonial-wrap">
                            <div class="testimonial testimonial-centered testimonial-shadow">
                                <div class="testimonial-info">
                                    <figure class="testimonial-author-thumbnail">
                                        <img src="/assets/images/categories/898249.png" alt="Testimonial" width="100" height="100">
                                    </figure>
                                </div>
                                <cite>الفدية
                                </cite>
                                <blockquote>
                                    الفدية فريضة إسلامية على كلٍ من لم يستطع تعويض صيامه بعد رمضان وبها يبرئ المسلم أمام الله من إثم عدم صيام شهر رمضان. وتقدر قيمتها حسب اتفاق العلماء ب5 دولارات عن كل يوم .

                                </blockquote>
                            </div>
                        </div>
                        <div class="swiper-slide testimonial-wrap">
                            <div class="testimonial testimonial-centered testimonial-shadow">
                                <div class="testimonial-info">
                                    <figure class="testimonial-author-thumbnail">
                                        <img src="/assets/images/categories/871500.png" alt="Testimonial" width="100" height="100">
                                    </figure>
                                </div>
                                <cite>الاضحية
                                </cite>
                                <blockquote>
                                    هي إحدى شعائر الإسلام، التي يتقرب بها المسلمون إلى الله بتقديم ذبح من الأنعام وذلك في أول أيام عيد الأضحى حتى آخر أيام التشريق، وهي من الشعائر المشروعة والمجمع عليها.


                                </blockquote>
                            </div>
                        </div>
                        <div class="swiper-slide testimonial-wrap">
                            <div class="testimonial testimonial-centered testimonial-shadow">
                                <div class="testimonial-info">
                                    <figure class="testimonial-author-thumbnail">
                                        <img src="/assets/images/categories/567915.png" alt="Testimonial" width="100" height="100">
                                    </figure>
                                </div>
                                <cite>العقيقة
                                </cite>
                                <blockquote>
                                    هي الذبيحة التي تذبح عن المولود في اليوم السابع، وهي سنة مؤكدة في الإسلام ،وتكون شكراً لله على المولود، ذكَراً كان أو أنثى ، وهي شاتان مكافئتان عن الغلام، وشاة واحدة عن الأنثى .

                                </blockquote>
                            </div>
                        </div>
                        <div class="swiper-slide testimonial-wrap">
                            <div class="testimonial testimonial-centered testimonial-shadow">
                                <div class="testimonial-info">
                                    <figure class="testimonial-author-thumbnail">
                                        <img src="/assets/images/categories/240420.png" alt="Testimonial" width="100" height="100">
                                    </figure>
                                </div>
                                <cite>النذر
                                </cite>
                                <blockquote>
                                    هو إيجاب المكلف على نفسه شيئا لم يكن عليه، سواء كان منجّزا أو معلقا. ويُعَرَّف أيضًا بأنه: «التزام قربة غير لازمة في أصل الشرع بلفظٍ يُشعر بذلك مثل أن يقول المرء: لله عليَّ أن أذبح لله إذا شفى الله مريضي ونحو ذلك.

                                </blockquote>
                            </div>
                        </div>
                        <div class="swiper-slide testimonial-wrap">
                            <div class="testimonial testimonial-centered testimonial-shadow">
                                <div class="testimonial-info">
                                    <figure class="testimonial-author-thumbnail">
                                        <img src="/assets/images/categories/898249.png" alt="Testimonial" width="100" height="100">
                                    </figure>
                                </div>
                                <cite>الصدقة
                                </cite>
                                <blockquote>
                                    هي العطية للمحتاج على وجه التقرب إلى الخالق والمعبود ودفع البلاء , وللصدقة أثر كبير على كيان المجتمع حيث تعمل على بث روح التعاون والمؤاخاة بين أفراد المجتمع وتزيل الحسد بين الناس. والصَدقات أنواع كثيرة منها المال والعقار والثياب والطعام أو بناء المساجد التي تعدّ صدقة جارية، أو اضحية توزع على الفقراء والمساكين.

                                </blockquote>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets" style="display: none;"><span class="swiper-pagination-bullet swiper-pagination-bullet-active" tabindex="0" role="button" aria-label="Go to slide 1"></span></div>
                    <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                </div>
            </section>
        </div>
    </main>
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"></script>
    <script src="/assets/vendor/swiper/swiper-bundle.min.js"></script>
    <script src="/assets/js/home.js"></script>
</asp:Content>

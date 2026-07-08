<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="contact-us.aspx.cs" Inherits="web.AR.contact_us" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <link rel="stylesheet" href="/assets/vendor/swiper/swiper-bundle.min.css">
    <main class="main">
        <!-- Start of Breadcrumb -->
        <nav class="breadcrumb-nav mb-10 pb-1">
            <div class="container">
                <ul class="breadcrumb">
                    <li><a href="/home.aspx">الصفحه الرئيسيه</a></li>
                    <li>اتصل بنا</li>
                </ul>
            </div>
        </nav>
        <!-- End of Breadcrumb -->

        <!-- Start of PageContent -->
        <div class="page-content contact-us">
            <div class="container">
                <section class="content-title-section mb-10">
                    <h1 class="title title-center mb-3">اتصل بنا
                    </h1>
                    <p class="text-center">سنكون اكثر من سعداء لمساعدتك. يمكنك التواصل معنا من خلال النموذج أدناه أو أي من قنوات التواصل الاجتماعي الخاصة بنا.</p>
                </section>
                <!-- End of Contact Title Section -->

                <section class="contact-information-section mb-10">
                    <div class="swiper-container swiper-theme swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events" data-swiper-options="{
                            'spaceBetween': 20,
                            'slidesPerView': 1,
                            'breakpoints': {
                                '480': {
                                    'slidesPerView': 2
                                },
                                '768': {
                                    'slidesPerView': 3
                                },
                                '992': {
                                    'slidesPerView': 4
                                }
                            }
                        }">
                        <div class="swiper-wrapper " id="swiper-wrapper-78cdb5650577bd17" aria-live="polite">
                            <div class="swiper-slide icon-box text-center icon-box-primary swiper-slide-active" role="group" aria-label="1 / 4" style="width: 295px; margin-right: 20px;">
                                <span class="icon-box-icon icon-email">
                                    <i class="w-icon-envelop-closed"></i>
                                </span>
                                <div class="icon-box-content">
                                    <h4 class="icon-box-title">عنوان البريد الالكترونى</h4>
                                    <p>info@kabshak.com</p>
                                </div>
                            </div>
                            <div class="swiper-slide icon-box text-center icon-box-primary swiper-slide-next" role="group" aria-label="2 / 4" style="width: 295px; margin-right: 20px;">
                                <span class="icon-box-icon icon-headphone">
                                    <i class="w-icon-headphone"></i>
                                </span>
                                <div class="icon-box-content">
                                    <h4 class="icon-box-title">رقم الهاتف</h4>
                                    <p>7 9895 9933 (962)</p>
                                </div>
                            </div>
                            <div class="swiper-slide icon-box text-center icon-box-primary" role="group" aria-label="3 / 4" style="width: 295px; margin-right: 20px;">
                                <span class="icon-box-icon icon-map-marker">
                                    <i class="w-icon-map-marker"></i>
                                </span>
                                <div class="icon-box-content">
                                    <h4 class="icon-box-title">العنوان</h4>
                                    <p>
                                        عمان - الاردن, شارع الجاردنز
                                    </p>
                                </div>
                            </div>
                            <div class="swiper-slide icon-box text-center icon-box-primary" role="group" aria-label="4 / 4" style="width: 295px; margin-right: 20px;">
                                <span class="icon-box-icon icon-fax">
                                    <i class="w-icon-fax"></i>
                                </span>
                                <div class="icon-box-content">
                                    <h4 class="icon-box-title">P.O.Box</h4>
                                    <p>11141</p>
                                </div>
                            </div>
                        </div>
                        <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                    </div>
                </section>
                <!-- End of Contact Information section -->

                <hr class="divider mb-10 pb-1">

                <section class="contact-section">
                    <div class="row gutter-lg pb-3">
                        <div class="col-lg-6 mb-8">
                            <h4 class="title mb-3">اسأله متكررة من المستخدمين </h4>
                            <div class="accordion accordion-bg accordion-gutter-md accordion-border" id="contact-us-faqs-accordion">
                            </div>
                        </div>
                        <div class="col-lg-6 mb-8">
                            <h4 class="title mb-3">أرسل لنا رسالة </h4>
                            <div class="form contact-us-form" action="#" method="post">
                                <div class="form-group">
                                    <label for="username">اسمك </label>
                                    <input type="text" id="username" name="username" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="email_1">بريدك الإلكتروني </label>
                                    <input type="email" id="email_1" name="email_1" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="email_1">رقم هاتفك المحمول </label>
                                    <input type="number" id="mobile_1" name="mobile_1" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="message">رسالتك </label>
                                    <textarea id="message" name="message" cols="30" rows="5" class="form-control"> </textarea>
                                    <p id="lbl_contact_us_status"></p>
                                </div>
                                <button type="button" class="btn btn-dark btn-rounded" onclick="Send_Contact_Us_Message ();">أرسل الآن </button>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- End of Contact Section -->
            </div>
        </div>
        <!-- End of PageContent -->
    </main>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script src="/assets/vendor/swiper/swiper-bundle.min.js"></script>
    <script src="/assets/js/contact_us.js?v=1.1"></script>
</asp:Content>

<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="home.aspx.cs" Inherits="web.home" %>

<asp:Content ID="Content3" ContentPlaceHolderID="headCss" runat="server">
    <link rel="stylesheet" type="text/css" href="/assets/vendor/animate/animate.min.css">
    <link rel="stylesheet" href="/assets/vendor/swiper/swiper-bundle.min.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/demo1.min.css">
    <style>
        @media (min-width: 768px) {
            .category-banner {
                width: 50% !important;
            }
        }

        @media (max-width: 575px) {
            .category-banner-wrapper2 .banner-content {
                width: 65% !important;
                left: 15px !important;
                right: auto !important;
                text-align: left !important;
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
                        <img src="/assets/images/donate.png" alt="Category Banner" width="880" height="300" style="background-color: #31343B;">
                    </figure>
                    <div class="banner-content y-50">
                        <h3 class="banner-title text-white ls-25" style="text-shadow: 2px 1px 1px #000000;">Donate now <span class="text-primary">to</span></h3>
                        <h5 class="banner-price-info text-white font-weight-normal ls-25">charities and chaste and needy families</h5>
                        <a href="donate-shop.aspx" class="btn btn-white btn-rounded btn-icon-right">Donate Now<i class="w-icon-long-arrow-right"></i>
                        </a>
                    </div>
                </div>
                <div class="banner banner-2 banner-fixed br-sm mb-4" style="padding: 1px;">
                    <figure class="banner-media br-sm">
                        <img src="/assets/images/ship.png" alt="Category Banner" width="880" height="300" style="background-color: #DEDEDE;">
                    </figure>
                    <div class="banner-content y-50">
                        <h3 class="banner-title text-white ls-25" style="text-shadow: 2px 1px 1px #000000;">Your sheep to your door</h3>
                        <h5 class="banner-price-info font-weight-normal ls-25">Shipping to all regions of the Kingdom</h5>
                        <a href="shipping-shop.aspx" class="btn btn-dark btn-rounded btn-icon-right">Order Now<i class="w-icon-long-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="soldoutalert container d-none">
            <div class="row">
                <div class="col-md-12 mb-4">
                    <div class="alert alert-error alert-bg alert-button alert-block show-code-action">
                        <h4 class="alert-title">Sold Out!</h4>
                        <p style="max-width:unset;">
                            We hope this message finds you well. We wanted to inform you that our products are currently sold out. We sincerely apologize for any inconvenience this may cause.
                                        <br>
                            Due to its immense popularity and high demand, we experienced an unexpected surge in sales, resulting in the depletion of our current stock. Our team is working diligently to restock the product as soon as possible, and we anticipate having it available again in the near future.
                       <br />
                            If you have any questions, or concerns, or need further assistance, please don't hesitate to reach out to our customer support team. We are here to help and provide any additional information you may require.
                            <br />
                            <br />
                            Thank you for your understanding and continued support.
                        </p>
                        <a href="/contact-us" class="btn btn-error btn-rounded">Contact Us</a>
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
                            <h4 class="icon-box-title font-weight-bolder">Shipping</h4>
                            <p class="text-default">Express delivery on time</p>
                        </div>
                    </div>
                    <div class="swiper-slide icon-box icon-box-side text-dark">
                        <span class="icon-box-icon icon-payment">
                            <i class="w-icon-bag"></i>
                        </span>
                        <div class="icon-box-content">
                            <h4 class="icon-box-title font-weight-bolder">Secure Payment</h4>
                            <p class="text-default">We ensure secure payment</p>
                        </div>
                    </div>
                    <div class="swiper-slide icon-box icon-box-side text-dark icon-box-money">
                        <span class="icon-box-icon icon-money">
                            <i class="w-icon-money"></i>
                        </span>
                        <div class="icon-box-content">
                            <h4 class="icon-box-title font-weight-bolder">Money Back Guarantee</h4>
                            <p class="text-default">
                                According to the laws and
                                <br />
                                conditions that are stipulated
                            </p>
                        </div>
                    </div>
                    <div class="swiper-slide icon-box icon-box-side text-dark icon-box-chat">
                        <span class="icon-box-icon icon-chat">
                            <i class="w-icon-chat"></i>
                        </span>
                        <div class="icon-box-content">
                            <h4 class="icon-box-title font-weight-bolder">Customer Support</h4>
                            <p class="text-default">From 8:00 AM till 9:00 PM</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End of Icon Box Wrapper -->
        </div>
        <div class="container mt-8">
            <section class="mb-10">
                <h2 class="title title-center mb-5">Kabshak Options</h2>
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
                                <cite>AL FEDIYAH - RANSOM
                                </cite>
                                <blockquote>
                                    Ransom or Fedyah is an Islamic obligation for anyone unable to compensate for his fasten after Ramadan, and to avoid the sin for that in Infront of Allah he must be submitting a value of $5 per day.
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
                                <cite>AL AUDHIYAH QURBAN
                                </cite>
                                <blockquote>
                                    It is one of the rituals of Islam, by which Muslims draw closer to God by slaughtering cattle, from the first days of Eid al-Adha until the last days of al-Tashreeq

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
                                <cite>AL AQEQAH
                                </cite>
                                <blockquote>
                                    It is the sacrifice that is slaughtered on behalf of the newborn on the seventh day and it is confirmed by Sunnah in Islam, and it is thanks to God for the newborn, male or female, two equivalent sheep for the boy, and one sheep for the female.                               
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
                                <cite>NADHAR – VOW OR OATH
                                </cite>
                                <blockquote>
                                    It is the obligation of the taxpayer on himself something that he did not owe, whether it was completed or suspended. It is also defined as: “Commitment to an act of worship that is not necessary in the origin of the Sharia, with a word that conveys that, such as when a person says: To Allah, I have to sacrifice to Allah if Allah heals my sickness, and so on.                               
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
                                <cite>AL SADAQAH – CHARITY
                                </cite>
                                <blockquote>
                                    It is the gift to the poor and those who are in need in the face of drawing closer to the Creator and the idol and warding off calamities, and Charity has a great impact on the entity of society as it works to spread the spirit of cooperation and brotherhood among members of society.
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

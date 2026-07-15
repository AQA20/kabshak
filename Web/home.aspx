<%@ Page Title="Kabshak | Premium Halal Livestock & Charity Donations" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="home.aspx.cs"
    Inherits="web.home" %>

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
                    width: 80% !important;
                    left: 10px !important;
                    right: auto !important;
                    text-align: left !important;
                    padding: 1.5rem !important;
                }

                .category-banner-wrapper2 .banner-title {
                    font-size: 1.8rem !important;
                    line-height: 1.2 !important;
                    margin-bottom: 4px !important;
                }

                .category-banner-wrapper2 .banner-price-info {
                    font-size: 1.1rem !important;
                    line-height: 1.3 !important;
                    margin-bottom: 8px !important;
                }

                .category-banner-wrapper2 .banner-content .btn {
                    padding: 8px 18px !important;
                    font-size: 1rem !important;
                    line-height: 1.2 !important;
                }
            }

            .category-banner-3cols .text-center .banner-title {
                margin-bottom: unset;
            }

            .footer-newsletter {
                max-width: unset;
            }

            /* Custom Premium Animations */
            @keyframes float {
                0% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-6px) rotate(2deg); }
                100% { transform: translateY(0px) rotate(0deg); }
            }
            @keyframes slide-truck {
                0% { transform: translateX(0); }
                50% { transform: translateX(6px); }
                100% { transform: translateX(0); }
            }
            @keyframes scale-pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.12); }
                100% { transform: scale(1); }
            }
            @keyframes bounce-chat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-6px); }
            }

            /* Category Banners Zoom */
            .category-banner-wrapper2 .banner {
                overflow: hidden;
                border-radius: 16px;
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
                transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
            }
            .category-banner-wrapper2 .banner-media {
                transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
            }
            .category-banner-wrapper2 .banner:hover .banner-media {
                transform: scale(1.05);
            }
            .category-banner-wrapper2 .banner-content {
                background: transparent !important;
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                padding: 3rem !important;
                border-radius: 0 !important;
                border: none !important;
                max-width: 85%;
                box-shadow: none !important;
                transition: all 0.4s ease;
            }
            .category-banner-wrapper2 .banner:hover {
                transform: translateY(-4px);
                box-shadow: 0 15px 40px rgba(89, 57, 48, 0.12);
            }
            .category-banner-wrapper2 .banner:hover .banner-content {
                background: transparent !important;
                border-color: transparent !important;
            }
            .category-banner-wrapper2 .banner-title {
                font-family: 'Poppins', sans-serif;
                font-weight: 700 !important;
                letter-spacing: 0.5px;
                margin-bottom: 0.8rem;
                text-shadow: none !important;
            }
            .category-banner-wrapper2 .banner-1 .banner-title {
                color: #ffffff !important;
            }
            .category-banner-wrapper2 .banner-2 .banner-title {
                color: #593930 !important;
            }
            .category-banner-wrapper2 .banner-price-info {
                font-size: 1.35rem !important;
                line-height: 1.4;
                margin-bottom: 1.8rem !important;
            }
            @media (min-width: 992px) {
                .category-banner-wrapper2 .banner-price-info {
                    font-size: 1.9rem !important;
                }
            }
            .category-banner-wrapper2 .banner-1 .banner-price-info {
                color: #6a5e5a !important;
            }
            .category-banner-wrapper2 .banner-2 .banner-price-info {
                color: #6a5e5a !important;
            }
            .category-banner-wrapper2 .banner-content .btn {
                transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
            }
            .category-banner-wrapper2 .banner-content .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(89, 57, 48, 0.5);
            }

            /* Kabshak Options Section redone */
            .title.title-center {
                position: relative;
                font-size: 2.8rem;
                font-weight: 700;
                color: #593930;
                margin-bottom: 4rem !important;
            }
            .title.title-center::after {
                content: '';
                position: absolute;
                bottom: -10px;
                left: 50%;
                transform: translateX(-50%);
                width: 65px;
                height: 3px;
                background: #593930;
                border-radius: 2px;
            }

            .testimonial.testimonial-shadow {
                background: linear-gradient(135deg, #ffffff 0%, #fbf9f6 100%) !important;
                border: 1px solid rgba(89, 57, 48, 0.08) !important;
                border-radius: 24px !important;
                padding: 4rem 3rem !important;
                box-shadow: 0 12px 45px rgba(89, 57, 48, 0.04) !important;
                transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
            }
            .testimonial-wrap:hover .testimonial.testimonial-shadow {
                transform: translateY(-8px);
                box-shadow: 0 22px 55px rgba(89, 57, 48, 0.12) !important;
                border-color: rgba(89, 57, 48, 0.7) !important;
            }

            .testimonial-author-thumbnail {
                width: 95px !important;
                height: 95px !important;
                border-radius: 50% !important;
                border: 4px solid #ffffff !important;
                box-shadow: 0 8px 25px rgba(89, 57, 48, 0.12) !important;
                background: #ffffff;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 2.2rem !important;
                transition: all 0.4s ease;
            }
            .testimonial-wrap:hover .testimonial-author-thumbnail {
                animation: float 2.5s ease-in-out infinite;
                box-shadow: 0 8px 30px rgba(89, 57, 48, 0.4) !important;
                border-color: #593930 !important;
            }

            .testimonial cite {
                font-size: 1.6rem !important;
                font-weight: 700 !important;
                color: #593930 !important;
                text-transform: uppercase;
                letter-spacing: 0.8px;
                margin-bottom: 1.8rem !important;
                display: block;
            }

            .testimonial blockquote {
                font-size: 1.35rem !important;
                color: #665d59 !important;
                line-height: 1.75 !important;
                font-style: normal !important;
                margin: 0 !important;
            }

            /* Icon Boxes modern redesign */
            .icon-box-wrapper {
                background: linear-gradient(135deg, #ffffff 0%, #FAF8F5 100%) !important;
                border-radius: 24px !important;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03) !important;
                padding: 2.8rem 1.8rem !important;
                border: 1px solid rgba(0, 0, 0, 0.04) !important;
                transition: all 0.4s ease;
            }
            .icon-box-wrapper:hover {
                box-shadow: 0 15px 50px rgba(89, 57, 48, 0.08) !important;
            }

            .icon-box-wrapper .icon-box {
                padding: 1.8rem !important;
                border-radius: 16px;
                transition: all 0.3s ease;
            }
            .icon-box-wrapper .icon-box:hover {
                background: rgba(89, 57, 48, 0.06);
            }

            .icon-box-wrapper .icon-box-icon {
                width: 64px !important;
                height: 64px !important;
                background: rgba(89, 57, 48, 0.06);
                border-radius: 16px;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
                color: #593930;
                padding: 0 !important;
                margin: 0 !important;
                margin-right: 1.8rem !important;
            }
            html[lang=ar] .icon-box-wrapper .icon-box-icon {
                margin-right: 0 !important;
                margin-left: 1.8rem !important;
            }
            .icon-box-wrapper .icon-box-icon i {
                font-size: 2.6rem !important;
                transition: all 0.3s ease;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                margin: 0 !important;
                padding: 0 !important;
                position: static !important;
                line-height: 1 !important;
                width: auto !important;
                height: auto !important;
            }

            .icon-box-wrapper .icon-box:hover .icon-box-icon {
                background: #593930;
                color: #ffffff;
                transform: scale(1.08);
            }

            .icon-box-wrapper .icon-box:hover .icon-shipping i {
                animation: slide-truck 0.6s ease-in-out infinite;
            }
            .icon-box-wrapper .icon-box:hover .icon-payment i {
                animation: scale-pulse 0.6s ease-in-out infinite;
            }
            .icon-box-wrapper .icon-box:hover .icon-money i {
                animation: scale-pulse 0.6s ease-in-out infinite;
            }
            .icon-box-wrapper .icon-box:hover .icon-chat i {
                animation: bounce-chat 0.6s ease-in-out infinite;
            }

            .icon-box-wrapper .icon-box-content .icon-box-title {
                font-size: 1.6rem !important;
                color: #593930 !important;
                margin-bottom: 0.6rem;
            }

            .icon-box-wrapper .icon-box-content p.text-default {
                font-size: 1.3rem !important;
                color: #726863 !important;
            }

            /* Home Slider Container Styling */
            .home-slider-container {
                display: block !important;
                margin: 0 !important;
                max-width: 100% !important;
            }
            .home-slider-container .swiper-container {
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 12px 40px rgba(89, 57, 48, 0.12);
            }
            .home-slider-container .swiper-slide {
                border-radius: 16px;
                overflow: hidden;
            }
            .home-slider-container img {
                width: 100%;
                height: auto;
                aspect-ratio: 1024/860 !important; /* Exact match of the image dimensions */
                object-fit: cover;
                border-radius: 16px;
                display: block;
            }

            @media (max-width: 767px) {
                .home-slider-container {
                    margin-bottom: 2rem !important;
                }
                .home-slider-container img {
                    aspect-ratio: 1024/860 !important;
                }
                /* Hide navigation arrows on mobile for clean touch interaction */
                .home-slider-container .swiper-button-next,
                .home-slider-container .swiper-button-prev {
                    display: none !important;
                }
            }

            /* Goal Section Styling */
            .home-goal-section {
                padding: 4rem 0;
            }
            .goal-content-box {
                padding: 3rem;
                background: rgba(89, 57, 48, 0.02);
                border-radius: 20px;
                border: 1px solid rgba(89, 57, 48, 0.06);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                transition: all 0.4s ease;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            .goal-content-box:hover {
                transform: translateY(-5px);
                box-shadow: 0 15px 35px rgba(89, 57, 48, 0.05);
                background: rgba(89, 57, 48, 0.04);
            }
            .goal-title {
                font-size: 2.8rem !important;
                color: #593930 !important;
                position: relative;
            }
            .goal-title::after {
                content: '';
                display: block;
                width: 50px;
                height: 3px;
                background: #593930;
                margin-top: 12px;
                border-radius: 2px;
                transition: width 0.4s ease;
            }
            .goal-content-box:hover .goal-title::after {
                width: 80px;
            }
            .goal-desc {
                font-size: 1.5rem !important;
                line-height: 1.8 !important;
                color: #6a5e5a !important;
            }


            .home-slider-container .swiper-pagination-bullet {
                background: rgba(89, 57, 48, 0.3) !important;
                opacity: 1;
                width: 8px;
                height: 8px;
                transition: all 0.3s ease;
            }
            .home-slider-container .swiper-pagination-bullet-active {
                background: #593930 !important;
                width: 20px;
                border-radius: 4px;
            }

            /* Navigation arrows styling */
            .home-slider-container .swiper-button-next,
            .home-slider-container .swiper-button-prev {
                color: #593930 !important;
                background: rgba(255, 255, 255, 0.95);
                width: 46px;
                height: 46px;
                border-radius: 50%;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
                transition: all 0.3s ease;
            }
            .home-slider-container .swiper-button-next:hover,
            .home-slider-container .swiper-button-prev:hover {
                background: #593930;
                color: #ffffff !important;
            }
            .home-slider-container .swiper-button-next::after,
            .home-slider-container .swiper-button-prev::after {
                font-size: 1.6rem !important;
                font-weight: bold;
            }
        </style>
    </asp:Content>
    <asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <main class="main">
            <div class="container-fluid mt-5">
                <div class="category-banner-wrapper2 row cols-md-2 appear-animate fadeIn appear-animation-visible"
                    style="animation-duration: 1.2s;">
                    <div class="banner banner-1 banner-fixed br-sm mb-4" style="padding: 1px;">
                        <figure class="banner-media br-sm">
                            <img src="/assets/images/donate.webp" alt="Category Banner" width="898" height="503"
                                style="background-color: #31343B; width: 898px !important; height: 503px !important; object-fit: cover;">
                        </figure>
                        <div class="banner-content y-50">
                            <h3 class="banner-title ls-25" style="color: #593930 !important; text-shadow: none !important;">Donate now <span class="text-primary">to</span></h3>
                            <h5 class="banner-price-info font-weight-normal ls-25" style="color: #000000 !important;">Charities and families<br />in need</h5>
                            <a href="donate-shop.aspx" class="btn btn-white btn-rounded btn-icon-right">Donate Now<i
                                    class="w-icon-long-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                    <div class="banner banner-2 banner-fixed br-sm mb-4" style="padding: 1px;">
                        <figure class="banner-media br-sm">
                            <img src="/assets/images/ship.webp" alt="Category Banner" width="898" height="503"
                                style="background-color: #DEDEDE; width: 898px !important; height: 503px !important; object-fit: cover;">
                        </figure>
                        <div class="banner-content y-50">
                            <h3 class="banner-title ls-25" style="color: #593930 !important; text-shadow: none !important;">Your sheep to<br />your door</h3>
                            <h5 class="banner-price-info font-weight-normal ls-25" style="color: #000000 !important;">Shipping to all provinces of<br />the Kingdom</h5>
                            <a href="shipping-shop.aspx" class="btn btn-dark btn-rounded btn-icon-right">Order Now<i
                                    class="w-icon-long-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container home-goal-section mt-5">
                <div class="row align-items-center">
                    <!-- Left Column: Our Goal Message -->
                    <div class="col-md-6 mb-4 mb-md-0">
                        <div class="goal-content-box pr-md-4">
                            <h2 class="goal-title font-weight-bolder text-dark mb-4">Our Goal</h2>
                            <p class="goal-desc text-default mb-4">
                                At the end of the day, our goal is simple: to help as many people as possible. With the convenience of online charitable giving, we reach a wider audience and make a broader impact than ever before. Whether you're a busy professional looking to make a difference in your spare time or a philanthropist with a passion for social justice, we make it easy to get involved and make a meaningful contribution to our cause. Through our online platform, you can browse a variety of projects and choose the one that speaks to you.
                            </p>
                            <a href="about-us.aspx" class="btn btn-dark btn-rounded btn-outline btn-icon-right">
                                Learn More<i class="w-icon-long-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                    <!-- Right Column: Swiper Slider -->
                    <div class="col-md-6">
                        <div class="home-slider-container">
                            <div class="swiper-container swiper-theme" data-swiper-options="{
                                'autoplay': {
                                    'delay': 3500,
                                    'disableOnInteraction': false
                                },
                                'loop': true,
                                'slidesPerView': 1,
                                'spaceBetween': 10
                            }">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide">
                                        <figure class="banner-media">
                                            <img src="/assets/images/Slides/1.webp" alt="Slide 1" width="2248" height="1888" loading="lazy" />
                                        </figure>
                                    </div>
                                    <div class="swiper-slide">
                                        <figure class="banner-media">
                                            <img src="/assets/images/Slides/2.webp" alt="Slide 2" width="2248" height="1888" loading="lazy" />
                                        </figure>
                                    </div>
                                    <div class="swiper-slide">
                                        <figure class="banner-media">
                                            <img src="/assets/images/Slides/3.webp" alt="Slide 3" width="2248" height="1888" loading="lazy" />
                                        </figure>
                                    </div>
                                    <div class="swiper-slide">
                                        <figure class="banner-media">
                                            <img src="/assets/images/Slides/4.webp" alt="Slide 4" width="2248" height="1888" loading="lazy" />
                                        </figure>
                                    </div>
                                    <div class="swiper-slide">
                                        <figure class="banner-media">
                                            <img src="/assets/images/Slides/5.webp" alt="Slide 5" width="2248" height="1888" loading="lazy" />
                                        </figure>
                                    </div>
                                    <div class="swiper-slide">
                                        <figure class="banner-media">
                                            <img src="/assets/images/Slides/6.webp" alt="Slide 6" width="2248" height="1888" loading="lazy" />
                                        </figure>
                                    </div>
                                </div>
                                <div class="swiper-pagination"></div>
                                <div class="swiper-button-next"></div>
                                <div class="swiper-button-prev"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container partner-section mt-5 mb-5">
                <div class="row align-items-center bg-white" style="border-radius: 20px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03); padding: 3rem; border: 1px solid rgba(0, 0, 0, 0.04);">
                    <div class="col-md-4 text-center mb-4 mb-md-0">
                        <img src="/assets/images/جمعية-المركز-الإسلامي.webp" alt="Islamic Charitable Center Association" style="max-width: 250px; height: auto;"  loading="lazy" />
                    </div>
                    <div class="col-md-8">
                        <h4 class="mb-1" style="color: #593930 !important;">Our partner in distributing donations</h4>
                        <h3 class="font-weight-bolder text-dark mb-3">Islamic Charitable Center Association</h3>
                        <p class="text-default mb-3" style="font-size: 1.2rem; line-height: 1.6;">
                            We work for humanity, empowering them economically, educationally and healthily, and in order to provide relief and aid to those in need.
                        </p>
                        <p class="text-default mb-4" style="font-size: 1.2rem; line-height: 1.6;">
                            Our branches are spread all over the Kingdom, except for zatari.
                        </p>
                        <a href="https://islamicc.org/ws/" target="_blank" class="btn btn-dark btn-rounded btn-outline btn-icon-right">
                            Read More<i class="w-icon-long-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="soldoutalert container d-none">
                <div class="row">
                    <div class="col-md-12 mb-4">
                        <div class="alert alert-error alert-bg alert-button alert-block show-code-action">
                            <h4 class="alert-title">Sold Out!</h4>
                            <p style="max-width:unset;">
                                We hope this message finds you well. We wanted to inform you that our products are
                                currently sold out. We sincerely apologize for any inconvenience this may cause.
                                <br>
                                Due to its immense popularity and high demand, we experienced an unexpected surge in
                                sales, resulting in the depletion of our current stock. Our team is working diligently
                                to restock the product as soon as possible, and we anticipate having it available again
                                in the near future.
                                <br />
                                If you have any questions, or concerns, or need further assistance, please don't
                                hesitate to reach out to our customer support team. We are here to help and provide any
                                additional information you may require.
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
            <div class="container mt-8">
                <section class="mb-10">
                    <h2 class="title title-center mb-5">Kabshak Services</h2>
                    <div class="swiper-container shadow-swiper swiper-theme show-code-action swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events"
                        data-swiper-options="{
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
                                            <img src="/assets/images/categories/898249.webp" alt="Testimonial"
                                                width="100" height="100" loading="lazy">
                                        </figure>
                                    </div>
                                    <cite>AL FEDIYAH - RANSOM
                                    </cite>
                                    <blockquote>
                                        Ransom or Fedyah is an Islamic obligation for anyone unable to compensate for
                                        his fasten after Ramadan, and to avoid the sin for that in Infront of Allah he
                                        must be submitting a value of $5 per day.
                                    </blockquote>
                                </div>
                            </div>
                            <div class="swiper-slide testimonial-wrap">
                                <div class="testimonial testimonial-centered testimonial-shadow">
                                    <div class="testimonial-info">
                                        <figure class="testimonial-author-thumbnail">
                                            <img src="/assets/images/categories/871500.webp" alt="Testimonial"
                                                width="100" height="100" loading="lazy">
                                        </figure>
                                    </div>
                                    <cite>AL AUDHIYAH QURBAN
                                    </cite>
                                    <blockquote>
                                        It is one of the rituals of Islam, by which Muslims draw closer to God by
                                        slaughtering cattle, from the first days of Eid al-Adha until the last days of
                                        al-Tashreeq

                                    </blockquote>
                                </div>
                            </div>
                            <div class="swiper-slide testimonial-wrap">
                                <div class="testimonial testimonial-centered testimonial-shadow">
                                    <div class="testimonial-info">
                                        <figure class="testimonial-author-thumbnail">
                                            <img src="/assets/images/categories/567915.webp" alt="Testimonial"
                                                width="100" height="100" loading="lazy">
                                        </figure>
                                    </div>
                                    <cite>AL AQEQAH
                                    </cite>
                                    <blockquote>
                                        It is the sacrifice that is slaughtered on behalf of the newborn on the seventh
                                        day and it is confirmed by Sunnah in Islam, and it is thanks to God for the
                                        newborn, male or female, two equivalent sheep for the boy, and one sheep for the
                                        female.
                                    </blockquote>
                                </div>
                            </div>
                            <div class="swiper-slide testimonial-wrap">
                                <div class="testimonial testimonial-centered testimonial-shadow">
                                    <div class="testimonial-info">
                                        <figure class="testimonial-author-thumbnail">
                                            <img src="/assets/images/categories/240420.webp" alt="Testimonial"
                                                width="100" height="100" loading="lazy">
                                        </figure>
                                    </div>
                                    <cite>NADHAR – VOW OR OATH
                                    </cite>
                                    <blockquote>
                                        It is the obligation of the taxpayer on himself something that he did not owe,
                                        whether it was completed or suspended. It is also defined as: “Commitment to an
                                        act of worship that is not necessary in the origin of the Sharia, with a word
                                        that conveys that, such as when a person says: To Allah, I have to sacrifice to
                                        Allah if Allah heals my sickness, and so on.
                                    </blockquote>
                                </div>
                            </div>
                            <div class="swiper-slide testimonial-wrap">
                                <div class="testimonial testimonial-centered testimonial-shadow">
                                    <div class="testimonial-info">
                                        <figure class="testimonial-author-thumbnail">
                                            <img src="/assets/images/categories/898249.webp" alt="Testimonial"
                                                width="100" height="100" loading="lazy">
                                        </figure>
                                    </div>
                                    <cite>AL SADAQAH – CHARITY
                                    </cite>
                                    <blockquote>
                                        It is the gift to the poor and those who are in need in the face of drawing
                                        closer to the creator and the idol and warding off calamities, and charity has a
                                        great impact on the entity of society as it works to spread the spirit of
                                        cooperation and brotherhood among members of society.
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"
                            style="display: none;"><span
                                class="swiper-pagination-bullet swiper-pagination-bullet-active" tabindex="0"
                                role="button" aria-label="Go to slide 1"></span></div>
                        <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                    </div>
                </section>
            </div>
            <div class="container mt-5 mb-10">
                <div class="swiper-container swiper-theme icon-box-wrapper br-sm bg-white"
                    style="border: solid 1px #eee;" data-swiper-options="{
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
        </main>
    </asp:Content>
    <asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
        <script src="/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"></script>
        <script src="/assets/vendor/swiper/swiper-bundle.min.js"></script>
        <script src="/assets/js/home.js"></script>
    </asp:Content>
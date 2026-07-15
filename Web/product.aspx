<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="product.aspx.cs" Inherits="web.product" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadCss" runat="server">
    <link href="/assets/css/product.css" rel="stylesheet" />
    <link href="/assets/vendor/intlTelInput/intlTelInput.css" rel="stylesheet" />
    <style>
        .iti--allow-dropdown {
            border: unset;
            border-radius: 0.3em;
            margin-top: 1px;
        }

        #phone {
            border: unset;
        }

        .product-media {
            border: solid 1px #eee;
        }

        .product-tab-description {
            padding-top: unset !important;
        }

        .product-image-custom img {
            height: 330px;
        }

        .swiper-slide-visible img {
            height: 80px;
        }

        .swiper-slide {
            height: unset !important;
        }

        .product-thumbs-wrap img {
            display: block;
            width: 100%;
            height: 80px;
        }

        @media only screen and (max-width: 768px) {
            .product-image-custom img {
                height: 250px;
            }

            .swiper-slide-visible img {
                height: 60px;
            }
        }

        .sub-category-css .ql-editor p {
            margin-bottom: unset;
            font-size: 10px;
        }

        .product-single .btn-cart {
            -webkit-box-flex: unset !important;
            -ms-flex: unset !important;
            flex: unset !important;
            margin-bottom: unset !important;
            padding-left: unset !important;
            padding-right: unset !important;
            min-width: unset !important;
            border-radius: 50% !important;
        }

        .input-group button {
            border-radius: 25% !important;
        }

        .product-single .btn-cart {
            border-radius: 25% !important;
            font-weight: 100;
        }

        .store-address p {
            margin-bottom: unset;
            font-size: 11px;
            color: #020101;
        }

        .store-grid .store-content {
            top: 2.5rem;
            left: 3rem;
            max-width: 100% !important;
            width: 100%;
        }

        .product-gallery-vertical .product-single-swiper {
            -webkit-box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.08);
            box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.08);
        }

        .card-body p {
            margin-bottom: unset;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main class="main mb-10 pb-1">
        <nav class="breadcrumb-nav container">
            <ul class="breadcrumb bb-no">
                <li><a href="/home">Home</a></li>
                <li class="d-none" id="BreadcrumbCustom"></li>
                <li id="lblBreadcrumbPage"></li>
            </ul>
        </nav>
        <div class="page-content">
            <div class="container">
                <div class="row gutter-lg">
                    <div class="main-content">
                        <div class="product product-single row">
                            <div class="col-md-6 mb-6">
                                <div class="product-gallery product-gallery-sticky product-gallery-vertical">
                                    <div class="swiper-container product-single-swiper swiper-theme nav-inner"
                                        data-swiper-options="{
                                            'navigation': {
                                                'nextEl': '.swiper-button-next',
                                                'prevEl': '.swiper-button-prev'
                                            }
                                        }">
                                        <div class="swiper-wrapper row cols-1 gutter-no">
                                            <div class="swiper-slide">
                                                <figure class="product-image">
                                                    <img src="/assets/images/defult_image.png"
                                                        data-zoom-image="/assets/images/defult_image.png"
                                                        alt="Product Image" width="800"
                                                        height="900">
                                                </figure>
                                            </div>
                                        </div>
                                        <button class="swiper-button-next"></button>
                                        <button class="swiper-button-prev"></button>
                                        <a href="#" class="product-gallery-btn product-image-full"><i
                                            class="w-icon-zoom"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 mb-4 mb-md-6 product-data-custom">
                                <div class="product-details" data-sticky-options="{'minWidth': 767}">
                                    <h1 class="product-title"></h1>
                                    <div class="product-bm-wrapper">
                                        <div class="product-meta">
                                            <div class="product-categories">
                                                Category:
                                                    <span class="product-category"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="product-categories">
                                        Starting:<div class="product-price"><ins class="new-price"></ins></div>
                                    </div>
                                    <div class="product-short-desc Brief">
                                    </div>
                                    <hr class="product-divider" />
                                    <div class="social-links-wrapper">
                                        <div class="social-links">
                                            <div class="social-icons social-no-color border-thin">
                                                <div class="a2a_kit a2a_kit_size_32 a2a_default_style" data-a2a-title="Kabshak Product URL: ">
                                                    <a class="a2a_button_facebook"></a>
                                                    <a class="a2a_button_x"></a>
                                                    <a class="a2a_button_email"></a>
                                                    <a class="a2a_button_whatsapp"></a>
                                                    <a class="a2a_button_copy_link"></a>
                                                </div>
                                                <script async src="https://static.addtoany.com/menu/page.js"></script>
                                            </div>
                                        </div>
                                        <span class="divider d-xs-show"></span>
                                        <div class="product-link-wrapper d-flex">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr class="product-divider">
                            <div class="row cols-lg-3 cols-md-2 cols-sm-2 cols-1 mt-4 list-of-sub-categories">
                            </div>
                            <div class="tab tab-nav-boxed tab-nav-underline product-tabs">
                                <ul class="nav nav-tabs" role="tablist">
                                    <li class="nav-item">
                                        <a href="#product-tab-description" class="nav-link active">Description</a>
                                    </li>
                                    <li class="nav-item d-none">
                                        <a href="#product-tab-vendor" class="nav-link">Brand Info</a>
                                    </li>
                                    <li class="nav-item d-none">
                                        <a href="#product-tab-reviews" class="nav-link">Customer Reviews</a>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane  active in" id="product-tab-description" style="padding: unset !important;">
                                        <div class="row">
                                            <div class="col-md-12 mt-3">
                                                <div class="product-description">
                                                </div>
                                            </div>
                                        </div>
                                        <section class="icon-accordion-section">
                                            <div class="row">
                                                <div class="col-md-12 mb-12 mb-md-4">
                                                    <div class="accordion accordion-icon accordion-simple show-code-action">
                                                        <div class="card">
                                                            <div class="card-header">
                                                                <a href="#collapse3-2" class="expand" style="padding-left: unset !important;"><i class="w-icon-exclamation-circle"></i>Brand info</a>
                                                            </div>
                                                            <div class="card-body collapsed" id="collapse3-2" style="display: none;">
                                                                <div class="row mb-3">
                                                                    <div class="col-md-3 mb-4 vendor-banner-image-dev">
                                                                        <figure class="vendor-banner vendor-banner-image br-sm">
                                                                        </figure>
                                                                    </div>
                                                                    <div class="col-md-9 pl-2 pl-md-6 mb-4">
                                                                        <div class="vendor-user">
                                                                            <div>
                                                                                <div class="vendor-name"></div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="vendor-info" style="padding-left: 20px;"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                    <div class="tab-pane" id="product-tab-vendor">
                                        <div class="tab-pane active in" id="product-tab-vendor2" style="padding-top: unset;">
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="product-tab-reviews">
                                        <div class="row mb-4">
                                            <div class="col-xl-4 col-lg-5 mb-4">
                                                <div class="ratings-wrapper">
                                                    <div class="avg-rating-container">
                                                        <h4 class="avg-mark font-weight-bolder ls-50"></h4>
                                                        <div class="avg-rating">
                                                            <p class="text-dark mb-1">Average Rating</p>
                                                            <div class="ratings-container">
                                                                <div class="ratings-full">
                                                                </div>
                                                                <a href="#" onclick="voidclick(); return false" class="rating-reviews"></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="ratings-value d-flex align-items-center text-dark ls-25">
                                                    </div>
                                                    <div class="ratings-list">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-8 col-lg-7 mb-4">
                                                <div class="review-form-wrapper">
                                                    <h3 class="title tab-pane-title font-weight-bold mb-1">Submit Your
                                                        Review</h3>
                                                    <p class="mb-3">
                                                        Your email address will not be published. No required fields.
                                                    </p>

                                                    <div class="rating-form">
                                                        <label for="rating">Your Rating Of This Product :</label>
                                                        <span class="rating-stars">
                                                            <a class="star-1" href="#">1</a>
                                                            <a class="star-2" href="#">2</a>
                                                            <a class="star-3" href="#">3</a>
                                                            <a class="star-4" href="#">4</a>
                                                            <a class="star-5" href="#">5</a>
                                                        </span>
                                                    </div>
                                                    <textarea cols="30" rows="6" placeholder="Write Your Review Here..." class="form-control" id="review"></textarea>
                                                    <div class="row gutter-md mt-2">
                                                        <div class="col-md-6">
                                                            <input type="text" class="form-control" placeholder="Your Name" id="author">
                                                        </div>
                                                        <div class="col-md-6">
                                                            <input type="text" class="form-control" placeholder="Your Email" id="email_1">
                                                        </div>
                                                    </div>
                                                    <button type="button" class="btn btn-dark mt-2" onclick="RateProduct();">
                                                        Submit
                                                            Review</button>
                                                    <div class="alert-rating alert alert-icon alert-warning alert-bg alert-inline show-code-action mt-2 d-none">
                                                        <h4 class="alert-title">
                                                            <i class="w-icon-exclamation-triangle"></i>Warning!</h4>
                                                        You must select the rating stars for the product!
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-end">
                                <div class="cart-action">
                                    <a href="/cart.aspx" class="btn btn-dark btn-outline btn-rounded mb-1"><i class="w-icon-cart pl-1 pr-1"></i>View Cart</a>
                                    <a href="/checkout.aspx" class="btn btn-primary  btn-rounded mb-1">Proceed to checkout<i class="w-icon-long-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End of Main Content -->
                    <aside class="sidebar product-sidebar sidebar-fixed right-sidebar sticky-sidebar-wrapper">
                        <div class="sidebar-overlay"></div>
                        <a class="sidebar-close" href="#"><i class="close-icon"></i></a>
                        <a href="#" class="sidebar-toggle d-flex d-lg-none"><i class="fas fa-chevron-left"></i></a>
                        <div class="sidebar-content scrollable">
                            <div class="pin-wrapper" style="height: 970.9px;">
                                <div class="sticky-sidebar" style="border-bottom: 0px none rgb(102, 102, 102); width: 280px;">
                                    <div class="widget widget-icon-box mb-6">
                                        <div class="icon-box icon-box-side">
                                            <span class="icon-box-icon text-dark">
                                                <i class="w-icon-truck"></i>
                                            </span>
                                            <div class="icon-box-content">
                                                <h4 class="icon-box-title font-weight-bolder">Shipping</h4>
                                                <p class="text-default">Express delivery on time</p>
                                            </div>
                                        </div>
                                        <div class="icon-box icon-box-side">
                                            <span class="icon-box-icon text-dark">
                                                <i class="w-icon-bag"></i>
                                            </span>
                                            <div class="icon-box-content">
                                                <h4 class="icon-box-title font-weight-bolder">Secure Payment</h4>
                                                <p class="text-default">We ensure secure payment</p>
                                            </div>
                                        </div>
                                        <div class="icon-box icon-box-side">
                                            <span class="icon-box-icon text-dark">
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
                                        <div class="icon-box icon-box-side">
                                            <span class="icon-box-icon text-dark">
                                                <i class="w-icon-chat"></i>
                                            </span>

                                            <div class="icon-box-content">
                                                <h4 class="icon-box-title font-weight-bolder">Customer Support</h4>
                                                <p class="text-default">From 8:00 AM till 9:00 PM</p>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- End of Widget Icon Box -->

                                    <%--   <div class="widget widget-banner mb-9 sale-tag">
                                        <div class="banner banner-fixed br-sm">
                                            <figure>
                                                <img src="/assets/images/shop/banner3.jpg" alt="Banner" width="266" height="220" style="background-color: #1D2D44;">
                                            </figure>
                                            <div class="banner-content">
                                                <div class="banner-price-info font-weight-bolder text-white lh-1 ls-25">
                                                    <span></span><sup class="font-weight-bold">%</sup><sub class="font-weight-bold text-uppercase ls-25">Off</sub>
                                                </div>
                                            </div>
                                        </div>
                                    </div>--%>
                                    <!-- End of Widget Banner -->

                                    <div class="widget widget-products d-none">
                                        <div class="title-link-wrapper mb-2">
                                            <h4 class="title title-link font-weight-bold">On Sale Products</h4>
                                        </div>

                                        <div class="swiper nav-top">
                                            <div class="swiper-container swiper-theme nav-top swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events" data-swiper-options="{
                                                'slidesPerView': 1,
                                                'spaceBetween': 20,
                                                'navigation': {
                                                    'prevEl': '.swiper-button-prev',
                                                    'nextEl': '.swiper-button-next'
                                                }
                                            }">
                                                <div class="swiper-wrapper" id="swiper-wrapper-d3b106fe2cfeb6c61" aria-live="polite" style="transform: translate3d(0px, 0px, 0px);">
                                                    <div class="widget-col swiper-slide swiper-slide-active" role="group" aria-label="1 / 2" style="width: 280px; margin-right: 20px;">
                                                    </div>
                                                    <div class="widget-col swiper-slide swiper-slide-next" role="group" aria-label="2 / 2" style="width: 280px; margin-right: 20px;">
                                                    </div>
                                                </div>
                                                <button class="swiper-button-next" tabindex="0" aria-label="Next slide" aria-controls="swiper-wrapper-d3b106fe2cfeb6c61" aria-disabled="false"></button>
                                                <button class="swiper-button-prev swiper-button-disabled" disabled="" tabindex="-1" aria-label="Previous slide" aria-controls="swiper-wrapper-d3b106fe2cfeb6c61" aria-disabled="true"></button>
                                                <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                    <!-- End of Sidebar -->
                </div>
            </div>
        </div>
        <div class="product product-single product-popup">
            <div class="row gutter-lg">
                <div class="col-md-6 mb-4 mb-md-0">
                    <div class="product-gallery product-gallery-sticky mb-0">
                        <div class="product-single-swiper swiper-container swiper-theme nav-inner row cols-1 gutter-no">
                            <figure class="product-image">
                            </figure>
                            <h2 class="title text-left product-title"></h2>
                            <div class="accordion accordion-simple accordion-plus">
                                <div class="card border-no">
                                    <div class="card-header">
                                        <a href="#collapse3-1" class="collapse"></a>
                                    </div>
                                    <div class="card-body expanded" id="collapse3-1">
                                        <div class="product-bm-wrapper">
                                            <div class="product-meta">
                                                <div class="product-categories mb-0">
                                                    Category:
                                                    <span class="product-category"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <p class="mb-0 sub-description">
                                        </p>
                                        <h5 class="sub-title font-weight-bold mb-1 fill-sub-price"></h5>
                                        <input type="hidden" id="usd-price" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mb-6 mb-md-0">
                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                        <p>Quantity # *</p>
                        <div class="product-qty-form ml-0 mr-0">
                        </div>
                    </div>
                    <div class="charity-donation" style="display: flex; justify-content: space-between; align-items: baseline;">
                        <p>Charity *</p>
                        <div class="select-box">
                            <select id="charities" name="charities" class="form-control form-control-md items" style="width: 220px;">
                            </select>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                        <p>Product Purposes *</p>
                        <div class="select-box">
                            <select id="purposes" name="purposes" class="form-control form-control-md items" style="width: 220px;">
                            </select>
                        </div>
                    </div>
                    <div>
                        <div class="form-group">
                            <p class="mb-0">For the name of *</p>
                            <input type="text" class="form-control form-control-md" name="Shareholder">
                        </div>
                    </div>
                    <div class="Shipping-Address-AddToCart d-none">
                        <div class="row">
                            <p class="mb-2 mt-3">Shipping Address *</p>
                            <div class="col-md-6 mb-2">
                                <div class="form-group">
                                    <label>Country *</label>
                                    <div class="select-box">
                                        <select id="shipingCountries" name="country" class="form-control form-control-md" style="max-width: unset;">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 mb-2">
                                <div class="form-group">
                                    <label>City *</label>
                                    <div class="select-box">
                                        <select name="shiping-city" class="form-control form-control-md" style="max-width: unset;">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 mb-2">
                                <div class="form-group">
                                    <label>Town *</label>
                                    <input type="text" class="form-control form-control-md" name="shipping-town">
                                </div>
                            </div>
                            <div class="col-md-3 mb-2">
                                <div class="form-group">
                                    <label>House # *</label>
                                    <input type="number" class="form-control form-control-md" name="shipping-house">
                                </div>
                            </div>
                            <div class="col-md-3 mb-2">
                                <div class="form-group">
                                    <label>Apartment # *</label>
                                    <input type="number" class="form-control form-control-md" name="shipping-Apartment">
                                </div>
                            </div>
                            <div class="col-md-12 mb-2">
                                <div class="form-group">
                                    <label>Street *</label>
                                    <input type="text" class="form-control form-control-md" name="shipping-street">
                                </div>
                            </div>
                            <div class="col-xs-6  mb-2">
                                <div class="form-group">
                                    <label>Contact Phone * <em>only jordan</em></label>
                                    <div class="form-group divPhone2" style="border: solid 1px #eee; height: 44px;">
                                        <input id="contact_phone" type="tel" name="phone" placeholder="" />
                                        <input type="hidden" name="contact_full_phone" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <p class="mb-2">Meat cutting notes (optional)</p>
                                    <textarea class="form-control mb-0" id="product-cutting-notes" name="product-cutting-notes" cols="30" rows="4" placeholder="We offer the service of selecting the way you want to cut the meat."></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="button" class="btn btn-dark btn-block btn-rounded mt-3 btn-save-shareholder"><i class="w-icon-cart"></i>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-wrap show-code-action mb-5 excel-option d-none">
            <a href="#" class="btn btn-primary btn-outline btn-quickview w-100" style="padding: 14px; border-radius: 3px;"></a>
        </div>
    </main>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="head" runat="server">
    <script src="/assets/vendor/intlTelInput/intlTelInput.js"></script>
    <script src="/assets/vendor/sticky/sticky.js"></script>
    <script src="/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"></script>
    <script src="/assets/vendor/zoom/jquery.zoom.js"></script>
    <script src="/assets/vendor/photoswipe/photoswipe.js"></script>
    <script src="/assets/vendor/photoswipe/photoswipe-ui-default.js"></script>
    <script src="/assets/js/details.js?v=3.0"></script>
    <script src="/assets/vendor/magnific-popup/jquery.magnific-popup.js"></script>
</asp:Content>

<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="contact-us.aspx.cs"
    Inherits="web.contact_us" %>

    <asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <link rel="stylesheet" href="/assets/vendor/swiper/swiper-bundle.min.css">
        <main class="main">
            <!-- Start of Breadcrumb -->
            <nav class="breadcrumb-nav mb-10 pb-1">
                <div class="container">
                    <ul class="breadcrumb">
                        <li><a href="/home.aspx">Home</a></li>
                        <li>Contact Us</li>
                    </ul>
                </div>
            </nav>
            <!-- End of Breadcrumb -->

            <!-- Start of PageContent -->
            <div class="page-content contact-us">
                <div class="container">
                    <section class="content-title-section mb-10">
                        <h1 class="title title-center mb-3">Contact Us
                        </h1>
                        <p class="text-center">We would be more than happy to help you. You can reach out to us through
                            the form below or any of our social media channels.</p>
                    </section>
                    <!-- End of Contact Title Section -->

                    <section class="contact-information-section mb-10">
                        <div class="swiper-container swiper-theme swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events"
                            data-swiper-options="{
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
                                <div class="swiper-slide icon-box text-center icon-box-primary swiper-slide-active"
                                    role="group" aria-label="1 / 4" style="width: 295px; margin-right: 20px;">
                                    <span class="icon-box-icon icon-email">
                                        <i class="w-icon-envelop-closed"></i>
                                    </span>
                                    <div class="icon-box-content">
                                        <h4 class="icon-box-title">E-mail Address</h4>
                                        <p>info@kabshak.com</p>
                                    </div>
                                </div>
                                <div class="swiper-slide icon-box text-center icon-box-primary swiper-slide-next"
                                    role="group" aria-label="2 / 4" style="width: 295px; margin-right: 20px;">
                                    <span class="icon-box-icon icon-headphone">
                                        <i class="w-icon-headphone"></i>
                                    </span>
                                    <div class="icon-box-content">
                                        <h4 class="icon-box-title">Phone Number</h4>
                                        <p>(962) 796097475</p>
                                    </div>
                                </div>
                                <div class="swiper-slide icon-box text-center icon-box-primary" role="group"
                                    aria-label="3 / 4" style="width: 295px; margin-right: 20px;">
                                    <span class="icon-box-icon icon-map-marker">
                                        <i class="w-icon-map-marker"></i>
                                    </span>
                                    <div class="icon-box-content">
                                        <h4 class="icon-box-title">Address</h4>
                                        <p>
                                            Amman - Jordan, Gardens Street
                                        </p>
                                    </div>
                                </div>
                                <div class="swiper-slide icon-box text-center icon-box-primary" role="group"
                                    aria-label="4 / 4" style="width: 295px; margin-right: 20px;">
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
                                <h4 class="title mb-3">Frequent questions that people usually ask</h4>
                                <div class="accordion accordion-bg accordion-gutter-md accordion-border">
                                    <%-- <div class="card">
                                        <div class="card-header">
                                            <a href="#collapse1" class="expand">How can I cancel my order?</a>
                                        </div>
                                        <div id="collapse1" class="card-body collapsed" style="display: none;">
                                            <p class="mb-0">
                                                You can cancel an online order in writing, by fax, or by email, and a
                                                cancellation form should also be made available although it’s sensible
                                                to stick with the process the retailer has set up.
                                            </p>
                                        </div>
                                </div>--%>

                                <div class="card">
                                    <div class="card-header">
                                        <a href="#collapse2" class="expand">Why is my order delayed?</a>
                                    </div>
                                    <div id="collapse2" class="card-body collapsed">
                                        <p class="mb-0">
                                            Here are the top reasons why a retail shipment could be delayed:
                                        </p>
                                        <ul>
                                            <li>Traffic.</li>
                                            <li>Weather.</li>
                                            <li>Failed delivery attempts.</li>
                                            <li>Technical issues.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="card">
                                    <div class="card-header">
                                        <a href="#collapse3" class="expand">What do I need to buy products?</a>
                                    </div>
                                    <div id="collapse3" class="card-body collapsed">
                                        <p class="mb-0">
                                            To locate specific items, you can click on (Donate Now) or (Order Now) on
                                            home page or you can use the "search" feature. Besides that, you must have
                                            an authorized payment method in order to complete your order.
                                        </p>
                                    </div>
                                </div>

                                <div class="card">
                                    <div class="card-header">
                                        <a href="#collapse4" class="expand">How can I track an order?</a>
                                    </div>
                                    <div id="collapse4" class="card-body collapsed">
                                        <p class="mb-0">
                                            We will notify you via Kabshak app notification, SMS or email about your
                                            shipment or you can contact us at any time via our channels.
                                        </p>
                                    </div>
                                </div>

                                <div class="card">
                                    <div class="card-header">
                                        <a href="#collapse5" class="expand">When and how can I get money back?</a>
                                    </div>
                                    <div id="collapse5" class="card-body collapsed">
                                        <p class="mb-0">
                                            If there are technical issues with the system or a delay in the delivery
                                            date or the shipment was not the same as required order specifications, you
                                            can cancel the order by communicating with us through the communication
                                            channels, and your order will be refunded within 7 working days after the
                                            order date.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 mb-8">
                            <h4 class="title mb-3">Send Us a Message</h4>
                            <div class="form contact-us-form" action="#" method="post">
                                <div class="form-group">
                                    <label for="username">Your Name</label>
                                    <input type="text" id="username" name="username" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="email_1">Your Email</label>
                                    <input type="email" id="email_1" name="email_1" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="email_1">Your Mobile #</label>
                                    <input type="number" id="mobile_1" name="mobile_1" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="message">Your Message</label>
                                    <textarea id="message" name="message" cols="30" rows="5"
                                        class="form-control"></textarea>
                                    <p id="lbl_contact_us_status"></p>
                                </div>
                                <button type="button" class="btn btn-dark btn-rounded"
                                    onclick="Send_Contact_Us_Message();">Send Now</button>
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
        <script src="/assets/js/contact_us.js"></script>
    </asp:Content>
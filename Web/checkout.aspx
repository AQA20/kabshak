<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="checkout.aspx.cs" Inherits="web.checkout" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadCss" runat="server">
    <meta name="robots" content="noindex,nofollow" />
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

        .nav-tabs {
            display: none !important;
        }

        @media (max-width: 767px) {
            .shop-table:not(.account-orders-table) .product-thumbnail > div img {
                width: 150px;
                min-height: unset !important;
            }
        }
    </style>
    <script>
        cookie_cart_items = getCookie("cookie_cart_items");
        if (cookie_cart_items.trim() == "") {
            window.location = "/cart";
        }
        function getCookie(cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main class="main checkout">
        <nav class="breadcrumb-nav">
            <div class="container">
                <ul class="breadcrumb">
                    <li><a href="/home.aspx">Home</a></li>
                    <li>
                        <h1 style="font-size: 13px; margin-bottom: unset;">Checkout</h1>
                    </li>
                </ul>
            </div>
        </nav>
        <nav class="breadcrumb-nav">
            <div class="container">
                <ul class="breadcrumb shop-breadcrumb bb-no" style="margin-top: unset;">
                    <li><a href="cart.aspx">Shopping Cart</a></li>
                    <li class="active"><a href="checkout.aspx">Checkout</a></li>
                    <li><a href="#" onclick="voidclick(); return false">Order Complete</a></li>
                </ul>
            </div>
        </nav>
        <div class="soldoutalert container d-none">
            <div class="row">
                <div class="col-md-12 mb-4">
                    <div class="alert alert-error alert-bg alert-button alert-block show-code-action">
                        <h4 class="alert-title">Sold Out!</h4>
                        <p style="max-width: unset;">
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
        <div class="page-content">
            <div class="container">
                <div class="login-toggle">
                    <div class="alert alert-success alert-cart-product mb-2 d-none">
                        <i class="w-icon-account" style="font-size: 40px; padding: 15px;"></i>
                        <p class="mb-0 ls-normal"></p>
                        <a href="#" class="btn btn-link btn-close" aria-label="button"><i class="close-icon"></i></a>
                    </div>
                    Returning customer? <a href="#" class="show-login font-weight-bold text-uppercase text-dark">Login</a>
                </div>
                <div class="login-content open" style="display: block;">
                    <p>
                        If you have shopped with us before, please login using the button below. 
                            If you are a new customer, please proceed to the Billing section.
                    </p>
                    <a href="/assets/ajax/login.html" class="ml-3 login sign-in btn" style="font-size: 1.1rem; font-weight: unset;">Login</a>
                </div>
                <div class="form checkout-form" action="#" method="post">
                    <div class="row mb-9">
                        <div class="col-lg-7 pr-lg-4 mb-4">
                            <!-- Stepper UI -->
                            <div class="checkout-stepper mb-5">
                                <div class="step-progress-bar">
                                    <div class="step active" id="indicator-1">
                                        <div class="step-circle">1</div>
                                        <div class="step-text">Order Info</div>
                                    </div>
                                    <div class="step-line"></div>
                                    <div class="step" id="indicator-2">
                                        <div class="step-circle">2</div>
                                        <div class="step-text">Address</div>
                                    </div>
                                    <div class="step-line"></div>
                                    <div class="step" id="indicator-3">
                                        <div class="step-circle">3</div>
                                        <div class="step-text">Notes</div>
                                    </div>
                                </div>
                            </div>

                            <div id="step-1" class="checkout-step">
                                <h3 class="title billing-title text-uppercase ls-10 pt-1 pb-3 mb-0">Order Information
                                </h3>
                            <div class="row gutter-sm">
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <label>First name *</label>
                                        <input type="text" class="form-control form-control-md" name="firstname" required="">
                                    </div>
                                </div>
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <label>Last name *</label>
                                        <input type="text" class="form-control form-control-md" name="lastname" required="">
                                    </div>
                                </div>
                            </div>
                            <div class="row gutter-sm">
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <label>Email address *</label>
                                        <input type="email" class="form-control form-control-md" name="email" required="">
                                    </div>
                                </div>
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <label>Phone *</label>
                                        <div class="form-group mb-6 divPhone" style="border: solid 1px #eee; height: 44px;">
                                            <input id="phone" type="tel" name="phone" placeholder="" />
                                            <input type="hidden" name="full_phone" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="step-footer mt-4 d-flex justify-content-end">
                                <button type="button" class="btn btn-primary btn-next-step" onclick="nextStep(1)">Next <i class="w-icon-long-arrow-right"></i></button>
                            </div>
                        </div> <!-- End Step 1 -->

                        <div id="step-2" class="checkout-step" style="display: none;">
                            <h3 class="title billing-title text-uppercase ls-10 pt-1 pb-3 mb-0">Billing Address
                            </h3>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Country *</label>
                                        <div class="select-box">
                                            <select id="billingCountries" name="country" class="form-control form-control-md items" style="max-width: unset;">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>City *</label>
                                        <div class="select-box">
                                            <select id="billingcity" name="billing-city" class="form-control form-control-md" style="max-width: unset;">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Town *</label>
                                        <input type="text" class="form-control form-control-md" name="billing-town">
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Block *</label>
                                        <input type="text" class="form-control form-control-md" name="billing-block">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Street *</label>
                                        <input type="text" class="form-control form-control-md" name="billing-street">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>House # *</label>
                                        <input type="number" class="form-control form-control-md" name="billing-house">
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>Apartment # *</label>
                                        <input type="number" class="form-control form-control-md" name="billing-Apartment">
                                    </div>
                                </div>
                            </div>

                            <div id="checkout-shipping-section" class="d-none">
                                <h3 class="title billing-title text-uppercase ls-10 pt-1 pb-3 mb-0 mt-5">Shipping Address</h3>
                                <div class="form-checkbox d-flex align-items-center mb-3">
                                    <input type="checkbox" class="custom-checkbox" id="same-as-billing" checked>
                                    <label for="same-as-billing">Same as billing address</label>
                                </div>
                                <div id="shipping-address-fields">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Country *</label>
                                                <div class="select-box">
                                                    <select id="shippingCountries" name="shipping-country" class="form-control form-control-md items" style="max-width: unset;">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>City *</label>
                                                <div class="select-box">
                                                    <select id="shippingcity" name="shipping-city" class="form-control form-control-md" style="max-width: unset;">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Town *</label>
                                                <input type="text" class="form-control form-control-md" name="shipping-town">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Street *</label>
                                                <input type="text" class="form-control form-control-md" name="shipping-street">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>House # *</label>
                                                <input type="number" class="form-control form-control-md" name="shipping-house">
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Apartment # *</label>
                                                <input type="number" class="form-control form-control-md" name="shipping-Apartment">
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <div class="form-group">
                                                <label>Contact Phone * <em>only jordan</em></label>
                                                <div class="form-group divPhone2" style="border: solid 1px #eee; height: 44px;">
                                                    <input id="contact_phone" type="tel" name="shipping-phone" placeholder="" />
                                                    <input type="hidden" name="contact_full_phone" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="step-footer mt-4 d-flex justify-content-between">
                                <button type="button" class="btn btn-default btn-prev-step" onclick="prevStep(2)"><i class="w-icon-long-arrow-left"></i> Back</button>
                                <button type="button" class="btn btn-primary btn-next-step" onclick="nextStep(2)">Next <i class="w-icon-long-arrow-right"></i></button>
                            </div>
                        </div> <!-- End Step 2 -->

                        <div id="step-3" class="checkout-step" style="display: none;">
                            <h3 class="title billing-title text-uppercase ls-10 pt-1 pb-3 mb-0 mt-5">Order Notes</h3>

                            <div class="form-group  mt-3 mb-2">
                                <label for="order-notes">Order notes (optional)</label>
                                <textarea class="form-control mb-0" id="order-notes" name="order-notes" cols="30" rows="4" placeholder="Notes about your order, e.g special notes for delivery"></textarea>
                            </div>

                            <div class="step-footer mt-4 d-flex justify-content-start">
                                <button type="button" class="btn btn-default btn-prev-step" onclick="prevStep(3)"><i class="w-icon-long-arrow-left"></i> Back</button>
                            </div>
                        </div> <!-- End Step 3 -->
                        
                        <div class="form-group  mt-3">
                            <table class="shop-table cart-table">
                                <tbody class="productlist">
                                </tbody>
                            </table>
                        </div>

                        <div class="d-flex justify-content-end">
                            <div class="cart-action">
                                <a href="/shop" class="btn btn-dark btn-rounded btn-icon-left btn-shopping mr-auto  mt-1"><i class="w-icon-long-arrow-left"></i>Continue Shopping</a>
                                <a href="/cart.aspx" class="btn btn-dark btn-outline btn-rounded mb-1  mt-1"><i class="w-icon-cart pl-1 pr-1"></i>View Cart</a>
                            </div>
                        </div>
                    </div>
                        <div class="col-lg-5 mb-4">
                            <div class="order-summary-wrapper">
                                <h3 class="title text-uppercase ls-10">Your Order</h3>
                                    <div class="order-summary">
                                        <table class="order-table">
                                            <thead>
                                                <tr>
                                                    <th colspan="2">
                                                        <b>Product</b>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody class="CheckoutItems">
                                            </tbody>
                                            <tfoot>
                                                <tr class="order-promo-code-value">
                                                    <th>
                                                        <b>Promo Code</b>
                                                    </th>
                                                    <td>
                                                        <b><span>0</span></b>
                                                    </td>
                                                </tr>
                                                <tr class="order-total">
                                                    <th>
                                                        <b>Total</b>
                                                    </th>
                                                    <td>
                                                        <b><span></span></b>
                                                    </td>
                                                </tr>
                                                <tr class="order-promo-code">
                                                    <td colspan="2" style="padding-bottom: 1.5rem;">
                                                        <div class="d-flex justify-content-between align-items-center w-100">
                                                            <div style="text-align: start">
                                                                <b>Promo Code</b>
                                                            </div>
                                                            <div class="widget widget-search-form">
                                                                <div class="widget-body">
                                                                    <div action="#" method="GET" class="input-wrapper input-wrapper-inline">
                                                                        <input id="txtPromoCode" type="text" class="form-control mb-0" placeholder="Code" autocomplete="off" required="" style="border: 1px solid #eee;">
                                                                        <button type="button" class="btn btn-search" onclick="ApplyPromoCode();">Apply</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p class="promo-code d-none" style="margin-bottom: unset; text-align: start; color: red;">
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>

                                        <div class="payment-methods" id="payment_method">
                                            <h4 class="title font-weight-bold ls-25 pb-0 mb-1">Payment Methods</h4>
                                            <div class="accordion payment-accordion">
                                                <div class="card">
                                                    <div class="card-header">
                                                        <a href="#cash-on-delivery" class="collapse">Online Payments</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="final-submit-buttons" style="display: none;">
                                            <div class="form-group place-order pt-6">
                                                <button type="button" class="btn btn-dark btn-block btn-rounded" onclick="SubmitOrder();">Order Now</button>
                                            </div>
                                            <div id="BankTransferOrder" runat="server" class="form-group place-order pt-1">
                                                <button type="button" class="btn btn-dark btn-block btn-rounded" onclick="SubmitBankTransferOrder();">Bank Transfer</button>
                                            </div>
                                        </div>
                                        <div class="alert alert-icon alert-primary alert-bg alert-inline show-code-action mt-5">
                                            <h4 class="alert-title">
                                                <i class="w-icon-cog"></i>Cancellation Policy!</h4>
                                            Kabshak performs the ritual of slaughtering, whether a sacrifice or something else, and distributes and delivers it to chaste and needy destinations or families, through a specialized team, while adhering to the specified timeline, unless circumstances appear beyond its control.
Sharia laws stipulate that the buyer, once the purchase is completed and then the slaughtering process is completed by your ram, has no right to cancel or refund.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </main>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="head" runat="server">
    <script src="/assets/vendor/intlTelInput/intlTelInput.js"></script>
    <script src="/assets/js/checkout.js?v=3.2"></script>
    <script src="/assets/js/admin.js"></script>
    <style>
        .divPhone .iti, .divPhone2 .iti { width: 100%; display: block; }
        .divPhone input[type="tel"], .divPhone2 input[type="tel"] { height: 42px !important; border: none !important; background: transparent !important; margin: 0 !important; }
        
        /* Stepper CSS */
        .step-progress-bar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; padding: 0; }
        .step { display: flex; flex-direction: column; align-items: center; position: relative; z-index: 2; width: 60px; }
        .step-circle { width: 40px; height: 40px; border-radius: 50%; background-color: #f4f4f4; color: #999; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.4rem; margin-bottom: 0.5rem; transition: all 0.3s; border: 2px solid #eee; }
        .step.active .step-circle { background-color: #593930; color: #fff; border-color: #593930; }
        .step.completed .step-circle { background-color: #593930; color: #fff; border-color: #593930; }
        .step-text { font-size: 1.2rem; font-weight: 600; color: #777; text-align: center; white-space: nowrap; }
        .step.active .step-text, .step.completed .step-text { color: #593930; }
        .step-line { height: 3px; background-color: #eee; flex-grow: 1; position: relative; top: -12px; z-index: 1; transition: all 0.3s; }
        .step-line.completed { background-color: #593930; }
        .checkout-step { animation: fadeIn 0.4s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    </style>
</asp:Content>

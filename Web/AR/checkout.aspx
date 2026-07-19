<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="checkout.aspx.cs" Inherits="web.AR.checkout" %>

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

        .iti--allow-dropdown {
            border: unset;
            border-radius: 0.3em;
            margin-top: 1px;
            direction: ltr;
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
            window.location = "/ar/cart";
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
                    <li><a href="/home.aspx">الصفحة الرئيسية </a></li>
                    <li>
                        <h1 style="font-size: 13px; margin-bottom: unset;">الدفع</h1>
                    </li>
                </ul>
            </div>
        </nav>
        <nav class="breadcrumb-nav">
            <div class="container">
                <ul class="breadcrumb shop-breadcrumb bb-no" style="margin-top: unset;">
                    <li><a href="/ar/cart.aspx">عربة التسوق</a></li>
                    <li class="active"><a href="/ar/checkout.aspx">الدفع</a></li>
                    <li><a href="#" onclick="voidclick(); return false">أكتمال الطلب</a></li>
                </ul>
            </div>
        </nav>
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
        <div class="page-content">
            <div class="container">
                <div class="login-toggle">
                    <div class="alert alert-success alert-cart-product mb-2 d-none">
                        <i class="w-icon-account" style="font-size: 40px; padding: 15px;"></i>
                        <p class="mb-0 ls-normal"></p>
                        <a href="#" class="btn btn-link btn-close" aria-label="button"><i class="close-icon"></i></a>
                    </div>
                    الزبون العائد؟ <a href="#" class="show-login font-weight-bold text-uppercase text-dark">تسجيل الدخول</a>
                </div>
                <div class="login-content open" style="display: block;">
                    <p>
                        إذا كنت قد قمت بالتسوق معنا من قبل ، فيرجى تسجيل الدخول باستخدام الزر أدناه.
                             إذا كنت عميلاً جديدًا ، فيرجى المتابعة إلى تفاصيل الفاتورة.
                    </p>
                    <a href="/assets/ajax/login.html" class="ml-3 login sign-in btn" style="font-size: 1.1rem; font-weight: unset;">تسجيل الدخول</a>
                </div>
                <div class="form checkout-form" action="#" method="post">
                    <div class="row mb-9">
                        <div class="col-lg-7 pr-lg-4 mb-4">
                            <!-- Stepper UI -->
                            <div class="checkout-stepper mb-5">
                                <div class="step-progress-bar">
                                    <div class="step active" id="indicator-1">
                                        <div class="step-circle">1</div>
                                        <div class="step-text">معلومات الطلب</div>
                                    </div>
                                    <div class="step-line"></div>
                                    <div class="step" id="indicator-2">
                                        <div class="step-circle">2</div>
                                        <div class="step-text">العناوين</div>
                                    </div>
                                    <div class="step-line"></div>
                                    <div class="step" id="indicator-3">
                                        <div class="step-circle">3</div>
                                        <div class="step-text">ملاحظات</div>
                                    </div>
                                </div>
                            </div>

                            <div id="step-1" class="checkout-step">
                                <h3 class="title billing-title text-uppercase ls-10 pt-1 pb-3 mb-0">معلومات الطلب
                                </h3>
                            <div class="row gutter-sm">
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <label>الاسم الاول *</label>
                                        <input type="text" class="form-control form-control-md" name="firstname" required="">
                                    </div>
                                </div>
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <label>الاسم الاخير *</label>
                                        <input type="text" class="form-control form-control-md" name="lastname" required="">
                                    </div>
                                </div>
                            </div>
                            <div class="row gutter-sm">
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <label>عنوان البريد الإلكتروني *</label>
                                        <input type="email" class="form-control form-control-md" name="email" required="">
                                    </div>
                                </div>
                                <div class="col-xs-6">
                                    <div class="form-group">
                                        <label>رقم الهاتف *</label>
                                        <div class="form-group mb-6 divPhone" style="border: solid 1px #eee; height: 44px;">
                                            <input id="phone" type="tel" name="phone" placeholder="" />
                                            <input type="hidden" name="full_phone" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="step-footer mt-4 d-flex justify-content-end">
                                <button type="button" class="btn btn-primary btn-next-step" onclick="nextStep(1)">التالي <i class="w-icon-long-arrow-left"></i></button>
                            </div>
                        </div> <!-- End Step 1 -->

                        <div id="step-2" class="checkout-step" style="display: none;">
                            <h3 class="title billing-title text-uppercase ls-10 pt-1 pb-3 mb-0">عنوان وصول الفواتير
                            </h3>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>البلد *</label>
                                        <div class="select-box">
                                            <select id="billingCountries" name="country" class="form-control form-control-md" style="max-width: unset;">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>المدينة *</label>
                                        <div class="select-box">
                                            <select name="billing-city" class="form-control form-control-md" style="max-width: unset;">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>البلدة *</label>
                                        <input type="text" class="form-control form-control-md" name="billing-town">
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>بلوك *</label>
                                        <input type="text" class="form-control form-control-md" name="billing-block">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>الشارع *</label>
                                        <input type="text" class="form-control form-control-md" name="billing-street">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>البيت # *</label>
                                        <input type="number" class="form-control form-control-md" name="billing-house">
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>الشقة # *</label>
                                        <input type="number" class="form-control form-control-md" name="billing-Apartment">
                                    </div>
                                </div>
                            </div>
                            <div id="checkout-shipping-section" class="d-none">
                                <h3 class="title billing-title text-uppercase ls-10 pt-1 pb-3 mb-0 mt-5">عنوان الشحن</h3>
                                <div class="form-checkbox d-flex align-items-center mb-3">
                                    <input type="checkbox" class="custom-checkbox" id="same-as-billing" checked>
                                    <label for="same-as-billing">نفس عنوان الفواتير</label>
                                </div>
                                <div id="shipping-address-fields">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>البلد *</label>
                                                <div class="select-box">
                                                    <select id="shippingCountries" name="shipping-country" class="form-control form-control-md items" style="max-width: unset;">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>المدينة *</label>
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
                                                <label>المنطقة *</label>
                                                <input type="text" class="form-control form-control-md" name="shipping-town">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>الشارع *</label>
                                                <input type="text" class="form-control form-control-md" name="shipping-street">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>البيت # *</label>
                                                <input type="number" class="form-control form-control-md" name="shipping-house">
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>الشقة # *</label>
                                                <input type="number" class="form-control form-control-md" name="shipping-Apartment">
                                            </div>
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <div class="form-group">
                                                <label>رقم التواصل * <em>للأردن فقط</em></label>
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
                                <button type="button" class="btn btn-default btn-prev-step" onclick="prevStep(2)"><i class="w-icon-long-arrow-right"></i> السابق</button>
                                <button type="button" class="btn btn-primary btn-next-step" onclick="nextStep(2)">التالي <i class="w-icon-long-arrow-left"></i></button>
                            </div>
                        </div> <!-- End Step 2 -->

                        <div id="step-3" class="checkout-step" style="display: none;">
                            <h3 class="title billing-title text-uppercase ls-10 pt-1 pb-3 mb-0 mt-5">ملاحظات الطلب وتقطيع اللحوم</h3>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="product-cutting-notes">ملاحظات تقطيع اللحوم (اختياري)</label>
                                        <textarea class="form-control mb-0" id="product-cutting-notes" name="product-cutting-notes" cols="30" rows="4" placeholder="نحن نقدم خدمة اختيار الطريقة التي ترغب في تقطيع اللحم بها."></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group mt-3">
                                        <label for="order-notes">ملاحظات الطلب (اختياري)</label>
                                        <textarea class="form-control mb-2" id="order-notes" name="order-notes" cols="30" rows="4" placeholder="ملاحظات حول طلبك ، مثل ملاحظات خاصة للتسليم"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="step-footer mt-4 d-flex justify-content-start">
                                <button type="button" class="btn btn-default btn-prev-step" onclick="prevStep(3)"><i class="w-icon-long-arrow-right"></i> السابق</button>
                            </div>
                        </div> <!-- End Step 3 -->
                        
                        <div class="form-group mt-3">
                            <table class="shop-table cart-table">
                                <tbody class="productlist">
                                </tbody>
                            </table>
                        </div>

                        <div class="d-flex justify-content-end">
                            <div class="cart-action">
                                <a href="/ar/shop" class="btn btn-dark btn-rounded btn-icon-left btn-shopping mr-auto mt-1"><i class="w-icon-long-arrow-left" style="transform: rotate(180deg);"></i>مواصلة التسوق</a>
                                <a href="/ar/cart.aspx" class="btn btn-dark btn-outline btn-rounded mt-1"><i class="w-icon-cart pl-1 pr-1"></i>مشاهدة عربة التسوق</a>
                            </div>
                        </div>
                    </div>
                        <div class="col-lg-5 mb-4">
                            <div class="order-summary-wrapper">
                                <h3 class="title text-uppercase ls-10">طلبك</h3>
                                    <div class="order-summary">
                                        <table class="order-table">
                                            <thead>
                                                <tr>
                                                    <th colspan="2">
                                                        <b>المنتج</b>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody class="CheckoutItems">
                                            </tbody>
                                            <tfoot>
                                                <tr class="order-promo-code-value">
                                                    <th>
                                                        <b>الرمز الترويجي</b>
                                                    </th>
                                                    <td>
                                                        <b><span>0</span></b>
                                                    </td>
                                                </tr>
                                                <tr class="order-total">
                                                    <th>
                                                        <b>المجموع</b>
                                                    </th>
                                                    <td>
                                                        <b><span></span></b>
                                                    </td>
                                                </tr>
                                                <tr class="order-promo-code">
                                                    <td colspan="2" style="padding-bottom: 1.5rem;">
                                                        <div class="d-flex justify-content-between align-items-center w-100">
                                                            <div style="text-align: start">
                                                                <b>الرمز الترويجي</b>
                                                            </div>
                                                            <div class="widget widget-search-form">
                                                                <div class="widget-body">
                                                                    <div action="#" method="GET" class="input-wrapper input-wrapper-inline">
                                                                        <input id="txtPromoCode" type="text" class="form-control mb-0" placeholder="الرمز" autocomplete="off" required="" style="border: 1px solid #eee;">
                                                                        <button type="button" class="btn btn-search" onclick="ApplyPromoCode();">تطبيق</button>
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
                                            <h4 class="title font-weight-bold ls-25 pb-0 mb-1">طرق الدفع</h4>
                                            <div class="accordion payment-accordion">
                                                <div class="card">
                                                    <div class="card-header">
                                                        <a href="#cash-on-delivery" class="collapse">المدفوعات عبر الإنترنت</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="final-submit-buttons" style="display: none;">
                                            <div class="form-group place-order pt-6">
                                                <button type="button" class="btn btn-dark btn-block btn-rounded" onclick="SubmitOrder();">اطلب الان</button>
                                            </div>
                                            <div id="BankTransferOrder" runat="server" class="form-group place-order pt-1">
                                                <button type="button" class="btn btn-dark btn-block btn-rounded" onclick="SubmitBankTransferOrder();">تحويل بنكي</button>
                                            </div>
                                        </div>

                                        <div class="alert alert-icon alert-primary alert-bg alert-inline show-code-action mt-5">
                                            <h4 class="alert-title">
                                                <i class="w-icon-cog"></i>سياسة الإلغاء والاسترداد!</h4>
                                            تقوم كبشك بأداء نسك الذبح سواء اضحية او غيرها وتوزيعها وايصالها الى الجهات او الاسر العفيفة والمحتاجة وذلك من خلال فريق متخصص, مع الالتزام بالتوقيت الزمني المحدد ما لم تظهر ظروف خارجة عن ارادتها.
                                    وتنص القوانين الشرعية على ان المشتري بمجرد إتمام عملية الشراء ومن ثم إتمام عملية الذبح من قبل كبشك فلا يحق له الإلغاء او الاسترجاع. 
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
    <script src="/assets/js/checkout.js?v=3.1"></script>
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

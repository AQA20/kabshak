<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="cart.aspx.cs" Inherits="web.AR.cart" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadCss" runat="server">
    <meta name="robots" content="noindex,nofollow" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- Start of Main -->
    <main class="main cart">
        <nav class="breadcrumb-nav">
            <div class="container">
                <ul class="breadcrumb">
                    <li><a href="/home.aspx">الصفحة الرئيسية </a></li>
                    <li>
                        <h1 style="font-size: 13px; margin-bottom: unset;">عربة التسوق</h1>
                    </li>
                </ul>
            </div>
        </nav>
        <!-- Start of Breadcrumb -->
        <nav class="breadcrumb-nav">
            <div class="container">
                <ul class="breadcrumb shop-breadcrumb bb-no" style="margin-top: unset;">
                    <li class="active"><a href="/ar/cart.aspx">عربة التسوق </a></li>
                    <li><a href="/ar/checkout.aspx">الدفع </a></li>
                    <li><a href="#" onclick="voidclick(); return false">أكتمال الطلب </a></li>
                </ul>
            </div>
        </nav>
        <!-- End of Breadcrumb -->
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
        <!-- Start of PageContent -->
        <div class="page-content">
            <div class="container">
                <div class="row gutter-lg mb-10">
                    <div class="col-lg-8 pr-lg-4 mb-6">
                        <table class="shop-table cart-table">
                            <thead>
                                <tr>
                                    <th class="product-name"><span>المنتج</span></th>
                                    <th></th>
                                    <th class="product-price" style="text-align: unset;"><span>الكمية X السعر</span></th>
                                    <th class="product-subtotal" style="text-align: unset;"><span>المجموع الفرعي</span></th>
                                </tr>
                            </thead>
                            <tbody class="productlist">
                            </tbody>
                        </table>

                        <div class="cart-action mb-6">
                            <a href="/" class="btn btn-dark btn-rounded btn-icon-left btn-shopping mr-auto"><i class="w-icon-long-arrow-left" style="transform: rotate(180deg);"></i>مواصلة التسوق</a>
                            <button type="button" class="btn btn-rounded btn-default btn-clear" onclick="clearCart();" name="clear_cart" value="Clear Cart">مسح عربة التسوق</button>
                        </div>
                    </div>
                    <div class="col-lg-4 sticky-sidebar-wrapper">

                        <div class="sticky-sidebar">
                            <div class="cart-summary mb-4">
                                <h3 class="cart-title text-uppercase">إجماليات العربة</h3>
                                <div class="cart-subtotal d-flex align-items-center justify-content-between">
                                    <label class="ls-25">المجموع الفرعي</label>
                                    <span>0</span>
                                </div>

                                <hr class="divider">
                                <div class="order-total d-flex justify-content-between align-items-center">
                                    <label>المجموع</label>
                                    <span class="ls-50">0</span>
                                </div>
                                <a href="/ar/checkout.aspx"
                                    class="btn btn-block btn-dark btn-icon-right btn-rounded  btn-checkout">انتقل إلى الدفع<i class="w-icon-long-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End of PageContent -->
    </main>
    <!-- End of Main -->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="head" runat="server">
    <script src="/assets/js/cart.js"></script>
</asp:Content>

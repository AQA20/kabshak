<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="order.aspx.cs" Inherits="web.AR.order" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadCss" runat="server">
    <meta name="robots" content="noindex,nofollow" />
    <script>
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });

        if (params.Id == null || params.Id.trim() == '') {
            window.location = "/ar/cart";
        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main class="main order">
        <nav class="breadcrumb-nav">
            <div class="container">
                <ul class="breadcrumb">
                    <li><a href="/home.aspx">الصفحة الرئيسية</a></li>
                    <li>
                        <h1 style="font-size: 13px; margin-bottom: unset;">الطلب</h1>
                    </li>
                </ul>
            </div>
        </nav>
        <!-- Start of PageContent -->
        <div class="page-content mb-10 pb-2">
            <div class="container">
                <div class="order-success text-center font-weight-bolder text-dark">
                    <i class="fas fa-check"></i>
                    تفاصيل الطلب
                </div>
                <!-- End of Order Success -->

                <ul class="order-view list-style-none">
                    <li>
                        <label>رقم الطلب </label>
                        <strong class="orderId"></strong>
                    </li>
                    <li>
                        <label>الحالة </label>
                        <strong class="status"></strong>
                    </li>
                    <li>
                        <label>التاريخ </label>
                        <strong class="datetime"></strong>
                    </li>
                    <li>
                        <label>المجموع </label>
                        <strong class="total_price"></strong>
                    </li>

                </ul>
                <!-- End of Order View -->

                <div class="order-details-wrapper mb-5">
                    <h4 class="title text-uppercase ls-25 mb-5">تفاصيل الطلب</h4>
                    <table class="order-table">
                        <thead>
                            <tr>
                                <th class="text-dark">المنتج</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="Order-Items">
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>المجموع الفرعي:</th>
                                <td class="Subtotal"></td>
                            </tr>
                            <tr>
                                <th>الرمز الترويجي:</th>
                                <td class="PromoCode"></td>
                            </tr>
                            <tr class="total">
                                <th class="border-no">المجموع:</th>
                                <td class="border-no total_price"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <!-- End of Order Details -->
                <div class="order-details-wrapper order-Persons mb-5">
                    <h4 class="title text-uppercase ls-25 mb-5">منتجات التبرع</h4>
                    <table class="order-table">
                        <thead>
                            <tr>
                                <th class="text-dark">المنتجات</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="Person-Items">
                        </tbody>
                    </table>
                </div>

                <div class="order-details-wrapper order-shipping-Persons mb-5">
                    <h4 class="title text-uppercase ls-25 mb-5">منتجات الشحن</h4>
                    <table class="order-table">
                        <thead>
                            <tr>
                                <th class="text-dark">المنتجات</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="Person-shipping-Items">
                        </tbody>
                    </table>
                </div>
                <!-- End of Sub Orders-->

                <div id="account-addresses">
                    <div class="row">
                        <div class="col-sm-6 mb-2">
                            <div class="ecommerce-address billing-address">
                                <h4 class="title title-underline ls-25 font-weight-bold">عنوان إرسال الفواتير</h4>
                                <address class="mb-4">
                                    <table class="billing-address-table address-table">
                                        <tbody>
                                            <tr>
                                                <th>الاسم الكامل: </th>
                                                <td class="name"></td>
                                            </tr>
                                            <tr>
                                                <th>الجوال: </th>
                                                <td class="mobile"></td>
                                            </tr>
                                            <tr>
                                                <th>البريد الإلكتروني: </th>
                                                <td class="email"></td>
                                            </tr>
                                            <tr>
                                                <th>البلد: </th>
                                                <td class="billing-country"></td>
                                            </tr>
                                            <tr>
                                                <th>المدينة: </th>
                                                <td class="billing-city"></td>
                                            </tr>
                                            <tr>
                                                <th>البلدة: </th>
                                                <td class="billing-town"></td>
                                            </tr>
                                            <tr>
                                                <th>بلوك: </th>
                                                <td class="billing-block"></td>
                                            </tr>
                                            <tr>
                                                <th>الشارع: </th>
                                                <td class="billing-street"></td>
                                            </tr>
                                            <tr>
                                                <th>البيت: </th>
                                                <td class="billing-house"></td>
                                            </tr>
                                            <tr>
                                                <th>الشقة: </th>
                                                <td class="billing-Apartment"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </address>
                            </div>
                        </div>
                        <div class="col-sm-6 mb-8">
                            <div class="ecommerce-address shipping-address">
                                <h4 class="title title-underline ls-25 font-weight-bold">تفاصيل أخرى</h4>
                                <address class="mb-4">
                                    <table class="shipping-address-table address-table">
                                        <tbody>
                                            <tr>
                                                <th>البلد:</th>
                                                <td class="shipping-country"></td>
                                            </tr>
                                            <tr>
                                                <th>المدينة:</th>
                                                <td class="shipping-city"></td>
                                            </tr>
                                            <tr>
                                                <th>البلدة:</th>
                                                <td class="shipping-town"></td>
                                            </tr>
                                            <tr>
                                                <th>بلوك:</th>
                                                <td class="shipping-block"></td>
                                            </tr>
                                            <tr>
                                                <th>الشارع:</th>
                                                <td class="shipping-street"></td>
                                            </tr>
                                            <tr>
                                                <th>البيت:</th>
                                                <td class="shipping-house"></td>
                                            </tr>
                                            <tr>
                                                <th>الشقة:</th>
                                                <td class="shipping-Apartment"></td>
                                            </tr>
                                            <tr>
                                                <th>رقم التواصل:</th>
                                                <td class="shipping-phone"></td>
                                            </tr>
                                            <tr>
                                                <th>ملاحظات الطلب:</th>
                                                <td class="notes"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </address>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- End of Account Address -->
                <div class="order-details-wrapper order-Tracking mb-5">
                    <h4 class="title text-uppercase ls-25 mb-5">تتبع الطلب</h4>
                    <table class="order-table">
                        <thead>
                            <tr>
                                <th class="text-dark">الإجراءات</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="Transaction-Items">
                        </tbody>
                    </table>
                </div>

                <div class="OrderNow alert alert-success alert-cart-product mb-2">
                    <a href="#" class="btn btn-success btn-rounded btnOrderNow">أطلب الأن</a>
                    <p class="mb-0 ls-normal">ادفع باستخدام خدمة الدفع الإلكتروني.</p>
                    <a href="#" class="btn btn-link btn-close" aria-label="button"><i class="close-icon"></i></a>
                </div>

                <div class="order-details-wrapper order-Tracking mb-5 TransactionSection">
                    <h4 class="title text-uppercase ls-25 mb-5">معاملات الدفع</h4>
                    <table class="shop-table wishlist-table">
                        <thead>
                            <tr>
                                <th class="product-stock-status" style="text-align: unset;"><span>النتيجة</span></th>
                                <th class="product-stock-status" style="text-align: unset;"><span>المرجع</span></th>
                                <th class="product-stock-status" style="text-align: unset;"><span>التاريخ</span></th>
                                <th class="product-stock-status" style="text-align: unset;"><span>القيمة</span></th>
                            </tr>
                        </thead>
                        <tbody class="TransactionsList">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- End of PageContent -->
    </main>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="head" runat="server">
    <script src="/assets/js/order-details.js"></script>
</asp:Content>

<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="order.aspx.cs" Inherits="web.order" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadCss" runat="server">
    <meta name="robots" content="noindex,nofollow" />
    <script>
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });

        if (params.Id == null || params.Id.trim() == '') {
            window.location = "/cart";
        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main class="main order">
        <nav class="breadcrumb-nav">
            <div class="container">
                <ul class="breadcrumb">
                    <li><a href="/home.aspx">Home</a></li>
                    <li>
                        <h1 style="font-size: 13px; margin-bottom: unset;">Order Complete</h1>
                    </li>
                </ul>
            </div>
        </nav>
        <!-- Start of PageContent -->
        <div class="page-content mb-10 pb-2  mt-5">
            <div class="container">
                <div class="order-success text-center font-weight-bolder text-dark">
                    <i class="fas fa-check"></i>
                    Order Details.
                </div>
                <!-- End of Order Success -->

                <ul class="order-view list-style-none">
                    <li>
                        <label>Order number</label>
                        <strong class="orderId"></strong>
                    </li>
                    <li>
                        <label>Status</label>
                        <strong class="status"></strong>
                    </li>
                    <li>
                        <label>Date</label>
                        <strong class="datetime"></strong>
                    </li>
                    <li>
                        <label>Total</label>
                        <strong class="total_price"></strong>
                    </li>

                </ul>
                <!-- End of Order View -->

                <div class="order-details-wrapper mb-5">
                    <h4 class="title text-uppercase ls-25 mb-5">Order Details</h4>
                    <table class="order-table">
                        <thead>
                            <tr>
                                <th class="text-dark">Products</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="Order-Items">
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Subtotal:</th>
                                <td class="Subtotal"></td>
                            </tr>
                            <tr>
                                <th>Promo Code:</th>
                                <td class="PromoCode"></td>
                            </tr>
                            <tr class="total">
                                <th class="border-no">Total:</th>
                                <td class="border-no total_price"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <!-- End of Order Details -->
                <!-- End of Sub Orders-->
                <!-- End of Account Address -->
                <div class="order-details-wrapper order-Persons mb-5">
                    <h4 class="title text-uppercase ls-25 mb-5">Donation Products</h4>
                    <table class="order-table">
                        <thead>
                            <tr>
                                <th class="text-dark">Products</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="Person-Items">
                        </tbody>
                    </table>
                </div>

                <div class="order-details-wrapper order-shipping-Persons mb-5">
                    <h4 class="title text-uppercase ls-25 mb-5">Shipping Products</h4>
                    <table class="order-table">
                        <thead>
                            <tr>
                                <th class="text-dark">Products</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="Person-shipping-Items">
                        </tbody>
                    </table>
                </div>

                <div id="account-addresses">
                    <div class="row">
                        <div class="col-sm-6 mb-2">
                            <div class="ecommerce-address billing-address">
                                <h4 class="title title-underline ls-25 font-weight-bold">Billing Address</h4>
                                <address class="mb-4">
                                    <table class="billing-address-table address-table">
                                        <tbody>
                                            <tr>
                                                <th>Full Name:</th>
                                                <td class="name"></td>
                                            </tr>
                                            <tr>
                                                <th>Mobile:</th>
                                                <td class="mobile"></td>
                                            </tr>
                                            <tr>
                                                <th>Email:</th>
                                                <td class="email"></td>
                                            </tr>
                                            <tr>
                                                <th>Country:</th>
                                                <td class="billing-country"></td>
                                            </tr>
                                            <tr>
                                                <th>City:</th>
                                                <td class="billing-city"></td>
                                            </tr>
                                            <tr>
                                                <th>Town:</th>
                                                <td class="billing-town"></td>
                                            </tr>
                                            <tr>
                                                <th>Block:</th>
                                                <td class="billing-block"></td>
                                            </tr>
                                            <tr>
                                                <th>Street:</th>
                                                <td class="billing-street"></td>
                                            </tr>
                                            <tr>
                                                <th>House:</th>
                                                <td class="billing-house"></td>
                                            </tr>
                                            <tr>
                                                <th>Apartment:</th>
                                                <td class="billing-Apartment"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </address>
                            </div>
                        </div>
                        <div class="col-sm-6 mb-8">
                            <div class="ecommerce-address shipping-address">
                                <h4 class="title title-underline ls-25 font-weight-bold">Other Details</h4>
                                <address class="mb-4">
                                    <table class="shipping-address-table address-table">
                                        <tbody>
                                            <tr>
                                                <th>Country:</th>
                                                <td class="shipping-country"></td>
                                            </tr>
                                            <tr>
                                                <th>City:</th>
                                                <td class="shipping-city"></td>
                                            </tr>
                                            <tr>
                                                <th>Town:</th>
                                                <td class="shipping-town"></td>
                                            </tr>
                                            <tr>
                                                <th>Block:</th>
                                                <td class="shipping-block"></td>
                                            </tr>
                                            <tr>
                                                <th>Street:</th>
                                                <td class="shipping-street"></td>
                                            </tr>
                                            <tr>
                                                <th>House:</th>
                                                <td class="shipping-house"></td>
                                            </tr>
                                            <tr>
                                                <th>Apartment:</th>
                                                <td class="shipping-Apartment"></td>
                                            </tr>
                                            <tr>
                                                <th>Contact Number:</th>
                                                <td class="shipping-phone"></td>
                                            </tr>
                                            <tr>
                                                <th>Order Notes:</th>
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
                    <h4 class="title text-uppercase ls-25 mb-5">Order Tracking</h4>
                    <table class="order-table">
                        <thead>
                            <tr>
                                <th class="text-dark">Actions</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="Transaction-Items">
                        </tbody>
                    </table>
                </div>

                <div class="OrderNow alert alert-success alert-cart-product mb-2">
                    <a href="#" class="btn btn-success btn-rounded btnOrderNow">Order Now</a>
                    <p class="mb-0 ls-normal">Pay with the e-payment service.</p>
                    <a href="#" class="btn btn-link btn-close" aria-label="button"><i class="close-icon"></i></a>
                </div>

                <div class="order-details-wrapper order-Tracking mb-5 TransactionSection">
                    <h4 class="title text-uppercase ls-25 mb-5">Payment Transactions</h4>
                    <table class="shop-table wishlist-table">
                        <thead>
                            <tr>
                                <th class="product-stock-status" style="text-align: unset;"><span>Result</span></th>
                                <th class="product-stock-status" style="text-align: unset;"><span>Ref</span></th>
                                <th class="product-stock-status" style="text-align: unset;"><span>Date</span></th>
                                <th class="product-stock-status" style="text-align: unset;"><span>Amount</span></th>
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

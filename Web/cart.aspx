<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="cart.aspx.cs" Inherits="web.cart" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadCss" runat="server">
    <meta name="robots" content="noindex,nofollow" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <!-- Start of Main -->
    <main class="main cart">
        <nav class="breadcrumb-nav">
            <div class="container">
                <ul class="breadcrumb">
                    <li><a href="/home.aspx">Home</a></li>
                    <li>
                        <h1 style="font-size: 13px; margin-bottom: unset;">Cart</h1>
                    </li>
                </ul>
            </div>
        </nav>
        <!-- Start of Breadcrumb -->
        <nav class="breadcrumb-nav">
            <div class="container">
                <ul class="breadcrumb shop-breadcrumb bb-no" style="margin-top: unset;">
                    <li class="active"><a href="cart.aspx">Shopping Cart</a></li>
                    <li><a href="checkout.aspx">Checkout</a></li>
                    <li><a href="#" onclick="voidclick(); return false">Order Complete</a></li>
                </ul>
            </div>
        </nav>
        <!-- End of Breadcrumb -->
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
        <!-- Start of PageContent -->
        <div class="page-content">
            <div class="container">
                <div class="row gutter-lg mb-10">
                    <div class="col-lg-8 pr-lg-4 mb-6">
                        <table class="shop-table cart-table">
                            <thead>
                                <tr>
                                    <th class="product-name"><span>Product</span></th>
                                    <th></th>
                                    <th class="product-price" style="text-align: unset;"><span>Quantity * Price</span></th>
                                    <th class="product-subtotal" style="text-align: unset;"><span>Subtotal</span></th>
                                </tr>
                            </thead>
                            <tbody class="productlist">
                            </tbody>
                        </table>

                        <div class="cart-action mb-6">
                            <a href="/home" class="btn btn-dark btn-rounded btn-icon-left btn-shopping mr-auto"><i class="w-icon-long-arrow-left"></i>Continue Shopping</a>
                            <button type="button" class="btn btn-rounded btn-default btn-clear" onclick="clearCart();" name="clear_cart" value="Clear Cart">Clear Cart</button>
                        </div>
                    </div>
                    <div class="col-lg-4 sticky-sidebar-wrapper">
                        <div class="sticky-sidebar">
                            <div class="cart-summary mb-4">
                                <h3 class="cart-title text-uppercase">Cart Totals</h3>
                                <div class="cart-subtotal d-flex align-items-center justify-content-between">
                                    <label class="ls-25">Subtotal</label>
                                    <span>0</span>
                                </div>

                                <hr class="divider">
                                <div class="order-total d-flex justify-content-between align-items-center">
                                    <label>Total</label>
                                    <span class="ls-50">0</span>
                                </div>
                                <a href="checkout.aspx"
                                    class="btn btn-block btn-dark btn-icon-right btn-rounded  btn-checkout">Proceed to checkout<i class="w-icon-long-arrow-right"></i></a>
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

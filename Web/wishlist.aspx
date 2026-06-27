<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="wishlist.aspx.cs" Inherits="web.wishlist" %>
<asp:Content ID="Content3" ContentPlaceHolderID="HeadCss" runat="server">
    <meta name="robots" content="noindex,nofollow" />
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main class="main wishlist-page" style="min-height: 700px;">
        <!-- Start of Breadcrumb -->
        <nav class="breadcrumb-nav mb-4">
            <div class="container">
                <ul class="breadcrumb">
                    <li><a href="/home.aspx">Home</a></li>
                    <li>Wishlist</li>
                </ul>
            </div>
        </nav>
        <!-- End of Breadcrumb -->

        <!-- Start of PageContent -->
        <div class="page-content">
            <div class="container">
                <h1 class="wishlist-title">My wishlist</h1>
                <table class="shop-table wishlist-table">
                    <thead>
                        <tr>
                            <th class="product-name"><span>Product</span></th>
                            <th></th>
                            <th class="product-price" style="text-align: unset;"><span>Price</span></th>
                            <th class="product-stock-status" style="text-align: unset;"><span>Stock Status</span></th>
                            <th class="wishlist-action">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="productsList">
                       
                    </tbody>
                </table>
                <div class="toolbox toolbox-pagination justify-content-between  mb-10">
                    <p class="showing-info mb-2 mb-sm-0">Showing<span class="Records">0</span>Products</p>
                </div>
            </div>
        </div>
        <!-- End of PageContent -->
    </main>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
       <script src="/assets/js/wishlist.js?v=2.0"></script>
</asp:Content>

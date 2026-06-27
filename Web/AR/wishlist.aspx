<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="wishlist.aspx.cs" Inherits="web.AR.wishlist" %>
<asp:Content ID="Content3" ContentPlaceHolderID="HeadCss" runat="server">
    <meta name="robots" content="noindex,nofollow" />
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main class="main wishlist-page" style="min-height: 700px;">
        <!-- Start of Breadcrumb -->
        <nav class="breadcrumb-nav mb-4">
            <div class="container">
               <ul class = "breadcrumb">
                     <li> <a href="/home.aspx"> الصفحة الرئيسية </a> </li>
                     <li> قائمة المفضلة</ li>
                 </ul>
            </div>
        </nav>
        <!-- End of Breadcrumb -->

        <!-- Start of PageContent -->
        <div class="page-content">
            <div class="container">
                <h1 class="wishlist-title">قائمتي المفضلة</h1>
                <table class="shop-table wishlist-table">
                    <thead>
                        <tr>
                            <th class="product-name"><span>المنتج</span></th>
                            <th></th>
                            <th class="product-price" style="text-align: unset;"><span>السعر</span></th>
                            <th class="product-stock-status" style="text-align: unset;"><span>حالة المخزون</span></th>
                            <th class="wishlist-action">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody class="productsList">
                       
                    </tbody>
                </table>
                <div class="toolbox toolbox-pagination justify-content-between  mb-10">
                    <p class="showing-info mb-2 mb-sm-0">عرض<span class="Records">0</span>منتج</p>
                </div>
            </div>
        </div>
        <!-- End of PageContent -->
    </main>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
       <script src="/assets/js/wishlist.js?v=2.0"></script>
</asp:Content>

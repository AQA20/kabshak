<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="brands.aspx.cs" Inherits="web.admin.brands" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadCss" runat="server">
    <meta name="robots" content="noindex,nofollow" />
    <link href="/assets/vendor/quill/quill.css" rel="stylesheet" />
    <style>
        th {
            text-align: left;
        }

        #account-orders .account-orders-table .order-id {
            width: 11.77% !important;
        }

        .text-danger {
            color: #cc0001 !important;
        }

        .ql-editor {
            min-height: 300px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="my-account loaded">
        <div class="page-wrapper">
            <main class="main">
                <!-- Start of Breadcrumb -->

                <nav class="breadcrumb-nav">
                    <div class="container">
                        <ul class="breadcrumb">
                            <li><a href="/admin/dashboard.aspx">Admin Dashboard</a></li>
                            <li><h1 style="font-size: 13px; margin-bottom: unset;">Brands</h1> </li>
                        </ul>
                    </div>
                </nav>
                <!-- End of Breadcrumb -->

                <!-- Start of PageContent -->
                <div class="page-content pt-2">
                    <div class="container">
                        <div class="tab tab-vertical row gutter-lg">
                            <ul class="nav nav-tabs mb-6" role="tablist">
                                <li class="nav-item">
                                    <a id="lnkBrandsList" href="#account-orders" class="nav-link active">Brands List</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#account-downloads" class="nav-link">Add a New Brand</a>
                                </li>
                                <li class="nav-item d-none">
                                    <a id="lnkEditBrand" href="#account-brand" class="nav-link">Edit Brand</a>
                                </li>
                            </ul>

                            <div class="tab-content mb-6">
                                <div class="tab-pane active in" id="account-orders">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <span class="icon-box-icon icon-orders">
                                            <i class="w-icon-list"></i>
                                        </span>
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title text-capitalize ls-normal mb-0">Brands</h4>
                                        </div>
                                    </div>
                                    <div class="result">
                                        <table class="shop-table wishlist-table">
                                            <thead>
                                                <tr>
                                                    <th class="product-name"><span>Item Info</span></th>
                                                    <th></th>
                                                    <th class="product-price" style="text-align: unset;"><span>Status</span></th>
                                                    <th class="product-stock-status" style="text-align: unset;"><span>Date</span></th>
                                                    <th class="wishlist-action">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody class="productsList">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div class="tab-pane" id="account-downloads">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <span class="icon-box-icon icon-downloads mr-2">
                                            <i class="w-icon-plus"></i>
                                        </span>
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title ls-normal">Add a New Brand</h4>
                                        </div>
                                    </div>

                                    <div class="row gutter-md">
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" placeholder="Brand Name" id="txtBrandNameEn">
                                        </div>
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" dir="rtl" placeholder="اسم العلامة التجارية" id="txtBrandNameAr">
                                        </div>
                                    </div>
                                    <div class="icon-box-content mt-4">
                                        <label for="rating">Description (English) :</label>
                                    </div>
                                    <div id="editorEn">
                                    </div>
                                    <div class="icon-box-content mt-4" dir="rtl">
                                        <label for="rating">الوصف (العربية):</label>
                                    </div>
                                    <div id="editorAr">
                                    </div>
                                    <div class="icon-box-content mt-4">
                                        <label for="upImage">Brand Logo:</label>
                                    </div>
                                    <div class="icon-box-content d-flex">
                                        <input type="file" class="form-control-file" id="upImage" style="padding: 7px; width: 100%; border-radius: 0.25rem;" imagevalue="">
                                        <a href="#" onclick="voidclick(); return false">
                                            <figure>
                                                <img src="#" alt="product" width="300" height="338" class="logoImg d-none">
                                            </figure>
                                        </a>
                                    </div>
                                    <div id="lblUploadLogoError" class="col-md-6 d-none">
                                        <div class="alert alert-icon alert-error alert-bg alert-inline show-code-action">
                                            <h4 class="alert-title">
                                                <i class="w-icon-times-circle"></i>Sorry!</h4>
                                            The accepted image is jpg | jpeg | png | gif
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4" onclick="SaveBrandInfo();">Save Brand</button>
                                </div>

                                <div class="tab-pane" id="account-brand">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <span class="icon-box-icon icon-downloads mr-2">
                                            <i class="w-icon-cog"></i>
                                        </span>
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title ls-normal">Edit Brand Info</h4>
                                        </div>
                                    </div>

                                    <div class="row gutter-md">
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" placeholder="Brand Name" id="txtEditBrandNameEn">
                                        </div>
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" dir="rtl" placeholder="اسم العلامة التجارية" id="txtEditBrandNameAr">
                                        </div>
                                    </div>
                                    <div class="icon-box-content mt-4">
                                        <label for="rating">Description (English) :</label>
                                    </div>
                                    <div id="EditeditorEn">
                                    </div>
                                    <div class="icon-box-content mt-4" dir="rtl">
                                        <label for="rating">الوصف (العربية):</label>
                                    </div>
                                    <div id="EditeditorAr">
                                    </div>
                                    <div class="icon-box-content mt-4">
                                        <label for="upImage">Brand Logo:</label>
                                    </div>
                                    <div class="icon-box-content d-flex">
                                        <input type="file" class="form-control-file" id="upEditImage2" style="padding: 7px; width: 100%; border-radius: 0.25rem;" imagevalue="">
                                        <a href="#" onclick="voidclick(); return false">
                                            <figure>
                                                <img src="#" alt="product" width="300" height="338" class="logoImg2 d-none">
                                            </figure>
                                        </a>
                                    </div>
                                    <div id="lblUploadEditLogoError2" class="col-md-6 d-none">
                                        <div class="alert alert-icon alert-error alert-bg alert-inline show-code-action">
                                            <h4 class="alert-title">
                                                <i class="w-icon-times-circle"></i>Sorry!</h4>
                                            The accepted image is jpg | jpeg | png | gif
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4 EditBrandInfo">Edit Brand</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End of PageContent -->
            </main>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="head" runat="server">
    <script src="/assets/vendor/quill/quill.js"></script>
    <script src="/assets/js/admin.js"></script>
    <script src="/assets/js/brands.js"></script>
</asp:Content>

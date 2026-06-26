<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="categories.aspx.cs" Inherits="web.admin.categories" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadCss" runat="server">
    <meta name="robots" content="noindex,nofollow" />
    <style>
        th {
            text-align: left;
        }

        .text-danger {
            color: #cc0001 !important;
        }

        .btn-quickview {
            margin-left: 2px !important;
            margin-right: 2px !important;
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
                            <li>
                                <h1 style="font-size: 13px; margin-bottom: unset;">Categories</h1>
                            </li>
                        </ul>
                    </div>
                </nav>

                <!-- Start of PageContent -->
                <div class="page-content pt-2">
                    <div class="container">
                        <div class="tab tab-vertical row gutter-lg">
                            <ul class="nav nav-tabs mb-6" role="tablist">
                                <li class="nav-item">
                                    <a id="lnkCategoriesList" href="#account-orders" class="nav-link active">Categories List</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#account-downloads" class="nav-link">Add a New Category</a>
                                </li>
                                <li class="nav-item d-none">
                                    <a id="lnkEditCategory" href="#account-brand" class="nav-link">Edit</a>
                                </li>
                            </ul>

                            <div class="tab-content mb-6">
                                <div class="tab-pane active in" id="account-orders">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <span class="icon-box-icon icon-orders">
                                            <i class="w-icon-list"></i>
                                        </span>
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title text-capitalize ls-normal mb-0">Categories</h4>
                                        </div>
                                    </div>
                                    <div class="result">
                                        <table class="shop-table wishlist-table">
                                            <thead>
                                                <tr>
                                                    <th class="product-name"><span>Item Info</span></th>
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
                                            <h4 class="icon-box-title ls-normal">Add a New Category</h4>
                                        </div>
                                    </div>

                                    <div class="row gutter-md">
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" placeholder="Category Name" id="txtCategoryNameEn">
                                        </div>
                                        <div class="col-md-6"></div>
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" dir="rtl" placeholder="اسم الفئة" id="txtCategoryNameAr">
                                        </div>
                                        <div class="col-md-6"></div>

                                    </div>

                                    <div class="icon-box-content mt-4">
                                        <label for="upImage">Category Logo:</label>
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
                                    <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4" onclick="SaveCategoryInfo();">Save Category</button>
                                </div>

                                <div class="tab-pane" id="account-brand">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <span class="icon-box-icon icon-downloads mr-2">
                                            <i class="w-icon-cog"></i>
                                        </span>
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title ls-normal">Edit Category Info</h4>
                                        </div>
                                    </div>

                                    <div class="row gutter-md">
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" placeholder="Category Name" id="txtEditCategoryNameEn">
                                        </div>
                                        <div class="col-md-6"></div>
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" dir="rtl" placeholder="اسم الفئة" id="txtEditCategoryNameAr">
                                        </div>
                                        <div class="col-md-6"></div>
                                    </div>
                                         <div class="icon-box-content mt-4">
                                        <label for="upImage">Category Logo:</label>
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
                                    <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4 EditCategoryInfo">Edit Category</button>
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
    <script src="/assets/js/admin.js"></script>
    <script src="/assets/js/categories.js"></script>
</asp:Content>

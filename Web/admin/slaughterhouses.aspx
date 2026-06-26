<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="slaughterhouses.aspx.cs" Inherits="vape.admin.slaughterhouses" %>

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
                            <li class="breadcrumb-name">
                                <h1 style="font-size: 13px; margin-bottom: unset;">Slaughterhouses</h1>
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
                                    <a id="lnkCategoriesList" href="#account-orders" class="nav-link active">Slaughterhouses List</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#account-downloads" class="nav-link">Add a New Slaughterhouse</a>
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
                                            <h4 class="icon-box-title text-capitalize ls-normal mb-0">Slaughterhouses</h4>
                                        </div>
                                    </div>
                                    <div class="result">
                                        <table class="shop-table wishlist-table">
                                            <thead>
                                                <tr>
                                                    <th class="product-name"><span>Item Info</span></th>
                                                    <th class="product-price product-country" style="text-align: unset;"><span>Country</span></th>
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
                                            <h4 class="icon-box-title ls-normal">Add a New Slaughterhouse</h4>
                                        </div>
                                    </div>

                                    <div class="row gutter-md">
                                        <div class="col-md-6 mt-2">
                                            <div class="form-group">
                                                <label>Country *</label>
                                                <div class="select-box">
                                                    <select id="Countries" name="country" class="form-control form-control-md items" style="max-width: unset;">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6"></div>
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" placeholder="Slaughterhouse Name" id="txtSlaughterhouseNameEn">
                                        </div>
                                        <div class="col-md-6"></div>
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" dir="rtl" placeholder="اسم المسلخ" id="txtSlaughterhouseNameAr">
                                        </div>
                                        <div class="col-md-6"></div>
                                        <div class="col-md-12 mt-2">
                                            <textarea class="form-control" placeholder="Slaughterhouse Description" id="txtSlaughterhouseDescriptionEn" style="height: 200px;"></textarea>
                                        </div>
                                        <div class="col-md-12 mt-2">
                                            <textarea class="form-control" dir="rtl" placeholder="وصف المسلخ" id="txtSlaughterhouseDescriptionAr" style="height: 200px;"></textarea>
                                        </div>
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" placeholder="Address Details" id="txtAddressDetailsEn">
                                        </div>
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" dir="rtl" placeholder="العنوان بالتفاصيل" id="txtAddressDetailsAr">
                                        </div>
                                         <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" placeholder="Email" id="txtEmail">
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4" onclick="SaveSlaughterhouseInfo();">Save Slaughterhouse</button>
                                </div>

                                <div class="tab-pane" id="account-brand">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <span class="icon-box-icon icon-downloads mr-2">
                                            <i class="w-icon-cog"></i>
                                        </span>
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title ls-normal">Edit Slaughterhouse Info</h4>
                                        </div>
                                    </div>

                                    <div class="row gutter-md">
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" placeholder="Slaughterhouse Name" id="txtEditSlaughterhouseNameEn">
                                        </div>
                                        <div class="col-md-6"></div>
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" dir="rtl" placeholder="اسم المسلخ" id="txtEditSlaughterhouseNameAr">
                                        </div>
                                        <div class="col-md-6"></div>
                                        <div class="col-md-12 mt-2">
                                            <textarea class="form-control" placeholder="Slaughterhouse Description" id="txtEditSlaughterhouseDescriptionEn" style="height: 200px;"></textarea>
                                        </div>
                                        <div class="col-md-12 mt-2">Slaughterhouses
                                            <textarea class="form-control" dir="rtl" placeholder="وصف المسلخ" id="txtEditSlaughterhouseDescriptionAr" style="height: 200px;"></textarea>
                                        </div>
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" placeholder="Address Details" id="txtEditAddressDetailsEn">
                                        </div>
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" dir="rtl" placeholder="العنوان بالتفاصيل" id="txtEditAddressDetailsAr">
                                        </div>
                                         <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" placeholder="Email" id="txtEditEmail">
                                        </div>
                                    </div>

                                    <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4 EditSlaughterhouseInfo">Edit Slaughterhouse</button>
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
    <script src="/assets/js/admin-slaughterhouses.js"></script>
</asp:Content>

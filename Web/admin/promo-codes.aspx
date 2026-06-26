<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="promo-codes.aspx.cs" Inherits="web.admin.promo_codes" %>

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
                <nav class="breadcrumb-nav">
                    <div class="container">
                        <ul class="breadcrumb">
                            <li><a href="/admin/dashboard.aspx">Admin Dashboard</a></li>
                            <li class="breadcrumb-name">
                                <h1 style="font-size: 13px; margin-bottom: unset;">Promo Codes List</h1>
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
                                    <a id="lnkCategoriesList" href="#account-orders" class="nav-link active">Codes List</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#account-downloads" class="nav-link">Add a New Code</a>
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
                                            <h4 class="icon-box-title text-capitalize ls-normal mb-0">Promo Codes</h4>
                                        </div>
                                    </div>
                                    <div class="result">
                                        <table class="shop-table wishlist-table">
                                            <thead>
                                                <tr>
                                                    <th class="product-name"><span>Item Info</span></th>
                                                    <th class="product-price" style="text-align: unset;"><span>Status</span></th>
                                                    <th class="product-stock-status" style="text-align: unset;"><span>Date</span></th>
                                                    <th class="wishlist-Size">Promo Codes</th>
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
                                            <h4 class="icon-box-title ls-normal">Add a New Code</h4>
                                        </div>
                                    </div>

                                    <div class="row gutter-md">
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" placeholder="Code" id="txtCode">
                                        </div>
                                        <div class="col-md-6"></div>
                                        <div class="col-md-6 mt-2">
                                            <input id="txtStartDate" type="tel" maxlength="10" placeholder="dd/mm/yyyy" class="form-control"
                                                oninput="this.value = DDMMYYYY(this.value, event)" />
                                        </div>
                                        <div class="col-md-6 mt-2">
                                            <input id="txtEndDate" type="tel" maxlength="10" placeholder="dd/mm/yyyy" class="form-control"
                                                oninput="this.value = DDMMYYYY(this.value, event)" />
                                        </div>
                                        <div class="col-md-12">
                                            <h5 class="mt-3 mb-1">Financial Details</h5>
                                        </div>
                                        <div class="col-md-6 mt-2">
                                            <label>Discount Value (%)</label>
                                            <input type="number" class="form-control" placeholder="Dicount" id="txtDiscount" value="0" min="0">
                                        </div>
                                        <div class="col-md-6 mt-2">
                                            <label>Fix Value (USD)</label>
                                            <input type="number" class="form-control" placeholder="Fix Value" id="txtFixPrice" value="0" min="0">
                                        </div>
                                        <div class="col-md-6 mt-2">
                                            <label>Min Invoice (USD)</label>
                                            <input type="number" class="form-control" placeholder="Min Invoice" id="txtMinInvoice" value="0" min="0">
                                        </div>
                                        <div class="col-md-6"></div>
                                    </div>
                                    <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4" onclick="SaveCodeInfo();">Save Code</button>
                                </div>

                                <div class="tab-pane" id="account-brand">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <span class="icon-box-icon icon-downloads mr-2">
                                            <i class="w-icon-cog"></i>
                                        </span>
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title ls-normal">Edit Code Info</h4>
                                        </div>
                                    </div>

                                    <div class="row gutter-md">
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" placeholder="Code" id="txtEditCode">
                                        </div>
                                        <div class="col-md-6"></div>
                                        <div class="col-md-6 mt-2">
                                            <input id="txtEditStartDate" type="tel" maxlength="10" placeholder="dd/mm/yyyy" class="form-control"
                                                oninput="this.value = DDMMYYYY(this.value, event)" />
                                        </div>
                                        <div class="col-md-6 mt-2">
                                            <input id="txtEditEndDate" type="tel" maxlength="10" placeholder="dd/mm/yyyy" class="form-control"
                                                oninput="this.value = DDMMYYYY(this.value, event)" />
                                        </div>
                                        <div class="col-md-12">
                                            <h5 class="mt-3 mb-1">Financial Details</h5>
                                        </div>
                                        <div class="col-md-6 mt-2">
                                            <label>Discount Value (%)</label>
                                            <input type="number" class="form-control" placeholder="Dicount" id="txtEditDiscount" value="0" min="0">
                                        </div>
                                        <div class="col-md-6 mt-2">
                                            <label>Fix Value (USD)</label>
                                            <input type="number" class="form-control" placeholder="Fix Value" id="txtEditFixPrice" value="0" min="0">
                                        </div>
                                        <div class="col-md-6 mt-2">
                                            <label>Min Invoice (USD)</label>
                                            <input type="number" class="form-control" placeholder="Min Invoice" id="txtEditMinInvoice" value="0" min="0">
                                        </div>
                                        <div class="col-md-6"></div>
                                    </div>

                                    <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4 EditPromoCode">Edit Code</button>
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
    <script src="/assets/vendor/moment/moments.js"></script>
    <script src="/assets/js/promo.js"></script>
</asp:Content>

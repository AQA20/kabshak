<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="locations.aspx.cs" Inherits="web.admin.locations" %>

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

        #userTextSearch:focus {
            border-color: #eee !important;
        }

        @media (min-width: 992px) {
            .sidebar-content {
                background: transparent !important;
            }
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="hide-res" id="search-filters-items">
        <input type="text" hidden name="searchtxt" value="-1" />
        <input type="text" hidden name="active" value="-1" />
        <input type="text" hidden name="inactive" value="-1" />
        <input type="text" hidden name="start" id="start" value="1">
        <input type="text" hidden name="end" id="end" value="20">
    </div>
    <div class="my-account loaded">
        <div class="page-wrapper">
            <main class="main">
                <!-- Start of Breadcrumb -->

                <nav class="breadcrumb-nav">
                    <div class="container">
                        <ul class="breadcrumb">
                            <li><a href="/admin/dashboard.aspx">Admin Dashboard</a></li>
                            <li class="breadcrumb-name"><h1 style="font-size: 13px; margin-bottom: unset;">Locations</h1> </li>
                        </ul>
                    </div>
                </nav>

                <!-- Start of PageContent -->
                <div class="page-content pt-2">
                    <div class="container">
                        <div class="tab tab-vertical row gutter-lg">
                            <ul class="nav nav-tabs mb-6" role="tablist">
                                <li class="nav-item">
                                    <a id="lnkCategoriesList" href="#account-orders" class="nav-link active">Countries List</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#account-downloads" class="nav-link">Add a New Country</a>
                                </li>
                                <li class="nav-item d-none">
                                    <a id="lnkEditCategory" href="#account-brand" class="nav-link">Edit</a>
                                </li>
                                <li class="nav-item">
                                    <aside class="sidebar right-sidebar blog-sidebar sidebar-fixed sticky-sidebar-wrapper">
                                        <div class="sidebar-overlay">
                                            <a href="#" class="sidebar-close">
                                                <i class="close-icon"></i>
                                            </a>
                                        </div>
                                        <a href="#" class="sidebar-toggle">
                                            <i class="fas fa-chevron-left"></i>
                                        </a>
                                        <div class="sidebar-content">
                                            <div class="pin-wrapper" style="height: 217.4px;">
                                                <div class="sticky-sidebar" style="border-bottom: 0px none rgb(102, 102, 102); width: 280px;">
                                                    <div class="filter-actions" style="padding-top: 15px;">
                                                        <label>Filters :</label>
                                                        <a href="#" onclick="CleanLocationsPageFilters();" class="btn btn-dark btn-link filter-clean">Clean All</a>
                                                    </div>
                                                    <div class="widget widget-search-form">
                                                        <div class="widget-body">
                                                            <div action="#" method="GET" class="input-wrapper input-wrapper-inline">
                                                                <input id="userTextSearch" type="text" class="form-control" placeholder="Search in text..." autocomplete="off" required="">
                                                                <button type="button" class="btn btn-search" onclick="SearchCountriesByText();"><i class="w-icon-search"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="widget widget-categories">
                                                        <ul class="widget-body filter-items search-ul">
                                                            <li class="active-checkbox" style="margin-bottom: 15px;">
                                                                <input id="cbIsActive" type="checkbox" class="custom-checkbox">
                                                                <label for="cbIsActive" style="font-weight: normal; font-size: 14px;">Active countries</label>
                                                            </li>
                                                            <li class="inactive-checkbox" style="margin-bottom: 15px;">
                                                                <input id="cbInActive" type="checkbox" class="custom-checkbox">
                                                                <label for="cbInActive" style="font-weight: normal; font-size: 14px;">Inactive countries</label>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </aside>
                                </li>
                            </ul>

                            <div class="tab-content mb-6">
                                <div class="tab-pane active in" id="account-orders">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <span class="icon-box-icon icon-orders">
                                            <i class="w-icon-list"></i>
                                        </span>
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title text-capitalize ls-normal mb-0">Countries</h4>
                                        </div>
                                    </div>
                                    <div class="result">
                                        <table class="shop-table wishlist-table">
                                            <thead>
                                                <tr>
                                                    <th class="product-name"><span>Item Info</span></th>
                                                    <th class="product-price" style="text-align: unset;"><span>Status</span></th>
                                                    <th class="product-stock-status" style="text-align: unset;"><span>Date</span></th>
                                                    <th class="wishlist-Country">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody class="productsList">
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="toolbox toolbox-pagination justify-content-between">
                                        <p class="showing-info mb-2 mb-sm-0">
                                        </p>
                                        <ul class="pagination">
                                            <li class="prev disabled">
                                                <a href="#" aria-label="Previous" tabindex="-1" aria-disabled="true">
                                                    <i class="w-icon-long-arrow-left"></i>Prev
                                                </a>
                                            </li>
                                            <li class="page-item active">
                                                <a class="page-link" href="#">1</a>
                                            </li>
                                            <li class="page-item">
                                                <a class="page-link" href="#">2</a>
                                            </li>
                                            <li class="next">
                                                <a href="#" aria-label="Next">Next<i class="w-icon-long-arrow-right"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="tab-pane" id="account-downloads">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <span class="icon-box-icon icon-downloads mr-2">
                                            <i class="w-icon-plus"></i>
                                        </span>
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title ls-normal">Add a New Country</h4>
                                        </div>
                                    </div>

                                    <div class="row gutter-md">
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" placeholder="Country Name" id="txtCountryNameEn">
                                        </div>
                                        <div class="col-md-6"></div>
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" dir="rtl" placeholder="اسم البلد" id="txtCountryNameAr">
                                        </div>
                                        <div class="col-md-6"></div>

                                    </div>
                                    <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4" onclick="SaveCountryInfo();">Save Country</button>
                                </div>

                                <div class="tab-pane" id="account-brand">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <span class="icon-box-icon icon-downloads mr-2">
                                            <i class="w-icon-cog"></i>
                                        </span>
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title ls-normal">Edit Country Info</h4>
                                        </div>
                                    </div>

                                    <div class="row gutter-md">
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" placeholder="Country Name" id="txtEditCountryNameEn">
                                        </div>
                                        <div class="col-md-6"></div>
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" dir="rtl" placeholder="اسم البلد" id="txtEditCountryNameAr">
                                        </div>
                                        <div class="col-md-6"></div>
                                    </div>

                                    <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4 EditCountryInfo">Edit Country</button>
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
    <script src="/assets/js/locations.js"></script>
</asp:Content>

<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="products.aspx.cs" Inherits="web.admin.products" %>

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

        .btn-primary.btn-link:hover, .btn-primary.btn-link:active, .btn-primary.btn-link:focus {
            color: #1b4f9b !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="hide-res" id="search-filters-items">
        <input type="text" hidden name="categories" />
        <input type="text" hidden name="subcategories" />
        <input type="text" hidden name="brands" />
        <input type="text" hidden name="min" />
        <input type="text" hidden name="max" />
        <input type="text" hidden name="sort" value="-1" />
        <input type="text" hidden name="filter" value="-1" />
        <input type="text" hidden name="newarrival" value="-1" />
        <input type="text" hidden name="onsale" value="-1" />
        <input type="text" hidden name="searchtxt" value="-1" />
        <input type="text" hidden name="start" id="start" value="1">
        <input type="text" hidden name="end" id="end" value="50">
    </div>
    <div class="my-account loaded">
        <div class="page-wrapper">
            <main class="main">
                <nav class="breadcrumb-nav">
                    <div class="container">
                        <ul class="breadcrumb">
                            <li><a href="/admin/dashboard.aspx">Admin Dashboard</a></li>
                            <li class="breadcrumb-name">
                                <h1 style="font-size: 13px; margin-bottom: unset;">Products</h1>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div class="page-content pt-2">
                    <div class="container">
                        <div class="row gutter-lg">
                            <div class="main-content" style="min-height: 500px;">
                                <div class="tab-content" style="width: 100%;">
                                    <div class="tab-pane active in" id="account-orders">
                                        <div class="icon-box icon-box-side icon-box-light">
                                            <span class="icon-box-icon icon-orders">
                                                <i class="w-icon-list"></i>
                                            </span>
                                            <div class="icon-box-content">
                                                <h4 class="icon-box-title text-capitalize ls-normal mb-0">Products</h4>
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
                            <!-- End of Main Content -->
                            <aside class="sidebar right-sidebar blog-sidebar sidebar-fixed sticky-sidebar-wrapper" style="background: rgb(0 0 0 / 2%);">
                                <div class="sidebar-overlay">
                                    <a href="#" class="sidebar-close">
                                        <i class="close-icon"></i>
                                    </a>
                                </div>
                                <a href="#" class="sidebar-toggle">
                                    <i class="fas fa-chevron-left"></i>
                                </a>
                                <div class="sidebar-content" style="background: rgb(250 250 250)">
                                    <div class="d-flex justify-content-center mt-5 mb-2">
                                        <a href="/admin/product/info.aspx" class="btn btn-primary" style="padding: 15px; border: solid 1px; border-radius: 5px; width: 100%;"><i class="w-icon-plus"></i>Add a New Product</a>
                                    </div>
                                    <div class="widget widget-collapsible">
                                        <h3 class="widget-title"><span>Filter By</span><span class="toggle-btn"></span></h3>
                                        <div class="widget-body">
                                            <ul class="widget-body filter-items item-check mt-1">
                                                <li>
                                                    <select name="orderby" class="form-control selectpickerfilter">
                                                        <option value="-1" selected="selected">Default Filter</option>
                                                        <option value="1">Filter by donation products</option>
                                                        <option value="2">Filter by shipping products</option>
                                                    </select>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="pin-wrapper d-none">
                                        <div class="sticky-sidebar" style="border-bottom: 0px none rgb(102, 102, 102); width: 280px;">
                                            <div class="filter-actions">
                                                <label>Filters :</label>
                                                <a href="#" onclick="CleanAll();" class="btn btn-dark btn-link filter-clean">Clean All</a>
                                            </div>
                                            <div class="widget widget-search-form">
                                                <div class="widget-body">
                                                    <div action="#" method="GET" class="input-wrapper input-wrapper-inline">
                                                        <input id="userTextSearch" type="text" class="form-control" placeholder="Search in text..." autocomplete="off" required="">
                                                        <button type="button" class="btn btn-search" onclick="SearchUserByText();"><i class="w-icon-search"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Start of Collapsible widget -->
                                            <div class="widget-body filter-items item-check d-flex justify-content-between" style="margin-bottom: 1.5rem;">
                                                <div class="card">
                                                    <div class="card-header newarrival-checkbox">
                                                        <input id="cbNewArrival" type="checkbox" class="custom-checkbox" />
                                                        <label for="cbNewArrival" style="font-weight: normal; font-size: 14px;">New Arrival</label>
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header onsale-checkbox">
                                                        <input id="cbOnSale" type="checkbox" class="custom-checkbox">
                                                        <label for="cbOnSale" style="font-weight: normal; font-size: 14px;">On Sale</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- End of Collapsible Widget -->
                                            <!-- Start of Collapsible widget -->
                                            <div class="widget widget-collapsible">
                                                <h3 class="widget-title"><span>All Categories</span><span class="toggle-btn"></span></h3>
                                                <ul class="widget-body filter-items item-check mt-1 categories">
                                                </ul>
                                            </div>
                                            <!-- End of Collapsible Widget -->

                                            <!-- Start of Collapsible Widget -->
                                            <div class="widget widget-collapsible">
                                                <h3 class="widget-title"><span>Price</span><span class="toggle-btn"></span> - <span id="FilterCurrency">KWD</span></h3>
                                                <div class="widget-body">
                                                    <div class="price-range">
                                                        <input type="number" name="min_price" class="min_price text-center" placeholder="min"><span class="delimiter">-</span><input type="number" name="max_price" class="max_price text-center" placeholder="max"><a href="#" onclick="SearchByPrice();" class="btn btn-primary btn-rounded">Go</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- End of Collapsible Widget -->

                                            <!-- Start of Collapsible Widget -->
                                            <div class="widget widget-collapsible">
                                                <h3 class="widget-title"><span>Brand</span><span class="toggle-btn"></span></h3>
                                                <ul class="widget-body filter-items item-check mt-1 brands">
                                                </ul>
                                            </div>

                                            <div class="widget widget-collapsible">
                                                <h3 class="widget-title"><span>Sort By</span><span class="toggle-btn"></span></h3>
                                                <div class="widget-body">
                                                    <ul class="widget-body filter-items item-check mt-1">
                                                        <li>
                                                            <select name="orderby" class="form-control selectpickersort">
                                                                <option value="-1" selected="selected">Default sorting</option>
                                                                <option value="1">Sort by price: low to high</option>
                                                                <option value="2">Sort by price: high to low</option>
                                                            </select>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <!-- End of Collapsible Widget -->
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="head" runat="server">
    <script src="/assets/js/admin.js"></script>
    <script src="/assets/js/products.js"></script>
</asp:Content>

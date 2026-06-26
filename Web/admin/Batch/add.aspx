<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="add.aspx.cs" Inherits="vape.admin.Batch.add" %>

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

        #txtOrderId:focus {
            border-color: #eee !important;
        }

        #txtDate:focus {
            border-color: #eee !important;
        }

        .btn-primary.btn-link:hover, .btn-primary.btn-link:active, .btn-primary.btn-link:focus {
            color: #1b4f9b !important;
        }

        .wishlist-table .product-stock-status {
            width: unset !important;
        }

        .w-icon-check {
            display: none;
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
                            <li><a href="/admin/batches.aspx">Batches</a></li>
                            <li class="breadcrumb-name">
                                <h1 style="font-size: 13px; margin-bottom: unset;">Generate Batch</h1>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div class="hide-res" id="search-filters-items">
                    <input type="text" hidden name="delivery" value="-1" />
                    <input type="text" hidden name="donate" value="-1" />
                    <input type="text" hidden name="categories" />
                    <input type="text" hidden name="subcategories" />
                    <input type="text" hidden name="brands" />
                    <input type="text" hidden name="charityid" value="-1" />
                    <input type="text" hidden name="start" id="start" value="1">
                    <input type="text" hidden name="end" id="end" value="20">
                </div>
                <div class="page-content pt-2">
                    <div class="container">
                        <div class="row gutter-lg">
                            <div class="main-content" style="min-height: 700px;">
                                <div class="tab-content" style="width: 100%;">
                                    <div class="tab-pane active in" id="account-orders">
                                        <div class="icon-box icon-box-side icon-box-light">
                                            <span class="icon-box-icon icon-orders">
                                                <i class="w-icon-orders"></i>
                                            </span>
                                            <div class="icon-box-content">
                                                <h4 class="icon-box-title text-capitalize ls-normal mb-0">Generate Batch <span class="nooforders"></span></h4>
                                            </div>
                                        </div>
                                        <div class="result">
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
                                    <div class="pin-wrapper" style="height: 1507.68px;">
                                        <div class="sticky-sidebar" style="border-bottom: 0px none rgb(102, 102, 102); width: 280px;">
                                            <div style="margin: -15px; padding: 15px; padding-bottom: unset; margin-bottom: 15px; border-top: solid 15px #ffffff;">
                                                <div class="filter-actions" style="padding-bottom: 10px;">
                                                    <label>Filters:</label>
                                                    <a href="#" onclick="CleanAll();" class="btn btn-dark btn-link filter-clean">Clean All</a>
                                                </div>
                                            </div>
                                            <div class="widget widget-search-form mb-4" style="background: #ffffff; margin-left: -15px; margin-right: -15px; padding: 15px; border: solid 1px #fafafa;">
                                                <h3 class="widget-title mb-0 pt-0"><span>Types of Items</span></h3>
                                                <div class="mb-3 delivery-orders">
                                                    <input type="checkbox" class="custom-checkbox">
                                                    <label for="remember">Shipping Items</label>
                                                </div>
                                                <div class="donate-orders">
                                                    <input type="checkbox" class="custom-checkbox custom-checkbox-donate">
                                                    <label for="remember">Donate Items</label>
                                                </div>
                                            </div>
                                            <div class="widget widget-search-form widget-search-form-charities mb-2">
                                                <h3 class="widget-title mb-0 pt-0"><span>Charity</span></h3>
                                                <div class="select-box">
                                                    <select id="charities" name="charities" class="form-control form-control-md items charities-items" style="max-width: unset;">
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="widget widget-collapsible">
                                                <h3 class="widget-title"><span>All Categories</span><span class="toggle-btn"></span></h3>
                                                <ul class="widget-body filter-items item-check mt-1 categories">
                                                </ul>
                                            </div>
                                            <div class="widget widget-collapsible">
                                                <h3 class="widget-title"><span>Brand</span><span class="toggle-btn"></span></h3>
                                                <ul class="widget-body filter-items item-check mt-1 brands">
                                                </ul>
                                            </div>
                                            <div class="generate-batch" style="margin: -15px; padding: 15px; padding-bottom: unset; margin-bottom: 15px; border-top: solid 15px #ffffff;">
                                                <div class="filter-actions">
                                                    <label>Generate Batch</label>
                                                </div>
                                                <div class="widget widget-search-form mb-2" style="">
                                                    <div class="select-box">
                                                        <select id="slaughterhouse" name="slaughterhouse" class="form-control form-control-md items slaughterhouse-items" style="max-width: unset;">
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="widget">
                                                    <input id="txtQuantity" type="number" class="form-control form-control-md items" placeholder="No of Quantity" min="1" autocomplete="off" required="" style="font-size: 1.2rem; padding-left: 10px; padding-right: 10px; color: #777; border: 1px solid #e3e3e3;">
                                                </div>
                                                <div class="widget">
                                                    <div class="cart-action" style="padding-bottom: 15px; padding-top: 15px;">
                                                        <a onclick="GenerateBatch();" class="btn btn-primary  btn-rounded" style="width: 100%">Generate Batch</a>
                                                    </div>
                                                </div>
                                            </div>
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
    <script src="/assets/js/Batch/add.js"></script>
</asp:Content>

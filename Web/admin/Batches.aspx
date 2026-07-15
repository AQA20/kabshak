<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="Batches.aspx.cs" Inherits="vape.admin.Batches" %>

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
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="hide-res" id="search-filters-items">
        <input type="text" hidden name="statuses" value="-1" />
        <input type="text" hidden name="searchBatchId" value="-1" />
        <input type="text" hidden name="searchOrderId" value="-1" />
        <input type="text" hidden name="searchSlaughterhouseId" value="-1" />
        <input type="text" hidden name="searchCharityId" value="-1" />
        <input type="text" hidden name="searchDate" value="-1" />
        <input type="text" hidden name="start" id="start" value="1">
        <input type="text" hidden name="end" id="end" value="50">
    </div>
    <iframe id="my_iframe" style="display: none;"></iframe>
    <div class="my-account loaded">
        <div class="page-wrapper">
            <main class="main">
                <nav class="breadcrumb-nav">
                    <div class="container">
                        <ul class="breadcrumb">
                            <li><a href="/admin/dashboard.aspx">Admin Dashboard</a></li>
                            <li class="breadcrumb-name">
                                <h1 style="font-size: 13px; margin-bottom: unset;">Batches</h1>
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
                                                <i class="w-icon-orders"></i>
                                            </span>
                                            <div class="icon-box-content">
                                                <h4 class="icon-box-title text-capitalize ls-normal mb-0">Batches <span class="nooforders"></span></h4>
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
                                    <div class="d-flex justify-content-center mt-5 mb-2">
                                        <a href="/admin/batch/add.aspx" class="btn btn-primary" style="padding: 15px; border: solid 1px; border-radius: 5px; width: 100%; margin-bottom: 15px;"><i class="w-icon-plus"></i>Add a New Batch</a>
                                    </div>
                                    <div style="background: #fff; margin-left: -15px; margin-right: -15px;">
                                        <br />
                                    </div>
                                    <div class="pin-wrapper" style="height: 1507.68px;">
                                        <div class="sticky-sidebar" style="border-bottom: 0px none rgb(102, 102, 102); width: 280px;">
                                            <div class="filter-actions" style="padding-top: 20px;">
                                                <label>Filters :</label>
                                                <a href="#" onclick="CleanAll();" class="btn btn-dark btn-link filter-clean">Clean All</a>
                                            </div>
                                            <div class="widget widget-search-form">
                                                <div class="widget-body">
                                                    <div action="#" method="GET" class="input-wrapper input-wrapper-inline">
                                                        <input id="txtBatchId" type="number" class="form-control" placeholder="Search in batch #..." autocomplete="off" required="">
                                                        <button type="button" class="btn btn-search" onclick="SearchByBatchId();"><i class="w-icon-search"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="widget widget-search-form">
                                                <div class="widget-body">
                                                    <div action="#" method="GET" class="input-wrapper input-wrapper-inline">
                                                        <input id="txtOrderId" type="number" class="form-control" placeholder="Search in order #..." autocomplete="off" required="">
                                                        <button type="button" class="btn btn-search" onclick="SearchByOrderId();"><i class="w-icon-search"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="widget widget-search-form">
                                                <div class="widget-body">
                                                    <div action="#" method="GET" class="input-wrapper input-wrapper-inline">
                                                        <input id="txtDate" type="tel" maxlength="10" placeholder="dd/mm/yyyy" class="form-control"
                                                            oninput="this.value = DDMMYYYY(this.value, event)">
                                                        <button type="button" class="btn btn-search" onclick="SearchByDate();"><i class="w-icon-search"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="widget widget-search-form mb-2">
                                                <h3 class="widget-title mb-0 pt-0"><span>Charity</span></h3>
                                                <div class="select-box">
                                                    <select id="charities" name="charities" class="form-control form-control-md items charities-items" style="max-width: unset;">
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="widget widget-search-form mb-2">
                                                <h3 class="widget-title mb-0 pt-0"><span>Slaughterhouse</span></h3>
                                                <div class="select-box">
                                                    <select id="slaughterhouse" name="slaughterhouse" class="form-control form-control-md items slaughterhouse-items" style="max-width: unset;">
                                                    </select>
                                                </div>
                                            </div>
                                            <!-- Start of Collapsible Widget -->
                                            <div class="widget widget-collapsible">
                                                <h3 class="widget-title"><span>Batches Statuses</span><span class="toggle-btn"></span></h3>
                                                <ul class="widget-body filter-items item-check mt-1 statuses">
                                                </ul>
                                            </div>
                                            <div class="btn-wrap show-code-action mb-5 excel-option">
                                                <a href="#" class="btn btn-success btn-outline btn-rounded w-100 mb-5" onclick="ExportBatchesDataAsExcelSheet();">
                                                    <img src="/assets/images/icons/excel.png" alt="Excel Icon" style="width: 40px; margin-right: 5px;">Export data as excel</a>
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
    <script src="/assets/vendor/moment/moments.js"></script>
    <script src="/assets/js/Batches.js"></script>
</asp:Content>

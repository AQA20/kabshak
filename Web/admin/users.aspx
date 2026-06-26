<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="users.aspx.cs" Inherits="web.admin.users" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadCss" runat="server">
    <meta name="robots" content="noindex,nofollow" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="hide-res" id="search-filters-items">
        <input type="text" hidden name="searchtxt" value="-1" />
        <input type="text" hidden name="active" value="-1" />
        <input type="text" hidden name="inactive" value="-1" />
        <input type="text" hidden name="admin" value="-1" />
        <input type="text" hidden name="start" id="start" value="1">
        <input type="text" hidden name="end" id="end" value="20">
    </div>
    <main class="main">
        <!-- Start of Breadcrumb -->
        <nav class="breadcrumb-nav">
            <div class="container">
                <ul class="breadcrumb">
                    <li><a href="/admin/dashboard.aspx">Admin Dashboard</a></li>
                    <li><h1 style="font-size: 13px; margin-bottom: unset;">Users</h1> </li>
                </ul>
            </div>
        </nav>
        <div class="page-content pt-8">
            <div class="container">
                <div class="row gutter-lg">
                    <div class="main-content">
                    </div>
                    <!-- End of Main Content -->
                    <aside class="sidebar right-sidebar blog-sidebar sidebar-fixed sticky-sidebar-wrapper" style="background: rgb(250 250 250);">
                        <div class="sidebar-overlay">
                            <a href="#" class="sidebar-close">
                                <i class="close-icon"></i>
                            </a>
                        </div>
                        <a href="#" class="sidebar-toggle">
                            <i class="fas fa-chevron-left"></i>
                        </a>
                        <div class="sidebar-content">
                            <div class="pin-wrapper" style="height: 1507.68px; background: rgb(250 250 250);">
                                <div class="sticky-sidebar" style="border-bottom: 0px none rgb(102, 102, 102); width: 280px;">
                                    <div class="filter-actions">
                                        <label>Filters :</label>
                                        <a href="#" onclick="CleanUserPageFilters();" class="btn btn-dark btn-link filter-clean">Clean All</a>
                                    </div>
                                    <div class="widget widget-search-form">
                                        <div class="widget-body">
                                            <div action="#" method="GET" class="input-wrapper input-wrapper-inline">
                                                <input id="userTextSearch" type="text" class="form-control" placeholder="Search in text..." autocomplete="off" required="">
                                                <button type="button" class="btn btn-search" onclick="SearchUserByText();"><i class="w-icon-search"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="widget widget-categories">

                                        <ul class="widget-body filter-items search-ul">
                                            <li class="active-checkbox" style="margin-bottom: 15px;">
                                                <input id="cbIsActive" type="checkbox" class="custom-checkbox">
                                                <label for="cbIsActive" style="font-weight: normal; font-size: 14px;">Active accounts</label>
                                            </li>
                                            <li class="inactive-checkbox" style="margin-bottom: 15px;">
                                                <input id="cbInActive" type="checkbox" class="custom-checkbox">
                                                <label for="cbInActive" style="font-weight: normal; font-size: 14px;">Inactive accounts</label>
                                            </li>
                                            <li class="admin-checkbox" style="margin-bottom: 15px;">
                                                <input id="cbIsAdmin" type="checkbox" class="custom-checkbox">
                                                <label for="cbIsAdmin" style="font-weight: normal; font-size: 14px;">Admin accounts</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
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
        </div>
    </main>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="head" runat="server">
    <script src="/assets/js/admin.js"></script>
    <script src="/assets/js/users.js"></script>
</asp:Content>

<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="donate-shop.aspx.cs" Inherits="vape.AR.donate_shop" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="hide-res" id="search-filters-items">
        <input type="text" hidden name="categories" />
        <input type="text" hidden name="subcategories" />
        <input type="text" hidden name="brands" />
        <input type="text" hidden name="min" />
        <input type="text" hidden name="max" />
        <input type="text" hidden name="sort" value="-1" />
        <input type="text" hidden name="newarrival" value="1" />
        <input type="text" hidden name="onsale" value="-1" />
        <input type="text" hidden name="searchtxt" value="-1" />
        <input type="text" hidden name="start" id="start" value="1">
        <input type="text" hidden name="end" id="end" value="50">
    </div>
    <main class="main">
        <!-- Start of Breadcrumb -->
        <nav class="breadcrumb-nav">
            <div class="container">
                <ul class="breadcrumb mb-4">
                    <li><a href="/home.aspx">الصفحة الرئيسية </a></li>
                    <li><h1 style="font-size: 13px; margin-bottom: unset;">متجر التبرعات</h1> </li>
                </ul>
            </div>
        </nav>
        <!-- End of Breadcrumb -->

        <!-- Start of Page Content -->
        <div class="page-content">
            <div class="container">
                <!-- Start of Shop Content -->
                <div class="shop-content row gutter-lg mb-10">
                    <!-- Start of Sidebar, Shop Sidebar -->
                    <aside class="sidebar shop-sidebar sticky-sidebar-wrapper sidebar-fixed">
                        <!-- Start of Sidebar Overlay -->
                        <div class="sidebar-overlay"></div>
                        <a class="sidebar-close" href="#"><i class="close-icon"></i></a>

                        <!-- Start of Sidebar Content -->
                        <div class="sidebar-content scrollable">
                            <!-- Start of Sticky Sidebar -->
                            <div class="pin-wrapper" style="height: 1813.8px;">
                                <div class="sticky-sidebar" style="border-bottom: 0px none rgb(102, 102, 102); width: 280px;">
                                    <div class="filter-actions">
                                        <label>المرشحات :</label>
                                        <a href="#" onclick="CleanAll();" class="btn btn-dark btn-link filter-clean">مسح الكل</a>
                                    </div>
                                    <!-- End of Collapsible Widget -->
                                    <!-- Start of Collapsible widget -->
                                    <div class="widget widget-collapsible">
                                        <h3 class="widget-title"><span>جميع الفئات</span><span class="toggle-btn"></span></h3>
                                        <ul class="widget-body filter-items item-check mt-1 categories">
                                        </ul>
                                    </div>
                                    <!-- End of Collapsible Widget -->

                                    <!-- Start of Collapsible Widget -->
                                    <div class="widget widget-collapsible">
                                        <h3 class="widget-title"><span>العلامات التجارية</span><span class="toggle-btn"></span></h3>
                                        <ul class="widget-body filter-items item-check mt-1 brands">
                                        </ul>
                                    </div>
                                    <!-- End of Collapsible Widget -->
                                </div>
                            </div>
                            <!-- End of Sidebar Content -->
                        </div>
                        <!-- End of Sidebar Content -->
                    </aside>
                    <!-- End of Shop Sidebar -->

                    <!-- Start of Shop Main Content -->
                    <div class="main-content" style="min-height: 500px;">
                        <nav class="toolbox sticky-toolbox sticky-content fix-top">
                            <div class="toolbox-left">
                                <a href="#" class="btn btn-primary btn-outline btn-rounded left-sidebar-toggle 
                                        btn-icon-left d-block d-lg-none"><i class="w-icon-category"></i><span>المرشحات</span></a>
                                <div class="toolbox-item toolbox-sort select-box text-dark">
                                    <label>ترتيب حسب :</label>
                                    <select name="orderby" class="form-control selectpickersort">
                                        <option value="-1" selected="selected">الترتيب الافتراضي</option>
                                        <option value="1">الترتيب حسب السعر: من الأقل إلى الأعلى</option>
                                        <option value="2">الترتيب حسب السعر: من الأعلى إلى الأقل</option>
                                    </select>
                                </div>
                            </div>
                        </nav>
                        <div class="list product-wrapper row cols-md-1 cols-xs-2 cols-1">
                        </div>
                        <div class="list-Noresult product-wrapper row cols-lg-12 cols-md-12 cols-sm-12 cols-12">
                        </div>
                        <div class="toolbox toolbox-pagination justify-content-between">
                            <p class="showing-info mb-2 mb-sm-0">
                            </p>
                            <ul class="pagination">
                                <li class="prev disabled">
                                    <a href="#" aria-label="Previous" tabindex="-1" aria-disabled="true">
                                        <i class="w-icon-long-arrow-left"></i>السابق
                                    </a>
                                </li>
                                <li class="page-item active">
                                    <a class="page-link" href="#">1</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">2</a>
                                </li>
                                <li class="next">
                                    <a href="#" aria-label="Next">التالي<i class="w-icon-long-arrow-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- End of Shop Main Content -->
                </div>
                <!-- End of Shop Content -->
            </div>
        </div>
        <!-- End of Page Content -->
    </main>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script src="/assets/js/donate-shop.js"></script>
</asp:Content>

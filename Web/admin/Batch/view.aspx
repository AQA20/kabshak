<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="view.aspx.cs" Inherits="vape.admin.Batch.view" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadCss" runat="server">
    <script>
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });

        if (params.Id == null || params.Id.trim() == '') {
            window.location = "/admin/batches.aspx";
        }
    </script>
    <style>
        .wishlist-table .product-stock-status {
            width: unset !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main class="main order">
        <nav class="breadcrumb-nav">
            <div class="container">
                <ul class="breadcrumb">
                    <li><a href="/admin/batches.aspx">Batches</a></li>
                    <li>
                        <h1 style="font-size: 13px; margin-bottom: unset;">Batch Details</h1>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="hide-res" id="search-filters-items">
            <input type="text" hidden name="start" id="start" value="1">
            <input type="text" hidden name="end" id="end" value="10">
        </div>
        <div class="page-content mb-10 pb-2  mt-5">
            <div class="container">
                <div class="order-success text-center font-weight-bolder text-dark">
                    <i class="fas fa-check"></i>
                    Batch Details.
                </div>
                <!-- End of Order Success -->

                <ul class="order-view list-style-none">
                    <li>
                        <label>Batch number</label>
                        <strong class="batchid"></strong>
                    </li>
                    <li>
                        <label>Status</label>
                        <strong style="color: #F29811" class="status"></strong>
                    </li>
                    <li>
                        <label>Slaughterhouse</label>
                        <strong class="Slaughterhouse"></strong>
                    </li>
                    <li>
                        <label>Charity</label>
                        <strong class="Charity"></strong>
                    </li>
                    <li>
                        <label>Date</label>
                        <strong class="datetime"></strong>
                    </li>
                    <li>
                        <label>Quantity</label>
                        <strong class="Quantity"></strong>
                    </li>

                </ul>
                <!-- End of Order View -->
                <iframe id="my_iframe" style="display: none;"></iframe>
                <!-- End of Account Address -->
                <div class="order-details-wrapper order-Persons mb-0 d-flex justify-content-between" style="border-top: solid 5px #F29811; padding-top: 5px;">
                    <h4 class="title text-uppercase ls-25 mb-2">PRODUCTS INFORMATION</h4>
                    <div class="d-flex">
                        <div class="btn-wrap show-code-action mb-2 excel-option mr-2">
                            <a href="#" class="btn btn-success btn-outline btn-rounded" onclick="ExportItemsDataAsExcelSheet();">
                                <img src="/assets/images/icons/excel.png" style="width: 40px; margin-right: 5px;">Export data as excel</a>
                        </div>
                        <div class="btn-wrap show-code-action mb-2 excel-option">
                            <a href="#" class="btn btn-success btn-outline btn-rounded" onclick="ExportQRcodes();" style="color: #000000; border-color: #000000;">
                                <img src="/assets/images/icons/qr.png" style="width: 40px; margin-right: 5px;">Export QR codes</a>
                        </div>
                    </div>

                </div>
                <div class="result">
                </div>
                <!-- End of Sub Orders-->
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

                <div class="order-details-wrapper order-Tracking mb-5" style="border-top: solid 5px #F29811; padding-top: 15px;">
                    <h4 class="title text-uppercase ls-25 mb-5">Batch Tracking</h4>
                    <div class="d-flex">
                        <table class="order-table">
                            <thead>
                                <tr>
                                    <th class="text-dark">Actions</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody class="Transaction-Items">
                            </tbody>
                        </table>
                        <div class="QR-code d-sm-show" style="text-align: center;">
                            <img src="non" class="QR" style="height: 250px" />
                            Batch QR code
                        </div>
                    </div>
                </div>

                <section class="btn-section btn-parallax-section parallax btns-workflow" data-parallax-options="{'speed': 10, 'parallaxHeight': '200%', 'offset': -102}" style="position: relative; overflow: hidden;">
                    <div class="parallax-background" style="background-size: cover; position: absolute; top: 0px; left: 0px; width: 100%; height: 200%; transform: translate3d(0px, -182.625px, 0px); background-position-x: 50%;"></div>
                    <div class="container">
                        <h2 class="title title-line text-dark mb-2">Workflow Actions</h2>
                        <div class="row">
                            <div class="col-lg-3 col">
                                <p class="text-left text-dark">The buttons appear based on the status of the batch and are intended only for administrators.</p>
                            </div>
                            <div class="col-lg-9 col">
                                <div class="btn-group">
                                    <div class="btn-wrap show-code-action btn-Delivered">
                                        <a class="btn btn-primary" onclick="Batch_Delivered();">Delivered</a>
                                    </div>
                                    <div class="btn-wrap show-code-action d-flex btn-Assigned-to-Charity" style="width: 400px;">
                                        <div class="select-box mr-2">
                                            <select id="charities" name="charities" class="form-control form-control-md items charities-items" style="max-width: unset;">
                                            </select>
                                        </div>
                                        <a class="btn btn-primary" onclick="Batch_Assigned_to_Charity();">Assigned to Charity</a>

                                    </div>
                                    <div class="btn-wrap show-code-action btn-Completed">
                                        <a class="btn btn-primary" onclick="Batch_Completed();">Completed</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </main>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="head" runat="server">
    <script src="/assets/js/admin.js"></script>
    <script src="/assets/js/batch/view.js"></script>
</asp:Content>

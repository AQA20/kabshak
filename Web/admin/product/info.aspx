<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="info.aspx.cs" Inherits="web.admin.product.info" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadCss" runat="server">
    <meta name="robots" content="noindex,nofollow" />
    <link href="/assets/vendor/quill/quill.css" rel="stylesheet" />
    <link href="/assets/vendor/mutli-selection/selection.css" rel="stylesheet" />
    <script src="/assets/vendor/mutli-selection/selection.js"></script>
    <link rel="stylesheet" href="/assets/vendor/swiper/swiper-bundle.min.css">
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

        .swiper-slide {
            border: solid 1px #eee;
        }

        @media (max-width: 479px) {
            .swiper-slide {
                width: 100% !important;
            }
        }
    </style>
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div>
        <input name='fake' type="text" placeholder="Name:" autocomplete="on" style="width: 0.1em; height: 0.1em; position: fixed; bottom: 0; opacity: 0;">
    </div>
    <div class="my-account loaded">
        <div class="page-wrapper">
            <main class="main">
                <!-- Start of Breadcrumb -->
                <nav class="breadcrumb-nav">
                    <div class="container">
                        <ul class="breadcrumb">
                            <li><a href="/admin/products">Products</a></li>
                            <li class="">
                                <h1 class="breadcrumb-name" style="font-size: 13px; margin-bottom: unset;">Add a new product</h1>
                            </li>
                        </ul>
                    </div>
                </nav>
                <!-- End of Breadcrumb -->

                <!-- Start of PageContent -->
                <div class="page-content pt-2">
                    <div class="container">
                        <div class="tab tab-vertical row gutter-lg">
                            <ul class="nav nav-tabs mb-6" role="tablist">
                                <li class="nav-item">
                                    <a href="#Product-Info" class="nav-link active">Product Info</a>
                                </li>
                                <li class="nav-item  nav-item-custom">
                                    <a href="#Product-Details" class="nav-link">Product Details</a>
                                </li>
                                <li class="nav-item nav-item-custom">
                                    <a href="#Product-Images" class="nav-link ">Product Images</a>
                                </li>
                                <li class="nav-item nav-item-custom">
                                    <a href="#Product-Price" class="nav-link">Product Price</a>
                                </li>
                                <li class="nav-item nav-item-custom">
                                    <a href="#Product-Stock" class="nav-link ">Product Stock</a>
                                </li>
                                <li class="nav-item nav-item-custom">
                                    <a href="#Product-Countries" class="nav-link ">Product Countries</a>
                                </li>
                                <li class="nav-item nav-item-custom">
                                    <a href="#Product-Sub-Categories" class="nav-link Product-Sub-Categories-Link">Product - Sub Categories</a>
                                </li>
                                <li class="nav-item nav-item-custom d-none">
                                    <a href="#Product-Edit-Sub-Categories" class="nav-link edit-subCategory">Product - Edit Sub Categories</a>
                                </li>
                                <li class="nav-item nav-item-custom">
                                    <a href="#Product-Orders" class="nav-link">Product Orders</a>
                                </li>
                            </ul>

                            <div class="tab-content mb-6">
                                <div class="tab-pane active in" id="Product-Info" style="padding-bottom: 100px;">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title icon-box-title-custom text-capitalize ls-normal mb-2"><i class="w-icon-fax mr-1"></i>Product Info</h4>
                                        </div>
                                    </div>
                                    <div class="row gutter-md">
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" placeholder="Product Name" id="txtProductNameEn">
                                        </div>
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" dir="rtl" placeholder="اسم المنتج" id="txtProductNameAr">
                                        </div>
                                        <div class="col-md-6 mt-2">
                                            <select id="category-list" class="form-control subcategory">
                                            </select>
                                        </div>
                                        <div class="col-md-6"></div>
                                        <div class="col-md-6 mt-2">
                                            <select id="sub-category-list" class="d-none form-control subcategorychange">
                                                <option value="-1" selected>Sub Category</option>
                                            </select>
                                        </div>
                                        <div class="col-md-6"></div>
                                        <div class="col-md-6 mt-2">
                                            <select id="Brands-list" class="form-control">
                                            </select>
                                        </div>
                                        <div class="col-md-6  mt-2 d-flex align-items-center">
                                            <div class="form-checkbox">
                                                <input type="checkbox" class="custom-checkbox" id="IsNewArrival" name="NewArrival">
                                                <label for="IsNewArrival">Donation Product</label>
                                            </div>
                                        </div>
                                        <div class="col-md-6 mt-2">
                                            <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4" onclick="SaveProductInfo();">Save Info</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane tab-pane-custom" id="Product-Details">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title text-capitalize ls-normal mb-2"><i class="w-icon-fax mr-1"></i>Product Details</h4>
                                        </div>
                                    </div>
                                    <div class="row gutter-md">
                                        <div class="col-md-6 mt-2">
                                            <textarea class="form-control" placeholder="Product Brief" id="txtProductBriefEn" style="min-height: 150px;"></textarea>
                                        </div>
                                        <div class="col-md-6 mt-2">
                                            <textarea class="form-control" dir="rtl" placeholder="نبذة عن المنتج" id="txtProductBriefAr" style="min-height: 150px;"></textarea>
                                        </div>
                                        <div class="col-md-6 mt-2 d-none">
                                            <div class="icon-box-content mt-4">
                                                <label for="rating">SKU :</label>
                                            </div>
                                            <input type="text" class="form-control" placeholder="SKU" id="txtSKU">
                                        </div>
                                        <div class="col-md-6 mt-2">
                                        </div>
                                        <div class="col-md-12 mt-2">
                                            <div class="icon-box-content mt-4">
                                                <label for="rating">Description (English) :</label>
                                            </div>
                                            <div id="EditeditorEn">
                                            </div>
                                        </div>
                                        <div class="col-md-12" style="margin-top: 100px;">
                                            <div class="icon-box-content mt-4" dir="rtl">
                                                <label for="rating">الوصف (العربية):</label>
                                            </div>
                                            <div id="EditeditorAr">
                                            </div>
                                        </div>
                                        <div class="col-md-12  d-none" style="margin-top: 100px;">
                                            <div class="icon-box-content mt-4">
                                                <label for="rating">Specification (English) :</label>
                                            </div>
                                            <div id="SpecificationEn">
                                            </div>
                                        </div>
                                        <div class="col-md-12  d-none" style="margin-top: 100px;">
                                            <div class="icon-box-content mt-4" dir="rtl">
                                                <label for="rating">المواصفات (العربية):</label>
                                            </div>
                                            <div id="SpecificationAr">
                                            </div>
                                        </div>
                                        <div class="col-md-12" style="margin-top: 100px;">
                                            <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4" onclick="SaveProductDetails();">Save Details</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane tab-pane-custom" id="Product-Images">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title text-capitalize ls-normal mb-2"><i class="w-icon-fax mr-1"></i>Product Images</h4>
                                        </div>
                                    </div>
                                    <div class="row gutter-md">
                                        <div class="col-md-12 mt-2" style="border: solid 1px #ddd; padding: 20px;">
                                            <div class="icon-box-content d-flex">
                                                <input type="file" class="form-control-file" id="upImage" style="padding: 7px; width: 100%; border-radius: 0.25rem;" imagevalue="">
                                                <a href="#" onclick="voidclick(); return false">
                                                    <figure>
                                                        <img src="#" alt="product" width="300" height="338" class="logoImg d-none">
                                                    </figure>
                                                </a>
                                            </div>
                                            <div id="lblUploadLogoError" class="d-none">
                                                <div class="alert alert-icon alert-error alert-bg alert-inline show-code-action">
                                                    <h4 class="alert-title">
                                                        <i class="w-icon-times-circle"></i>Sorry!</h4>
                                                    The accepted image is jpg | jpeg | png | gif
                                                </div>
                                            </div>
                                            <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4" onclick="UploadProductImages();" style="margin-bottom: unset !important;">
                                                Upload Image</button>
                                        </div>
                                        <div class="product product-single mb-4">
                                            <div class="product-gallery mb-6">
                                            </div>
                                            <div class="swiper-slide" role="group" style="width: 200px; margin-right: 20px; display: none;">
                                                <figure class="product-image" style="position: relative; overflow: hidden; cursor: pointer;">
                                                </figure>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane tab-pane-custom" id="Product-Price">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title text-capitalize ls-normal mb-2"><i class="w-icon-fax mr-1"></i>Product Price</h4>
                                        </div>
                                    </div>
                                    <div class="row gutter-md">
                                        <div class="col-md-6 mt-2">
                                            <div class="icon-box-content">
                                                <label for="rating">Starting price in USD :</label>
                                            </div>
                                            <input type="number" id="txtUsd" name="USD" class="form-control" placeholder="USD" />
                                        </div>
                                        <div class="col-md-6 mt-2">
                                        </div>

                                        <div class="col-md-6 mt-2">
                                            <div class="icon-box-content">
                                                <label for="rating">Discount(%) :</label>
                                            </div>
                                            <input type="number" id="txtDiscount" name="Disocunt" class="form-control" placeholder="Discount" value="0" />
                                        </div>
                                        <div class="col-md-6 mt-2">
                                        </div>
                                        <div class="col-md-6 mt-2 d-none">
                                            <div class="icon-box-content">
                                                <label for="rating">Price in KWD :</label>
                                            </div>
                                            <input type="number" id="txtKwd" name="KWD" class="form-control" placeholder="KWD" />
                                        </div>
                                        <div class="col-md-6 mt-2">
                                        </div>
                                        <div class="col-md-12 mt-2">
                                            <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4" onclick="SaveProductPrices();">Save Prices</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane tab-pane-custom" id="Product-Edit-Sub-Categories">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title text-capitalize ls-normal mb-2"><i class="w-icon-fax mr-1"></i>Edit Product - Sub Category</h4>
                                        </div>
                                    </div>
                                    <div class="row gutter-md">
                                        <div class="col-md-6">
                                            <div class="row gutter-md">
                                                <div class="col-md-12 mb-2">
                                                    <div class="icon-box-content">
                                                        <label for="rating">Select Sub Category :</label>
                                                    </div>
                                                    <select id="edit-sub-category-list" class="form-control subcategorychange" disabled>
                                                        <option value="-1" selected>Sub Category</option>
                                                    </select>
                                                </div>
                                                <div class="col-md-12 mb-2">
                                                    <div class="icon-box-content">
                                                        <label for="rating">Stock Amount :</label>
                                                    </div>
                                                    <input type="number" id="txtEditSubCategoryStock" name="amount" class="form-control" placeholder="Amount" />
                                                </div>
                                                <div class="col-md-12 mb-2">
                                                    <div class="icon-box-content">
                                                        <label for="rating">Price in USD :</label>
                                                    </div>
                                                    <input type="number" id="txtEditSubCategoryUsd" name="USD" class="form-control" placeholder="USD" />
                                                </div>
                                                <div class="col-md-12 mb-2">
                                                    <div class="icon-box-content">
                                                        <label for="rating">Discount(%) :</label>
                                                    </div>
                                                    <input type="number" id="txtEditSubCategoryDiscount" name="Disocunt" class="form-control" placeholder="Discount" value="0" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                        </div>
                                        <div class="col-md-12">
                                            <div class="col-md-12">
                                                <div class="icon-box-content">
                                                    <label for="rating">Description (English) :</label>
                                                </div>
                                                <div id="EditsubcategorydetailsEn" style="height: 100px;">
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="icon-box-content mt-2" dir="rtl">
                                                    <label for="rating">الوصف (العربية):</label>
                                                </div>
                                                <div id="EditsubcategorydetailsAr" style="height: 100px;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row gutter-md">
                                        <div class="col-md-12">
                                            <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4 edit-sub-category-by-token" onclick="EditProductSubCategories();">Edit Info</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane tab-pane-custom" id="Product-Sub-Categories">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title text-capitalize ls-normal mb-2"><i class="w-icon-fax mr-1"></i>Product Sub Categories</h4>
                                        </div>
                                    </div>
                                    <div class="row gutter-md">
                                        <div class="col-md-6">
                                            <div class="row gutter-md">
                                                <div class="col-md-12 mb-2">
                                                    <div class="icon-box-content">
                                                        <label for="rating">Select Sub Category :</label>
                                                    </div>
                                                    <select id="new-sub-category-list" class="form-control subcategorychange">
                                                        <option value="-1" selected>Sub Category</option>
                                                    </select>
                                                </div>
                                                <div class="col-md-12 mb-2">
                                                    <div class="icon-box-content">
                                                        <label for="rating">Stock Amount :</label>
                                                    </div>
                                                    <input type="number" id="txtSubCategoryStock" name="amount" class="form-control" placeholder="Amount" />
                                                </div>
                                                <div class="col-md-12 mb-2">
                                                    <div class="icon-box-content">
                                                        <label for="rating">Price in USD :</label>
                                                    </div>
                                                    <input type="number" id="txtSubCategoryUsd" name="USD" class="form-control" placeholder="USD" />
                                                </div>
                                                <div class="col-md-12 mb-2">
                                                    <div class="icon-box-content">
                                                        <label for="rating">Discount(%) :</label>
                                                    </div>
                                                    <input type="number" id="txtSubCategoryDiscount" name="Disocunt" class="form-control" placeholder="Discount" value="0" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="col-md-12">
                                                <div class="icon-box-content">
                                                    <label for="rating">Description (English) :</label>
                                                </div>
                                                <div id="subcategorydetailsEn" style="height: 85px;">
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="icon-box-content mt-2" dir="rtl">
                                                    <label for="rating">الوصف (العربية):</label>
                                                </div>
                                                <div id="subcategorydetailsAr" style="height: 85px;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row gutter-md">
                                        <div class="col-md-12">
                                            <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4" onclick="SaveProductSubCategories();">Save Info</button>
                                        </div>
                                        <div class="col-md-12 mt-0 sub_categories_list">
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane tab-pane-custom" id="Product-Stock">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title text-capitalize ls-normal mb-2"><i class="w-icon-fax mr-1"></i>Product Stock</h4>
                                        </div>
                                    </div>
                                    <div class="row gutter-md">
                                        <div class="col-md-6 mt-2">
                                            <div class="icon-box-content">
                                                <label for="rating">Stock Amount :</label>
                                            </div>
                                            <input type="number" id="txtStock" name="amount" class="form-control" placeholder="Amount" />
                                        </div>
                                        <div class="col-md-6 mt-2">
                                        </div>
                                        <div class="col-md-12 mt-2">
                                            <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4" onclick="SaveProductStock();">Save Stock</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane tab-pane-custom" id="Product-Countries">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title text-capitalize ls-normal mb-2"><i class="w-icon-fax mr-1"></i>Product Countries</h4>
                                        </div>
                                    </div>
                                    <div class="row gutter-md">
                                        <div class="col-md-12 mt-2" style="min-height: 350px;">
                                            <div class="icon-box-content">
                                                <label for="rating">Countries :</label>
                                            </div>
                                            <select id="choices-multiple-remove-button3" placeholder="Select product countries" multiple>
                                            </select>
                                        </div>
                                        <div class="col-md-6 mt-2">
                                            <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4" onclick="SaveProductCountries();">Save Info</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane tab-pane-custom" id="Product-Orders">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <span class="icon-box-icon icon-orders">
                                            <i class="w-icon-orders"></i>
                                        </span>
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title text-capitalize ls-normal mb-0">Orders <span class="nooforders"></span></h4>
                                        </div>
                                    </div>
                                    <table class="shop-table account-orders-table mb-6">
                                        <thead>
                                            <tr>
                                                <th class="order-id">Order</th>
                                                <th class="order-date">Date</th>
                                                <th class="order-status">Status</th>
                                                <th class="order-total">Total</th>
                                                <th class="order-actions">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody class="Order-Items">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="head" runat="server">
    <script src="/assets/js/admin.js"></script>
    <script type="text/javascript">
        let urlSearchQuery2 = location.search;
        let urlParams2 = new URLSearchParams(urlSearchQuery2);
        let urlHasQueryString2 = Array.from(urlParams2).length > 0;
        if (urlHasQueryString2) {
            let myScript = document.createElement("script");
            myScript.setAttribute("src", "/assets/js/info-edit.js");
            document.body.appendChild(myScript);
        }
        else {
            let myScript = document.createElement("script");
            myScript.setAttribute("src", "/assets/js/info-add.js");
            document.body.appendChild(myScript);
        }
    </script>
    <script src="/assets/vendor/quill/quill.js"></script>
    <script src="/assets/vendor/photoswipe/photoswipe.js"></script>
    <script src="/assets/vendor/photoswipe/photoswipe-ui-default.js"></script>
    <script src="/assets/vendor/zoom/jquery.zoom.js"></script>

    <script src="/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"></script>
    <script src="/assets/vendor/swiper/swiper-bundle.min.js"></script>
</asp:Content>

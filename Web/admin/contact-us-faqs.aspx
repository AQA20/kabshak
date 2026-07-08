<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="contact-us-faqs.aspx.cs" Inherits="web.admin.contact_us_faqs" %>

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
                            <li class="breadcrumb-name"><h1 style="font-size: 13px; margin-bottom: unset;">Contact Us FAQs</h1> </li>
                        </ul>
                    </div>
                </nav>

                <!-- Start of PageContent -->
                <div class="page-content pt-2">
                    <div class="container">
                        <div class="tab tab-vertical row gutter-lg">
                            <ul class="nav nav-tabs mb-6" role="tablist">
                                <li class="nav-item">
                                    <a id="lnkCategoriesList" href="#account-orders" class="nav-link active">Contact Us FAQs List</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#account-downloads" class="nav-link">Add a New Question</a>
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
                                            <h4 class="icon-box-title text-capitalize ls-normal mb-0">Contact Us FAQs</h4>
                                        </div>
                                    </div>
                                    <div class="result">
                                        <table class="shop-table wishlist-table">
                                            <thead>
                                                <tr>
                                                    <th class="product-name"><span>Item Info</span></th>
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
                                            <h4 class="icon-box-title ls-normal">Add a New Question</h4>
                                        </div>
                                    </div>

                                    <div class="row gutter-md">
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" placeholder="Question Title" id="txtFAQsNameEn">
                                        </div>
                                        <div class="col-md-6"></div>
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" dir="rtl" placeholder="عنوان السؤال" id="txtFAQsNameAr">
                                        </div>
                                        <div class="col-md-6"></div>
                                        <div class="col-md-12 mt-2">
                                            <textarea  class="form-control" placeholder="Question Answer" id="txtFAQsAnswerNameEn" style="height:200px;"></textarea>
                                        </div>
                                        <div class="col-md-12 mt-2">
                                            <textarea class="form-control" dir="rtl" placeholder="أجابة السؤال" id="txtFAQsAnswerNameAr"  style="height:200px;"></textarea>
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4" onclick="SaveQuestionInfo();">Save Question</button>
                                </div>

                                <div class="tab-pane" id="account-brand">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <span class="icon-box-icon icon-downloads mr-2">
                                            <i class="w-icon-cog"></i>
                                        </span>
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title ls-normal">Edit Question Info</h4>
                                        </div>
                                    </div>

                                      <div class="row gutter-md">
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" placeholder="Question Title" id="txtEditFAQsNameEn">
                                        </div>
                                        <div class="col-md-6"></div>
                                        <div class="col-md-6 mt-2">
                                            <input type="text" class="form-control" dir="rtl" placeholder="عنوان السؤال" id="txtEditFAQsNameAr">
                                        </div>
                                        <div class="col-md-6"></div>
                                        <div class="col-md-12 mt-2">
                                            <textarea  class="form-control" placeholder="Question Answer" id="txtEditFAQsAnswerNameEn" style="height:200px;"></textarea>
                                        </div>
                                        <div class="col-md-12 mt-2">
                                            <textarea class="form-control" dir="rtl" placeholder="أجابة السؤال" id="txtEditFAQsAnswerNameAr"  style="height:200px;"></textarea>
                                        </div>
                                    </div>

                                    <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4 mt-4 EditQuestionInfo">Edit Question</button>
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
    <script src="/assets/js/admin-contact-us-faqs.js?v=1.1"></script>
</asp:Content>

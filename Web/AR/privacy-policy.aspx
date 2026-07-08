<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="privacy-policy.aspx.cs" Inherits="web.AR.privacy_policy" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main class="main">
        <!-- Start of Breadcrumb -->
        <nav class="breadcrumb-nav mb-10 pb-1">
            <div class="container">
                <ul class="breadcrumb">
                    <li><a href="/home.aspx">الصفحة الرئيسية </a></li>
                    <li>سياسة الخصوصية </li>
                </ul>
            </div>
        </nav>
        <!-- End of Breadcrumb -->

        <!-- Start of PageContent -->
        <div class="page-content faq">
            <div class="container">
                <section class="content-title-section">
                    <h1 class="title title-simple justify-content-center bb-no pb-0">سياسة الخصوصية
                    </h1>
                    <p class="description text-center">يمكنك تصفح سياسة الخصوصية باستخدام <b>كبشك </b>بسهولة. </p>
                </section>

                <section class="mb-6 privacy-policy-section">
                    <div class="row items">
                    </div>
                </section>
            </div>
        </div>
        <!-- End of PageContent -->
    </main>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script src="/assets/js/privacy-policy.js"></script>
</asp:Content>

<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="term-and-conditions.aspx.cs" Inherits="web.AR.term_and_conditions" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main class="main">
        <!-- Start of Breadcrumb -->
        <nav class="breadcrumb-nav mb-10 pb-1">
            <div class="container">
                <ul class="breadcrumb">
                    <li><a href="/home.aspx">الصفحة الرئيسية </a></li>
                    <li>الشروط والأحكام </li>
                </ul>
            </div>
        </nav>
        <!-- End of Breadcrumb -->

        <!-- Start of PageContent -->
        <div class="page-content faq">
            <div class="container">
                <section class="content-title-section">
                    <h1 class="title title-simple justify-content-center bb-no pb-0">الشروط والأحكام
                    </h1>
                    <p class="description text-center">يمكنك تصفح الشروط والأحكام مع <b>كبشك </b>بسهولة. </p>
                </section>

                <section class="mb-6 term-and-conditions-section">
                    <div class="row items">
                    </div>
                </section>
            </div>
        </div>
        <!-- End of PageContent -->
    </main>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script src="/assets/js/term-and-conditions.js"></script>
</asp:Content>

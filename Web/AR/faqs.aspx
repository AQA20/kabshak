<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="faqs.aspx.cs" Inherits="web.AR.faqs" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main class="main">

        <!-- Start of Breadcrumb -->
        <nav class="breadcrumb-nav mb-10 pb-1">
            <div class="container">
                <ul class="breadcrumb">
                    <li><a href="/home.aspx">الصفحة الرئيسية </a></li>
                    <li>الأسئلة الشائعة </li>
                </ul>
            </div>
        </nav>
        <!-- End of Breadcrumb -->

        <!-- Start of PageContent -->
        <div class="page-content faq">
            <div class="container">
                <section class="content-title-section">
                    <h1 class="title title-simple justify-content-center bb-no pb-0">أسئلة يتكرر طرحها
                    </h1>
                    <p class="description text-center">يمكنك تصفح الأسئلة الشائعة باستخدام <b>كبشك </b>بسهولة. </p>
                </section>
                <div class="row">
                    <div class="col-md-6 mb-8 d-lg-show" style="min-height: 730px; background-image: url(/assets/images/kuwait.jpg); background-repeat: no-repeat; background-size: cover;">
                    </div>
                    <div class="col-md-6 mb-8">
                        <section class="mb-6 FAQS">
                            <div class="row items">
                            </div>
                        </section>
                    </div>

                </div>
            </div>
        </div>
        <!-- End of PageContent -->
    </main>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script src="/assets/js/faqs.js"></script>
</asp:Content>

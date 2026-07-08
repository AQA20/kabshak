<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="cancellation-policy.aspx.cs" Inherits="vape.AR.cancellation_policy" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main class="main">
        <!-- Start of Breadcrumb -->
        <nav class="breadcrumb-nav mb-10 pb-1">
            <div class="container">
                <ul class="breadcrumb">
                    <li><a href="/home.aspx">الصفحه الرئيسيه</a></li>
                    <li>سياسة الإلغاء والاسترداد</li>
                </ul>
            </div>
        </nav>
        <!-- End of Breadcrumb -->

        <!-- Start of Page Content -->
        <div class="page-content">
            <div class="container">
                <section class="introduce pb-10">
                    <h1 class="title title-center">سياسة الإلغاء والاسترداد</h1>
                </section>
                <section class="mb-6 cancellation-policy-section">
                    <div class="row items">
                    </div>
                </section>
            </div>
        </div>
    </main>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script src="/assets/js/cancellation-policy.js"></script>
</asp:Content>

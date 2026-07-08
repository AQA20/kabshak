<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="our-services.aspx.cs"
    Inherits="vape.our_services" %>

    <asp:Content ID="Content1" ContentPlaceHolderID="HeadCss" runat="server">
    </asp:Content>
    <asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <main class="main">
            <!-- Start of Breadcrumb -->
            <nav class="breadcrumb-nav mb-10 pb-1">
                <div class="container">
                    <ul class="breadcrumb">
                        <li><a href="/home.aspx">Home</a></li>
                        <li>Our Services</li>
                    </ul>
                </div>
            </nav>
            <!-- End of Breadcrumb -->

            <!-- Start of Page Content -->
            <div class="page-content">
                <div class="container">
                    <section class="link-section">
                        <h2 class="title title-center">Our Services</h2>
                        <div class="row services-list">
                        </div>
                    </section>
                </div>
            </div>
        </main>
    </asp:Content>
    <asp:Content ID="Content3" ContentPlaceHolderID="head" runat="server">
        <script src="/assets/js/our_services.js?v=1.0"></script>
    </asp:Content>
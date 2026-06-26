<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="about-us.aspx.cs" Inherits="web.about_us" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main class="main">
        <!-- Start of Breadcrumb -->
        <nav class="breadcrumb-nav mb-10 pb-1">
            <div class="container">
                <ul class="breadcrumb">
                    <li><a href="/home.aspx">Home</a></li>
                    <li>About Us</li>
                </ul>
            </div>
        </nav>
        <!-- End of Breadcrumb -->

        <!-- Start of Page Content -->
        <div class="page-content">
            <div class="container">
                <section class="introduce  pb-10">
                    <h1 class="title title-center">About Kabshak
                    </h1>
                    <p class=" mx-auto text-center">
Kabshak is an online retailer developed and created to provide high-quality, premium, and unique Halal livestock’s meat. Focusing  and aiming to bring all of that to you wherever you are, and through our platforms, you can also buy and donate to a well-known associations or organizations to be distributed to families or communities in need.
                </section>

                <section class="customer-service">
                    <div class="row align-items-center">
                        <div class="col-md-6 pr-lg-8 mb-8">
                            <h2 class="title text-left">Our Online Channels</h2>
                            <div class="accordion accordion-simple accordion-plus">
                                <p>
One of the biggest channels that allows you to order almost everything related to halal items and much more. Simply you can use our application from your mobile phone with a few clicks, and your product will arrive in less than a few days or even a few hours.

                                </p>
                            </div>
                        </div>
                        <div class="col-md-6 mb-8">
                            <figure class="br-lg">
                                <img src="assets/images/aboutUs-1.jpg" alt="Banner" width="610" height="500" style="background-color: #CECECC;">
                            </figure>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </main>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>

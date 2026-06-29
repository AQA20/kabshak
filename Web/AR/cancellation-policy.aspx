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
                <section class="introduce  pb-10">
                    <h1 class="title title-center">سياسة الإلغاء والاسترداد
                    </h1>
                </section>
                <section class="customer-service">
                    <div class="row align-items-center">
                        <div class="col-md-6 pr-lg-8 mb-8">
                            <div class="accordion accordion-simple accordion-plus">
                                <p class=" mx-auto text-center">
                                    تقوم كبشك بأداء نسك الذبح سواء اضحية او غيرها وتوزيعها وايصالها الى الجهات او الاسر العفيفة والمحتاجة وذلك من خلال فريق متخصص, مع الالتزام بالتوقيت الزمني المحدد ما لم تظهر ظروف خارجة عن ارادتها.
                        <br />
                                    وتنص القوانين الشرعية على ان المشتري بمجرد إتمام عملية الشراء ومن ثم إتمام عملية الذبح من قبل كبشك فلا يحق له الإلغاء او الاسترجاع 
                                </p>
                            </div>
                        </div>
                        <div class="col-md-6 mb-8">
                            <figure class="br-lg">
                                <img src="/assets/images/cancellation-policy.png" alt="Banner" width="610" height="500" style="background-color: #CECECC;">
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

<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="about-us.aspx.cs" Inherits="web.AR.about_us" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main class="main">
        <!-- Start of Breadcrumb -->
        <nav class="breadcrumb-nav mb-10 pb-1">
            <div class="container">
                <ul class="breadcrumb">
                    <li><a href="/home.aspx">الصفحه الرئيسيه</a></li>
                    <li>من نحن</li>
                </ul>
            </div>
        </nav>
        <!-- End of Breadcrumb -->

        <!-- Start of Page Content -->
        <div class="page-content">
            <div class="container">
                <section class="introduce  pb-10">
                    <h1 class="title title-center">من نحن Kabshak
                    </h1>
                    <p class=" mx-auto text-center">
Kabshak هو متجر تجزئة عبر الإنترنت تم تطويره وإنشاءه لتوفير لحوم الماشية الحلال عالية الجودة والمتميزة والفريدة من نوعها. من خلال التركيز والسعي على تقديم كل ذلك إليك أينما كنت ، ومن خلال منصاتنا ، يمكنك أيضًا الشراء والتبرع إلى جمعيات أو منظمات معروفة لتوزيعها على العائلات أو المجتمعات المحتاجة.                </section>

                <section class="customer-service">
                    <div class="row align-items-center">
                        <div class="col-md-6 pr-lg-8 mb-8">
                            <h2 class="title text-left">قنواتنا على الإنترنت</h2>
                            <div class="accordion accordion-simple accordion-plus">
                                <p>
واحدة من أكبر القنوات التي تتيح لك طلب كل ما يتعلق بالعناصر الحلال وغير ذلك الكثير. ببساطة يمكنك استخدام تطبيقنا من هاتفك المحمول ببضع نقرات ، وسيصل منتجك في أقل من بضعة أيام أو حتى بضع ساعات.
                                </p>
                            </div>
                        </div>
                        <div class="col-md-6 mb-8">
                            <figure class="br-lg">
                                <img src="/assets/images/aboutUs-1.jpg" alt="Banner" width="610" height="500" style="background-color: #CECECC;">
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

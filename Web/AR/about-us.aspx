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
                <div class="about-logo-container text-center mb-10 mt-5">
                    <img src="/assets/images/logo-footer-ar.png" alt="Kabshak Logo" style="max-width: 180px; height: auto;" />
                </div>

                <section class="core-values pb-10">
                    <div class="row">
                        <!-- من نحن Kabshak -->
                        <div class="col-lg-4 col-md-6 mb-6">
                            <div class="about-grid-card">
                                <div class="about-card-icon">
                                    <i class="w-icon-store"></i>
                                </div>
                                <h3 class="about-card-title">من نحن Kabshak</h3>
                                <p class="about-card-text">
                                    Kabshak هو متجر تجزئة عبر الإنترنت تم تطويره وإنشاءه لتوفير لحوم الماشية الحلال عالية الجودة والمتميزة والفريدة من نوعها. من خلال التركيز والسعي على تقديم كل ذلك إليك أينما كنت ، ومن خلال منصاتنا ، يمكنك أيضًا الشراء والتبرع إلى جمعيات أو منظمات معروفة لتوزيعها على العائلات أو المجتمعات المحتاجة.
                                </p>
                            </div>
                        </div>
                        <!-- قنواتنا على الإنترنت -->
                        <div class="col-lg-4 col-md-6 mb-6">
                            <div class="about-grid-card">
                                <div class="about-card-icon">
                                    <i class="w-icon-phone"></i>
                                </div>
                                <h3 class="about-card-title">قنواتنا على الإنترنت</h3>
                                <p class="about-card-text">
                                    واحدة من أكبر القنوات التي تتيح لك طلب كل ما يتعلق بالعناصر الحلال وغير ذلك الكثير. ببساطة يمكنك استخدام تطبيقنا من هاتفك المحمول ببضع نقرات ، وسيصل منتجك في أقل من بضعة أيام أو حتى بضع ساعات.
                                </p>
                            </div>
                        </div>
                        <!-- خبرتنا -->
                        <div class="col-lg-4 col-md-6 mb-6">
                            <div class="about-grid-card">
                                <div class="about-card-icon">
                                    <i class="w-icon-star-full"></i>
                                </div>
                                <h3 class="about-card-title">خبرتنا</h3>
                                <p class="about-card-text">
                                    كفريق فلقد كنا دائمًا شغوفين بمساعدة الآخرين، فقد شاركنا في مجموعة متنوعة من الخدمات لتلبية الاحتياجات سواء كانت خيرية أو شخصية، وبالتالي لم يكن الأمر كذلك حتى اكتشفنا الطريقة الملائمة بإنشاء منصة على الإنترنت تجعل حياتك أكثر سهولة والعثور على ما تبحث عنه وذلك بالسماح لك ولنا بإحداث فرق في حياة الناس في جميع أنحاء العالم.
                                </p>
                            </div>
                        </div>
                        <!-- رؤيتنا -->
                        <div class="col-lg-4 col-md-6 mb-6">
                            <div class="about-grid-card">
                                <div class="about-card-icon">
                                    <i class="w-icon-search"></i>
                                </div>
                                <h3 class="about-card-title">رؤيتنا</h3>
                                <p class="about-card-text">
                                    <strong>(عالم أفضل).</strong> ولتحقيق هذه الرؤية، نعمل دائما وعن كثب مع المجتمعات والمنظمات المحلية لتحديد المجالات والاحتياجات من خلال تطوير حلول مستهدفة سهلة وذكية سواء كانت شخصية أو خيرية.
                                </p>
                            </div>
                        </div>
                        <!-- مهمتنا -->
                        <div class="col-lg-4 col-md-6 mb-6">
                            <div class="about-grid-card">
                                <div class="about-card-icon">
                                    <i class="w-icon-heart"></i>
                                </div>
                                <h3 class="about-card-title">مهمتنا</h3>
                                <p class="about-card-text">
                                    لتحقيق وتطوير رؤيتنا إلى الحقيقة، مهمتنا هي تمكين الأفراد والمجتمعات في هذا الإقليم للتغلب على الاحتياجات الخاصة والعامة وتحقيق إمكاناتهم الكاملة.
                                </p>
                            </div>
                        </div>
                        <!-- هدفنا -->
                        <div class="col-lg-4 col-md-6 mb-6">
                            <div class="about-grid-card">
                                <div class="about-card-icon">
                                    <i class="w-icon-check"></i>
                                </div>
                                <h3 class="about-card-title">هدفنا</h3>
                                <p class="about-card-text">
                                    هدفنا هو مساعدة أكبر عدد ممكن من الناس. من خلال تسهيل العطاءات الخيرية والاحتياجات الشخصية عبر منصاتنا على الإنترنت، للوصول إلى جمهور أوسع وتحقيق تأثيرًا أوسع من أي وقت مضى. سواء كنت محترفًا مشغولًا تتطلع إلى إحداث فرق أو فاعل خير لديه عمل خيري أو لديك متطلبات شخصية كالأضحية وغيرها، فإننا نجعل من السهل عليك المشاركة وتقديم مساهمة ذات مغزى من خلال استخدام منصاتنا عبر الإنترنت والتي تمكنك من تصفح مجموعة متنوعة من الخدمات واختيار الخدمة التي تناسبك حسب احتياجاتك.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </main>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <style>
        .about-grid-card {
            background: #ffffff;
            border-radius: 16px;
            padding: 3rem;
            box-shadow: 0 10px 30px rgba(89, 57, 48, 0.04);
            border: 1px solid rgba(89, 57, 48, 0.08);
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            height: 100%;
            direction: rtl !important;
            text-align: right !important;
        }
        .about-grid-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(89, 57, 48, 0.08);
            border-color: rgba(89, 57, 48, 0.2);
        }
        .about-card-icon {
            width: 48px;
            height: 48px;
            background: rgba(89, 57, 48, 0.08);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #593930;
            font-size: 2.2rem;
            margin-bottom: 2rem;
            margin-left: auto;
            margin-right: 0;
        }
        .about-card-title {
            font-size: 2rem !important;
            color: #593930 !important;
            margin-bottom: 1.5rem !important;
            font-weight: 700 !important;
        }
        .about-card-text {
            font-size: 1.4rem !important;
            line-height: 1.7 !important;
            color: #666666 !important;
        }
        .marketing-banner {
            background: linear-gradient(135deg, rgba(89, 57, 48, 0.04) 0%, rgba(89, 57, 48, 0.01) 100%);
            border-radius: 20px;
            padding: 4rem;
            border: 1px solid rgba(89, 57, 48, 0.08);
            margin-top: 4rem;
            position: relative;
            overflow: hidden;
            direction: rtl !important;
            text-align: center !important;
        }
        .marketing-banner::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -20%;
            width: 300px;
            height: 300px;
            background: rgba(89, 57, 48, 0.03);
            border-radius: 50%;
            filter: blur(50px);
        }
        .slogan-badge-container {
            display: flex;
            flex-wrap: wrap;
            gap: 1.2rem;
            justify-content: center;
            margin-top: 2rem;
        }
        .slogan-badge {
            background: rgba(89, 57, 48, 0.06);
            color: #593930;
            padding: 0.8rem 1.8rem;
            border-radius: 30px;
            font-size: 1.3rem;
            font-weight: 600;
            border: 1px solid rgba(89, 57, 48, 0.1);
            transition: all 0.3s ease;
        }
        .slogan-badge:hover {
            background: #593930;
            color: #ffffff;
            transform: scale(1.05);
        }
    </style>
</asp:Content>

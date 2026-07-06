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
Kabshak is an online retailer developed and created to provide high-quality, premium, and unique Halal livestock’s meat. Focusing and aiming to bring all of that to you wherever you are, and through our platforms, you can also buy and donate to a well-known associations or organizations to be distributed to families or communities in need.
                </section>

                <section class="customer-service">
                    <div class="row align-items-center">
                        <div class="col-md-6 pr-lg-8 mb-8">
                            <h2 class="title text-left">Our Online Channels</h2>
                            <div class="accordion accordion-simple accordion-plus">
                                <p>
One of the biggest channels that allows you to order almost everything related to halal items
and much more. Simply you can use our application from your mobile phone with a few
clicks, and your product will arrive in less than a few days or even a few hours.

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

                <!-- Start of Core Values (Experience, Vision, Mission, Goal) -->
                <section class="core-values pb-10">
                    <div class="row cols-md-2 cols-1">
                        <div class="mb-6">
                            <div class="about-grid-card">
                                <div class="about-card-icon">
                                    <i class="w-icon-star-full"></i>
                                </div>
                                <h3 class="about-card-title">Our Experience</h3>
                                <p class="about-card-text">
                                    As a team who has always been passionate about helping others, we have been involved in a variety of needs whether charitable or personal. Therefore, it wasn't until we discovered the convenient way of creating an online platform that makes your life easier to find what you look for, allowing you and us to make a difference in the lives of people around the world.
                                </p>
                            </div>
                        </div>
                        <div class="mb-6">
                            <div class="about-grid-card">
                                <div class="about-card-icon">
                                    <i class="w-icon-search"></i>
                                </div>
                                <h3 class="about-card-title">Our Vision</h3>
                                <p class="about-card-text">
                                    <strong>A better world.</strong> To achieve this vision, we work closely with local communities and organizations to identify areas of need by developing easy and smart targeted solutions, whether in personal or charity areas.
                                </p>
                            </div>
                        </div>
                        <div class="mb-6">
                            <div class="about-grid-card">
                                <div class="about-card-icon">
                                    <i class="w-icon-heart"></i>
                                </div>
                                <h3 class="about-card-title">Our Mission</h3>
                                <p class="about-card-text">
                                    To bring our vision to life, we have developed a mission that guides our day-to-day operations. Our mission is to empower individuals and communities in the region to overcome poverty and achieve their full potential.
                                </p>
                            </div>
                        </div>
                        <div class="mb-6">
                            <div class="about-grid-card">
                                <div class="about-card-icon">
                                    <i class="w-icon-check"></i>
                                </div>
                                <h3 class="about-card-title">Our Goal</h3>
                                <p class="about-card-text">
                                    At the end of the day, our goal is simple: to help as many people as possible. With the convenience of online charitable giving, we reach a wider audience and make a broader impact than ever before. Whether you're a busy professional looking to make a difference in your spare time or a philanthropist with a passion for social justice, we make it easy to get involved and make a meaningful contribution to our cause. Through our online platform, you can browse a variety of projects and choose the one that speaks to you.
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
        }
        .marketing-banner::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -20%;
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

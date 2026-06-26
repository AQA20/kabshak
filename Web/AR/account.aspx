<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="account.aspx.cs" Inherits="web.AR.account" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadCss" runat="server">
    <meta name="robots" content="noindex,nofollow" />
    <link href="/assets/vendor/intlTelInput/intlTelInput.css" rel="stylesheet" />
    <style>
        .iti--allow-dropdown {
            border: unset;
            border-radius: 0.3em;
            margin-top: 1px;
        }

        #phone {
            border: unset;
        }

        th {
            text-align: unset;
        }

        .iti--allow-dropdown {
            border: unset;
            border-radius: 0.3em;
            margin-top: 1px;
            direction: ltr;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div>
        <input name='fake' type="text" placeholder="Name:" autocomplete="on" style="width: 0.1em; height: 0.1em; position: fixed; bottom: 0; opacity: 0;">
    </div>
    <div class="my-account loaded">
        <div class="page-wrapper">
            <main class="main">
                <!-- Start of Breadcrumb -->
                <nav class="breadcrumb-nav">
                    <div class="container">
                        <ul class="breadcrumb">
                            <li><a href="/home">الصفحة الرئيسية </a></li>
                            <li>
                                <h1 style="font-size: 13px; margin-bottom: unset;">حسابي</h1>
                            </li>
                        </ul>
                    </div>
                </nav>
                <!-- End of Breadcrumb -->

                <!-- Start of PageContent -->
                <div class="page-content pt-2">
                    <div class="container">
                        <div class="tab tab-vertical row gutter-lg">
                            <ul class="nav nav-tabs mb-6" role="tablist">
                                <li class="nav-item">
                                    <a href="#account-dashboard" class="nav-link active">لوحة التحكم </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#account-orders" class="nav-link">الطلبات </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#account-addresses" class="nav-link">العناوين </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#account-details" class="nav-link">تفاصيل الحساب </a>
                                </li>
                                <li class="link-item">
                                    <a href="/logout.aspx">تسجيل الخروج </a>
                                </li>
                            </ul>

                            <div class="tab-content mb-6">
                                <div class="tab-pane active in" id="account-dashboard">
                                    <p class="reeting">
                                        مرحبًا
                                    <span id="lblUserEmail" runat="server" class="text-dark font-weight-bold"></span>
                                        (ليس
                                    <span id="lblUserEmail2" runat="server" class="text-dark font-weight-bold"></span>؟
                                    <a href="/logout.aspx" class="text-primary">تسجيل الخروج </a>)
                                    </p>

                                    <p class="mb-4">
                                        من لوحة التحكم في حسابك ، يمكنك عرض <a href="#account-orders" class="text-primary link-to-tab">الطلبات الأخيرة </a>،
                                    إدارة <a href="#account-addresses" class="text-primary link-to-tab">عناوين ايصال الفواتير
                                    </a>و
                                    <a href="#account-details" class="text-primary link-to-tab">تعديل كلمة مرورك أو
                                        تفاصيل الحساب. </a>
                                    </p>

                                    <div class="row">
                                        <div class="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
                                            <a href="#account-orders" class="link-to-tab">
                                                <div class="icon-box text-center">
                                                    <span class="icon-box-icon icon-orders">
                                                        <i class="w-icon-orders"></i>
                                                    </span>
                                                    <div class="icon-box-content">
                                                        <p class="text-uppercase mb-0">الطلبات</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
                                            <a href="#account-addresses" class="link-to-tab">
                                                <div class="icon-box text-center">
                                                    <span class="icon-box-icon icon-address">
                                                        <i class="w-icon-map-marker"></i>
                                                    </span>
                                                    <div class="icon-box-content">
                                                        <p class="text-uppercase mb-0">العناوين</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
                                            <a href="#account-details" class="link-to-tab">
                                                <div class="icon-box text-center">
                                                    <span class="icon-box-icon icon-account">
                                                        <i class="w-icon-user"></i>
                                                    </span>
                                                    <div class="icon-box-content">
                                                        <p class="text-uppercase mb-0">تفاصيل الحساب</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
                                            <a href="/logout.aspx">
                                                <div class="icon-box text-center">
                                                    <span class="icon-box-icon icon-logout">
                                                        <i class="w-icon-logout"></i>
                                                    </span>
                                                    <div class="icon-box-content">
                                                        <p class="text-uppercase mb-0">تسجيل الخروج</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div class="tab-pane mb-4" id="account-orders">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <span class="icon-box-icon icon-orders">
                                            <i class="w-icon-orders"></i>
                                        </span>
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title text-capitalize ls-normal mb-0">الطلبات <span class="nooforders"></span></h4>
                                        </div>
                                    </div>

                                    <table class="shop-table account-orders-table mb-6">
                                        <thead>
                                            <tr>
                                                <th class="order-id">الطلب </th>
                                                <th class="order-date">التاريخ </th>
                                                <th class="order-status">الحالة </th>
                                                <th class="order-total">السعر الإجمالي </th>
                                                <th class="order-Actions">الإجراءات </th>
                                            </tr>
                                        </thead>
                                        <tbody class="Order-Items">
                                        </tbody>
                                    </table>

                                    <a href="/" class="btn btn-dark btn-rounded btn-icon-right">ابداء التسوق<i class="w-icon-long-arrow-right"></i></a>
                                </div>

                                <div class="tab-pane" id="account-addresses">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <span class="icon-box-icon icon-map-marker">
                                            <i class="w-icon-map-marker"></i>
                                        </span>
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title mb-0 ls-normal">العناوين</h4>
                                        </div>
                                    </div>
                                    <p>
                                        سيتم استخدام العناوين التالية في اكمال الطلب و الدفع
                                     بشكل افتراضي.
                                    </p>
                                    <div class="row">
                                        <div class="col-sm-6 mb-6">
                                            <div class="ecommerce-address billing-address pr-lg-8">
                                                <h4 class="title title-underline ls-25 font-weight-bold">عنوان الفواتير</h4>
                                                <address class="mb-4">
                                                    <table class="address-table">
                                                        <tbody>
                                                            <tr>
                                                                <th>البلد:</th>
                                                                <td class="billing-country"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>المدينة:</th>
                                                                <td class="billing-city"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>البلدة:</th>
                                                                <td class="billing-town"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>بلوك:</th>
                                                                <td class="billing-block"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>الشارع:</th>
                                                                <td class="billing-street"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>البيت:</th>
                                                                <td class="billing-house"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>الشقة:</th>
                                                                <td class="billing-Apartment"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </address>
                                                <a href="#billing-address" class="btn btn-link btn-underline btn-icon-right text-primary link-to-tab">تعديل عنوان الفواتير الخاص بك<i class="w-icon-long-arrow-right"></i></a>
                                            </div>
                                        </div>
                                        <div class="col-sm-6 mb-6">
                                
                                        </div>
                                    </div>
                                </div>

                                <div class="tab-pane" id="account-details">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <span class="icon-box-icon icon-account mr-2">
                                            <i class="w-icon-user"></i>
                                        </span>
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title mb-0 ls-normal">تفاصيل الحساب</h4>
                                        </div>
                                    </div>
                                    <div class="form account-details-form">
                                        <div class="form account-details-form">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label for="firstname">الاسم الاول *</label>
                                                        <input type="text" id="firstname" name="firstname" runat="server" placeholder="..." class="form-control form-control-md">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label for="lastname">الاسم الاخير *</label>
                                                        <input type="text" id="lastname" name="lastname" runat="server" placeholder="..." class="form-control form-control-md">
                                                    </div>
                                                </div>
                                                <p>ستكون هذه هي الطريقة التي سيتم بها عرض اسمك في قسم الحساب وفي المراجعات</p>
                                            </div>
                                            <div class="form-group">
                                                <label for="email_1">عنوان البريد الالكترونى *</label>
                                                <input type="email" id="email_1" runat="server" name="email_1" class="form-control form-control-md">
                                            </div>
                                            <label for="email_1">الهاتف المحمول *</label>
                                            <div class="form-group mb-6 divPhone" style="border: solid 1px #eee; height: 44px;">
                                                <input id="phone" type="tel" name="phone" placeholder="" />
                                                <input type="hidden" name="full_phone" />
                                            </div>
                                            <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4" onclick="SaveUserInfo();">حفظ التغييرات</button>
                                            <div id="divLoginError" class="alert alert-icon alert-error alert-bg alert-inline show-code-action mb-4 d-none">
                                                <h4 class="alert-title">
                                                    <i class="w-icon-times-circle"></i>
                                                </h4>
                                                <p id="lblLoginError" style="margin-bottom: unset;">
                                                </p>
                                            </div>

                                        </div>
                                        <div id="divChangePassword" runat="server" class="form account-details-form">
                                            <h4 class="title title-password ls-25 font-weight-bold">تغيير كلمة السر</h4>
                                            <div class="form-group">
                                                <label class="text-dark" for="cur-password">كلمة المرور الحالية  <span id="password_strength2"></span></label>
                                                <input type="password" class="form-control form-control-md" id="cur-password" name="cur_password">
                                            </div>
                                            <div class="form-group">
                                                <label class="text-dark" for="new-password">كلمة السر الجديدة  <span id="password_strength"></span></label>
                                                <input type="password" class="form-control form-control-md" id="new-password" name="new_password" onkeyup="CheckPasswordStrength(this.value)">
                                            </div>
                                            <div class="form-group mb-10">
                                                <label class="text-dark" for="conf-password">تأكيد كلمة المرور</label>
                                                <input type="password" class="form-control form-control-md" id="conf-password" name="conf_password">
                                            </div>
                                            <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4" onclick="ChangePassword();">حفظ كلمة المرور</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="tab-pane" id="billing-address">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <span class="icon-box-icon icon-account mr-2">
                                            <i class="w-icon-map-marker"></i>
                                        </span>
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title mb-0 ls-normal">عنوان وصول الفواتير</h4>
                                        </div>
                                    </div>
                                    <p class="mb-3">
                                        سيتم استخدام العناوين التالية على صفحة الدفع
                                     بشكل افتراضي.
                                    </p>
                                    <div class="form account-details-form">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>البلد *</label>
                                                    <div class="select-box">
                                                        <select id="billingCountries" name="country" class="form-control form-control-md items" style="max-width: unset;">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>المدينة *</label>
                                                    <div class="select-box">
                                                        <select id="billingcity" name="billing-city" class="form-control form-control-md" style="max-width: unset;">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label>البلدة *</label>
                                                    <input type="text" class="form-control form-control-md" name="billing-town">
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label>بلوك *</label>
                                                    <input type="text" class="form-control form-control-md" name="billing-block">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>الشارع *</label>
                                                    <input type="text" class="form-control form-control-md" name="billing-street">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label>البيت # *</label>
                                                    <input type="number" class="form-control form-control-md" name="billing-house">
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label>الشقة # *</label>
                                                    <input type="number" class="form-control form-control-md" name="billing-Apartment">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row gutter-sm">
                                            <div class="col-md-6">
                                                <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4" onclick="SaveBillingAddress();">حفظ التغييرات</button>
                                            </div>
                                            <div class="col-md-6 d-flex align-items-center">
                                                <a href="#account-addresses" class="btn btn-link btn-underline btn-icon-right text-primary link-to-tab">العودة إلى عنوانك<i class="w-icon-long-arrow-right"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End of PageContent -->
            </main>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="head" runat="server">
    <script src="/assets/vendor/intlTelInput/intlTelInput.js"></script>
    <script src="/assets/js/account.js"></script>
</asp:Content>

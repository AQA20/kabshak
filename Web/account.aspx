<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="account.aspx.cs" Inherits="web.account" %>

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
                            <li><a href="/home">Home</a></li>
                            <li><h1 style="font-size: 13px; margin-bottom: unset;">My account</h1></li>
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
                                    <a href="#account-dashboard" class="nav-link active">Dashboard</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#account-orders" class="nav-link">Orders</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#account-addresses" class="nav-link">Addresses</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#account-details" class="nav-link">Account details</a>
                                </li>
                                <li class="link-item">
                                    <a href="/logout.aspx">Logout</a>
                                </li>
                            </ul>

                            <div class="tab-content mb-6">
                                <div class="tab-pane active in" id="account-dashboard">
                                    <p class="greeting">
                                        Hello
                                    <span id="lblUserEmail" runat="server" class="text-dark font-weight-bold"></span>
                                        (not
                                    <span id="lblUserEmail2" runat="server" class="text-dark font-weight-bold"></span>?
                                    <a href="/logout.aspx" class="text-primary">Log out</a>)
                                    </p>

                                    <p class="mb-4">
                                        From your account dashboard you can view your <a href="#account-orders" class="text-primary link-to-tab">recent orders</a>,
                                    manage your <a href="#account-addresses" class="text-primary link-to-tab">billing
                                        addresses</a>, and
                                    <a href="#account-details" class="text-primary link-to-tab">edit your password and
                                        account details.</a>
                                    </p>

                                    <div class="row">
                                        <div class="col-lg-4 col-md-6 col-sm-4 col-xs-6 mb-4">
                                            <a href="#account-orders" class="link-to-tab">
                                                <div class="icon-box text-center">
                                                    <span class="icon-box-icon icon-orders">
                                                        <i class="w-icon-orders"></i>
                                                    </span>
                                                    <div class="icon-box-content">
                                                        <p class="text-uppercase mb-0">Orders</p>
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
                                                        <p class="text-uppercase mb-0">Addresses</p>
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
                                                        <p class="text-uppercase mb-0">Account Details</p>
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
                                                        <p class="text-uppercase mb-0">Logout</p>
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
                                            <h4 class="icon-box-title text-capitalize ls-normal mb-0">Orders <span class="nooforders"></span></h4>
                                        </div>
                                    </div>

                                    <table class="shop-table account-orders-table mb-6">
                                        <thead>
                                            <tr>
                                                <th class="order-id">Order</th>
                                                <th class="order-date">Date</th>
                                                <th class="order-status">Status</th>
                                                <th class="order-total">Total</th>
                                                <th class="order-actions">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody class="Order-Items">
                                        </tbody>
                                    </table>

                                    <a href="home.aspx" class="btn btn-dark btn-rounded btn-icon-right">Go
                                    Shop<i class="w-icon-long-arrow-right"></i></a>
                                </div>

                                <div class="tab-pane" id="account-addresses">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <span class="icon-box-icon icon-map-marker">
                                            <i class="w-icon-map-marker"></i>
                                        </span>
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title mb-0 ls-normal">Addresses</h4>
                                        </div>
                                    </div>
                                    <p>
                                        The following addresses will be used on the checkout page
                                    by default.
                                    </p>
                                    <div class="row">
                                        <div class="col-sm-6 mb-6">
                                            <div class="ecommerce-address billing-address pr-lg-8">
                                                <h4 class="title title-underline ls-25 font-weight-bold">Billing Address</h4>
                                                <address class="mb-4">
                                                    <table class="address-table">
                                                        <tbody>
                                                            <tr>
                                                                <th>Country:</th>
                                                                <td class="billing-country"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>City:</th>
                                                                <td class="billing-city"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>Town:</th>
                                                                <td class="billing-town"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>Block:</th>
                                                                <td class="billing-block"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>Street:</th>
                                                                <td class="billing-street"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>House:</th>
                                                                <td class="billing-house"></td>
                                                            </tr>
                                                            <tr>
                                                                <th>Apartment:</th>
                                                                <td class="billing-Apartment"></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </address>
                                                <a href="#billing-address" class="btn btn-link btn-underline btn-icon-right text-primary link-to-tab">Edit
                                                your billing address<i class="w-icon-long-arrow-right"></i></a>
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
                                            <h4 class="icon-box-title mb-0 ls-normal">Account Details</h4>
                                        </div>
                                    </div>
                                    <div class="form account-details-form">
                                        <div class="form account-details-form">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label for="firstname">First name *</label>
                                                        <input type="text" id="firstname" name="firstname" runat="server" placeholder="..." class="form-control form-control-md">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label for="lastname">Last name *</label>
                                                        <input type="text" id="lastname" name="lastname" runat="server" placeholder="..." class="form-control form-control-md">
                                                    </div>
                                                </div>
                                                <p>This will be how your name will be displayed in the account section and in reviews</p>
                                            </div>
                                            <div class="form-group">
                                                <label for="email_1">Email address *</label>
                                                <input type="email" id="email_1" runat="server" name="email_1" class="form-control form-control-md">
                                            </div>
                                            <label for="email_1">Mobile *</label>
                                            <div class="form-group mb-6 divPhone" style="border: solid 1px #eee; height: 44px;">
                                                <input id="phone" type="tel" name="phone" placeholder="" />
                                                <input type="hidden" name="full_phone" />
                                            </div>
                                            <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4" onclick="SaveUserInfo();">Save Changes</button>
                                            <div id="divLoginError" class="alert alert-icon alert-error alert-bg alert-inline show-code-action mb-4 d-none">
                                                <h4 class="alert-title">
                                                    <i class="w-icon-times-circle"></i>
                                                </h4>
                                                <p id="lblLoginError" style="margin-bottom: unset;">
                                                </p>
                                            </div>

                                        </div>
                                        <div id="divChangePassword" runat="server" class="form account-details-form">
                                            <h4 class="title title-password ls-25 font-weight-bold">Password change</h4>
                                            <div class="form-group">
                                                <label class="text-dark" for="cur-password">Current Password  <span id="password_strength2"></span></label>
                                                <input type="password" class="form-control form-control-md" id="cur-password" name="cur_password">
                                            </div>
                                            <div class="form-group">
                                                <label class="text-dark" for="new-password">New Password  <span id="password_strength"></span></label>
                                                <input type="password" class="form-control form-control-md" id="new-password" name="new_password" onkeyup="CheckPasswordStrength(this.value)">
                                            </div>
                                            <div class="form-group mb-10">
                                                <label class="text-dark" for="conf-password">Confirm Password</label>
                                                <input type="password" class="form-control form-control-md" id="conf-password" name="conf_password">
                                            </div>
                                            <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4" onclick="ChangePassword();">Save Password</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="tab-pane" id="billing-address">
                                    <div class="icon-box icon-box-side icon-box-light">
                                        <span class="icon-box-icon icon-account mr-2">
                                            <i class="w-icon-map-marker"></i>
                                        </span>
                                        <div class="icon-box-content">
                                            <h4 class="icon-box-title mb-0 ls-normal">Billing Address</h4>
                                        </div>
                                    </div>
                                    <p class="mb-3">
                                        The following addresses will be used on the checkout page
                                    by default.
                                    </p>
                                    <div class="form account-details-form">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Country *</label>
                                                    <div class="select-box">
                                                        <select id="billingCountries" name="country" class="form-control form-control-md items" style="max-width: unset;">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>City *</label>
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
                                                    <label>Town *</label>
                                                    <input type="text" class="form-control form-control-md" name="billing-town">
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label>Block *</label>
                                                    <input type="text" class="form-control form-control-md" name="billing-block">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label>Street *</label>
                                                    <input type="text" class="form-control form-control-md" name="billing-street">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label>House # *</label>
                                                    <input type="number" class="form-control form-control-md" name="billing-house">
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label>Apartment # *</label>
                                                    <input type="number" class="form-control form-control-md" name="billing-Apartment">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row gutter-sm">
                                            <div class="col-md-6">
                                                <button type="button" class="btn btn-dark btn-rounded btn-sm mb-4" onclick="SaveBillingAddress();">Save Changes</button>
                                            </div>
                                            <div class="col-md-6 d-flex align-items-center">
                                                <a href="#account-addresses" class="btn btn-link btn-underline btn-icon-right text-primary link-to-tab">Back
                                                to your address<i class="w-icon-long-arrow-right"></i></a>
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

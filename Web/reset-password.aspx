<%@ Page Title="" Language="C#" MasterPageFile="~/site.Master" AutoEventWireup="true" CodeBehind="reset-password.aspx.cs" Inherits="web.reset_password" %>
<asp:Content ID="Content3" ContentPlaceHolderID="HeadCss" runat="server">
    <meta name="robots" content="noindex,nofollow" />
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <main class="main login-page">
        <div class="page-content">
            <div class="container">
                <div class="login-popup">
                    <div class="tab tab-nav-boxed tab-nav-center tab-nav-underline">
                        <ul class="nav nav-tabs text-uppercase" role="tablist">
                            <li class="nav-item">
                                <a href="#sign-in" class="nav-link active">Reset Password</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane active" id="sign-in">
                                <div class="form-group">
                                    <label>New Password *</label>
                                    <input type="password" class="form-control" name="password" id="password">
                                </div>
                                <div class="form-group mb-0">
                                    <label>Confirm Password *</label>
                                    <input type="password" class="form-control" name="confirm" id="confirm">
                                </div>
                                <button type="button" class="btn btn-primary mt-5 mb-5 w-100" onclick="return ChangePassword();">Change Password</button>
                                <div id="divLoginError" class="alert alert-icon alert-error alert-bg alert-inline show-code-action d-none">
                                    <h4 class="alert-title">
                                        <i class="w-icon-times-circle"></i>
                                    </h4>
                                    <p id="lblLoginError" style="margin-bottom: unset;">
                                    </p>
                                </div>
                                <div id="divSuccessError" class="alert alert-icon alert-success alert-bg alert-inline show-code-action d-none">
                                    <h4 class="alert-title">
                                        <i class="fas fa-check"></i>
                                    </h4>
                                    <p id="lblSuccessError">
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script src="/assets/js/reset_password.js"></script>
</asp:Content>


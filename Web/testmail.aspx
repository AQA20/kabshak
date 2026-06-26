<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Net.Mail" %>
<%@ Import Namespace="System.Text" %>
<%@ Import Namespace="System.Configuration" %>

<!DOCTYPE html>
<html>
<head runat="server">
    <title>SMTP Mail Tester Diagnostics</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f4f6f9; color: #333; }
        .card { background: #fff; padding: 25px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); max-width: 600px; margin: auto; }
        h2 { color: #0056b3; margin-top: 0; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        table td { padding: 8px; border-bottom: 1px solid #eee; }
        table td.label { font-weight: bold; width: 180px; }
        .btn { background: #007bff; color: #fff; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; font-size: 15px; }
        .btn:hover { background: #0056b3; }
        .result { margin-top: 20px; padding: 15px; border-radius: 4px; display: none; }
        .success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; display: block; }
        .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; display: block; font-family: monospace; white-space: pre-wrap; }
        .input-field { padding: 6px; width: 95%; border-radius: 4px; border: 1px solid #ccc; }
    </style>
    <script runat="server">
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                txtSmtp.Text = ConfigurationManager.AppSettings["email_smtp"];
                txtPort.Text = ConfigurationManager.AppSettings["email_port"];
                txtUsername.Text = ConfigurationManager.AppSettings["email_username"];
                txtFrom.Text = ConfigurationManager.AppSettings["email_from"];
                
                bool sslVal = true;
                if (ConfigurationManager.AppSettings["email_ssl"] != null)
                {
                    bool.TryParse(ConfigurationManager.AppSettings["email_ssl"], out sslVal);
                }
                chkSsl.Checked = sslVal;
                
                string pwd = ConfigurationManager.AppSettings["email_password"];
                if (string.IsNullOrEmpty(pwd))
                {
                    lblPwdStatus.Text = "MISSING OR EMPTY";
                    lblPwdStatus.ForeColor = System.Drawing.Color.Red;
                }
                else
                {
                    lblPwdStatus.Text = "LOADED (Length: " + pwd.Length + ", Starts with: " + pwd.Substring(0, Math.Min(3, pwd.Length)) + ")";
                    lblPwdStatus.ForeColor = System.Drawing.Color.Green;
                }
            }
        }

        protected void btnSend_Click(object sender, EventArgs e)
        {
            divResult.Visible = true;
            try
            {
                string smtpHost = txtSmtp.Text.Trim();
                int smtpPort = int.Parse(txtPort.Text.Trim());
                string smtpUser = txtUsername.Text.Trim();
                string smtpPass = ConfigurationManager.AppSettings["email_password"];
                string smtpFrom = txtFrom.Text.Trim();
                string displayName = ConfigurationManager.AppSettings["email_display_name"];
                bool enableSsl = chkSsl.Checked;

                using (SmtpClient client = new SmtpClient(smtpHost, smtpPort))
                {
                    client.EnableSsl = enableSsl;
                    client.UseDefaultCredentials = false;
                    client.Credentials = new System.Net.NetworkCredential(smtpUser, smtpPass);

                    MailAddress from = new MailAddress(smtpFrom, displayName);
                    MailAddress to = new MailAddress(txtTestEmail.Text.Trim());
                    
                    using (MailMessage mail = new MailMessage(from, to))
                    {
                        mail.Subject = "Diagnostics Test Email from Kabshak";
                        mail.Body = "<h1>Diagnostics Email</h1><p>If you see this, email sending works perfectly from the live server!</p><p>Server: " + smtpHost + ", Port: " + smtpPort + ", SSL: " + enableSsl + "</p>";
                        mail.IsBodyHtml = true;
                        mail.BodyEncoding = Encoding.UTF8;

                        client.Send(mail);
                    }
                }

                divResult.CssClass = "result success";
                lblResult.Text = "Success! Test email was sent successfully to " + txtTestEmail.Text + " using " + smtpHost + ":" + smtpPort + " (SSL=" + enableSsl + ")";
            }
            catch (Exception ex)
            {
                divResult.CssClass = "result error";
                lblResult.Text = "ERROR OCCURRED:\n\n" + ex.ToString();
            }
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="card">
            <h2>SMTP Diagnostics & Tester</h2>
            <p>You can edit these parameters below to test different mail configurations directly on the live server.</p>
            
            <table>
                <tr>
                    <td class="label">SMTP Server:</td>
                    <td><asp:TextBox ID="txtSmtp" runat="server" CssClass="input-field" /></td>
                </tr>
                <tr>
                    <td class="label">Port:</td>
                    <td><asp:TextBox ID="txtPort" runat="server" CssClass="input-field" /></td>
                </tr>
                <tr>
                    <td class="label">Username (Login):</td>
                    <td><asp:TextBox ID="txtUsername" runat="server" CssClass="input-field" /></td>
                </tr>
                <tr>
                    <td class="label">From Address:</td>
                    <td><asp:TextBox ID="txtFrom" runat="server" CssClass="input-field" /></td>
                </tr>
                <tr>
                    <td class="label">SSL Enabled:</td>
                    <td><asp:CheckBox ID="chkSsl" runat="server" /></td>
                </tr>
                <tr>
                    <td class="label">Email Password status:</td>
                    <td><asp:Label ID="lblPwdStatus" runat="server" /></td>
                </tr>
            </table>

            <div style="margin: 20px 0;">
                <label style="font-weight: bold; display: block; margin-bottom: 5px;">Recipient Email Address:</label>
                <asp:TextBox ID="txtTestEmail" runat="server" Text="ahmedqss120@gmail.com" Width="95%" Style="padding: 8px; border-radius: 4px; border: 1px solid #ccc; margin-bottom: 15px;" />
                <asp:Button ID="btnSend" runat="server" Text="Send Test Email" OnClick="btnSend_Click" CssClass="btn" />
            </div>

            <asp:Panel ID="divResult" runat="server" Visible="false" CssClass="result">
                <asp:Label ID="lblResult" runat="server" />
            </asp:Panel>
        </div>
    </form>
</body>
</html>

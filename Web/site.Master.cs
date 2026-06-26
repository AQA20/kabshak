using BusinessLogic;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace web
{
    public partial class site : System.Web.UI.MasterPage
    {
        usersBL _userBL = new usersBL();
        common _common = new common();
        public void Page_Init(Object src, EventArgs e)
        {
            try
            {
                if (Session["AuthServiceToken"] == null || Session["AuthServiceToken"].ToString().Trim() == string.Empty)
                {
                    Guid tokenGuid = Guid.NewGuid();
                    usersBL _usersBL = new usersBL();
                    _usersBL.save_auth_token(tokenGuid);
                    Session["AuthServiceToken"] = tokenGuid.ToString();
                }

                string currency = "usd";

                if (Request.Cookies["currency"] == null)
                {
                    HttpContext.Current.Response.Cookies["currency"].Expires = DateTime.Now.AddDays(30);
                    HttpContext.Current.Response.Cookies["currency"].Value = currency;
                }

                if (LoginUser.UserInformation == null && Request.Cookies["Remember"] != null)
                {
                    string value = Request.Cookies["Remember"].Value.ToString();
                    if (value.Trim() == "true")
                    {
                        if (Request.Cookies["UserToken"] != null)
                        {
                            var data = _userBL.get_user_by_token(Request.Cookies["UserToken"].Value.ToString());
                            LoginUser.UserInformation = data;
                        }
                    }
                    else
                    {
                        Response.Cookies["UserToken"].Expires = DateTime.Now.AddDays(-1);
                        Response.Cookies["Remember"].Expires = DateTime.Now.AddDays(-1);
                    }
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (!IsPostBack)
                {
                    if (LoginUser.UserInformation != null)
                    {
                        lblAccountName_mob.InnerHtml = lblAccountName.InnerHtml = (_common.GetObjectValue(LoginUser.UserInformation, "FirstName") != string.Empty) ? _common.GetObjectValue(LoginUser.UserInformation, "FirstName") + " " + _common.GetObjectValue(LoginUser.UserInformation, "LastName") : _common.GetObjectValue(LoginUser.UserInformation, "Email");
                        lblMyAccount.Attributes.Add("Class", "d-lg-show");
                        lblLogout.Attributes.Add("Class", "d-lg-show");
                        lbllogin_mob.Attributes.Add("Class", "d-none");
                        lblRegister_mob.Attributes.Add("Class", "d-none");
                        lbl_my_account_mob.Attributes.Add("Class", "");
                        lbl_logout_mob.Attributes.Add("Class", "");
                        liAccountName_mob.Attributes.Add("Class", "d-flex align-items-center");

                        bool isAdmin = false;
                        bool.TryParse(_common.GetObjectValue(LoginUser.UserInformation, "IsAdmin"), out isAdmin);
                        if (isAdmin == false)
                        {
                            lnkAdminDashboard.InnerHtml = lnkAdminDashboard2.InnerHtml = lnkAdminDashboard3.InnerHtml = string.Empty;
                            lnkAdminDashboard.Attributes.Add("class", "d-none");
                            lnkAdminDashboard2.Attributes.Add("class", "d-none");
                            lnkAdminDashboard3.Attributes.Add("class", "d-none");
                        }
                    }
                    else
                    {
                        lnkAdminDashboard.InnerHtml = lnkAdminDashboard2.InnerHtml = lnkAdminDashboard3.InnerHtml = string.Empty;
                        lnkAdminDashboard.Attributes.Add("class","d-none");
                        lnkAdminDashboard2.Attributes.Add("class","d-none");
                        lnkAdminDashboard3.Attributes.Add("class","d-none");
                    }
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        public void ChangeTitle(string value)
        {
            Page.Title = value.Trim();

            Literal lmeta = new Literal();
            lmeta.Mode = LiteralMode.PassThrough;
            lmeta.Text = string.Format("<meta property =\"og:url\" content=\"{0}\"/>", "" + HttpContext.Current.Request.RawUrl);
            this.Page.Header.Controls.Add(lmeta);

            Literal lmeta1 = new Literal();
            lmeta1.Mode = LiteralMode.PassThrough;
            lmeta1.Text = string.Format("<meta property =\"og:type\" content=\"{0}\"/>", "website");
            this.Page.Header.Controls.Add(lmeta1);

            Literal lmeta0 = new Literal();
            lmeta0.Mode = LiteralMode.PassThrough;
            lmeta0.Text = string.Format("<meta property =\"og:title\" content=\"{0}\"/>", value.ToLower());
            this.Page.Header.Controls.Add(lmeta0);

            Literal lmeta2 = new Literal();
            lmeta2.Mode = LiteralMode.PassThrough;
            lmeta2.Text = string.Format("<meta property =\"twitter:title\" content=\"{0}\"/>", value.ToLower());
            this.Page.Header.Controls.Add(lmeta2);

            Literal lmeta3 = new Literal();
            lmeta3.Mode = LiteralMode.PassThrough;
            lmeta3.Text = string.Format("<meta property =\"twitter:url\" content=\"{0}\"/>", "" + HttpContext.Current.Request.RawUrl);
            this.Page.Header.Controls.Add(lmeta3);

            Literal lmeta4 = new Literal();
            lmeta4.Mode = LiteralMode.PassThrough;
            lmeta4.Text = string.Format("<meta property =\"twitter:card\" content=\"{0}\"/>", "summary");
            this.Page.Header.Controls.Add(lmeta4);
        }

        public void ChangeDescription(string value)
        {
            Page.MetaDescription = value;

            Literal lmeta = new Literal();
            lmeta.Mode = LiteralMode.PassThrough;
            lmeta.Text = string.Format("<meta property =\"og:description\" content=\"{0}\"/>", value);
            this.Page.Header.Controls.Add(lmeta);


            Literal lmeta1 = new Literal();
            lmeta1.Mode = LiteralMode.PassThrough;
            lmeta1.Text = string.Format("<meta property =\"twitter:description\" content=\"{0}\"/>", value);
            this.Page.Header.Controls.Add(lmeta1);
        }
        public void ChangeImage(string value)
        {
            value = value.Replace(" ", "%20");

            string twittervalue = value;

            if (twittervalue == "https://www.kabshak.com/assets/images/logo.png")
            {
                twittervalue = "/assets/images/twitter_image.png";
            }

            HtmlMeta tag2 = new HtmlMeta();
            tag2.Attributes.Add("property", "twitter:image");
            tag2.Content = twittervalue;
            Page.Header.Controls.Add(tag2);

            if (value == "https://www.kabshak.com/assets/images/logo.png")
            {
                value = "/assets/images/og_image.png";
            }

            HtmlMeta tag = new HtmlMeta();
            tag.Attributes.Add("property", "og:image");
            tag.Content = value;
            Page.Header.Controls.Add(tag);
        }
        public void AddOgScript(string value)
        {
            Page.Header.Controls.Add(new System.Web.UI.LiteralControl("<script  type=\"application/ld+json\">{" + value + "}</script>"));
        }
    }
}
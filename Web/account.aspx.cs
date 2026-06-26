using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace web
{
    public partial class account : common
    {
        public void Page_Init(Object src, EventArgs e)
        {
            site yourMaster = (site)this.Master;
            yourMaster.ChangeTitle("Account | Kabshak");
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (LoginUser.UserInformation == null || int.Parse(GetObjectValue(LoginUser.UserInformation, "UserId")) < 0)
                {
                    Redirect(PageStructure.Pages.Home, true);
                }
                else
                {
                    lblUserEmail.InnerHtml = lblUserEmail2.InnerHtml = GetObjectValue(LoginUser.UserInformation, "Email");

                    firstname.Value = GetObjectValue(LoginUser.UserInformation, "FirstName");
                    lastname.Value = GetObjectValue(LoginUser.UserInformation, "LastName");

                    if (GetObjectValue(LoginUser.UserInformation, "FacebookId") != string.Empty)
                    {
                        email_1.Value = (GetObjectValue(LoginUser.UserInformation, "AnotherEmail") != string.Empty ? GetObjectValue(LoginUser.UserInformation, "AnotherEmail") : string.Empty);
                        divChangePassword.InnerHtml = "";
                    }
                    else
                    {
                        email_1.Value = (GetObjectValue(LoginUser.UserInformation, "AnotherEmail") != string.Empty ? GetObjectValue(LoginUser.UserInformation, "AnotherEmail") : GetObjectValue(LoginUser.UserInformation, "Email"));
                        email_1.Disabled = true;
                    }
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace web.admin
{
    public partial class privacy_policy : common
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (LoginUser.UserInformation == null || bool.Parse(GetObjectValue(LoginUser.UserInformation, "IsAdmin")) == false || int.Parse(GetObjectValue(LoginUser.UserInformation, "UserId")) <= 0)
                {
                    Redirect(PageStructure.Pages.Home, true);
                }

                site yourMaster = (site)this.Master;
                yourMaster.ChangeTitle("Privacy Policy Admin | Kabshak");
                yourMaster.ChangeDescription("Manage Privacy Policy sections.");
                yourMaster.ChangeImage("https://www.kabshak.com/assets/images/logo.png");
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
    }
}

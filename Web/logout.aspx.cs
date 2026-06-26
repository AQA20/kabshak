using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace web
{
    public partial class logout : common
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            LoginUser.UserInformation = null;
            Response.Cookies["UserToken"].Expires = DateTime.Now.AddDays(-1);
            Response.Cookies["Remember"].Expires = DateTime.Now.AddDays(-1);

            if (IsArabic())
                Redirect(PageStructure.Pages.Ar, true);
            else
                Redirect(PageStructure.Pages.Home, true);
        }
    }
}
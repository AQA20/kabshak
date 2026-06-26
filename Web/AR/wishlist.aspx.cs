using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace web.AR
{
    public partial class wishlist : common
    {
        public void Page_Init(Object src, EventArgs e)
        {
            site yourMaster = (site)this.Master;
            yourMaster.ChangeTitle("قائمتي المفضلة | كبشك");
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (LoginUser.UserInformation == null || int.Parse(GetObjectValue(LoginUser.UserInformation, "UserId")) < 0)
                {
                    Redirect(PageStructure.Pages.Home, true);
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
    }
}
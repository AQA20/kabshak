using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace web.AR
{
    public partial class checkout : common
    {
        public void Page_Init(Object src, EventArgs e)
        {
            site yourMaster = (site)this.Master;
            yourMaster.ChangeTitle("الدفع | كبشك");
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            if (LoginUser.UserInformation == null || bool.Parse(GetObjectValue(LoginUser.UserInformation, "IsAdmin")) == false || int.Parse(GetObjectValue(LoginUser.UserInformation, "UserId")) <= 0)
            {
                BankTransferOrder.InnerHtml = string.Empty;
            }
        }
    }
}
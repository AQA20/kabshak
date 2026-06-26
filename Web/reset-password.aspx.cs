using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace web
{
    public partial class reset_password : System.Web.UI.Page
    {
        public void Page_Init(Object src, EventArgs e)
        {
            site yourMaster = (site)this.Master;
            yourMaster.ChangeTitle("Reset Password | Kabshak");
        }
        protected void Page_Load(object sender, EventArgs e)
        {

        }
    }
}
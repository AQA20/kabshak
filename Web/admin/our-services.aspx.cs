using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace web.admin
{
    public partial class our_services : common
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
                yourMaster.ChangeTitle("Our Services | Kabshak");
                yourMaster.ChangeDescription("Kabshak | The Kabshak is Kuwait's best online head shop featuring a wide selection of web items and other smoking accessories.");
                yourMaster.ChangeImage("https://www.kabshak.com/assets/images/logo.png");
                yourMaster.AddOgScript("\"@context\": \"https://schema.org\",\"@type\": \"Article\",\"mainEntityOfPage\": {\"@type\": \"WebPage\",\"@id\": \"/admin/our-services\"},\"headline\": \"Our Services\",\"description\": \"Kabshak | The Kabshak is Kuwait's best online head shop featuring a wide selection of web items and other smoking accessories.\",\"image\": {\"@type\": \"ImageObject\",\"url\": \"https://www.kabshak.com/assets/images/logo.png\"},\"author\": {\"@type\": \"Organization\",\"name\": \"Smokin Kingdom\"},\"publisher\": {\"@type\": \"Organization\",\"name\": \"Kabsh\",\"logo\": {\"@type\": \"ImageObject\",\"url\": \"https://www.kabshak.com/assets/images/logo.png\"}},\"datePublished\": \"2022-09-26\",\"dateModified\": \"2022-09-26\"");
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
    }
}

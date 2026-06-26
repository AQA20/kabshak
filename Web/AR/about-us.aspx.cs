using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace web.AR
{
    public partial class about_us : common
    {
        public void Page_Init(Object src, EventArgs e)
        {
            site yourMaster = (site)this.Master; 
            yourMaster.ChangeTitle("من نحن | كبشك");


            string path = HttpContext.Current.Server.MapPath("~/SEO/about_us_ar.txt");
            string _descriptionText = File.ReadAllText(path).Trim();

            yourMaster.ChangeDescription(_descriptionText);
            yourMaster.ChangeImage("https://www.kabshak.com/assets/images/logo.png");
            yourMaster.AddOgScript("\"@context\": \"https://schema.org\",\"@type\": \"Article\",\"mainEntityOfPage\": {\"@type\": \"WebPage\",\"@id\": \"/term-and-conditions\"},\"headline\": \"Terms of Use\",\"description\": \"" + _descriptionText + "\",\"image\": {\"@type\": \"ImageObject\",\"url\": \"https://www.kabshak.com/assets/images/logo.png\"},\"author\": {\"@type\": \"Organization\",\"name\": \"Smokin Kingdom\"},\"publisher\": {\"@type\": \"Organization\",\"name\": \"Kabsh\",\"logo\": {\"@type\": \"ImageObject\",\"url\": \"https://www.kabshak.com/assets/images/logo.png\"}},\"datePublished\": \"2023-06-05\",\"dateModified\": \"2023-06-05\"");

        }
        protected void Page_Load(object sender, EventArgs e)
        {
        
        }
    }
}
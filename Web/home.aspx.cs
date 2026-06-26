using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace web
{
    public partial class home : common
    {
        public void Page_Init(Object src, EventArgs e)
        {
            string baseUrl = HttpContext.Current.Request.Url.AbsoluteUri;

            switch (baseUrl)
            {
                case "https://kabshak.com/home.aspx":
                case "https://kabshak.com/home":
                case "https://www.kabshak.com/home.aspx":
                case "https://www.kabshak.com/home":
                case "http://kabshak.com/home.aspx":
                case "http://kabshak.com/home":
                case "http://www.kabshak.com/home.aspx":
                case "http://www.kabshak.com/home":
                    {

                        baseUrl = "https://kabshak.com/";
                        Page.Response.Redirect(baseUrl, true);

                        break;
                    }
                default:
                    break;
            }

            site yourMaster = (site)this.Master;
            yourMaster.ChangeTitle("Kabshak");

            string path = HttpContext.Current.Server.MapPath("~/SEO/home.txt");
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
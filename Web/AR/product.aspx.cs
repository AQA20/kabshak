using BusinessLogic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace web.AR
{
    public partial class product : common
    {
        public string token
        {
            get
            {
                if (Request == null || string.IsNullOrEmpty(Request.QueryString["Id"]))
                {
                    return string.Empty;
                }

                return Request.QueryString["Id"].ToString().Trim();
            }
        }

        public void Page_Init(Object src, EventArgs e)
        {
            try
            {
                if (!IsPostBack)
                {
                    productsBL obj = new productsBL();
                    object data = obj.GetProductDetailsByIdForSEO(token);

                    site yourMaster = (site)this.Master;
                    yourMaster.ChangeTitle(GetObjectValue(data, "NameAr") + " | كبشك");
                    yourMaster.ChangeDescription(GetObjectValue(data, "BriefAr") + " | كبشك");
                    string ImageURL = GetObjectValue(data, "URL") == string.Empty ? "https://www.kabshak.com/assets/images/logo.png" : "/" + GetObjectValue(data, "URL");
                    yourMaster.ChangeImage(ImageURL);
                    string OgScript = "\"@context\": \"https://schema.org\",\"@type\": \"Article\",\"mainEntityOfPage\": {\"@type\": \"WebPage\",\"@id\": \"@@URL\"},\"headline\": \"Terms of Use\",\"description\": \"Kabshak | @@Description\",\"image\": {\"@type\": \"ImageObject\",\"url\": \"@@Image\"},\"author\": {\"@type\": \"Organization\",\"name\": \"Smokin Kingdom\"},\"publisher\": {\"@type\": \"Organization\",\"name\": \"Kabsh\",\"logo\": {\"@type\": \"ImageObject\",\"url\": \"@@Image\"}},\"datePublished\": \"2022-09-26\",\"dateModified\": \"2022-09-26\"";
                    OgScript = OgScript.Replace("@@Image", ImageURL);
                    OgScript = OgScript.Replace("@@Description", GetObjectValue(data, "BriefAr"));
                    OgScript = OgScript.Replace("@@URL", "" + HttpContext.Current.Request.RawUrl);
                    yourMaster.AddOgScript(OgScript);
                }
            }
            catch (NullReferenceException _ex)
            {
                Console.WriteLine(_ex.ToString());
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }
    }
}
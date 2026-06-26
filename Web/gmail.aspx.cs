using BusinessLogic;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using web;

namespace vape
{
    public partial class gmail : common
    {
        protected string googleplus_client_id = System.Configuration.ConfigurationManager.AppSettings["googleplus_client_id"];
        protected string googleplus_client_secret = System.Configuration.ConfigurationManager.AppSettings["googleplus_client_secret"];
        protected string googleplus_redirect_url = "/gmail";
        protected string Parameters;

        public void Page_Init(Object src, EventArgs e)
        {

        }

        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                var url = Request.Url.Query;
                if (url != "")
                {
                    string queryString = url.ToString();
                    char[] delimiterChars = { '=' };
                    string[] words = queryString.Split(delimiterChars);
                    string code = words[1];
                    if (code != null)
                    {
                        HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create("https://accounts.google.com/o/oauth2/token");
                        webRequest.Method = "POST";
                        Parameters = "code=" + code + "&client_id=" + googleplus_client_id + "&client_secret=" + googleplus_client_secret + "&redirect_uri=" + googleplus_redirect_url + "&grant_type=authorization_code";
                        byte[] byteArray = Encoding.UTF8.GetBytes(Parameters);
                        webRequest.ContentType = "application/x-www-form-urlencoded";
                        webRequest.ContentLength = byteArray.Length;
                        Stream postStream = webRequest.GetRequestStream();
                        postStream.Write(byteArray, 0, byteArray.Length);
                        postStream.Close();
                        WebResponse response = webRequest.GetResponse();
                        postStream = response.GetResponseStream();
                        StreamReader reader = new StreamReader(postStream);
                        string responseFromServer = reader.ReadToEnd();
                        GoogleAccessToken serStatus = JsonConvert.DeserializeObject<GoogleAccessToken>(responseFromServer);
                        if (serStatus != null)
                        {
                            string accessToken = string.Empty;
                            accessToken = serStatus.access_token;
                            Session["Token"] = accessToken;
                            if (!string.IsNullOrEmpty(accessToken))
                            {
                                HttpClient client = new HttpClient();
                                var urlProfile = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + accessToken;
                                client.CancelPendingRequests();
                                HttpResponseMessage output = client.GetAsync(urlProfile).Result;
                                if (output.IsSuccessStatusCode)
                                {
                                    string outputData = output.Content.ReadAsStringAsync().Result;
                                    GoogleUserOutputData data = JsonConvert.DeserializeObject<GoogleUserOutputData>(outputData);

                                    usersBL _usersBL = new usersBL();
                                    _usersBL.log_in_by_gmail(data.email, data.id);

                                    var user_data = _usersBL.get_user_by_email(data.email);

                                    HttpContext.Current.Session["UserInformation"] = user_data;
                                    HttpContext.Current.Response.Cookies["Remember"].Expires = DateTime.Now.AddDays(30);
                                    HttpContext.Current.Response.Cookies["Remember"].Value = "true";

                                    var nameOfProperty = "Token";
                                    var propertyInfo = user_data.GetType().GetProperty(nameOfProperty);
                                    var value = propertyInfo.GetValue(user_data, null);

                                    HttpContext.Current.Response.Cookies["UserToken"].Expires = DateTime.Now.AddDays(30);
                                    HttpContext.Current.Response.Cookies["UserToken"].Value = value.ToString();
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Redirect(PageStructure.Pages.Home, true);
            }
        }
    }

    public class GoogleAccessToken
    {
        public string access_token { get; set; }
        public string token_type { get; set; }
        public int expires_in { get; set; }
        public string id_token { get; set; }
        public string refresh_token { get; set; }
    }

    public class GoogleUserOutputData
    {
        public string id { get; set; }
        public string name { get; set; }
        public string given_name { get; set; }
        public string email { get; set; }
        public string picture { get; set; }
    }
}
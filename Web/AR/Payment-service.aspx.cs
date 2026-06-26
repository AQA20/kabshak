using BusinessLogic;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using vape;

namespace web.AR
{
    public partial class Payment_service :common
    {
        private readonly string _ServerKey = ConfigurationManager.AppSettings["payment_ServerKey"].ToString();
        private readonly string _payTabsEndpoint = ConfigurationManager.AppSettings["payment_payTabsEndpoint"].ToString();


        public string OrderId
        {
            get
            {
                if (Request == null || string.IsNullOrEmpty(Request.QueryString["orderid"]))
                {
                    return string.Empty;
                }

                return Request.QueryString["orderid"].ToString();
            }
        }
        public float promovalue
        {
            get
            {
                if (Request == null || string.IsNullOrEmpty(Request.QueryString["promovalue"]))
                {
                    return 0;
                }

                return float.Parse(Request.QueryString["promovalue"].ToString());
            }
        }

        public float Amount
        {
            get
            {
                if (Request == null || string.IsNullOrEmpty(Request.QueryString["amount"]))
                {
                    return 0;
                }

                return float.Parse(Request.QueryString["amount"].ToString());
            }
        }

        public string Currency
        {
            get
            {
                if (Request == null || string.IsNullOrEmpty(Request.QueryString["currency"]))
                {
                    return string.Empty;
                }

                return Request.QueryString["currency"].ToString();
            }
        }

        public string PageName
        {
            get
            {
                if (Request == null || string.IsNullOrEmpty(Request.QueryString["page"]))
                {
                    return string.Empty;
                }

                return Request.QueryString["page"].ToString();
            }
        }
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {

                if (OrderId == string.Empty)
                {
                    return;
                }

                productsBL _productsBL = new productsBL();
                var data = _productsBL.GetOrderDetails(int.Parse(OrderId), "-99");

                float amount = Amount > 0 ? Amount : float.Parse(GetObjectValue(data.Data, "TotalPriceUsd"));
                float promocode = GetObjectValue(data.Data, "CodeValue") != string.Empty ? float.Parse(GetObjectValue(data.Data, "CodeValue")) : 0;
                if (PageName == "checkout" && Amount > 0)
                {
                    promocode = 0;
                }

                if (PageName == "ordercomplete")
                {
                    promocode = promovalue;
                }
                CreatePayPageModel payPage = new CreatePayPageModel();
                payPage.callback = "/ar/payment-response";
                payPage.cart_amount = amount - promocode;
                payPage.cart_currency = Currency == string.Empty ? (Request.Cookies["rate_code"] == null ? "USD" : Request.Cookies["rate_code"].Value) : Currency.ToUpper();
                payPage.cart_description = "Buy a new product";
                payPage.cart_id = "cart_" + OrderId;
                payPage.paypage_lang = "ar";
                payPage.profile_id = int.Parse(ConfigurationManager.AppSettings["payment_profile_id"].ToString());
                payPage.@return = "/ar/payment-response";
                payPage.tran_class = "ecom";
                payPage.tran_type = "sale";

                var client = new HttpClient();
                var jsonInString = JsonConvert.SerializeObject(payPage);

                var request = new HttpRequestMessage
                {
                    Method = HttpMethod.Post,
                    RequestUri = new Uri(_payTabsEndpoint),
                    Headers =
                {
                    { "Authorization", _ServerKey },
                },
                    Content = new StringContent(jsonInString, Encoding.UTF8, "application/json")
                    {
                        Headers =
                            {
                                ContentType = new MediaTypeHeaderValue("application/json")
                            }
                    }
                };

                using (var response = client.SendAsync(request))
                {
                    response.Wait();
                    string body = response.Result.Content.ReadAsStringAsync().Result;
                    var successRes = JsonConvert.DeserializeObject<CreatePayPageResponseModel>(body);

                    if (successRes.redirect_url != null)
                    {
                        HttpContext.Current.Response.Cookies["meps_tran_ref"].Expires = DateTime.Now.AddDays(1);
                        HttpContext.Current.Response.Cookies["meps_tran_ref"].Value = successRes.tran_ref;

                        HttpContext.Current.Response.Cookies["OrderId"].Expires = DateTime.Now.AddDays(1);
                        HttpContext.Current.Response.Cookies["OrderId"].Value = OrderId.ToString();

                        Response.Redirect(successRes.redirect_url);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
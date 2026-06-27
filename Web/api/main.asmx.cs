using business_logic;
using BusinessLogic;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Configuration;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;

namespace web.api
{
    [WebService(Namespace = "")]
    [WebServiceBinding(ConformsTo = WsiProfiles.None)]
    [System.ComponentModel.ToolboxItem(false)]
    public class main : System.Web.Services.WebService
    {
        commonBL _commonBL = new commonBL();
        usersBL _usersBL = new usersBL();

        public bool IsAuthorized(string token)
        {
            if (token == string.Empty)
            {
                token = (Session["AuthServiceToken"] != null) ? Session["AuthServiceToken"].ToString().Trim() : token;
            }

            if (token == string.Empty)
                return false;
            else
                return _usersBL.IsAuthorizedToken(token);
        }

       [WebMethod(EnableSession = true)]
        public void subscribe_email()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string _email = HttpContext.Current.Request["email"].ToString();
                _commonBL.subscribe_email(_email);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

       [WebMethod(EnableSession = true)]
        public void send_contact_us_message()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); 
                
                if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string[] contact_info = new string[4];

                contact_info[0] = HttpContext.Current.Request["email"].ToString();
                contact_info[1] = HttpContext.Current.Request["mobile"].ToString();
                contact_info[2] = HttpContext.Current.Request["name"].ToString();
                contact_info[3] = HttpContext.Current.Request["message"].ToString();

                _commonBL.send_contact_us_message(contact_info);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void faqs()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.get_faqs();
                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void privacy_policy()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.get_privacy_policy();
                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void cancellation_policy()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); 
                
                if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.get_cancellation_policy();
                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void our_service()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); 
                
                if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.get_our_services();
                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void terms_of_use()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.get_terms_of_use();
                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void about_us()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.get_about_us();
                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void contact_us_address()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.get_contact_us_address();
                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void contact_us_people_ask()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.get_contact_us_people_ask();
                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void all_faqs()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.get_all_faqs();
                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void all_charities()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.get_all_charities();
                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void all_slaughterhouses()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.get_all_Slaughterhouses();
                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void brands()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.GetBrandsList();
                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void categories()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                DataTable data = _commonBL.GetCategories();
                var json = JsonConvert.SerializeObject(data,
                    new JsonSerializerSettings()
                    {
                        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                    });
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(json);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void sub_categories()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int CategoryId = int.Parse(HttpContext.Current.Request["category_id"].ToString());

                DataTable data = _commonBL.GetSubCategories(CategoryId);
                var json = JsonConvert.SerializeObject(data,
                    new JsonSerializerSettings()
                    {
                        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                    });
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(json);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void statuses()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.GetStatusesList();
                var json = JsonConvert.SerializeObject(data,
                       new JsonSerializerSettings()
                       {
                           ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                       });
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(json);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void productpurposes()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.GetProductPurposesList();
                var json = JsonConvert.SerializeObject(data,
                       new JsonSerializerSettings()
                       {
                           ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                       });
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(json);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void batchs_statuses()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.GetBatchesStatusesList();
                var json = JsonConvert.SerializeObject(data,
                       new JsonSerializerSettings()
                       {
                           ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                       });
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(json);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void sizes()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.GetSizesList();
                var json = JsonConvert.SerializeObject(data,
                       new JsonSerializerSettings()
                       {
                           ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                       });
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(json);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void colors()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.GetColorsList();
                var json = JsonConvert.SerializeObject(data,
                       new JsonSerializerSettings()
                       {
                           ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                       });
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(json);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void active_sizes()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.GetAdminSizesList();
                var json = JsonConvert.SerializeObject(data,
                       new JsonSerializerSettings()
                       {
                           ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                       });
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(json);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void active_colors()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.GetAdminColorsList();
                var json = JsonConvert.SerializeObject(data,
                       new JsonSerializerSettings()
                       {
                           ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                       });
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(json);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        [WebMethod(EnableSession = true)]
        public void change_currency()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string currency = HttpContext.Current.Request["currency"].ToString();

                if (currency.Trim() != string.Empty)
                {
                    HttpContext.Current.Response.Cookies["currency"].Expires = DateTime.Now.AddDays(30);
                    HttpContext.Current.Response.Cookies["currency"].Value = currency;

                    JavaScriptSerializer js = new JavaScriptSerializer();
                    Context.Response.Clear();
                    Context.Response.ContentType = "application/json";
                    Context.Response.Write(JsonConvert.SerializeObject("true"));
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void cities()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int countryid = int.Parse(HttpContext.Current.Request["countryid"].ToString());
                var data = _commonBL.GetCitiesList(countryid);
                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void countries()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); 
                if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.GetCountriesList();
                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }


        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void all_brands()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.GetAllBrandsList();
                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void all_sub_categories_by_id()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int category_id = int.Parse(HttpContext.Current.Request["category_id"].ToString());

                var data = _commonBL.all_sub_categories_by_id(category_id);
                var json = JsonConvert.SerializeObject(data,
                 new JsonSerializerSettings()
                 {
                     ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                 });
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(json));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void all_cities_by_id()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int country_id = int.Parse(HttpContext.Current.Request["country_id"].ToString());

                var data = _commonBL.all_cities_by_id(country_id);
                var json = JsonConvert.SerializeObject(data,
                 new JsonSerializerSettings()
                 {
                     ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                 });
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(json));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void all_categories()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.GetAllCategoriesList();
                var json = JsonConvert.SerializeObject(data,
                            new JsonSerializerSettings()
                            {
                                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                            });
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(json));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void chnage_brand_activation_status()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                int id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                bool status = (HttpContext.Current.Request["status"].ToString().ToLower() == "true") ? true : false;

                _commonBL.chnage_brand_activation_status(id, user_token, status);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void chnage_sub_category_activation_status()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                int id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                bool status = (HttpContext.Current.Request["status"].ToString().ToLower() == "true") ? true : false;

                _commonBL.chnage_sub_category_activation_status(id, user_token, status);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void chnage_city_activation_status()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                int id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                bool status = (HttpContext.Current.Request["status"].ToString().ToLower() == "true") ? true : false;

                _commonBL.chnage_city_activation_status(id, user_token, status);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void chnage_status_activation_status()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                int id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                bool status = (HttpContext.Current.Request["status"].ToString().ToLower() == "true") ? true : false;

                _commonBL.chnage_status_activation_status(id, user_token, status);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void chnage_status_activation_productpurposes()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                int id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                bool status = (HttpContext.Current.Request["status"].ToString().ToLower() == "true") ? true : false;

                _commonBL.chnage_status_activation_productpurposes(id, user_token, status);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void chnage_size_activation_status()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                int id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                bool status = (HttpContext.Current.Request["status"].ToString().ToLower() == "true") ? true : false;

                _commonBL.chnage_size_activation_status(id, user_token, status);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void chnage_color_activation_status()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                int id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                bool status = (HttpContext.Current.Request["status"].ToString().ToLower() == "true") ? true : false;

                _commonBL.chnage_color_activation_status(id, user_token, status);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        [WebMethod(EnableSession = true)]
        public void chnage_country_activation_status()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                int id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                bool status = (HttpContext.Current.Request["status"].ToString().ToLower() == "true") ? true : false;

                _commonBL.chnage_country_activation_status(id, user_token, status);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void chnage_faqs_activation_status()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                int id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                bool status = (HttpContext.Current.Request["status"].ToString().ToLower() == "true") ? true : false;

                _commonBL.chnage_FAQs_activation_status(id, user_token, status);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        [WebMethod(EnableSession = true)]
        public void chnage_charity_activation_status()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                int id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                bool status = (HttpContext.Current.Request["status"].ToString().ToLower() == "true") ? true : false;

                _commonBL.chnage_Charity_activation_status(id, user_token, status);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void chnage_slaughterhouse_activation_status()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                int id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                bool status = (HttpContext.Current.Request["status"].ToString().ToLower() == "true") ? true : false;

                _commonBL.chnage_slaughterhouse_activation_status(id, user_token, status);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void generate_login_slaughterhouse_authentication()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                int id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();

                object authentication = _commonBL.generate_login_slaughterhouse_authentication(id, user_token);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(authentication));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void generate_login_authentication()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                int id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();

                object authentication = _commonBL.generate_login_authentication(id, user_token);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(authentication));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void chnage_category_activation_status()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                int id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                bool status = (HttpContext.Current.Request["status"].ToString().ToLower() == "true") ? true : false;

                _commonBL.chnage_category_activation_status(id, user_token, status);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void add_brand_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();

                HttpFileCollection Files = HttpContext.Current.Request.Files;
                string image_name = HttpContext.Current.Request["image_name"].ToString();
                string url = string.Empty;

                if (image_name != string.Empty)
                {
                    string path = string.Empty;

                    for (int i = 0; i < Files.Count; i++)
                    {
                        HttpPostedFile File = Files[i];
                        string extension = Path.GetExtension(File.FileName);
                        path = HttpContext.Current.Server.MapPath("~/assets/images/brands/");
                        File.SaveAs(Path.Combine(path, String.Concat(image_name, extension)));
                        url = "assets/images/brands/" + image_name + extension;
                    }
                }

                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();
                string description_en = HttpContext.Current.Request["description_en"].ToString();
                string description_ar = HttpContext.Current.Request["description_ar"].ToString();

                _commonBL.add_brand_info(user_token, name_en, name_ar, description_en, description_ar, url);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_brand()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int id = int.Parse(HttpContext.Current.Request["id"].ToString());
                var data = _commonBL.GetBrandById(id);
                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        [WebMethod(EnableSession = true)]
        public void edit_category_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();

                HttpFileCollection Files = HttpContext.Current.Request.Files;
                string image_name = HttpContext.Current.Request["image_name"].ToString();
                string url = string.Empty;

                if (image_name != string.Empty)
                {
                    string path = string.Empty;

                    for (int i = 0; i < Files.Count; i++)
                    {
                        HttpPostedFile File = Files[i];
                        string extension = Path.GetExtension(File.FileName);
                        path = HttpContext.Current.Server.MapPath("~/assets/images/categories/");
                        File.SaveAs(Path.Combine(path, String.Concat(image_name, extension)));
                        url = "assets/images/categories/" + image_name + extension;
                    }
                }

                int Id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();

                _commonBL.edit_category_info(Id, user_token, name_en, name_ar, url);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void edit_sub_category_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int Id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();

                _commonBL.edit_sub_category_info(Id, user_token, name_en, name_ar);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void edit_city_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int Id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();

                _commonBL.edit_city_info(Id, user_token, name_en, name_ar);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void edit_status_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int Id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();

                _commonBL.edit_status_info(Id, user_token, name_en, name_ar);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void edit_productpurposes_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int Id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();

                _commonBL.edit_productpurposes_info(Id, user_token, name_en, name_ar);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void edit_size_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int Id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();

                _commonBL.edit_size_info(Id, user_token, name_en, name_ar);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void edit_color_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int Id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string code = HttpContext.Current.Request["code"].ToString();

                _commonBL.edit_color_info(Id, user_token, code);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void edit_country_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int Id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();

                _commonBL.edit_country_info(Id, user_token, name_en, name_ar);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void edit_brand_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();

                HttpFileCollection Files = HttpContext.Current.Request.Files;
                string image_name = HttpContext.Current.Request["image_name"].ToString();
                string url = string.Empty;

                if (image_name != string.Empty)
                {
                    string path = string.Empty;

                    for (int i = 0; i < Files.Count; i++)
                    {
                        HttpPostedFile File = Files[i];
                        string extension = Path.GetExtension(File.FileName);
                        path = HttpContext.Current.Server.MapPath("~/assets/images/brands/");
                        File.SaveAs(Path.Combine(path, String.Concat(image_name, extension)));
                        url = "assets/images/brands/" + image_name + extension;
                    }
                }

                int Id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();
                string description_en = HttpContext.Current.Request["description_en"].ToString();
                string description_ar = HttpContext.Current.Request["description_ar"].ToString();

                _commonBL.edit_brand_info(Id, user_token, name_en, name_ar, description_en, description_ar, url);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void add_category_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                HttpFileCollection Files = HttpContext.Current.Request.Files;
                string image_name = HttpContext.Current.Request["image_name"].ToString();
                string url = string.Empty;

                if (image_name != string.Empty)
                {
                    string path = string.Empty;

                    for (int i = 0; i < Files.Count; i++)
                    {
                        HttpPostedFile File = Files[i];
                        string extension = Path.GetExtension(File.FileName);
                        path = HttpContext.Current.Server.MapPath("~/assets/images/categories/");
                        File.SaveAs(Path.Combine(path, String.Concat(image_name, extension)));
                        url = "assets/images/categories/" + image_name + extension;
                    }
                }

                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();

                _commonBL.add_category_info(user_token, name_en, name_ar, url);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void add_faqs_question_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();
                string answer_en = HttpContext.Current.Request["answer_en"].ToString();
                string answer_ar = HttpContext.Current.Request["answer_ar"].ToString();

                _commonBL.add_faqs_question_info(user_token, name_en, name_ar, answer_en, answer_ar);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void add_charity_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();
                string description_en = HttpContext.Current.Request["description_en"].ToString();
                string description_ar = HttpContext.Current.Request["description_ar"].ToString();
                int countryid = int.Parse(HttpContext.Current.Request["countryid"].ToString());
                string address_en = HttpContext.Current.Request["address_en"].ToString();
                string address_ar = HttpContext.Current.Request["address_ar"].ToString();
                string email = HttpContext.Current.Request["email"].ToString();

                _commonBL.add_charity_info(user_token, name_en, name_ar, description_en, description_ar, countryid, address_en, address_ar, email);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void add_slaughterhouse_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();
                string description_en = HttpContext.Current.Request["description_en"].ToString();
                string description_ar = HttpContext.Current.Request["description_ar"].ToString();
                int countryid = int.Parse(HttpContext.Current.Request["countryid"].ToString());
                string address_en = HttpContext.Current.Request["address_en"].ToString();
                string address_ar = HttpContext.Current.Request["address_ar"].ToString();
                string email = HttpContext.Current.Request["email"].ToString();

                _commonBL.add_slaughterhouse_info(user_token, name_en, name_ar, description_en, description_ar, countryid, address_en, address_ar, email);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void edit_question_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();
                string answer_en = HttpContext.Current.Request["answer_en"].ToString();
                string answer_ar = HttpContext.Current.Request["answer_ar"].ToString();
                int id = int.Parse(HttpContext.Current.Request["id"].ToString());

                _commonBL.edit_faqs_question_info(id, user_token, name_en, name_ar, answer_en, answer_ar);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        [WebMethod(EnableSession = true)]
        public void edit_charity_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();
                string Description_en = HttpContext.Current.Request["Description_en"].ToString();
                string Description_ar = HttpContext.Current.Request["Description_ar"].ToString();
                int id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string address_en = HttpContext.Current.Request["address_en"].ToString();
                string address_ar = HttpContext.Current.Request["address_ar"].ToString();
                string email = HttpContext.Current.Request["email"].ToString();

                _commonBL.edit_charity_info(id, user_token, name_en, name_ar, Description_en, Description_ar, address_en, address_ar, email);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void edit_slaughterhouse_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();
                string Description_en = HttpContext.Current.Request["Description_en"].ToString();
                string Description_ar = HttpContext.Current.Request["Description_ar"].ToString();
                int id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string address_en = HttpContext.Current.Request["address_en"].ToString();
                string address_ar = HttpContext.Current.Request["address_ar"].ToString();
                string email = HttpContext.Current.Request["email"].ToString();

                _commonBL.edit_slaughterhouse_info(id, user_token, name_en, name_ar, Description_en, Description_ar, address_en, address_ar, email);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void add_sub_category_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();
                int category_id = int.Parse(HttpContext.Current.Request["category_id"].ToString());

                _commonBL.add_sub_category_info(user_token, category_id, name_en, name_ar);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void add_city_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();
                int country_id = int.Parse(HttpContext.Current.Request["country_id"].ToString());

                _commonBL.add_city_info(user_token, country_id, name_en, name_ar);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        [WebMethod(EnableSession = true)]
        public void add_countries_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();

                _commonBL.add_countries_info(user_token, name_en, name_ar);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }  
        
        [WebMethod(EnableSession = true)]
        public void add_status_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();

                _commonBL.add_status_info(user_token, name_en, name_ar);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void add_productpurposes_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();

                _commonBL.add_productpurposes_info(user_token, name_en, name_ar);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void add_size_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string name_en = HttpContext.Current.Request["name_en"].ToString();
                string name_ar = HttpContext.Current.Request["name_ar"].ToString();

                _commonBL.add_size_info(user_token, name_en, name_ar);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void add_color_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string code = HttpContext.Current.Request["code"].ToString();

                _commonBL.add_color_info(user_token, code);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        [WebMethod(EnableSession = true)]
        public void all_countries()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string _txt = HttpContext.Current.Request["txt"].ToString();
                string _active = HttpContext.Current.Request["active"].ToString();
                string _inactive = HttpContext.Current.Request["inactive"].ToString();
                string _start = HttpContext.Current.Request["start"].ToString();
                string _end = HttpContext.Current.Request["end"].ToString();

                object data = _commonBL.GetCountriesList(_txt, _active, _inactive, _start, _end);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void log_in_authentication()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string _username = HttpContext.Current.Request["username"].ToString();
                string _password = HttpContext.Current.Request["password"].ToString();

                commonBL _commonBL = new commonBL();
                string status = _commonBL.log_in_by_auth(_username, _password);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";

                if (status.Trim() == string.Empty)
                {
                    var data = _commonBL.get_auth_by_username(_username);
                    Context.Response.Write(JsonConvert.SerializeObject(data));
                }
                else
                    Context.Response.Write(JsonConvert.SerializeObject(status));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        [WebMethod(EnableSession = true)]
        public void update_version()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString();

                if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string type = HttpContext.Current.Request["type"].ToString();
                string version = HttpContext.Current.Request["version"].ToString();

                commonBL _commonBL = new commonBL();
                string status = _commonBL.App_Verion_Is_Required_Update(type, version);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(status));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void promocodes()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString();
                if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = _commonBL.GetPromoCodesList();
                var json = JsonConvert.SerializeObject(data,
                       new JsonSerializerSettings()
                       {
                           ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                       });
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(json);
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        [WebMethod(EnableSession = true)]
        public void chnage_code_activation_status()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString();
                if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                int id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                bool status = (HttpContext.Current.Request["status"].ToString().ToLower() == "true") ? true : false;

                _commonBL.chnage_code_activation_status(id, user_token, status);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }
        [WebMethod(EnableSession = true)]
        public void add_code_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString();
                if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string _strDate = HttpContext.Current.Request["StartDate"].ToString();
                DateTime StartDate = DateTime.ParseExact(_strDate, "dd/MM/yyyy", null);
                string _endDate = HttpContext.Current.Request["EndDate"].ToString();
                DateTime EndDate = DateTime.ParseExact(_endDate, "dd/MM/yyyy", null);
                string Code = HttpContext.Current.Request["Code"].ToString();
                int Discount = HttpContext.Current.Request["Discount"].ToString().Trim() != string.Empty ? int.Parse(HttpContext.Current.Request["Discount"].ToString().Trim()) : 0;
                int FixPrice = HttpContext.Current.Request["FixPrice"].ToString().Trim() != string.Empty ? int.Parse(HttpContext.Current.Request["FixPrice"].ToString().Trim()) : 0;
                int MinInvoice = HttpContext.Current.Request["MinInvoice"].ToString().Trim() != string.Empty ? int.Parse(HttpContext.Current.Request["MinInvoice"].ToString().Trim()) : 0;

                _commonBL.add_code_info(user_token, StartDate, EndDate, Code, Discount, FixPrice, MinInvoice);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void edit_code_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString();

                if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int Id = int.Parse(HttpContext.Current.Request["id"].ToString());
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string _strDate = HttpContext.Current.Request["StartDate"].ToString();
                DateTime StartDate = DateTime.ParseExact(_strDate, "dd/MM/yyyy", null);
                string _endDate = HttpContext.Current.Request["EndDate"].ToString();
                DateTime EndDate = DateTime.ParseExact(_endDate, "dd/MM/yyyy", null);
                string Code = HttpContext.Current.Request["Code"].ToString();
                int Discount = HttpContext.Current.Request["Discount"].ToString().Trim() != string.Empty ? int.Parse(HttpContext.Current.Request["Discount"].ToString().Trim()) : 0;
                int FixPrice = HttpContext.Current.Request["FixPrice"].ToString().Trim() != string.Empty ? int.Parse(HttpContext.Current.Request["FixPrice"].ToString().Trim()) : 0;
                int MinInvoice = HttpContext.Current.Request["MinInvoice"].ToString().Trim() != string.Empty ? int.Parse(HttpContext.Current.Request["MinInvoice"].ToString().Trim()) : 0;

                _commonBL.edit_code_info(Id, user_token, StartDate, EndDate, Code, Discount, FixPrice, MinInvoice);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(string.Empty));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_code_info()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); 
                if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string code = HttpContext.Current.Request["code"].ToString();

                var data = _commonBL.get_promo_code_id(code);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void update_charity_firebase_token()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString();

                if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int charityid = int.Parse(HttpContext.Current.Request["charityid"].ToString());
                string firebase_token = HttpContext.Current.Request["firebase_token"].ToString();

                _commonBL.update_charity_firebase_token(charityid, firebase_token);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject("true"));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void update_slaughterhouse_firebase_token()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString();

                if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                int slaughterhouseid = int.Parse(HttpContext.Current.Request["slaughterhouseid"].ToString());
                string firebase_token = HttpContext.Current.Request["firebase_token"].ToString();

                _commonBL.update_slaughterhouse_firebase_token(slaughterhouseid, firebase_token);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject("true"));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void check_sold_out()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); 
                
                if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string value = ConfigurationManager.AppSettings["SoldOut"].ToString().Trim().ToLower();

                if (value != "true")
                    value = "false";

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(value));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public class MobileHomepageData
        {
            public List<MobileKabshakOption> KabshakOptions { get; set; }
            public List<MobileSwiperText> SwiperText { get; set; }
            public List<MobileVideo> Videos { get; set; }
            public List<MobileButton> Buttons { get; set; }
            public MobilePaymentKeys PaymentKeys { get; set; }
        }

        public class MobileKabshakOption
        {
            public int Id { get; set; }
            public string TitleEn { get; set; }
            public string TitleAr { get; set; }
            public string Url { get; set; }
            public bool IsActive { get; set; }
        }

        public class MobileSwiperText
        {
            public int Id { get; set; }
            public string TitleEn { get; set; }
            public string TitleAr { get; set; }
            public string DescriptionEn { get; set; }
            public string DescriptionAr { get; set; }
        }

        public class MobileVideo
        {
            public int Id { get; set; }
            public string TitleEn { get; set; }
            public string TitleAr { get; set; }
            public string URL { get; set; }
        }

        public class MobileButton
        {
            public int Id { get; set; }
            public string TitleEn { get; set; }
            public string TitleAr { get; set; }
            public string URL { get; set; }
        }

        public class MobilePaymentKeys
        {
            public string serverKey { get; set; }
            public string clientKey { get; set; }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public void get_mobile_app_homepage()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); 
                
                if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                var data = new MobileHomepageData();

                data.KabshakOptions = new List<MobileKabshakOption>
                {
                    new MobileKabshakOption { Id = 1, TitleEn = "Fidya", TitleAr = "الفدية", Url = "https://www.kabshak.com/assets/images/categories/898249.png", IsActive = true },
                    new MobileKabshakOption { Id = 2, TitleEn = "Sacrifice", TitleAr = "الاضحية", Url = "https://www.kabshak.com/assets/images/categories/871500.png", IsActive = true },
                    new MobileKabshakOption { Id = 3, TitleEn = "Aqeeqah", TitleAr = "العقيقة", Url = "https://www.kabshak.com/assets/images/categories/567915.png", IsActive = true },
                    new MobileKabshakOption { Id = 4, TitleEn = "Vow", TitleAr = "النذر", Url = "https://www.kabshak.com/assets/images/categories/240420.png", IsActive = true },
                    new MobileKabshakOption { Id = 5, TitleEn = "Charity", TitleAr = "الصدقة", Url = "https://www.kabshak.com/assets/images/categories/898249.png", IsActive = true }
                };

                data.SwiperText = new List<MobileSwiperText>
                {
                    new MobileSwiperText { Id = 1, TitleEn = "Shipping", TitleAr = "الشحن", DescriptionEn = "Fast delivery on time", DescriptionAr = "التسليم السريع في الوقت المحدد" },
                    new MobileSwiperText { Id = 2, TitleEn = "Secure Payment", TitleAr = "الدفع الآمن", DescriptionEn = "We guarantee secure payment", DescriptionAr = "نحن نضمن لك الدفع الامن" },
                    new MobileSwiperText { Id = 3, TitleEn = "Money Back Guarantee", TitleAr = "ضمان استعادة الاموال", DescriptionEn = "According to terms and conditions", DescriptionAr = "وذلك حسب الشروط والاحكام" },
                    new MobileSwiperText { Id = 4, TitleEn = "Contact Us", TitleAr = "اتصل بنا", DescriptionEn = "You can contact and write to us daily from 8 AM to 9 PM", DescriptionAr = "يمكنك الاتصال بنا ومراسلتنا يوميا من الساعة الثامنة صباحا وحتى الساعة التاسعة مساء" }
                };

                data.Videos = new List<MobileVideo>
                {
                    new MobileVideo { Id = 1, TitleEn = "About Kabshak", TitleAr = "عن كبشك", URL = "https://www.w3schools.com/html/mov_bbb.mp4" }
                };

                data.Buttons = new List<MobileButton>
                {
                    new MobileButton { Id = 1, TitleEn = "Donate Now", TitleAr = "تبرع الأن", URL = "donate-shop.aspx" },
                    new MobileButton { Id = 2, TitleEn = "Order Now", TitleAr = "أطلب الأن", URL = "shipping-shop.aspx" }
                };

                string serverKeyVal = ConfigurationManager.AppSettings["payment_ServerKey"];
                string clientKeyVal = ConfigurationManager.AppSettings["payment_ClientKey"];

                data.PaymentKeys = new MobilePaymentKeys
                {
                    serverKey = serverKeyVal ?? "SBJNJNBTJW-J62RDRTDDW-WTMMGNJM6J",
                    clientKey = clientKeyVal ?? ""
                };

                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(data));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

    }
}

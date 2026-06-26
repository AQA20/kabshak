using BusinessLogic;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Configuration;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace web.api
{
    [WebService(Namespace = "")]
    [WebServiceBinding(ConformsTo = WsiProfiles.None)]
    [System.ComponentModel.ToolboxItem(false)]
    public class users : System.Web.Services.WebService
    {
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
        public void sign_up_by_email()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string _email = HttpContext.Current.Request["email"].ToString();
                string _password = HttpContext.Current.Request["password"].ToString();
                string status = _usersBL.sign_up_by_email(_email, _password);

                if (status.Trim() == string.Empty)
                {
                    var data = _usersBL.get_user_by_email(_email);

                    HttpContext.Current.Session["UserInformation"] = data;
                    HttpContext.Current.Response.Cookies["Remember"].Expires = DateTime.Now.AddDays(30);
                    HttpContext.Current.Response.Cookies["Remember"].Value = "true";

                    var nameOfProperty = "Token";
                    var propertyInfo = data.GetType().GetProperty(nameOfProperty);
                    var value = propertyInfo.GetValue(data, null);

                    HttpContext.Current.Response.Cookies["UserToken"].Expires = DateTime.Now.AddDays(30);
                    HttpContext.Current.Response.Cookies["UserToken"].Value = value.ToString();
                }

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
        public void log_in_by_email()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string _email = HttpContext.Current.Request["email"].ToString();
                string _password = HttpContext.Current.Request["password"].ToString();
                string remember = HttpContext.Current.Request["remember"].ToString().ToLower();

                string status = _usersBL.log_in_by_email(_email, _password);

                if (status.Trim() == string.Empty)
                {
                    var data = _usersBL.get_user_by_email(_email);

                    HttpContext.Current.Session["UserInformation"] = data;
                    HttpContext.Current.Response.Cookies["Remember"].Expires = DateTime.Now.AddDays(30);
                    HttpContext.Current.Response.Cookies["Remember"].Value = remember;

                    var nameOfProperty = "Token";
                    var propertyInfo = data.GetType().GetProperty(nameOfProperty);
                    var value = propertyInfo.GetValue(data, null);

                    HttpContext.Current.Response.Cookies["UserToken"].Expires = DateTime.Now.AddDays(30);
                    HttpContext.Current.Response.Cookies["UserToken"].Value = value.ToString();
                }

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
        public void reset_your_password()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string _email = HttpContext.Current.Request["email"].ToString();

                string status = _usersBL.reset_your_password(_email);

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
        public void change_password()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string _password = HttpContext.Current.Request["password"].ToString();
                string _token = HttpContext.Current.Request["token"].ToString();

                string[] status = _usersBL.change_password(_token, _password);

                if (status[0] == null || status[0].Trim() == string.Empty)
                {
                    var data = _usersBL.get_user_by_email(status[1]);

                    HttpContext.Current.Session["UserInformation"] = data;
                    HttpContext.Current.Response.Cookies["Remember"].Expires = DateTime.Now.AddDays(30);
                    HttpContext.Current.Response.Cookies["Remember"].Value = "true";

                    var nameOfProperty = "Token";
                    var propertyInfo = data.GetType().GetProperty(nameOfProperty);
                    var value = propertyInfo.GetValue(data, null);

                    HttpContext.Current.Response.Cookies["UserToken"].Expires = DateTime.Now.AddDays(30);
                    HttpContext.Current.Response.Cookies["UserToken"].Value = value.ToString();
                }

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(status[0]));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void fb_login()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string status = string.Empty;

                string _email = HttpContext.Current.Request["email"].ToString();
                string _first_name = HttpContext.Current.Request["first_name"].ToString();
                string _last_name = HttpContext.Current.Request["last_name"].ToString();
                string _id = HttpContext.Current.Request["id"].ToString();

                _usersBL.log_in_by_fb(_email, _first_name, _last_name, _id);

                if (status.Trim() == string.Empty)
                {
                    var data = _usersBL.get_user_info_by_facebookId(_id);

                    HttpContext.Current.Session["UserInformation"] = data;
                    HttpContext.Current.Response.Cookies["Remember"].Expires = DateTime.Now.AddDays(30);
                    HttpContext.Current.Response.Cookies["Remember"].Value = "true";

                    var nameOfProperty = "Token";
                    var propertyInfo = data.GetType().GetProperty(nameOfProperty);
                    var value = propertyInfo.GetValue(data, null);

                    HttpContext.Current.Response.Cookies["UserToken"].Expires = DateTime.Now.AddDays(30);
                    HttpContext.Current.Response.Cookies["UserToken"].Value = value.ToString();
                }

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
        public void gmail_login()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string status = string.Empty;

                string _email = HttpContext.Current.Request["email"].ToString();
                string _id = HttpContext.Current.Request["id"].ToString();

                _usersBL.log_in_by_gmail(_email, _id);

                if (status.Trim() == string.Empty)
                {
                    var data = _usersBL.get_user_by_email(_email);

                    HttpContext.Current.Session["UserInformation"] = data;
                    HttpContext.Current.Response.Cookies["Remember"].Expires = DateTime.Now.AddDays(30);
                    HttpContext.Current.Response.Cookies["Remember"].Value = "true";

                    var nameOfProperty = "Token";
                    var propertyInfo = data.GetType().GetProperty(nameOfProperty);
                    var value = propertyInfo.GetValue(data, null);

                    HttpContext.Current.Response.Cookies["UserToken"].Expires = DateTime.Now.AddDays(30);
                    HttpContext.Current.Response.Cookies["UserToken"].Value = value.ToString();
                }

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
        public void changeinfo()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                usersBL _userBl = new usersBL();

                string email = HttpContext.Current.Request["email"].ToString();
                string firstname = HttpContext.Current.Request["firstname"].ToString();
                string lastname = HttpContext.Current.Request["lastname"].ToString();
                string number = HttpContext.Current.Request["number"].ToString();
                string code = HttpContext.Current.Request["code"].ToString();
                int userid = int.Parse(obj.GetObjectValue(LoginUser.UserInformation, "UserId"));

                _userBl.ChangeUserInfo(email, firstname, lastname, number, code, userid);
                var data = _usersBL.get_user_by_token(obj.GetObjectValue(LoginUser.UserInformation, "Token"));
                HttpContext.Current.Session["UserInformation"] = data;

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
        public void get_user_by_token()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string _token = HttpContext.Current.Request["user_token"].ToString();
                var data = _usersBL.get_user_by_token(_token);
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
        public void get_user_by_token_mobile()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string _token = HttpContext.Current.Request["user_token"].ToString();
                var data = _usersBL.get_user_by_token_mobile(_token);
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
        public void changepassword()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                string oldP = HttpContext.Current.Request["curpassword"].ToString();
                string newP = HttpContext.Current.Request["newpassword"].ToString();
                string data = _usersBL.changepassword(oldP, newP, int.Parse(obj.GetObjectValue(LoginUser.UserInformation, "UserId")));
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
        public void billingaddress()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                string town = HttpContext.Current.Request["town"].ToString();
                string block = HttpContext.Current.Request["block"].ToString();
                string street = HttpContext.Current.Request["street"].ToString();
                int house = int.Parse(HttpContext.Current.Request["house"].ToString());
                int apartment = int.Parse(HttpContext.Current.Request["apartment"].ToString());
                int paci = int.Parse(HttpContext.Current.Request["paci"].ToString());
                int cityid = int.Parse(HttpContext.Current.Request["cityid"].ToString());
                _usersBL.billingaddress(town, block, street, house, apartment, paci, cityid, int.Parse(obj.GetObjectValue(LoginUser.UserInformation, "UserId")));
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
        public void shippingaddress()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                string town = HttpContext.Current.Request["town"].ToString();
                string block = HttpContext.Current.Request["block"].ToString();
                string street = HttpContext.Current.Request["street"].ToString();
                int house = int.Parse(HttpContext.Current.Request["house"].ToString());
                int apartment = int.Parse(HttpContext.Current.Request["apartment"].ToString());
                int paci = int.Parse(HttpContext.Current.Request["paci"].ToString());
                int cityid = int.Parse(HttpContext.Current.Request["cityid"].ToString());
                _usersBL.shippingaddress(town, block, street, house, apartment, paci, cityid, int.Parse(obj.GetObjectValue(LoginUser.UserInformation, "UserId")));
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
        public void get_users_list()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();

                string _txt = HttpContext.Current.Request["txt"].ToString();
                string _active = HttpContext.Current.Request["active"].ToString();
                string _inactive = HttpContext.Current.Request["inactive"].ToString();
                string _admin = HttpContext.Current.Request["admin"].ToString();
                string _start = HttpContext.Current.Request["start"].ToString();
                string _end = HttpContext.Current.Request["end"].ToString();

                object data = _usersBL.GetUserList(_txt, _active, _inactive, _admin, _start, _end);

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
        public void chnage_activation_status()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();

                string token = HttpContext.Current.Request["token"].ToString();
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                bool status = (HttpContext.Current.Request["status"].ToString().ToLower() == "true") ? true : false;

                _usersBL.chnage_activation_status(token, user_token, status);

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
        public void chnage_admin_status()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();

                string token = HttpContext.Current.Request["token"].ToString();
                string user_token = HttpContext.Current.Request["user_token"].ToString();
                bool status = (HttpContext.Current.Request["status"].ToString().ToLower() == "true") ? true : false;

                _usersBL.chnage_admin_status(token, user_token, status);

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

        //-------------------------------------------------------------------------------------------------
        //-------------------------------------------------------------------------------------------------

        [WebMethod(EnableSession = true)]
        public void change_password_mobile()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string _password = HttpContext.Current.Request["password"].ToString();
                string _code = HttpContext.Current.Request["code"].ToString();

                string[] status = _usersBL.change_password_mobile(int.Parse(_code), _password);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";
                Context.Response.Write(JsonConvert.SerializeObject(status[0]));
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void reset_your_password_mobile()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string _email = HttpContext.Current.Request["email"].ToString();

                string status = _usersBL.reset_your_password_mobile(_email);

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
        public void log_in_by_email_mobile()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string _email = HttpContext.Current.Request["email"].ToString();
                string _password = HttpContext.Current.Request["password"].ToString();

                string status = _usersBL.log_in_by_email(_email, _password);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";

                if (status.Trim() == string.Empty)
                {
                    var data = _usersBL.get_user_by_email(_email);
                    Context.Response.Write(JsonConvert.SerializeObject(data));
                }
                else
                {
                    Context.Response.Write(JsonConvert.SerializeObject(status));
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void sign_up_by_email_mobile()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string _email = HttpContext.Current.Request["email"].ToString();
                string _password = HttpContext.Current.Request["password"].ToString();

                string status = _usersBL.sign_up_by_email(_email, _password);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";

                if (status.Trim() == string.Empty)
                {
                    var data = _usersBL.get_user_by_email(_email);
                    Context.Response.Write(JsonConvert.SerializeObject(data));
                }
                else
                {
                    Context.Response.Write(JsonConvert.SerializeObject(status));
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void fb_login_mobile()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string status = string.Empty;

                string _email = HttpContext.Current.Request["email"].ToString();
                string _first_name = HttpContext.Current.Request["first_name"].ToString();
                string _last_name = HttpContext.Current.Request["last_name"].ToString();
                string _id = HttpContext.Current.Request["id"].ToString();

                _usersBL.log_in_by_fb(_email, _first_name, _last_name, _id);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";

                if (status.Trim() == string.Empty)
                {
                    var data = _usersBL.get_user_info_by_facebookId(_id);
                    Context.Response.Write(JsonConvert.SerializeObject(data));
                }
                else
                {
                    Context.Response.Write(JsonConvert.SerializeObject(status));
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void gmail_login_mobile()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string status = string.Empty;

                string _email = HttpContext.Current.Request["email"].ToString();
                string _id = HttpContext.Current.Request["id"].ToString();

                _usersBL.log_in_by_gmail(_email, _id);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";

                if (status.Trim() == string.Empty)
                {
                    var data = _usersBL.get_user_by_email(_email);
                    Context.Response.Write(JsonConvert.SerializeObject(data));
                }
                else
                {
                    Context.Response.Write(JsonConvert.SerializeObject(status));
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void apple_login_mobile()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string status = string.Empty;

                string _email = HttpContext.Current.Request["email"].ToString();
                string _id = HttpContext.Current.Request["id"].ToString();

                _usersBL.log_in_by_apple(_email, _id);

                JavaScriptSerializer js = new JavaScriptSerializer();
                Context.Response.Clear();
                Context.Response.ContentType = "application/json";

                if (status.Trim() == string.Empty)
                {
                    var data = _usersBL.get_user_by_email(_email);
                    Context.Response.Write(JsonConvert.SerializeObject(data));
                }
                else
                {
                    Context.Response.Write(JsonConvert.SerializeObject(status));
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        [WebMethod(EnableSession = true)]
        public void mobile_changeinfo()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                usersBL _userBl = new usersBL();

                string email = HttpContext.Current.Request["email"].ToString();
                string firstname = HttpContext.Current.Request["firstname"].ToString();
                string lastname = HttpContext.Current.Request["lastname"].ToString();
                string number = HttpContext.Current.Request["number"].ToString();
                string code = HttpContext.Current.Request["code"].ToString();
                string token = HttpContext.Current.Request["token"].ToString();

                _userBl.MobileChangeUserInfo(email, firstname, lastname, number, code, token);

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
        public void mobile_changepassword()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                string oldP = HttpContext.Current.Request["curpassword"].ToString();
                string newP = HttpContext.Current.Request["newpassword"].ToString();
                string token = HttpContext.Current.Request["token"].ToString();
                string data = _usersBL.mobile_changepassword(oldP, newP, token);
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
        public void mobile_billingaddress()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                common obj = new common();
                string town = HttpContext.Current.Request["town"].ToString();
                string block = HttpContext.Current.Request["block"].ToString();
                string street = HttpContext.Current.Request["street"].ToString();
                int house = int.Parse(HttpContext.Current.Request["house"].ToString());
                int apartment = int.Parse(HttpContext.Current.Request["apartment"].ToString());
                int cityid = int.Parse(HttpContext.Current.Request["cityid"].ToString());
                string token = HttpContext.Current.Request["token"].ToString();
                _usersBL.mobile_billingaddress(town, block, street, house, apartment, cityid, token);
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
        public void auth_token(string username, string password)
        {
            string token = string.Empty;
            try
            {
                if (System.Configuration.ConfigurationManager.AppSettings["token_username"].Trim() == username.Trim()
                    && System.Configuration.ConfigurationManager.AppSettings["token_password"].Trim() == password.Trim())
                {
                    Guid tokenGuid = Guid.NewGuid();
                    token = tokenGuid.ToString();

                    _usersBL.save_auth_token(tokenGuid);
                }
            }
            catch (Exception ex)
            {
                throw (ex);
            }

            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Clear();
            Context.Response.ContentType = "application/json";
            Context.Response.Write(JsonConvert.SerializeObject(token));
        }

        [WebMethod(EnableSession = true)]
        public void update_user_firebase_token()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString(); 

                if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string user_token = HttpContext.Current.Request["user_token"].ToString();
                string firebase_token = HttpContext.Current.Request["firebase_token"].ToString();

                _usersBL.update_user_firebase_token(user_token, firebase_token);

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
        public void delete_user_account()
        {
            try
            {
                string auth_token = HttpContext.Current.Request["auth_token"].ToString();

                if (!IsAuthorized(auth_token))
                {
                    throw new InvalidOperationException("You are not authorized to use the API");
                }

                string user_token = HttpContext.Current.Request["user_token"].ToString();

                _usersBL.delete_user_account(user_token);

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
    }
}

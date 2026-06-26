using business_logic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.UI;

namespace web
{
    public class common : Page
    {
        commonBL _commonBL = new commonBL();
        public void SendEmail(string _to, string _subject, string _mailbody, string _copy, string attachedURl)
        {
            if (_to != null && _to.Trim() != string.Empty)
            {
                try
                {
                    _commonBL.SendEmail(_to, _subject, _mailbody, _copy, attachedURl);
                }
                catch (SmtpException ex1)
                {
                    Console.WriteLine("SmtpException caught! " + ex1.ToString());
                }
                catch (ArgumentException ex2)
                {
                    Console.WriteLine("ArgumentException caught! " + ex2.ToString());
                }
                catch (Exception ex3)
                {
                    Console.WriteLine("Exception caught! " + ex3.ToString());
                }
            }
        }

        public string GetHashingId(string Id)
        {
            return _commonBL.GetHashingId(Id);
        }

        public string GetObjectValue(object data, string nameOfProperty)
        {
            var propertyInfo = data.GetType().GetProperty(nameOfProperty);
            if (propertyInfo != null)
            {
                var value = propertyInfo.GetValue(data, null);
                if (value == null)
                    value = string.Empty;
                return value.ToString();
            }
            else
                return string.Empty;
        }

        public void Redirect(string pageName, bool Value)
        {
            Response.Redirect(GetApplicationPath() + pageName, Value);
        }

        public string GetApplicationPath()
        {
            return (Request.ApplicationPath == "/") ? "" : Request.ApplicationPath;
        }

        public bool IsArabic()
        {
            bool val = false;

            if (HttpContext.Current.Request.Cookies["language"] != null)
            {
                var value = HttpContext.Current.Request.Cookies["language"].Value;
                if(value.Trim().ToLower() == "ar" )
                {
                    val = true;
                }
            }

            return val;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace web
{
    public class LoginUser : common
    {
        public static object UserInformation
        {
            get
            {
                object session = (object)HttpContext.Current.Session["UserInformation"];
                return session;
            }
            set
            {
                HttpContext.Current.Session["UserInformation"] = value;
            }
        }
    }
}
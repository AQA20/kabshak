using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace web
{
    public class PageStructure
    {
        public static class Pages
        {
            public static string Home
            {
                get
                {
                    return "/home.aspx";
                }
            }

            public static string Ar
            {
                get
                {
                    return "/ar.aspx";
                }
            }
        }
    }
}
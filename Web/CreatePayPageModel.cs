using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vape
{
    public class CreatePayPageModel
    {
        public int profile_id { get; set; }
        public string tran_type { get; set; }
        public string tran_class { get; set; }
        public string cart_id { get; set; }
        public string cart_currency { get; set; }
        public double cart_amount { get; set; }
        public string cart_description { get; set; }
        public string paypage_lang { get; set; }
        public int? tokenise { get; set; }
        public string callback { get; set; }
        public string @return { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vape
{
    public class QueryTransactionResponse
    {
        public string tran_ref { get; set; }
        public string tran_type { get; set; }
        public string cart_id { get; set; }
        public string cart_description { get; set; }
        public string cart_currency { get; set; }
        public string cart_amount { get; set; }
        public PaymentResult payment_result { get; set; }
    }
}
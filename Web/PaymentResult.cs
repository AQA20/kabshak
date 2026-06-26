using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace vape
{
    public class PaymentResult
    {
        public string response_status { get; set; }
        public string response_code { get; set; }
        public string response_message { get; set; }
        public DateTime transaction_time { get; set; }
    }
}
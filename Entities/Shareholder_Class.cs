using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Shareholder_Class
    {
        public string usertoken;

        public int CharityId { get; set; }
        public string CharityName { get; set; }
        public string productToken { get; set; }
        public string productName { get; set; }
        public int Quantity { get; set; }
        public string Shareholder { get; set; }
        public int PurposeId { get; set; }
        public string AddressDetails { get; set; }

    }
}

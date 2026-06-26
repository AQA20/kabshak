using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Shipping_Shareholder_Class
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

        public string ShippingName { get; set; }
        public string ShippingNumber { get; set; }
        public string ShippingCityid { get; set; }
        public string ShippingCityText { get; set; }
        public string ShippingTown { get; set; }
        public string ShippingBlock { get; set; }
        public string ShippingHouse { get; set; }
        public string ShippingStreet { get; set; }
        public string ShippingApartment { get; set; }

        public string cuttingNotes { get; set; }
    }
}

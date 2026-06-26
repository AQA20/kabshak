using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    [Serializable]
    public class Shareholder
    {
        public string product_token;

        public string FullName { get; set; }
        public string NameEn { get; set; }
        public string NameAr { get; set; }
        public int? Quantity { get; set; }
        public int? CharityId { get; set; }
        public string CharityNameEn { get; set; }
        public string CharityNameAr { get; set; }
        public int CountryId { get; set; }
        public string CountryNameEn { get; set; }
        public string CountryNameAr { get; set; }
        public int? PurposeId { get; set; }
        public string PurposeName { get; set; }
        public string PurposeNameAr { get; set; }
        public string AddressDetails { get; set; }
        public string ShippingAddressEn { get; set; }
        public string ShippingAddressAr { get; set; }
        public string ContactNumber { get; set; }
        public string CuttingNotes { get; set; }
    }
}

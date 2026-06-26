using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    [Serializable]
    public class OrderDetails
    {
        public object Data { get; set; }
        public object BillingAddress { get; set; }
        public object ShippingAddress { get; set; }
        public List<object> Products { get; set; }
        public object Submitter { get; set; }
        public List<TrackItem> Tracks { get; set; }
        public List<TransactionItem> Transactions { get; set; }
        public object CharityInfo { get; set; }
        public List<Shareholder> Persons { get; set; }
    }
}

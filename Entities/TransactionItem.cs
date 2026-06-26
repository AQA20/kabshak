using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    [Serializable]
    public class TransactionItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public string Result { get; set; }
        public string Amount { get; set; }
        public string Date { get; set; }
        public string PaymentId { get; set; }
        public string Ref { get; set; }
        public string TransId { get; set; }
        public string TrackId { get; set; }
    }
}

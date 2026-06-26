using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    [Serializable]
    public class TrackItem
    {
        public string StatuseName { get; set; }
        public DateTime CreatedOnDate { get; set; }
        public string Email { get; set; }
        public string URL { get; set; }
        public string StatuseNameAr { get; set; }
    }
}

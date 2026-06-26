using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    [Serializable]
    public class Order
    {
        public string _usertoken;
        public string _items;
        public string _first_name;
        public string _last_name;
        public string _email;
        public string _number;
        public int _cityid;
        public int _shippingcityid;
        public string _ordernotes;
        public int _statusId;
        public object _orderId;
        public string _town;
        public string _block;
        public string _street;
        public int _house;
        public int _apartment;
        public int _paci;
        public string _shippingtown;
        public string _shippingblock;
        public string _shippingstreet;
        public int _shippinghouse;
        public int _shippingapartment;
        public int _shippingpaci;
        public int _charityId;
        public string persons;
        public string shareholders;
        public bool _IsShip;
        public string _shippingnumber;
        public string promo_code;
        public float code_value;
        public string shippingshareholders;
    }
}

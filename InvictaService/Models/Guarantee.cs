using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvictaService.Models
{
    public class Guarantee
    {
    }
    public class JsonCancelRequest
    {
        public string GuaranteeID { get; set; }
        public string TrackingID { get; set; }
        public string OrderID { get; set; }
        public string ShipmentID { get; set; }
    }
}

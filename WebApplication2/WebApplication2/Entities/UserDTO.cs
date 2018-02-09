using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication2.Entities
{
    public class UserDTO
    {
        public Status status { get; set; }
        public Record[] records { get; set; }
    }

    public class Status
    {
        public string request { get; set; }
        public int requestUnixTime { get; set; }
        public string responseStatus { get; set; }
        public int errorCode { get; set; }
        public float generationTime { get; set; }
        public int recordsTotal { get; set; }
        public int recordsInResponse { get; set; }
    }

    public class Record
    {
        public string userID { get; set; }
        public string userName { get; set; }
        public string employeeID { get; set; }
        public string employeeName { get; set; }
        public string groupID { get; set; }
        public string groupName { get; set; }
        public string ipAddress { get; set; }
        public string sessionKey { get; set; }
        public int sessionLength { get; set; }
        public string loginUrl { get; set; }
        public string berlinPOSVersion { get; set; }
        public string berlinPOSAssetsURL { get; set; }
        public string epsiURL { get; set; }
        public Customerregistryurl[] customerRegistryURLs { get; set; }
        public object[] transactionRegistryURLs { get; set; }
    }

    public class Customerregistryurl
    {
        public string url { get; set; }
        public string token { get; set; }
        public int priority { get; set; }
        public int weight { get; set; }
    }

}

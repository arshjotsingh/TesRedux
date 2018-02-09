using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebApplication2.Entities;

namespace WebApplication2.Controllers
{
    [Produces("application/json")]
    [Route("api/Account")]
    public class AccountController : Controller
    {
        public string SignIn(User user)
        {
            return GetUser(user);
        }

        private string GetUser(User user)
        {
            var ErplyAPIHostname = "https://{0}.erply.com/api/";
            var _clientCode = "1020";
            var ErplyAPIRequest = "verifyUser";

            var erplyAPIHostname = string.Format(ErplyAPIHostname, _clientCode);

            WebRequest request = WebRequest.Create(erplyAPIHostname);
            request.Method = "POST";
            var _postData = new Dictionary<string, object>
            {
                { "request", ErplyAPIRequest },
                { "username",user.username },
                {"password",user.password},
                { "clientCode","1020" }
            };


            string postData = CreateQueryString(_postData);
            byte[] byteArray = Encoding.UTF8.GetBytes(postData);
            request.ContentType = "application/x-www-form-urlencoded";
            request.ContentLength = byteArray.Length;
            Stream dataStream = request.GetRequestStream();
            dataStream.Write(byteArray, 0, byteArray.Length);
            dataStream.Close();
            WebResponse response = request.GetResponse();
            Console.WriteLine(((HttpWebResponse)response).StatusDescription);
            dataStream = response.GetResponseStream();
            StreamReader reader = new StreamReader(dataStream);
            string responseFromServer = reader.ReadToEnd();
            UserDTO userDTO = JsonConvert.DeserializeObject<UserDTO>(responseFromServer);
            reader.Close();
            dataStream.Close();
            response.Close();
            if (userDTO.records.Length > 0)
            {
                return userDTO.records[0].userName;
            }
            else
            {
                return "";
            }
        }

        private string CreateQueryString(Dictionary<string, object> parameters)
        {
            var stringBuilder = new StringBuilder();

            foreach (KeyValuePair<string, object> entry in parameters)
            {
                stringBuilder.Append(entry.Key + "=" + entry.Value + "&");
            }

            stringBuilder.Length -= 1; // Remove the last 
            return stringBuilder.ToString();
        }
    }
}
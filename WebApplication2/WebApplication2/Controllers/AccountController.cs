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
    [Route("api/account")]
    public class AccountController : Controller
    {
        [HttpPost]
        public IActionResult SignIn([FromBody]User user)
        {
            if(user == null)
            {
                return BadRequest();
            }

            if(user.username.ToLower() == "arshjot" && user.password == "123")
            {
                return new ObjectResult(user);
            }
            else
            {
                return NotFound();
            }

        }
    }
}
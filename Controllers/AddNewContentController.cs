using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorkDocCMS.Controllers
{
    [ApiController]

    [Route("api/[controller]")]
    
    public class AddNewContentController : Controller
    {
        [Route("")]
        public IActionResult Index()
        {
            var resp = new Resp();
            resp.code = "1";
            return Json(resp);
        }
    }

    class Resp
    {
        public string code { get; set; }
    }
}

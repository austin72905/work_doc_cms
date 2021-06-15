using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkDocCMS.Interface;
using WorkDocCMS.Models;

namespace WorkDocCMS.Controllers
{
    [ApiController] //https://blog.miniasp.com/post/2019/09/16/ASPNET-Core-22-Web-API-Tips-and-Tricks

    [Route("api/[controller]")]
    public class DocumentContentController : Controller
    {
        private IDocument _document;
        public DocumentContentController(IDocument document)
        {
            _document = document;
        }

        [Route("GetContent")]
        public IActionResult GetContent([FromQuery] ReqModel req)
        {
            var result=_document.GetContent(req);
            return Json(result);
        }
        [Route("AddContent")]
        public IActionResult AddContent([FromBody] EditReqModel req)
        {
            var result = _document.AddContent(req);
            return Json(result);
        }
        [Route("EditContent")]
        public IActionResult EditContent([FromBody] EditReqModel req)
        {
            var result = _document.EditContent(req);
            return Json(result);
        }
        [Route("DelContent")]
        public IActionResult DelContent([FromBody] EditReqModel req)
        {
            var result = _document.DelContent(req);
            return Json(result);
        }
    }
}

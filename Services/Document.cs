using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using WorkDocCMS.Interface;
using WorkDocCMS.Models;
using WorkDocCMS.Utils;
using static WorkDocCMS.Utils.HttpUtil;

namespace WorkDocCMS.Services
{
    public class Document: IDocument
    {
        //private static readonly HttpClient client = new HttpClient();
        private const string DocumentUrl = "https://script.google.com/macros/s/AKfycbxpHZyKLDTdUg2kiyhDd23V9FtHp9wHW8lbIRucA-nh5_B_R2MQTlHiVruz5asEpZzw/exec";
        public RespModel GetContent(ReqModel req)
        {
            var result= Get(DocumentUrl,req);
            var respData = JsonSerializer.Deserialize<RespModel>(result.Result);
            return respData;
        }

        public RespModel AddContent(EditReqModel req)
        {
            var result = Post(DocumentUrl, req, ContentType.FORM);
            var respData = JsonSerializer.Deserialize<RespModel>(result.Result);
            return respData;
        }

        public RespModel EditContent(EditReqModel req)
        {
            var result = Post(DocumentUrl, req, ContentType.FORM);
            var respData = JsonSerializer.Deserialize<RespModel>(result.Result);
            return respData;
        }

        public RespModel DelContent(EditReqModel req)
        {
            var result = Post(DocumentUrl, req, ContentType.FORM);
            var respData = JsonSerializer.Deserialize<RespModel>(result.Result);
            return respData;
        }
    }
}

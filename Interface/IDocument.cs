using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkDocCMS.Models;

namespace WorkDocCMS.Interface
{
    public interface IDocument
    {
        public RespModel GetContent(ReqModel req);

        public RespModel AddContent(EditReqModel req);

        public RespModel EditContent(EditReqModel req);

        public RespModel DelContent(EditReqModel req);
    }
}

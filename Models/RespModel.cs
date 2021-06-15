using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorkDocCMS.Models
{
    public class RespModel
    {
        public int code { get; set; }

        public string msg { get; set; }

        public string error { get; set; }

        public List<Content> data { get; set; }
    }
}

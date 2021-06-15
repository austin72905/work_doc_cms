using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorkDocCMS.Models
{
    public class Content
    {
        public string id { get; set; }
        public string sort { get; set; }

        public string title { get; set; }

        public string question { get; set; }
        public string answer { get; set; }
        public string debug { get; set; }
        public string images { get; set; }
    }
}

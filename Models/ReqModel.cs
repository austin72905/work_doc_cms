using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorkDocCMS.Models
{
    public class ReqModel
    {
        public string page { get; set; }

        public string sort { get; set; }
    }

    public class EditReqModel
    {
        private string _id;
        public string id {
            
            get { return _id; }
            set 
            {
                if (value == "")
                {
                    _id = Guid.NewGuid().ToString();
                }
                else
                {
                    _id = value;
                }
            } 
        }
        public string sort { get; set; }

        public string title { get; set; }
        public string question { get; set; }
        public string answer { get; set; }
        public string debug { get; set; }
        public string images { get; set; }
        public bool isDelete { get; set; }
        public string page { get; set; }

    }
}

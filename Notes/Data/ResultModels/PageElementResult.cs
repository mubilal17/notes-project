using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web_Server.Data.ResultModels
{
    public class PageElementResult
    {
        public bool Success { get; set; }
        public int Id { get; set; }
        public string Type { get; set; }
        public string Content { get; set; }
    }
}

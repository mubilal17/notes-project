using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web_Server.Data.ResultModels
{
    public class SectionResult
    {
        public bool Success { get; set; }
        public int Id { get; set; }
        public string Title { get; set; }

        public List<PageResult> Pages {get; set;}
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Notes.Data.Models
{
    public class PageElement
    {

        public int Id { get; set; }
        public string Type { get; set; }
        public string Content { get; set; }

        public PageElement(int id = 0, string elementType = "p", string content = "")
        {
            Id = id;
            Type = elementType;
            Content = content;
        }
    }
}

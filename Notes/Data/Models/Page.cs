using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Notes.Data.Models
{
    public class Page
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public List<PageElement> Elements { get; private set; }

        private IdCounter elementIdCounter;
        public Page(int id = 0, string title = "Untitled Page", List<PageElement> elements = null)
        {
            Id = id;
            Title = title;
            Elements = elements ?? new List<PageElement>();

            int maxElementId = 0;
            Elements.ForEach(element =>
            {
                if (element.Id > maxElementId)
                    maxElementId = element.Id;
            });
            elementIdCounter = new IdCounter(maxElementId + 1);
        }

        public void appendElement()
        {
            PageElement element = new PageElement();
            element.Id = elementIdCounter.getNextThenIncrement();
        }
        public void addElement(PageElement element)
        {
            int id = elementIdCounter.getNextThenIncrement();
            element.Id = id;
            Elements.Add(element);
        }

        public void addElements(params PageElement[] elements)
        {
            foreach (PageElement element in elements)
            {
                this.addElement(element);
            }
        }

        public PageElement getElement(int elementId)
        {
            return Elements.Find(element => element.Id == elementId);
        }

        public void updateElement(int elementId, string content)
        {
            throw new NotImplementedException();
        }

        public void deleteElement(int elementId)
        {
            throw new NotImplementedException();
        }

    }
}
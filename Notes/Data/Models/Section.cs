using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Notes.Data.Models
{
    public class Section
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public List<Page> Pages { get; private set; }
        private IdCounter pageIdCounter;

        public Section(int id = 0, string title = "Untitled", List<Page> pages = null)
        {
            Id = id;
            Title = title;
            Pages = pages ?? new List<Page>();

            int maxPageId = 0;
            Pages.ForEach(element =>
            {
                if (element.Id > maxPageId)
                    maxPageId = element.Id;
            });
            pageIdCounter = new IdCounter(maxPageId + 1);
        }

        public void appendNewPage()
        {
            int id = pageIdCounter.getNextThenIncrement();
            Page page = new Page(id);
            Pages.Add(page);
        }

        public void addPage(Page page)
        {
            int id = pageIdCounter.getNextThenIncrement();
            page.Id = id;
            Pages.Add(page);
        }

        public Page getPage(int pageId)
        {
            return Pages.Find(page => page.Id == pageId);
        }

        public void updatePage(int pageId, Page page)
        {
            throw new NotImplementedException();
        }

        public void removePage()
        {
            throw new NotImplementedException();
        }



    }
}
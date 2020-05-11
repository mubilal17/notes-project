using Notes.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Notes.Data
{
    public class Repository
    {
        private Workspace workspace;
        public Repository()
        {
            string[] sectionTitles = { "Core Language", "Objects and Types", "Object Oriented Programming"};
            string[] pageTitles = { "Overview", "Terminology", "Exercises" };
            workspace = new Workspace();
            for (int i = 0; i < sectionTitles.Length; i++)
            {
                Section section = new Section() { Title = sectionTitles[i] };
                for (int j = 0; j < pageTitles.Length; j++)
                {
                    Page page = new Page() { Title = pageTitles[j] };
                    PageElement element1 = new PageElement() { Content = "Hello World!" };
                    PageElement element2 = new PageElement() { Content = "This is line 2." };
                    page.addElements(element1, element2);
                    section.addPage(page);
                }

                workspace.addSection(section);
            }
        }

        public Workspace getWorkspace()
        {
            return workspace;
        }
    }
}

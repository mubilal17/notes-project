using Notes.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Notes.Data
{
    public class Repository
    {
        private List<Workspace> workspaces;
        public Repository()
        {
            string[] sectionTitles = { "Core Language", "Objects and Types", "Object Oriented Programming"};
            string[] pageTitles = { "Overview", "Terminology", "Exercises" };
            Workspace workspace = new Workspace() { Id = 1 };
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
            workspaces = new List<Workspace>();
            workspaces.Add(workspace);
        }

        public Workspace getWorkspace(int workspaceId)
        {
            return workspaces.Find(workspace => workspace.Id == workspaceId);
        }

        public Section getSection(int workspaceId, int sectionId)
        {
            Workspace workspace = getWorkspace(workspaceId);
            return workspace.getSection(sectionId);
        }

        public Page getPage(int workspaceId, int sectionId, int pageId)
        {
            Section section = getSection(workspaceId, sectionId);
            return section.getPage(pageId);
        }
    }
}

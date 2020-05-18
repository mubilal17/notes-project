using Notes.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web_Server.Data.ResultModels;

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
            Workspace workspace = workspaces.Find(workspace => workspace.Id == workspaceId);
            return workspace;
        }

        private Section getSection(int workspaceId, int sectionId)
        {
            Workspace workspace = getWorkspace(workspaceId);
            return workspace.getSection(sectionId);
        }

        private Page getPage(int workspaceId, int sectionId, int pageId)
        {
            return getSection(workspaceId, sectionId).getPage(pageId);
        }

        private List<Page> getPages(int workspaceId, int sectionId)
        {
            return getSection(workspaceId, sectionId).Pages;
        }

        private PageElement getPageElement(int workspaceId, int sectionId, int pageId, int elementId)
        {
            Page page = getPage(workspaceId, sectionId, pageId);
            return page.getElement(elementId);
        }

        public SectionResult GetSection(int workspaceId, int sectionId)
        {
            Section section = getSection(workspaceId, sectionId);
            if (section == null)
            {
                return new SectionResult { Success = false };
            }
            return new SectionResult { Success = true, Id = section.Id, Title = section.Title, Pages = GetPages(workspaceId, sectionId) };
        }

        public PageResult GetPage(int workspaceId, int sectionId, int pageId)
        {
            Page page = getPage(workspaceId, sectionId, pageId);
            if (page == null)
            {
                return new PageResult { Success = false };
            }
            return new PageResult { Success = true, Id = page.Id, Title = page.Title, Elements = GetPageElements(workspaceId, sectionId, page.Id) };
        }

        public List<PageResult> GetPages(int workspaceId, int sectionId)
        {
            List<Page> pages = getPages(workspaceId, sectionId);
            return pages.ConvertAll(page => new PageResult { Success = true, Id = page.Id, Title = page.Title, Elements = GetPageElements(workspaceId, sectionId, page.Id)});
        }

        public PageElementResult GetPageElement(int workspaceId, int sectionId, int pageId, int elementId)
        {
            PageElement element = getPageElement(workspaceId, sectionId, pageId, elementId);
            return new PageElementResult { Success = true, Id = sectionId, Type = element.Type, Content = element.Content };
        }

        public List<PageElementResult> GetPageElements(int workspaceId, int sectionId, int pageId)
        {
            Page page = getPage(workspaceId, sectionId, pageId);
            return page.Elements.ConvertAll(element => new PageElementResult { Success = true, Id = element.Id, Type = element.Type, Content = element.Content });
        }

        public PageResult appendNewPageToSection(int workspaceId, int sectionId)
        {
            Section section = getSection(workspaceId, sectionId);
            Page page = new Page();
            section.addPage(page);
            return new PageResult { Success = true, Id = page.Id, Title = page.Title, Elements = null };
        }

    }
}

const Page = require('./Page');

class WorkspaceAPI
{
    async getSections()
    {
        const data = await fetch('/workspace');
        let sections = await data.json();
        this.sections = sections;
        return sections;
    }
    getPage(sectionId, pageId)
    {
        let section = this.sections.find(section => section.id == sectionId);
        let page = section.pages.find(page => {
            if (page.id == pageId)
                return true;
            else
                return false;
        })
        return new Page(page.id, page.title, page.elements);;
    }

    updatePage(sectionId, pageId, page)
    {
        let section = this.sections.find(section => section.id == sectionId);
        let pageIndex = section.pages.findIndex (page => page.id == pageId);
        section.pages[pageIndex] = page;
    }
}

module.exports = WorkspaceAPI;
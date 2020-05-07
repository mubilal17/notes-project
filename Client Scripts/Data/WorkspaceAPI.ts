import {Page, PageElement, Section} from './Models';

class WorkspaceAPI
{
    private sections: Array<Section>;
    private pages: Array<Page>;
    private loaded: boolean;

    constructor()
    {
        this.loaded = false;
    }

    async loadWorkspace()
    {
        const data = await fetch('/workspace');
        let sectionsJSON = await data.json();
        this.sections = sectionsJSON.map(sectionJSON => {
            let pages = sectionJSON.pages.map(page => new Page(page.id, page.title, page.elements));
            return new Section(sectionJSON.id, sectionJSON.title, pages)
        });
        this.loaded = true;
    }

    getSection(sectionId: number): Section
    {
        if (this.loaded == false)
            throw new DOMException("WorkspaceAPI has not been loaded.");
        return this.sections.find(section => section.id == sectionId);
    }
    async getSections()
    {
        if (this.loaded == false)
            await this.loadWorkspace();
        return this.sections;
    }
    getPage(sectionId, pageId): Page
    {
        if (this.loaded == false)
            throw new DOMException("WorkspaceAPI has not been loaded.");

        let section = this.getSection(sectionId);
        return section.pages.find(page => page.id == pageId);
    }

    updateElementInPage(sectionId, pageId, elementId, content)
    {
        let page = this.getPage(sectionId, pageId);
        let element = page.elements.find(element => element.id == elementId);
        element.content = content;
    }

    updatePage(sectionId, pageId, page)
    {
        let section = this.sections.find(section => section.id == sectionId);
        let pageIndex = section.pages.findIndex (page => page.id == pageId);
        section.pages[pageIndex] = page;
    }
}

module.exports = new WorkspaceAPI();;
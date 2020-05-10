const PageModel = require('./PageModel');

class SectionModel
{
    constructor(id, title, pages)
    {
        this.id = id;
        this.title = title;
        this.pages = pages;
        this.pageIdCounter = 0;
    }
    appendNewPage()
    {
        let id = this.getNextPageId();
        let page = new PageModel(id, 'Untitled Page')
        this.pages.push(page);
    }
    addPage(page)
    {
        page.id = this.getNextPageId();
        this.pages.push(page);
    }
    getPage(pageId)
    {
        return this.pages.find(page => page.id == pageId);
    }

    updatePage(pageId, page)
    {
        throw new Error('updatePage not implemented yet');
    }
    removePage(pageId)
    {
        throw new Error('removePage not implemented yet');
    }

    getNextPageId()
    {
        return ++this.pageIdCounter;
    }
}


module.exports = SectionModel;
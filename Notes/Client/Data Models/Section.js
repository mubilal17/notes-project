let Page = require('./Page');

class Section {

    constructor(id, title, pages)
    {
        this.id = id != undefined ? id : 0;
        this.title = title != undefined ? title : 'Untitled Page';
        this.pages = pages != undefined ? pages : [];

        this.pageIdCounter = 0;
    }

  
    appendNewPage()
    {
        let id = this.getNextPageId();
        let page = new Page(id)
        this.pages.push(page);
    }

    addPage(page)
    {
        page.id = this.getNextPageId();
        this.pages.push(page);
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

module.exports = Section;